import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import katex from "katex";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import texmath from "markdown-it-texmath";
import { parse as parseCsv } from "csv-parse/sync";
import { PDFArray, PDFDict, PDFDocument, PDFHexString, PDFName, PDFNumber } from "pdf-lib";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "..");
const modulesRoot = path.join(root, "modules");
const readerGuidePath = path.join(root, "front-matter", "reader-guide.md");
const sourceLedgerPath = path.join(root, "research", "source-ledger.csv");
const appendixPaths = [
  path.join(root, "back-matter", "appendix-a-production-rollout.md"),
  path.join(root, "back-matter", "appendix-b-evaluation-test-plan.md"),
  path.join(root, "back-matter", "appendix-c-security-review.md"),
];
const buildRoot = path.join(root, "build", "book");
const outputRoot = path.join(root, "book");
const docsRoot = path.join(root, "docs");
const htmlPath = path.join(buildRoot, "agentic-system-design.html");
const webPath = path.join(docsRoot, "index.html");
const pdfPath = path.join(outputRoot, "building-agentic-systems.pdf");
const coverImagePath = path.join(outputRoot, "building-agentic-systems-cover.png");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: false })
  .use(anchor, { permalink: false })
  .use(texmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: { throwOnError: false, strict: false },
  });

const defaultFence = markdown.renderer.rules.fence.bind(markdown.renderer.rules);
markdown.renderer.rules.fence = (tokens, index, options, environment, renderer) => {
  const token = tokens[index];
  if (token.info.trim() === "mermaid") {
    return `<figure class="diagram"><div class="mermaid">${escapeHtml(token.content)}</div></figure>`;
  }
  return defaultFence(tokens, index, options, environment, renderer);
};

function removeReaderNavigation(source) {
  return source
    .replace(/^\*\*On this page\*\*[\s\S]*?(?=^## The problem)/m, "")
    .replace(/^\*\*Navigation:\*\*.*$/gm, "")
    .replace(/^\*\*Continue:\*\*.*$/gm, "");
}

function withoutFirstHeading(source) {
  return source.replace(/^# .+\r?\n/, "");
}

function titleFrom(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Cannot read ${label} title`);
  return match[1].trim();
}

async function collectBook() {
  const entries = await fs.readdir(modulesRoot, { withFileTypes: true });
  const moduleDirs = entries
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  if (moduleDirs.length !== 10) throw new Error(`Expected 10 modules, found ${moduleDirs.length}`);

  const modules = [];
  const chapters = [];
  for (const moduleDir of moduleDirs) {
    const moduleNumber = Number(moduleDir.slice(0, 2));
    const modulePath = path.join(modulesRoot, moduleDir, "README.md");
    const moduleSource = await fs.readFile(modulePath, "utf8");
    const moduleTitle = titleFrom(moduleSource, /^# (Module .+)$/m, modulePath);
    const chapterDir = path.join(modulesRoot, moduleDir, "chapters");
    const chapterFiles = (await fs.readdir(chapterDir))
      .filter((name) => /^\d{2}-.+\.md$/.test(name))
      .sort();

    const moduleRecord = {
      number: moduleNumber,
      title: moduleTitle,
      id: `module-${String(moduleNumber).padStart(2, "0")}`,
      body: markdown.render(withoutFirstHeading(removeReaderNavigation(moduleSource))),
      chapters: [],
    };

    for (const chapterFile of chapterFiles) {
      const chapterPath = path.join(chapterDir, chapterFile);
      const chapterSource = await fs.readFile(chapterPath, "utf8");
      const heading = titleFrom(chapterSource, /^# (Chapter .+)$/m, chapterPath);
      const numberMatch = heading.match(/^Chapter 0*(\d+):/);
      if (!numberMatch) throw new Error(`Cannot read chapter number from ${chapterPath}`);
      const number = Number(numberMatch[1]);
      const chapter = {
        number,
        title: heading,
        id: `chapter-${String(number).padStart(2, "0")}`,
        source: chapterSource,
        body: markdown.render(withoutFirstHeading(removeReaderNavigation(chapterSource))),
      };
      moduleRecord.chapters.push(chapter);
      chapters.push(chapter);
    }
    modules.push(moduleRecord);
  }

  if (chapters.length !== 42) throw new Error(`Expected 42 chapters, found ${chapters.length}`);
  if (chapters.some((chapter, index) => chapter.number !== index + 1)) {
    throw new Error("Chapter sequence must be exactly 1 through 42");
  }
  return { modules, chapters };
}

function tableOfContents(modules, supplementalEntries) {
  const entry = (id, title) => `<a class="toc-entry" href="#${id}"><span class="toc-title">${title}</span><span class="toc-leader" aria-hidden="true"></span><span class="toc-page" data-toc-target="${id}" aria-label="Page number"></span></a>`;
  const moduleEntries = modules.map((module) => `
    <li>
      ${entry(module.id, module.title)}
      <ol>${module.chapters.map((chapter) => `<li>${entry(chapter.id, chapter.title)}</li>`).join("")}</ol>
    </li>`).join("");
  const backMatterEntries = supplementalEntries.map((item) => `<li class="toc-supplemental">${entry(item.id, item.title)}</li>`).join("");
  return moduleEntries + backMatterEntries;
}

function bookSections(modules) {
  return modules.map((module) => `
    <section class="module-opener" id="${module.id}">
      <p class="part-label">Part ${String(module.number).padStart(2, "0")}</p>
      <h1>${module.title.replace(/^Module \d+:\s*/, "")}</h1>
      ${module.body}
    </section>
    ${module.chapters.map((chapter) => `
      <article class="chapter" id="${chapter.id}">
        <a class="web-only back-to-contents" href="#contents">Contents</a>
        <h1>${chapter.title}</h1>
        ${chapter.body}
      </article>`).join("")}`).join("");
}

function renderAppendix(source, id, title) {
  const inBookLinks = withoutFirstHeading(source).replace(
    /\(\.\.\/modules\/[^)]+\/chapters\/(\d{2})-[^)]+\.md(?:#[^)]*)?\)/g,
    (_, chapter) => `(#chapter-${chapter})`,
  );
  return `<section class="back-matter appendix" id="${id}"><p class="part-label">Appendix</p><h1>${title}</h1>${markdown.render(inBookLinks)}</section>`;
}

function glossarySection(modules) {
  const terms = new Map();
  for (const chapter of modules.flatMap((module) => module.chapters)) {
    const section = chapter.source.match(/^## Vocabulary\s*\n([\s\S]*?)(?=^## )/m)?.[1];
    if (!section) throw new Error(`Glossary generation failed: ${chapter.title} has no vocabulary section`);
    for (const line of section.split(/\r?\n/)) {
      if (!line.startsWith("|")) continue;
      const cells = line.slice(1, line.endsWith("|") ? -1 : undefined).split("|").map((cell) => cell.trim());
      if (cells.length !== 2 || cells[0] === "Term" || /^-+$/.test(cells[0])) continue;
      const term = cells[0].replace(/\[([^\]]+)]\([^)]+\)/g, "$1").replace(/[*_`]/g, "").trim();
      const key = term.toLocaleLowerCase("en-US");
      const existing = terms.get(key);
      if (existing) existing.chapters.push(chapter);
      else terms.set(key, { term, definition: cells[1], chapters: [chapter] });
    }
  }
  const sorted = [...terms.values()].sort((left, right) => left.term.localeCompare(right.term, "en-US", { sensitivity: "base" }));
  const groups = new Map();
  for (const item of sorted) {
    const letter = item.term[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(item);
  }
  const body = [...groups].map(([letter, entries]) => `<section class="glossary-group"><h2>${escapeHtml(letter)}</h2><div class="glossary-grid">${entries.map((item) => {
    const chapters = [...new Map(item.chapters.map((chapter) => [chapter.number, chapter])).values()];
    const links = chapters.map((chapter) => `<a href="#${chapter.id}">${chapter.number}</a>`).join(", ");
    return `<div class="glossary-entry"><h3>${markdown.renderInline(item.term)}</h3><p>${markdown.renderInline(item.definition)} <span class="glossary-chapters">Chapters ${links}</span></p></div>`;
  }).join("")}</div></section>`).join("");
  return {
    id: "glossary",
    title: "Glossary and Term Index",
    html: `<section class="back-matter glossary" id="glossary"><p class="part-label">Back matter</p><h1>Glossary and Term Index</h1><p>This glossary consolidates each chapter's vocabulary. The first occurrence supplies the canonical definition; chapter links show where the term is taught or reused.</p>${body}</section>`,
    count: sorted.length,
  };
}

function referencesSection(sourceLedger) {
  const rows = parseCsv(sourceLedger, { columns: true, skip_empty_lines: true, bom: true });
  rows.forEach((row, index) => {
    const expected = `SRC-${String(index + 1).padStart(3, "0")}`;
    if (row.id !== expected || row.status !== "approved") {
      throw new Error(`Reference validation failed at row ${index + 1}: expected approved ${expected}, found ${row.id} (${row.status})`);
    }
  });
  const items = rows.map((row) => {
    const chapterLinks = row.chapter.split(",").map((value) => value.trim()).filter(Boolean).map((number) => {
      const numeric = Number(number);
      return `<a href="#chapter-${String(numeric).padStart(2, "0")}">${numeric}</a>`;
    }).join(", ");
    return `<li id="reference-${row.id.toLowerCase()}"><span class="reference-id">${escapeHtml(row.id)}</span> <b>${escapeHtml(row.publisher)}.</b> <cite>${escapeHtml(row.title)}</cite>. Published or updated: ${escapeHtml(row.published_date)}. Accessed: ${escapeHtml(row.accessed_date)}. <a class="reference-url" href="${escapeHtml(row.url)}">${escapeHtml(row.url)}</a><span class="reference-meta">Freshness: ${escapeHtml(row.freshness)}. Used in Chapters ${chapterLinks}. Supported use: ${escapeHtml(row.claim)}</span></li>`;
  }).join("");
  return {
    id: "references",
    title: "References",
    html: `<section class="back-matter references" id="references"><p class="part-label">Back matter</p><h1>References</h1><p>These are the approved sources used across the book. Durable sources support stable foundations; evolving sources require scoped interpretation; volatile sources require release-time reverification.</p><ol class="references-list">${items}</ol></section>`,
    count: rows.length,
  };
}

function styles(katexCss) {
  return `
${katexCss}
:root { --ink:#18222b; --muted:#53606a; --blue:#0b5c7a; --teal:#087f6d; --gold:#a66b00; --paper:#ffffff; --wash:#eef5f6; --line:#c9d6d9; }
* { box-sizing:border-box; }
html { font-size:10.5pt; }
body { margin:0; color:var(--ink); background:var(--paper); font-family:Georgia,"Times New Roman",serif; line-height:1.53; }
a { color:var(--blue); text-decoration:none; }
p, li { orphans:3; widows:3; }
h1, h2, h3 { color:#123d4a; font-family:"Segoe UI",Calibri,sans-serif; line-height:1.18; break-after:avoid-page; }
h1 { margin:0 0 1rem; font-size:27pt; }
h2 { margin:1.7rem 0 .65rem; padding-bottom:.18rem; border-bottom:1px solid var(--line); font-size:17pt; }
h3 { margin:1.25rem 0 .45rem; font-size:13pt; color:var(--blue); }
h4 { font-family:"Segoe UI",Calibri,sans-serif; break-after:avoid-page; }
table { width:100%; margin:.8rem 0 1.1rem; border-collapse:collapse; font-size:8.4pt; break-inside:auto; }
thead { display:table-header-group; }
tr { break-inside:avoid; }
th { color:white; background:var(--blue); text-align:left; }
th, td { padding:.36rem .44rem; border:1px solid var(--line); vertical-align:top; }
tbody tr:nth-child(even) { background:#f4f8f8; }
blockquote { margin:1rem 0; padding:.25rem .9rem; color:#33454d; border-left:4px solid var(--teal); background:#f2f8f7; }
pre { margin:.9rem 0; padding:.8rem; overflow-wrap:anywhere; white-space:pre-wrap; border:1px solid #bcc9cd; border-radius:4px; background:#f5f7f8; font:7.8pt/1.45 Consolas,"Courier New",monospace; break-inside:avoid-page; }
code { font-family:Consolas,"Courier New",monospace; font-size:.88em; }
:not(pre) > code { padding:.08rem .22rem; border-radius:3px; background:#edf1f2; }
img, svg { max-width:100%; height:auto; }
.diagram { margin:1rem 0; padding:.45rem; text-align:center; border:1px solid var(--line); background:white; break-inside:avoid-page; }
.diagram svg { max-width:100% !important; height:auto !important; max-height:220mm; }
.katex-display { overflow:hidden; font-size:.92em; }
.cover { position:relative; height:245mm; overflow:hidden; padding:18mm 18mm 16mm; color:#f7f3e8; background:#101512; break-after:page; }
.cover::before { content:""; position:absolute; inset:0 auto 0 0; width:5mm; background:#f0523d; }
.cover::after { content:""; position:absolute; z-index:1; right:-26mm; top:22mm; width:82mm; height:82mm; border:1px solid rgba(132,226,204,.52); transform:rotate(45deg); }
.cover-grid { position:absolute; z-index:1; inset:0; overflow:hidden; pointer-events:none; }
.cover-grid span { position:absolute; display:block; background:rgba(247,243,232,.1); }
.cover-grid span:nth-child(1) { top:29mm; right:0; width:53%; height:1px; }
.cover-grid span:nth-child(2) { top:0; right:37mm; width:1px; height:100%; }
.cover-grid span:nth-child(3) { left:5mm; bottom:47mm; width:100%; height:1px; }
.cover-grid span:nth-child(4) { right:12mm; bottom:15mm; width:18mm; height:18mm; background:#d8e948; }
.cover-content { position:relative; z-index:2; display:flex; min-height:211mm; flex-direction:column; }
.cover-topline { display:flex; align-items:center; justify-content:space-between; margin:0 0 15mm; padding-bottom:3mm; border-bottom:1px solid rgba(247,243,232,.34); font:700 8pt/1.2 "Trebuchet MS",sans-serif; text-transform:uppercase; }
.cover-topline .cover-series { color:#84e2cc; }
.cover-topline .cover-edition { color:#f7f3e8; }
.cover-title-block { position:relative; max-width:164mm; }
.cover .kicker { margin:0 0 4mm; color:#f0523d; font:700 11pt/1.2 "Trebuchet MS",sans-serif; text-transform:uppercase; }
.cover h1 { max-width:164mm; margin:0; color:#f7f3e8; font-family:"Arial Narrow","Trebuchet MS",sans-serif; font-size:49pt; font-weight:800; line-height:.93; letter-spacing:0; text-transform:uppercase; }
.cover h1 .cover-building { display:block; margin-bottom:2mm; color:#84e2cc; font:italic 21pt/1.1 Georgia,"Times New Roman",serif; text-transform:none; }
.cover .subtitle { max-width:130mm; margin:7mm 0 0; padding-left:4mm; border-left:1.5mm solid #d8e948; color:#d9ded8; font:12.5pt/1.45 Georgia,"Times New Roman",serif; }
.cover-system { width:100%; margin:14mm 0 0; font-family:"Trebuchet MS",sans-serif; }
.cover-loop { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; align-items:stretch; width:100%; border-top:1px solid rgba(247,243,232,.48); border-bottom:1px solid rgba(247,243,232,.48); }
.cover-stage { display:grid; grid-template-columns:auto 1fr; gap:3mm; align-items:center; min-height:17mm; padding:3mm; }
.cover-stage strong { color:#f0523d; font-size:8pt; }
.cover-stage span { color:#f7f3e8; font-size:10pt; font-weight:700; text-transform:uppercase; }
.cover-arrow { align-self:center; color:#d8e948; font-size:16pt; font-weight:700; }
.cover-layers { display:grid; grid-template-columns:repeat(4,1fr); margin-top:4mm; border:1px solid rgba(132,226,204,.56); }
.cover-layer { min-height:14mm; padding:3mm; border-right:1px solid rgba(132,226,204,.4); }
.cover-layer:last-child { border-right:0; }
.cover-layer b { display:block; margin-bottom:1mm; color:#84e2cc; font-size:7.5pt; text-transform:uppercase; }
.cover-layer span { display:block; color:#bfc8c1; font-size:7.5pt; line-height:1.3; }
.cover-positioning { margin:4mm 0 0; color:#d8e948; font:700 7.5pt/1.4 "Trebuchet MS",sans-serif; text-align:right; text-transform:uppercase; }
.cover-meta { display:flex; align-items:flex-end; justify-content:space-between; gap:10mm; margin-top:auto; }
.cover .author { margin:0; color:#f7f3e8; font:700 13pt/1.3 "Trebuchet MS",sans-serif; }
.cover .author-role { display:block; margin-top:1mm; color:#84e2cc; font-size:8pt; font-weight:400; text-transform:uppercase; }
.cover .cover-mark { display:flex; align-items:center; gap:2mm; color:#aab4ac; font:700 7.5pt/1 "Trebuchet MS",sans-serif; text-transform:uppercase; }
.cover .cover-mark::before { content:""; display:block; width:8mm; height:8mm; border:1px solid #f0523d; background:#d8e948; }
.reader-guide, .contents { break-after:page; }
.reader-guide { padding-top:8mm; }
.contents > ol { columns:2; column-gap:12mm; padding-left:1.3rem; }
.contents li { margin:.18rem 0; break-inside:avoid; font-family:"Segoe UI",Calibri,sans-serif; font-size:9pt; }
.contents > ol > li { margin:0 0 .7rem; color:var(--blue); font-weight:700; }
.contents ol ol { padding-left:1rem; font-weight:400; }
.contents .toc-entry { display:flex; align-items:flex-end; gap:.35rem; width:100%; }
.contents .toc-title { min-width:0; }
.contents .toc-leader { min-width:1rem; flex:1 1 auto; margin-bottom:.28em; border-bottom:1px dotted #89979c; }
.contents .toc-page { flex:0 0 3ch; color:var(--ink); font-variant-numeric:tabular-nums; text-align:right; }
.contents .toc-supplemental { list-style:none; margin-left:-1.3rem; }
.contents .toc-supplemental:first-of-type { margin-top:1rem; }
.module-opener { min-height:220mm; padding-top:22mm; break-before:page; break-after:page; }
.module-opener .part-label { color:var(--teal); font:700 10pt/1 "Segoe UI",sans-serif; text-transform:uppercase; }
.module-opener h1 { font-size:32pt; }
.chapter { break-before:page; }
.back-matter { break-before:page; }
.back-matter > .part-label { color:var(--teal); font:700 10pt/1 "Segoe UI",sans-serif; text-transform:uppercase; }
.glossary-group { break-before:auto; }
.glossary-grid { columns:2; column-gap:9mm; }
.glossary-entry { margin:0 0 .65rem; break-inside:avoid; }
.glossary-entry h3 { margin:0 0 .12rem; font-size:10pt; }
.glossary-entry p { margin:0; font-size:8.3pt; line-height:1.4; }
.glossary-chapters, .reference-meta { display:block; margin-top:.12rem; color:var(--muted); font-family:"Segoe UI",Calibri,sans-serif; font-size:.88em; }
.references-list { padding-left:1.4rem; }
.references-list li { margin:0 0 .7rem; padding-left:.2rem; break-inside:avoid; font-size:8.3pt; line-height:1.4; overflow-wrap:anywhere; }
.reference-id { color:var(--teal); font-family:"Segoe UI",Calibri,sans-serif; font-weight:700; }
.reference-url { font-size:.9em; }
.web-only { display:none; }
.chapter > blockquote:first-of-type { font-family:"Segoe UI",Calibri,sans-serif; font-size:8.5pt; }
.chapter > hr { margin:2rem 0; border:0; border-top:1px solid var(--line); }
@page { size:A4; margin:17mm 16mm 19mm; }
@media print {
  a { color:inherit; }
  .cover { margin:-17mm -16mm -19mm; padding:23mm 23mm 19mm; height:297mm; }
  .cover-content { min-height:255mm; }
  .cover-grid span:nth-child(4) { display:none; }
}
@media screen {
  html { scroll-behavior:smooth; }
  body { background:var(--wash); }
  .web-only { display:block; }
  .web-header { position:sticky; z-index:10; top:0; display:flex; justify-content:space-between; gap:1rem; padding:.75rem max(1rem,calc((100% - 920px)/2)); color:white; background:#123d4a; font:600 9.5pt/1.3 "Segoe UI",sans-serif; }
  .web-header a { color:white; }
  .cover { min-height:calc(100vh - 44px); height:auto; padding:clamp(2rem,8vw,5rem) max(1.5rem,calc((100% - 920px)/2)); }
  .cover-content { min-height:calc(100vh - 10rem); }
  .reader-guide, .contents, main, .back-matter { width:min(100%,920px); margin:0 auto; padding:2rem clamp(1rem,4vw,3.5rem); background:white; }
  .reader-guide, .contents { min-height:100vh; }
  .contents .toc-entry { display:inline; }
  .contents .toc-leader, .contents .toc-page { display:none; }
  .module-opener, .chapter { min-height:0; padding-top:4rem; scroll-margin-top:3rem; }
  .back-to-contents { float:right; margin:.5rem 0 1rem 1rem; color:var(--teal); font:600 9pt/1.3 "Segoe UI",sans-serif; }
}
@media screen and (max-width:700px) {
  html { font-size:10pt; }
  main { overflow-x:clip; }
  main a { overflow-wrap:anywhere; }
  .web-header span { display:none; }
  .cover-topline { margin-bottom:2rem; }
  .cover h1 { font-size:37pt; }
  .cover h1 .cover-building { font-size:18pt; }
  .cover .subtitle { font-size:11.5pt; }
  .cover-system { margin-top:2rem; }
  .cover-loop { grid-template-columns:1fr; }
  .cover-arrow { transform:rotate(90deg); text-align:center; }
  .cover-layers { grid-template-columns:1fr 1fr; }
  .cover-layer:nth-child(2) { border-right:0; }
  .cover-layer:nth-child(-n+2) { border-bottom:1px solid rgba(132,226,204,.4); }
  .cover-positioning { max-width:100%; margin-bottom:.75rem; font-size:6.8pt; line-height:1.35; text-align:left; white-space:normal; }
  .cover-meta { gap:.75rem; }
  .cover .author { flex:1 1 auto; font-size:11pt; }
  .cover .cover-mark { flex:0 1 9rem; font-size:6.2pt; line-height:1.25; }
  .cover .cover-mark::before { flex:0 0 auto; width:1.6rem; height:1.6rem; }
  .cover-grid span:nth-child(4) { display:none; }
  .contents > ol { columns:1; }
  .glossary-grid { columns:1; }
  table { display:block; max-width:100%; overflow-x:auto; font-size:8pt; }
  pre { max-width:100%; overflow-x:auto; white-space:pre; }
  pre code { display:block; width:max-content; min-width:100%; }
  :not(pre) > code { white-space:normal; overflow-wrap:anywhere; }
  .katex-display { max-width:100%; overflow-x:auto; overflow-y:hidden; }
  .diagram, .diagram svg { max-width:100%; overflow:hidden; }
  .reader-guide table:nth-of-type(2),
  .reader-guide table:nth-of-type(2) tbody,
  .reader-guide table:nth-of-type(2) tr,
  .reader-guide table:nth-of-type(2) td { display:block; width:100%; }
  .reader-guide table:nth-of-type(2) thead { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }
  .reader-guide table:nth-of-type(2) tr { margin:0 0 .8rem; border:1px solid var(--line); }
  .reader-guide table:nth-of-type(2) td { border:0; border-bottom:1px solid var(--line); }
  .reader-guide table:nth-of-type(2) td:last-child { border-bottom:0; }
  .reader-guide table:nth-of-type(2) td::before { display:block; color:var(--blue); font:700 8pt/1.3 "Segoe UI",sans-serif; }
  .reader-guide table:nth-of-type(2) td:nth-child(1)::before { content:"Role"; }
  .reader-guide table:nth-of-type(2) td:nth-child(2)::before { content:"Focused path"; }
  .reader-guide table:nth-of-type(2) td:nth-child(3)::before { content:"Decision or output"; }
}
`;
}

async function findBrowser() {
  const shellRoot = path.join(os.homedir(), ".cache", "puppeteer", "chrome-headless-shell");
  try {
    const versions = (await fs.readdir(shellRoot)).sort().reverse();
    for (const version of versions) {
      const executable = process.platform === "win32"
        ? path.join(shellRoot, version, `chrome-headless-shell-${process.arch === "arm64" ? "win64" : "win64"}`, "chrome-headless-shell.exe")
        : path.join(shellRoot, version, `chrome-headless-shell-${process.platform === "darwin" ? "mac-arm64" : "linux64"}`, "chrome-headless-shell");
      try { await fs.access(executable); return executable; } catch { /* Try another installed version. */ }
    }
  } catch { /* Fall back to a system browser. */ }

  const candidates = process.platform === "win32"
    ? [
      path.join(process.env["PROGRAMFILES(X86)"] ?? "", "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(process.env.PROGRAMFILES ?? "", "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(process.env.LOCALAPPDATA ?? "", "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(process.env.PROGRAMFILES ?? "", "Google", "Chrome", "Application", "chrome.exe"),
    ]
    : ["/usr/bin/microsoft-edge", "/usr/bin/google-chrome", "/usr/bin/chromium"];
  for (const candidate of candidates) {
    try { await fs.access(candidate); return candidate; } catch { /* Try the next installed browser. */ }
  }
  throw new Error("Microsoft Edge, Google Chrome, or Chromium is required to build the PDF");
}

function readPdfOutlineTargets(document) {
  const { catalog, context } = document;
  const pageNumbers = new Map(document.getPages().map((page, index) => [page.ref.toString(), index + 1]));
  const originalRoot = context.lookup(catalog.get(PDFName.of("Outlines")), PDFDict);
  const topLevel = [];
  const seen = new Set();
  let current = originalRoot.get(PDFName.of("First"));
  while (current) {
    const key = current.toString();
    if (seen.has(key)) throw new Error(`PDF outline cycle at ${key}`);
    seen.add(key);
    const item = context.lookup(current, PDFDict);
    const title = item.get(PDFName.of("Title"))?.decodeText?.() ?? "";
    const destination = item.get(PDFName.of("Dest"));
    const action = item.get(PDFName.of("A"));
    if (!destination && !action) throw new Error(`PDF outline item has no destination: ${title}`);
    const actionDictionary = action ? context.lookup(action, PDFDict) : undefined;
    const destinationArray = context.lookup(destination ?? actionDictionary?.get(PDFName.of("D")), PDFArray);
    const pageNumber = pageNumbers.get(destinationArray.get(0).toString());
    if (!pageNumber) throw new Error(`PDF outline item has an invalid page destination: ${title}`);
    topLevel.push({ title, destination, action, pageNumber });
    current = item.get(PDFName.of("Next"));
  }

  const targetFor = (prefix, label) => {
    const normalizedPrefix = prefix.replace(/\s+/g, "");
    const target = topLevel.find((item) => item.title.replace(/\s+/g, "").startsWith(normalizedPrefix));
    if (!target) throw new Error(`PDF outline is missing ${label}: ${prefix}`);
    return target;
  };
  return { targetFor, topLevel };
}

function contentPageNumbers(document, modules, supplementalEntries) {
  const { targetFor } = readPdfOutlineTargets(document);
  const entries = [];
  for (const module of modules) {
    entries.push([module.id, targetFor(module.title.replace(/^Module \d+:\s*/, ""), module.title).pageNumber]);
    for (const chapter of module.chapters) {
      const prefix = chapter.title.match(/^Chapter \d+:/)?.[0];
      if (!prefix) throw new Error(`Cannot build PDF page-number prefix for ${chapter.title}`);
      entries.push([chapter.id, targetFor(prefix, chapter.title).pageNumber]);
    }
  }
  for (const entry of supplementalEntries) {
    entries.push([entry.id, targetFor(entry.title, entry.title).pageNumber]);
  }
  return Object.fromEntries(entries);
}

function replacePdfOutline(document, modules, supplementalEntries) {
  const { catalog, context } = document;
  const { targetFor, topLevel } = readPdfOutlineTargets(document);
  const chapters = modules.flatMap((module) => module.chapters);
  const entries = [
    { title: "Cover", target: topLevel[0] },
    { title: "How to Use This Book", target: targetFor("How to Use This Book", "reader guide") },
    { title: "Contents", target: targetFor("Contents", "contents") },
    ...modules.map((module) => ({
      title: module.title,
      target: targetFor(module.title.replace(/^Module \d+:\s*/, ""), module.title),
      children: module.chapters.map((chapter) => {
        const prefix = chapter.title.match(/^Chapter \d+:/)?.[0];
        if (!prefix) throw new Error(`Cannot build PDF outline prefix for ${chapter.title}`);
        return {
          title: chapter.title,
          target: targetFor(prefix, chapter.title),
        };
      }),
    })),
    ...supplementalEntries.map((entry) => ({ title: entry.title, target: targetFor(entry.title, entry.title) })),
  ];

  const root = context.obj({});
  const rootRef = context.register(root);
  root.set(PDFName.of("Type"), PDFName.of("Outlines"));

  const writeLevel = (level, parentRef) => {
    const nodes = level.map((entry) => {
      const dictionary = context.obj({});
      return { entry, dictionary, reference: context.register(dictionary) };
    });
    let total = 0;
    nodes.forEach((node, index) => {
      const { entry, dictionary } = node;
      dictionary.set(PDFName.of("Title"), PDFHexString.fromText(entry.title));
      dictionary.set(PDFName.of("Parent"), parentRef);
      if (entry.target.destination) dictionary.set(PDFName.of("Dest"), entry.target.destination);
      else dictionary.set(PDFName.of("A"), entry.target.action);
      if (index > 0) dictionary.set(PDFName.of("Prev"), nodes[index - 1].reference);
      if (index + 1 < nodes.length) dictionary.set(PDFName.of("Next"), nodes[index + 1].reference);
      if (entry.children?.length) {
        const childLevel = writeLevel(entry.children, node.reference);
        dictionary.set(PDFName.of("First"), childLevel.first);
        dictionary.set(PDFName.of("Last"), childLevel.last);
        dictionary.set(PDFName.of("Count"), PDFNumber.of(childLevel.total));
        total += childLevel.total;
      }
      total += 1;
    });
    return { first: nodes[0].reference, last: nodes.at(-1).reference, total };
  };

  const outline = writeLevel(entries, rootRef);
  const expected = 3 + modules.length + chapters.length + supplementalEntries.length;
  if (outline.total !== expected) {
    throw new Error(`PDF outline validation failed: expected ${expected} entries, found ${outline.total}`);
  }
  root.set(PDFName.of("First"), outline.first);
  root.set(PDFName.of("Last"), outline.last);
  root.set(PDFName.of("Count"), PDFNumber.of(outline.total));
  catalog.set(PDFName.of("Outlines"), rootRef);
  catalog.set(PDFName.of("PageMode"), PDFName.of("UseOutlines"));
  return outline.total;
}

async function main() {
  await fs.mkdir(buildRoot, { recursive: true });
  await fs.mkdir(outputRoot, { recursive: true });
  await fs.mkdir(docsRoot, { recursive: true });
  await fs.cp(path.join(root, "node_modules", "katex", "dist", "fonts"), path.join(buildRoot, "fonts"), { recursive: true });
  await fs.cp(path.join(root, "node_modules", "katex", "dist", "fonts"), path.join(docsRoot, "fonts"), { recursive: true });

  const [{ modules }, readerGuideSource, sourceLedger, appendixSources, mermaidSource, katexCss] = await Promise.all([
    collectBook(),
    fs.readFile(readerGuidePath, "utf8"),
    fs.readFile(sourceLedgerPath, "utf8"),
    Promise.all(appendixPaths.map((appendixPath) => fs.readFile(appendixPath, "utf8"))),
    fs.readFile(path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js"), "utf8"),
    fs.readFile(path.join(root, "node_modules", "katex", "dist", "katex.min.css"), "utf8"),
  ]);

  const appendices = appendixSources.map((source, index) => {
    const title = titleFrom(source, /^# (Appendix .+)$/m, appendixPaths[index]);
    const id = `appendix-${String.fromCharCode(97 + index)}`;
    return { id, title, html: renderAppendix(source, id, title) };
  });
  const glossary = glossarySection(modules);
  const references = referencesSection(sourceLedger);
  const supplementalEntries = [...appendices, glossary, references];
  const backMatterHtml = supplementalEntries.map((entry) => entry.html).join("");
  const sourceDiagramCount = modules.reduce((total, module) => total + module.chapters.reduce(
    (chapterTotal, chapter) => chapterTotal + (chapter.body.match(/class="mermaid"/g) ?? []).length, 0), 0);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Building Agentic Systems: From First Principles to Production</title><style>${styles(katexCss)}</style></head>
<body>
  <header class="web-only web-header"><a href="#contents">Building Agentic Systems</a><span>Vikrant Singh, Microsoft</span></header>
  <section class="cover">
    <div class="cover-grid" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    <div class="cover-content">
      <div class="cover-topline"><span class="cover-series">A practical engineering handbook</span><span class="cover-edition">First edition / 2026</span></div>
      <div class="cover-title-block">
        <p class="kicker">From first principles to production</p>
        <h1><span class="cover-building">Building</span>Agentic<br>Systems</h1>
        <p class="subtitle">Design, evaluate, secure, and operate AI systems that can reason, use tools, recover, and scale.</p>
      </div>
      <div class="cover-system" aria-label="Agentic system from observation through production controls">
        <div class="cover-loop">
          <div class="cover-stage"><strong>01</strong><span>Observe</span></div><span class="cover-arrow">→</span>
          <div class="cover-stage"><strong>02</strong><span>Decide</span></div><span class="cover-arrow">→</span>
          <div class="cover-stage"><strong>03</strong><span>Act</span></div>
        </div>
        <div class="cover-layers">
          <div class="cover-layer"><b>Intelligence</b><span>Models / Context / Memory</span></div>
          <div class="cover-layer"><b>Capability</b><span>Tools / MCP / Workflows</span></div>
          <div class="cover-layer"><b>Control</b><span>Policy / Evals / Security</span></div>
          <div class="cover-layer"><b>Production</b><span>Reliability / Cost / Scale</span></div>
        </div>
        <p class="cover-positioning">For builders, reviewers, product teams, and leaders</p>
      </div>
      <div class="cover-meta"><p class="author">Vikrant Singh<span class="author-role">Microsoft</span></p><p class="cover-mark">Evidence before autonomy</p></div>
    </div>
  </section>
  <section class="reader-guide" id="reader-guide"><h1>How to Use This Book</h1>${markdown.render(withoutFirstHeading(readerGuideSource))}</section>
  <nav class="contents" id="contents"><h1>Contents</h1><ol>${tableOfContents(modules, supplementalEntries)}</ol></nav>
  <main>${bookSections(modules)}</main>
  ${backMatterHtml}
  <script>${mermaidSource}</script>
  <script>
    mermaid.initialize({ startOnLoad:false, securityLevel:"strict", theme:"base", themeVariables:{ primaryColor:"#eef5f6", primaryTextColor:"#18222b", primaryBorderColor:"#0b5c7a", lineColor:"#53606a", secondaryColor:"#f2f8f7", tertiaryColor:"#fff7e6", fontFamily:"Segoe UI, sans-serif" }, flowchart:{ useMaxWidth:true, htmlLabels:true } });
    mermaid.run().then(() => { document.documentElement.dataset.mermaidReady = "true"; }).catch((error) => { document.documentElement.dataset.mermaidError = String(error); });
  </script>
</body></html>`.replace(/[\t ]+$/gm, "");
  await fs.writeFile(htmlPath, html, "utf8");
  await fs.writeFile(webPath, html, "utf8");
  await fs.writeFile(path.join(docsRoot, ".nojekyll"), "", "utf8");

  const pdfOptions = {
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: '<div style="width:100%;font:8px Segoe UI;color:#667;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    margin: { top: "17mm", right: "16mm", bottom: "19mm", left: "16mm" },
    timeout: 120_000,
  };
  let printedContentPages;
  const browser = await puppeteer.launch({ executablePath: await findBrowser(), headless: true, args: ["--allow-file-access-from-files", "--disable-gpu"] });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0", timeout: 120_000 });
    await page.waitForFunction(() => document.documentElement.dataset.mermaidReady === "true", { timeout: 120_000 });
    await page.evaluate(() => document.fonts.ready);
    const renderState = await page.evaluate(() => ({
      diagrams: document.querySelectorAll(".diagram svg").length,
      errors: document.querySelectorAll(".error-icon, [aria-roledescription='error']").length,
      message: document.documentElement.dataset.mermaidError ?? "",
    }));
    if (renderState.diagrams !== sourceDiagramCount || renderState.errors || renderState.message) {
      throw new Error(`Mermaid render failed: source=${sourceDiagramCount}, rendered=${renderState.diagrams}, errors=${renderState.errors}, message=${renderState.message}`);
    }
    await page.pdf(pdfOptions);
    const provisionalDocument = await PDFDocument.load(await fs.readFile(pdfPath));
    printedContentPages = contentPageNumbers(provisionalDocument, modules, supplementalEntries);
    await page.evaluate((pageNumbers) => {
      for (const pageNumber of document.querySelectorAll(".toc-page")) {
        const value = pageNumbers[pageNumber.dataset.tocTarget];
        if (!value) throw new Error(`Missing contents page number for ${pageNumber.dataset.tocTarget}`);
        pageNumber.textContent = String(value);
        pageNumber.setAttribute("aria-label", `Page ${value}`);
      }
    }, printedContentPages);
    await page.pdf(pdfOptions);
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.emulateMediaType("print");
    await page.evaluate(() => {
      const cover = document.querySelector(".cover");
      document.body.replaceChildren(cover);
      document.documentElement.style.cssText = "margin:0;width:794px;height:1123px;overflow:hidden;background:#101512";
      document.body.style.cssText = "margin:0;width:794px;height:1123px;overflow:hidden;background:#101512";
      cover.style.cssText += "margin:0;width:794px;height:1123px;min-height:1123px";
    });
    const cover = await page.$(".cover");
    if (!cover) throw new Error("Cover image validation failed: cover element is missing");
    await cover.screenshot({ path: coverImagePath });
  } finally {
    await browser.close();
  }

  const bytes = await fs.readFile(pdfPath);
  const coverBytes = await fs.readFile(coverImagePath);
  const coverWidth = coverBytes.readUInt32BE(16);
  const coverHeight = coverBytes.readUInt32BE(20);
  if (coverWidth !== 1588 || coverHeight !== 2246 || coverBytes.length < 100_000) {
    throw new Error(`Cover image validation failed: ${coverWidth}x${coverHeight}, ${coverBytes.length} bytes`);
  }
  const document = await PDFDocument.load(bytes);
  const finalContentPages = contentPageNumbers(document, modules, supplementalEntries);
  for (const [id, printedPage] of Object.entries(printedContentPages)) {
    if (finalContentPages[id] !== printedPage) {
      throw new Error(`Contents page validation failed for ${id}: printed ${printedPage}, final ${finalContentPages[id]}`);
    }
  }
  document.setTitle("Building Agentic Systems: From First Principles to Production");
  document.setAuthor("Vikrant Singh, Microsoft");
  document.setSubject("Designing agentic systems from first principles through production scale");
  document.setCreator("Building Agentic Systems reproducible book build");
  const outlineEntries = replacePdfOutline(document, modules, supplementalEntries);
  const finalBytes = await document.save();
  await fs.writeFile(pdfPath, finalBytes);
  const pages = document.getPageCount();
  if (pages < 100 || finalBytes.length < 500_000) throw new Error(`PDF validation failed: ${pages} pages, ${finalBytes.length} bytes`);
  console.log(`Built ${path.relative(root, pdfPath)}: ${pages} pages, ${(finalBytes.length / 1_048_576).toFixed(1)} MiB, ${sourceDiagramCount} Mermaid diagrams rendered, ${outlineEntries} PDF bookmarks.`);
  console.log(`Included ${glossary.count} glossary terms, ${references.count} approved references, and ${appendices.length} appendices.`);
  console.log(`Built ${path.relative(root, coverImagePath)}: ${coverWidth}x${coverHeight}, ${(coverBytes.length / 1024).toFixed(0)} KiB.`);
  console.log(`Built ${path.relative(root, webPath)}: responsive GitHub Pages edition with local fonts and diagrams.`);
}

await main();
