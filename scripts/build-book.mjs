import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import katex from "katex";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import texmath from "markdown-it-texmath";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "..");
const modulesRoot = path.join(root, "modules");
const buildRoot = path.join(root, "build", "book");
const outputRoot = path.join(root, "book");
const docsRoot = path.join(root, "docs");
const htmlPath = path.join(buildRoot, "agentic-system-design.html");
const webPath = path.join(docsRoot, "index.html");
const pdfPath = path.join(outputRoot, "building-agentic-systems.pdf");

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

  if (moduleDirs.length !== 9) throw new Error(`Expected 9 modules, found ${moduleDirs.length}`);

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
        body: markdown.render(withoutFirstHeading(removeReaderNavigation(chapterSource))),
      };
      moduleRecord.chapters.push(chapter);
      chapters.push(chapter);
    }
    modules.push(moduleRecord);
  }

  if (chapters.length !== 36) throw new Error(`Expected 36 chapters, found ${chapters.length}`);
  if (chapters.some((chapter, index) => chapter.number !== index + 1)) {
    throw new Error("Chapter sequence must be exactly 1 through 36");
  }
  return { modules, chapters };
}

function tableOfContents(modules) {
  return modules.map((module) => `
    <li>
      <a href="#${module.id}">${module.title}</a>
      <ol>${module.chapters.map((chapter) => `<li><a href="#${chapter.id}">${chapter.title}</a></li>`).join("")}</ol>
    </li>`).join("");
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
.cover { position:relative; height:245mm; overflow:hidden; padding:24mm 20mm; color:white; background:#123d4a; break-after:page; }
.cover::before { content:""; position:absolute; inset:0 auto 0 0; width:7mm; background:#d39a2c; }
.cover::after { content:""; position:absolute; right:-38mm; bottom:-45mm; width:130mm; height:130mm; border:1.2mm solid rgba(121,213,197,.42); transform:rotate(18deg); }
.cover-content { position:relative; z-index:2; display:flex; min-height:197mm; flex-direction:column; }
.cover .kicker { margin:0 0 19mm; color:#79d5c5; font:700 10pt/1.2 "Segoe UI",sans-serif; letter-spacing:.12em; text-transform:uppercase; }
.cover h1 { max-width:155mm; margin:0 0 5mm; color:white; font-size:43pt; letter-spacing:0; }
.cover .subtitle { max-width:145mm; margin:0; font-size:15pt; line-height:1.38; color:#dbecee; }
.cover-map { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; align-items:center; gap:4mm; width:142mm; margin:20mm 0 0; font-family:"Segoe UI",sans-serif; }
.cover-node { padding:4mm 3mm; border:1px solid rgba(255,255,255,.72); color:white; text-align:center; font-size:10pt; font-weight:700; text-transform:uppercase; }
.cover-arrow { color:#d39a2c; font-size:18pt; font-weight:700; }
.cover-controls { width:142mm; margin:4mm 0 0; padding-top:3mm; border-top:1px solid rgba(121,213,197,.55); color:#bcd4d8; font:8.5pt/1.4 "Segoe UI",sans-serif; text-align:center; }
.cover-meta { margin-top:auto; }
.cover .author { margin:0 0 2mm; color:white; font:600 13pt/1.3 "Segoe UI",sans-serif; }
.cover .edition { margin:0; color:#bcd4d8; font:9.5pt/1.3 "Segoe UI",sans-serif; }
.contents { break-after:page; }
.contents > ol { columns:2; column-gap:12mm; padding-left:1.3rem; }
.contents li { margin:.18rem 0; break-inside:avoid; font-family:"Segoe UI",Calibri,sans-serif; font-size:9pt; }
.contents > ol > li { margin:0 0 .7rem; color:var(--blue); font-weight:700; }
.contents ol ol { padding-left:1rem; font-weight:400; }
.module-opener { min-height:220mm; padding-top:22mm; break-before:page; break-after:page; }
.module-opener .part-label { color:var(--teal); font:700 10pt/1 "Segoe UI",sans-serif; text-transform:uppercase; }
.module-opener h1 { font-size:32pt; }
.chapter { break-before:page; }
.web-only { display:none; }
.chapter > blockquote:first-of-type { font-family:"Segoe UI",Calibri,sans-serif; font-size:8.5pt; }
.chapter > hr { margin:2rem 0; border:0; border-top:1px solid var(--line); }
@page { size:A4; margin:17mm 16mm 19mm; }
@media print {
  a { color:inherit; }
  .cover { margin:-17mm -16mm -19mm; padding:34mm 28mm; height:297mm; }
}
@media screen {
  html { scroll-behavior:smooth; }
  body { background:var(--wash); }
  .web-only { display:block; }
  .web-header { position:sticky; z-index:10; top:0; display:flex; justify-content:space-between; gap:1rem; padding:.75rem max(1rem,calc((100% - 920px)/2)); color:white; background:#123d4a; font:600 9.5pt/1.3 "Segoe UI",sans-serif; }
  .web-header a { color:white; }
  .cover { min-height:calc(100vh - 44px); height:auto; padding:clamp(2rem,8vw,5rem) max(1.5rem,calc((100% - 920px)/2)); }
  .cover-content { min-height:calc(100vh - 10rem); }
  .contents, main { width:min(100%,920px); margin:0 auto; padding:2rem clamp(1rem,4vw,3.5rem); background:white; }
  .contents { min-height:100vh; }
  .module-opener, .chapter { min-height:0; padding-top:4rem; scroll-margin-top:3rem; }
  .back-to-contents { float:right; margin:.5rem 0 1rem 1rem; color:var(--teal); font:600 9pt/1.3 "Segoe UI",sans-serif; }
}
@media screen and (max-width:700px) {
  html { font-size:10pt; }
  main { overflow-x:clip; }
  main a { overflow-wrap:anywhere; }
  .web-header span { display:none; }
  .cover h1 { font-size:34pt; }
  .cover-map, .cover-controls { width:100%; }
  .cover-map { grid-template-columns:1fr; }
  .cover-arrow { transform:rotate(90deg); text-align:center; }
  .contents > ol { columns:1; }
  table { display:block; max-width:100%; overflow-x:auto; font-size:8pt; }
  pre { max-width:100%; overflow-x:auto; white-space:pre; }
  pre code { display:block; width:max-content; min-width:100%; }
  :not(pre) > code { white-space:normal; overflow-wrap:anywhere; }
  .katex-display { max-width:100%; overflow-x:auto; overflow-y:hidden; }
  .diagram, .diagram svg { max-width:100%; overflow:hidden; }
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

async function main() {
  await fs.mkdir(buildRoot, { recursive: true });
  await fs.mkdir(outputRoot, { recursive: true });
  await fs.mkdir(docsRoot, { recursive: true });
  await fs.cp(path.join(root, "node_modules", "katex", "dist", "fonts"), path.join(buildRoot, "fonts"), { recursive: true });
  await fs.cp(path.join(root, "node_modules", "katex", "dist", "fonts"), path.join(docsRoot, "fonts"), { recursive: true });

  const [{ modules }, mermaidSource, katexCss] = await Promise.all([
    collectBook(),
    fs.readFile(path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js"), "utf8"),
    fs.readFile(path.join(root, "node_modules", "katex", "dist", "katex.min.css"), "utf8"),
  ]);

  const sourceDiagramCount = modules.reduce((total, module) => total + module.chapters.reduce(
    (chapterTotal, chapter) => chapterTotal + (chapter.body.match(/class="mermaid"/g) ?? []).length, 0), 0);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Building Agentic Systems: From First Principles to Production</title><style>${styles(katexCss)}</style></head>
<body>
  <header class="web-only web-header"><a href="#contents">Building Agentic Systems</a><span>Vikrant Singh, Microsoft</span></header>
  <section class="cover">
    <div class="cover-content">
      <p class="kicker">From first principles to production</p>
      <h1>Building<br>Agentic Systems</h1>
      <p class="subtitle">Build understandable, safe, reliable, and scalable agentic systems with evidence-driven engineering.</p>
      <div class="cover-map" aria-label="Observe, decide, act">
        <span class="cover-node">Observe</span><span class="cover-arrow">→</span>
        <span class="cover-node">Decide</span><span class="cover-arrow">→</span>
        <span class="cover-node">Act</span>
      </div>
      <p class="cover-controls">EVIDENCE &nbsp;|&nbsp; AUTHORITY &nbsp;|&nbsp; RELIABILITY &nbsp;|&nbsp; SCALE</p>
      <div class="cover-meta"><p class="author">Vikrant Singh, Microsoft</p><p class="edition">First edition &nbsp;|&nbsp; September 2026</p></div>
    </div>
  </section>
  <nav class="contents" id="contents"><h1>Contents</h1><ol>${tableOfContents(modules)}</ol></nav>
  <main>${bookSections(modules)}</main>
  <script>${mermaidSource}</script>
  <script>
    mermaid.initialize({ startOnLoad:false, securityLevel:"strict", theme:"base", themeVariables:{ primaryColor:"#eef5f6", primaryTextColor:"#18222b", primaryBorderColor:"#0b5c7a", lineColor:"#53606a", secondaryColor:"#f2f8f7", tertiaryColor:"#fff7e6", fontFamily:"Segoe UI, sans-serif" }, flowchart:{ useMaxWidth:true, htmlLabels:true } });
    mermaid.run().then(() => { document.documentElement.dataset.mermaidReady = "true"; }).catch((error) => { document.documentElement.dataset.mermaidError = String(error); });
  </script>
</body></html>`;
  await fs.writeFile(htmlPath, html, "utf8");
  await fs.writeFile(webPath, html, "utf8");
  await fs.writeFile(path.join(docsRoot, ".nojekyll"), "", "utf8");

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
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: '<div style="width:100%;font:8px Segoe UI;color:#667;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: "17mm", right: "16mm", bottom: "19mm", left: "16mm" },
      timeout: 120_000,
    });
  } finally {
    await browser.close();
  }

  const bytes = await fs.readFile(pdfPath);
  const document = await PDFDocument.load(bytes);
  document.setTitle("Building Agentic Systems: From First Principles to Production");
  document.setAuthor("Vikrant Singh, Microsoft");
  document.setSubject("Designing agentic systems from first principles through production scale");
  document.setCreator("Building Agentic Systems reproducible book build");
  const finalBytes = await document.save();
  await fs.writeFile(pdfPath, finalBytes);
  const pages = document.getPageCount();
  if (pages < 100 || finalBytes.length < 500_000) throw new Error(`PDF validation failed: ${pages} pages, ${finalBytes.length} bytes`);
  console.log(`Built ${path.relative(root, pdfPath)}: ${pages} pages, ${(finalBytes.length / 1_048_576).toFixed(1)} MiB, ${sourceDiagramCount} Mermaid diagrams rendered.`);
  console.log(`Built ${path.relative(root, webPath)}: responsive GitHub Pages edition with local fonts and diagrams.`);
}

await main();
