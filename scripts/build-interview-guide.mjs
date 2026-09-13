import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import katex from "katex";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import texmath from "markdown-it-texmath";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(root, "back-matter", "appendix-d-agentic-system-design-interviews.md");
const outputPath = path.join(root, "docs", "agentic-system-design-interviews.html");
const buildRoot = path.join(root, "build", "interview-guide");
const desktopScreenshotPath = path.join(buildRoot, "desktop.png");
const mobileScreenshotPath = path.join(buildRoot, "mobile.png");
const messagingScreenshotPath = path.join(buildRoot, "messaging-design.png");
const mobileMessagingScreenshotPath = path.join(buildRoot, "messaging-design-mobile.png");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const slugify = (value) => value
  .toLocaleLowerCase("en-US")
  .normalize("NFKD")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: false })
  .use(anchor, { permalink: false, slugify })
  .use(texmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: { throwOnError: false, strict: false },
  });

const defaultFence = markdown.renderer.rules.fence.bind(markdown.renderer.rules);
markdown.renderer.rules.fence = (tokens, index, options, environment, renderer) => {
  const token = tokens[index];
  if (token.info.trim() === "mermaid") {
    return `<figure class="diagram-block">
      <div class="diagram-toolbar"><strong>Architecture diagram</strong><button class="diagram-expand" type="button">Expand diagram</button></div>
      <div class="diagram-viewport"><div class="mermaid">${escapeHtml(token.content)}</div></div>
    </figure>`;
  }
  return defaultFence(tokens, index, options, environment, renderer);
};

function renderSection(source, isDesign) {
  let html = markdown.render(source)
    .replace(/^<h2 id="[^"]+"[^>]*>/, "<h2>")
    .replace('<p><strong>Representative prompt:</strong>', '<p class="prompt"><strong>Representative prompt:</strong>')
    .replace('<p><strong>Simple student example:</strong>', '<p class="simple-example"><strong>Simple student example:</strong>')
    .replace('<p><strong>Clarify first:</strong>', '<p class="depth-detail clarify"><strong>Clarify first:</strong>')
    .replace('<p><strong>Takeaway:</strong>', '<p class="takeaway"><strong>Takeaway:</strong>')
    .replace('<p><strong>Ordered prose walkthrough:</strong>', '<p class="walkthrough"><strong>Ordered prose walkthrough:</strong>')
    .replace('<p><strong>Likely follow-up:</strong>', '<p class="depth-detail follow-up"><strong>Likely follow-up:</strong>');
  if (isDesign) html = html.replace("<ul>", '<ul class="depth-detail design-details">');
  return html;
}

function navigationGroup(label, entries) {
  if (!entries.length) return "";
  return `<section class="nav-group"><h2>${escapeHtml(label)}</h2><ol>${entries.map((entry) =>
    `<li class="${entry.isDesign ? "design-link" : ""}"><a href="#${entry.id}" data-section-link="${entry.id}">${escapeHtml(entry.shortTitle)}</a></li>`
  ).join("")}</ol></section>`;
}

function styles(katexCss) {
  return `
${katexCss}
:root {
  --canvas: #e8efec;
  --paper: #ffffff;
  --ink: #17231f;
  --muted: #52615c;
  --line: #c7d2ce;
  --deep: #173d35;
  --teal: #087f6d;
  --teal-soft: #e1f4ef;
  --coral: #d94830;
  --coral-soft: #fff0eb;
  --gold: #e4ad20;
  --gold-soft: #fff7d9;
  --blue: #245f7a;
  --focus: #9c2f1e;
  --shadow: 0 14px 36px rgba(23, 35, 31, .12);
  --body-font: "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  --display-font: Bahnschrift, "Franklin Gothic Medium", "Trebuchet MS", sans-serif;
  color-scheme: light;
  font-family: var(--body-font);
  letter-spacing: 0;
}
* { box-sizing: border-box; letter-spacing: 0; }
html { scroll-behavior: smooth; background: var(--canvas); color: var(--ink); }
body {
  margin: 0;
  min-width: 320px;
  background-color: var(--canvas);
  background-image:
    linear-gradient(rgba(23, 61, 53, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 61, 53, .035) 1px, transparent 1px);
  background-size: 28px 28px;
  line-height: 1.66;
}
a { color: var(--blue); text-decoration-thickness: .08em; text-underline-offset: .2em; }
a:hover { color: var(--coral); }
button, select { font: 700 .88rem/1 var(--display-font); }
button, select { min-height: 42px; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.skip-link { position: fixed; z-index: 100; top: -5rem; left: 1rem; padding: .75rem 1rem; color: white; background: var(--focus); }
.skip-link:focus { top: .75rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.reading-progress { position: fixed; z-index: 60; inset: 0 0 auto; height: 4px; background: transparent; }
.reading-progress span { display: block; width: 0; height: 100%; background: var(--coral); }
.topbar { position: sticky; z-index: 50; top: 0; color: white; background: var(--deep); border-bottom: 1px solid rgba(255,255,255,.18); }
.topbar-inner { display: grid; grid-template-columns: minmax(12rem,1fr) auto auto; gap: 1rem; align-items: center; width: min(1440px, calc(100% - 2rem)); min-height: 64px; margin: 0 auto; }
.brand { color: white; font: 800 1rem/1.15 var(--display-font); text-decoration: none; }
.brand span { display: block; color: #9de3d4; font-size: .72rem; font-weight: 600; }
.jump-control { display: flex; align-items: center; gap: .5rem; }
.jump-control label { font: 700 .78rem/1 var(--display-font); }
.jump-control select { max-width: 18rem; padding: .55rem 2rem .55rem .7rem; border: 1px solid #9ab8af; border-radius: 4px; color: var(--ink); background: white; }
.mode-switch { display: inline-grid; grid-template-columns: 1fr 1fr; border: 1px solid #9ab8af; border-radius: 6px; overflow: hidden; }
.mode-switch button { padding: .65rem .8rem; border: 0; color: white; background: transparent; cursor: pointer; }
.mode-switch button[aria-pressed="true"] { color: var(--deep); background: #b9eadf; }
.hero { color: white; background: var(--deep); overflow: hidden; }
.hero-inner { position: relative; width: min(1180px, calc(100% - 2rem)); margin: 0 auto; padding: 3.2rem 0 3rem; }
.hero-inner::after { content: ""; position: absolute; right: 0; bottom: 0; width: 34%; height: 8px; background: linear-gradient(90deg, var(--coral) 0 45%, var(--gold) 45% 72%, #8cdbca 72%); }
.eyebrow { margin: 0 0 .75rem; color: #9de3d4; font: 800 .8rem/1.2 var(--display-font); text-transform: uppercase; }
.hero h1 { max-width: 18ch; margin: 0; color: white; font: 800 3.4rem/.98 var(--display-font); }
.hero .lede { max-width: 65ch; margin: 1rem 0 1.5rem; color: #dce9e5; font-size: 1.12rem; }
.step-rail { display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); max-width: 850px; border-top: 1px solid rgba(255,255,255,.35); border-bottom: 1px solid rgba(255,255,255,.35); }
.step-rail span { padding: .7rem .35rem; font: 750 .78rem/1.2 var(--display-font); text-align: center; text-transform: uppercase; }
.step-rail span + span { border-left: 1px solid rgba(255,255,255,.22); }
.hero-meta { display: flex; flex-wrap: wrap; gap: .6rem 1.4rem; margin-top: 1.2rem; color: #b9cac4; font: 650 .82rem/1.3 var(--display-font); }
.mobile-toc { display: none; }
.layout { display: grid; grid-template-columns: 270px minmax(0, 860px); gap: 3.25rem; align-items: start; width: min(1240px, calc(100% - 2rem)); margin: 0 auto; padding: 2.5rem 0 5rem; }
.sidebar { position: sticky; top: 88px; max-height: calc(100vh - 110px); overflow: auto; padding: 0 1.25rem 1rem 0; border-right: 1px solid var(--line); scrollbar-width: thin; }
.sidebar > p { margin: 0 0 1rem; color: var(--muted); font-size: .9rem; }
.nav-group { margin-bottom: 1.35rem; }
.nav-group h2 { margin: 0 0 .35rem; color: var(--coral); font: 800 .72rem/1.2 var(--display-font); text-transform: uppercase; }
.nav-group ol { display: grid; gap: .12rem; margin: 0; padding: 0; list-style: none; counter-reset: design; }
.nav-group a { display: block; padding: .36rem .55rem; border-left: 3px solid transparent; color: var(--muted); font: 650 .82rem/1.3 var(--display-font); text-decoration: none; }
.nav-group a:hover { color: var(--ink); background: rgba(255,255,255,.72); }
.nav-group a[aria-current="location"] { color: var(--deep); background: white; border-left-color: var(--coral); }
.sidebar-links { display: grid; gap: .45rem; padding-top: .8rem; border-top: 1px solid var(--line); font: 700 .8rem/1.3 var(--display-font); }
main { min-width: 0; background: var(--paper); box-shadow: var(--shadow); }
.guide-intro { padding: 2.5rem 3.25rem 1.5rem; border-bottom: 1px solid var(--line); font-size: 1.08rem; }
.guide-intro p:first-child { margin-top: 0; }
.guide-section { padding: 2.75rem 3.25rem; border-bottom: 1px solid var(--line); scroll-margin-top: 82px; }
.guide-section:last-child { border-bottom: 0; }
.guide-section > :first-child { margin-top: 0; }
.design-section { border-top: 6px solid var(--coral); }
h2, h3 { color: var(--deep); font-family: var(--display-font); }
h2 { margin: 0 0 1rem; font-size: 2rem; line-height: 1.08; }
h3 { margin: 1.8rem 0 .6rem; font-size: 1.2rem; line-height: 1.2; }
p, li { max-width: 75ch; }
strong { color: #213f37; }
.prompt { margin: 1rem 0; padding-left: 1rem; border-left: 4px solid var(--blue); }
.simple-example { margin: 1.25rem 0; padding: 1rem 1.1rem; border: 1px solid #e2c76a; border-left: 6px solid var(--gold); border-radius: 4px; background: var(--gold-soft); font-size: 1.05rem; }
.clarify { padding: .85rem 1rem; background: #f1f5f3; }
.takeaway { margin: 1rem 0; padding: .85rem 1rem; border-left: 6px solid var(--teal); background: var(--teal-soft); font-size: 1.04rem; }
.walkthrough { color: #30443d; }
.follow-up { margin-top: 1.15rem; padding: .85rem 1rem; border-left: 4px solid var(--coral); background: var(--coral-soft); }
.design-details { margin: 1rem 0; padding: 1rem 1rem 1rem 2rem; background: #f5f7f6; }
body.student-view .depth-detail { display: none; }
table { display: block; width: 100%; margin: 1.25rem 0; overflow-x: auto; border-collapse: collapse; font-size: .9rem; }
th, td { min-width: 9rem; padding: .65rem .75rem; border: 1px solid var(--line); text-align: left; vertical-align: top; }
th { color: white; background: var(--deep); font: 750 .82rem/1.3 var(--display-font); }
tbody tr:nth-child(even) { background: #f2f6f4; }
code { font-family: Consolas, "Courier New", monospace; font-size: .88em; }
:not(pre) > code { padding: .1rem .25rem; border-radius: 3px; background: #edf1ef; }
.katex-display { max-width: 100%; overflow-x: auto; overflow-y: hidden; }
.diagram-block { margin: 1.5rem 0; border: 1px solid #aabbb5; border-radius: 6px; background: #fbfdfc; overflow: hidden; }
.diagram-toolbar { display: flex; justify-content: space-between; align-items: center; min-height: 48px; padding: .45rem .7rem .45rem 1rem; color: white; background: var(--deep); font: 700 .82rem/1.2 var(--display-font); }
.diagram-toolbar strong { color: white; }
.diagram-expand { padding: .55rem .7rem; border: 1px solid #9de3d4; border-radius: 4px; color: white; background: transparent; cursor: pointer; }
.diagram-expand:hover { color: var(--deep); background: #b9eadf; }
.diagram-viewport { width: 100%; padding: 1rem; overflow-x: auto; }
.diagram-viewport svg { display: block; width: 100%; min-width: 640px; height: auto; margin: 0 auto; }
.diagram-viewport .label, .diagram-viewport text { font-family: var(--display-font) !important; }
blockquote { margin: 1rem 0; padding: .6rem 1rem; border-left: 4px solid var(--teal); background: var(--teal-soft); }
dialog { width: min(96vw, 1400px); max-width: none; height: min(92vh, 960px); max-height: none; padding: 0; border: 2px solid var(--deep); border-radius: 6px; background: white; box-shadow: 0 28px 80px rgba(0,0,0,.35); }
dialog::backdrop { background: rgba(13, 25, 21, .78); }
.dialog-bar { position: sticky; z-index: 2; top: 0; display: flex; justify-content: space-between; align-items: center; min-height: 58px; padding: .6rem 1rem; color: white; background: var(--deep); font-family: var(--display-font); }
.dialog-bar strong { color: white; }
.dialog-bar button { padding: .65rem .85rem; border: 1px solid white; border-radius: 4px; color: white; background: transparent; cursor: pointer; }
.dialog-canvas { height: calc(100% - 58px); padding: 1rem; overflow: auto; }
.dialog-canvas svg { display: block; min-width: 1000px; height: auto; margin: 0 auto; }
.page-footer { padding: 2rem 1rem; color: #d7e2de; background: var(--deep); text-align: center; font-size: .9rem; }
.page-footer a { color: #9de3d4; }
@media (max-width: 980px) {
  .topbar-inner { grid-template-columns: 1fr auto; }
  .jump-control { display: none; }
  .layout { display: block; width: min(900px, calc(100% - 1.25rem)); padding-top: 1rem; }
  .sidebar { display: none; }
  .mobile-toc { display: block; width: min(900px, calc(100% - 1.25rem)); margin: 1rem auto 0; padding: .8rem 1rem; border: 1px solid var(--line); border-radius: 6px; background: white; }
  .mobile-toc summary { cursor: pointer; color: var(--deep); font: 800 .95rem/1.2 var(--display-font); }
  .mobile-toc ol { columns: 2; padding-left: 1.25rem; }
  .mobile-toc li { margin: .35rem 0; break-inside: avoid; }
}
@media (max-width: 640px) {
  .topbar-inner { width: calc(100% - 1rem); min-height: 58px; gap: .5rem; }
  .brand { font-size: .86rem; }
  .brand span { display: none; }
  .mode-switch button { min-height: 38px; padding: .55rem .5rem; font-size: .72rem; }
  .hero-inner { width: calc(100% - 2rem); padding: 2.2rem 0 2rem; }
  .hero h1 { font-size: 2.3rem; }
  .hero .lede { font-size: 1rem; }
  .step-rail { grid-template-columns: repeat(3, 1fr); }
  .step-rail span:nth-child(4) { border-left: 0; border-top: 1px solid rgba(255,255,255,.22); }
  .step-rail span:nth-child(5), .step-rail span:nth-child(6) { border-top: 1px solid rgba(255,255,255,.22); }
  .hero-meta { font-size: .75rem; }
  .mobile-toc ol { columns: 1; }
  main { box-shadow: none; }
  .guide-intro, .guide-section { padding: 1.7rem 1.15rem; }
  h2 { font-size: 1.55rem; }
  .diagram-viewport { padding: .6rem; }
  .diagram-viewport svg { min-width: 700px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
@media print {
  body { background: white; }
  .topbar, .reading-progress, .sidebar, .mobile-toc, .diagram-expand, dialog, .page-footer { display: none !important; }
  .hero { color: var(--ink); background: white; border-bottom: 3px solid var(--deep); }
  .hero h1, .hero .lede, .eyebrow { color: var(--ink); }
  .hero-inner { width: 100%; padding: 1rem 0; }
  .hero-inner::after { display: none; }
  .step-rail { border-color: var(--line); }
  .step-rail span + span { border-color: var(--line); }
  .layout { display: block; width: 100%; padding: 0; }
  main { box-shadow: none; }
  .guide-intro, .guide-section { padding: 1rem 0; }
  .depth-detail { display: block !important; }
  .design-section { break-before: page; }
  .diagram-block { break-inside: avoid; }
  .diagram-viewport svg { min-width: 0; }
  a { color: inherit; }
}
`;
}

function interactions() {
  return `
(() => {
  const body = document.body;
  const modeButtons = [...document.querySelectorAll("[data-reading-mode]")];
  const modeStatus = document.querySelector("#mode-status");

  function setMode(mode) {
    const student = mode === "student";
    body.classList.toggle("student-view", student);
    for (const button of modeButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.readingMode === mode));
    }
    modeStatus.textContent = student
      ? "Student view shows the prompt, example, diagram, and walkthrough."
      : "Interview depth also shows clarification, scale, failure, privacy, and evaluation details.";
    try { localStorage.setItem("interview-guide-mode", mode); } catch {}
  }

  let savedMode = "student";
  try { savedMode = localStorage.getItem("interview-guide-mode") || "student"; } catch {}
  setMode(savedMode === "full" ? "full" : "student");
  for (const button of modeButtons) button.addEventListener("click", () => setMode(button.dataset.readingMode));

  const designJump = document.querySelector("#design-jump");
  designJump.addEventListener("change", () => {
    if (!designJump.value) return;
    document.getElementById(designJump.value)?.scrollIntoView({ behavior: "smooth", block: "start" });
    designJump.value = "";
  });

  const progress = document.querySelector("#progress-bar");
  function updateProgress() {
    const available = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, document.documentElement.scrollTop / available)) : 0;
    progress.style.width = (ratio * 100).toFixed(2) + "%";
  }
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
  const sections = sectionLinks.map((link) => document.getElementById(link.dataset.sectionLink)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    for (const link of sectionLinks) {
      if (link.dataset.sectionLink === visible.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });
  for (const section of sections) observer.observe(section);

  const dialog = document.querySelector("#diagram-dialog");
  const dialogCanvas = dialog.querySelector(".dialog-canvas");
  let diagramTrigger = null;
  for (const button of document.querySelectorAll(".diagram-expand")) {
    button.addEventListener("click", () => {
      const svg = button.closest(".diagram-block")?.querySelector("svg");
      if (!svg) return;
      diagramTrigger = button;
      dialogCanvas.replaceChildren(svg.cloneNode(true));
      dialog.showModal();
    });
  }
  dialog.addEventListener("close", () => {
    dialogCanvas.replaceChildren();
    diagramTrigger?.focus();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
`;
}

async function findBrowser() {
  const shellRoot = path.join(os.homedir(), ".cache", "puppeteer", "chrome-headless-shell");
  try {
    const versions = (await fs.readdir(shellRoot)).sort().reverse();
    for (const version of versions) {
      const executable = process.platform === "win32"
        ? path.join(shellRoot, version, "chrome-headless-shell-win64", "chrome-headless-shell.exe")
        : path.join(shellRoot, version, `chrome-headless-shell-${process.platform === "darwin" ? "mac-arm64" : "linux64"}`, "chrome-headless-shell");
      try { await fs.access(executable); return executable; } catch { /* Try another version. */ }
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
    try { await fs.access(candidate); return candidate; } catch { /* Try the next browser. */ }
  }
  throw new Error("Microsoft Edge, Google Chrome, or Chromium is required to build the interview guide");
}

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.mkdir(buildRoot, { recursive: true });
  await fs.mkdir(path.join(root, "docs", "fonts"), { recursive: true });
  await fs.cp(path.join(root, "node_modules", "katex", "dist", "fonts"), path.join(root, "docs", "fonts"), { recursive: true });

  const [originalSource, mermaidSource, katexCss] = await Promise.all([
    fs.readFile(sourcePath, "utf8"),
    fs.readFile(path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js"), "utf8"),
    fs.readFile(path.join(root, "node_modules", "katex", "dist", "katex.min.css"), "utf8"),
  ]);

  const titleMatch = originalSource.match(/^# Appendix D: (.+)$/m);
  if (!titleMatch) throw new Error("Interview guide title is missing");
  const title = titleMatch[1];
  const source = originalSource
    .replace(/^# .+\r?\n/, "")
    .replace(
      /\(\.\.\/modules\/[^)]+\/chapters\/(\d{2})-[^)]+\.md(?:#[^)]*)?\)/g,
      (_, chapter) => `(index.html#chapter-${chapter})`,
    );
  const chunks = source.split(/(?=^## )/m);
  const introSource = chunks.shift() ?? "";
  const entries = chunks.map((chunk) => {
    const heading = chunk.match(/^## (.+)$/m)?.[1]?.trim();
    if (!heading) throw new Error("A guide section is missing its H2 heading");
    const id = slugify(heading);
    const designMatch = heading.match(/^Top design (\d+): (.+)$/);
    return {
      heading,
      id,
      isDesign: Boolean(designMatch),
      shortTitle: designMatch ? `${designMatch[1]}. ${designMatch[2]}` : heading,
      html: renderSection(chunk, Boolean(designMatch)),
    };
  });
  const designs = entries.filter((entry) => entry.isDesign);
  const simpleExamples = (source.match(/^\*\*Simple student example:\*\*/gm) ?? []).length;
  const sourceDiagrams = (source.match(/^```mermaid$/gm) ?? []).length;
  if (designs.length !== 11 || simpleExamples !== 11 || sourceDiagrams !== 12) {
    throw new Error(`Guide contract failed: designs=${designs.length}, examples=${simpleExamples}, diagrams=${sourceDiagrams}`);
  }

  const firstDesign = entries.findIndex((entry) => entry.isDesign);
  const lastDesign = entries.findLastIndex((entry) => entry.isDesign);
  const navigation = [
    navigationGroup("Start here", entries.slice(0, firstDesign)),
    navigationGroup("Eleven designs", designs),
    navigationGroup("Finish strong", entries.slice(lastDesign + 1)),
  ].join("");
  const designOptions = designs.map((entry) => `<option value="${entry.id}">${escapeHtml(entry.shortTitle)}</option>`).join("");
  const guideSections = entries.map((entry) =>
    `<section class="guide-section ${entry.isDesign ? "design-section" : ""}" id="${entry.id}">${entry.html}</section>`
  ).join("");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="Eleven student-friendly agentic system design interview examples with detailed architecture diagrams.">
  <title>${escapeHtml(title)} | Building Agentic Systems</title>
  <style>${styles(katexCss)}</style>
</head>
<body>
  <a class="skip-link" href="#guide">Skip to the guide</a>
  <div class="reading-progress" aria-hidden="true"><span id="progress-bar"></span></div>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="index.html">Building Agentic Systems<span>Student architecture guide</span></a>
      <div class="jump-control">
        <label for="design-jump">Jump to</label>
        <select id="design-jump"><option value="">Choose a design</option>${designOptions}</select>
      </div>
      <div class="mode-switch" role="group" aria-label="Reading depth">
        <button type="button" data-reading-mode="student" aria-pressed="true">Student view</button>
        <button type="button" data-reading-mode="full" aria-pressed="false">Interview depth</button>
      </div>
    </div>
  </header>
  <section class="hero" aria-labelledby="page-title">
    <div class="hero-inner">
      <p class="eyebrow">Appendix D | Standalone guide</p>
      <h1 id="page-title">${escapeHtml(title)}</h1>
      <p class="lede">Learn one clear method, then apply it to eleven systems from knowledge search and coding to real-time AI messaging.</p>
      <div class="step-rail" aria-label="Six-step agent loop"><span>Ask</span><span>Think</span><span>Check</span><span>Act</span><span>Verify</span><span>Stop</span></div>
      <p class="hero-meta"><span>11 student examples</span><span>12 architecture diagrams</span><span>Offline and printable</span></p>
    </div>
  </section>
  <details class="mobile-toc"><summary>Browse all sections</summary><nav aria-label="Mobile contents">${navigation}</nav></details>
  <div class="layout">
    <aside class="sidebar" aria-label="Guide contents">
      <p>Follow the basic story first. Switch to interview depth when you are ready for tradeoffs.</p>
      <nav>${navigation}</nav>
      <div class="sidebar-links"><a href="index.html#appendix-d">Read inside the full book</a><a href="https://github.com/VikrantSingh01/Agentic_System_Design/blob/main/back-matter/appendix-d-agentic-system-design-interviews.md">View Markdown source</a></div>
    </aside>
    <main id="guide">
      <div class="guide-intro">${markdown.render(introSource)}</div>
      ${guideSections}
    </main>
  </div>
  <footer class="page-footer"><p>Part of <a href="index.html">Building Agentic Systems</a>. The examples reflect public engineering themes, not private company interview questions.</p></footer>
  <dialog id="diagram-dialog" aria-label="Expanded architecture diagram"><div class="dialog-bar"><strong>Architecture diagram</strong><form method="dialog"><button type="submit">Close</button></form></div><div class="dialog-canvas"></div></dialog>
  <p id="mode-status" class="sr-only" aria-live="polite"></p>
  <script id="mermaid-runtime">${mermaidSource}</script>
  <script id="mermaid-init">
    mermaid.initialize({ startOnLoad:false, securityLevel:"strict", theme:"base", themeVariables:{ primaryColor:"#e1f4ef", primaryTextColor:"#17231f", primaryBorderColor:"#087f6d", lineColor:"#52615c", secondaryColor:"#fff0eb", tertiaryColor:"#fff7d9", fontFamily:"Bahnschrift, Trebuchet MS, sans-serif" }, flowchart:{ useMaxWidth:true, htmlLabels:true } });
    mermaid.run().then(() => { document.documentElement.dataset.mermaidReady = "true"; }).catch((error) => { document.documentElement.dataset.mermaidError = String(error); });
  </script>
  <script id="guide-ui">${interactions()}</script>
</body>
</html>`;

  await fs.writeFile(outputPath, html, "utf8");
  const browserErrors = [];
  const browser = await puppeteer.launch({ executablePath: await findBrowser(), headless: true, args: ["--allow-file-access-from-files", "--disable-gpu"] });
  try {
    const page = await browser.newPage();
    page.on("pageerror", (error) => browserErrors.push(String(error)));
    page.on("console", (message) => { if (message.type() === "error") browserErrors.push(message.text()); });
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(outputPath).href, { waitUntil: "networkidle0", timeout: 120_000 });
    await page.waitForFunction(() => document.documentElement.dataset.mermaidReady === "true", { timeout: 120_000 });
    await page.evaluate(() => document.fonts.ready);
    const renderState = await page.evaluate(() => ({
      diagrams: document.querySelectorAll(".diagram-block svg").length,
      errors: document.querySelectorAll(".error-icon, [aria-roledescription='error']").length,
      message: document.documentElement.dataset.mermaidError ?? "",
    }));
    if (renderState.diagrams !== sourceDiagrams || renderState.errors || renderState.message) {
      throw new Error(`Mermaid render failed: source=${sourceDiagrams}, rendered=${renderState.diagrams}, errors=${renderState.errors}, message=${renderState.message}`);
    }

    await page.evaluate(() => {
      document.querySelector("#mermaid-runtime")?.remove();
      document.querySelector("#mermaid-init")?.remove();
      document.documentElement.removeAttribute("data-mermaid-ready");
      document.documentElement.removeAttribute("data-mermaid-error");
    });
    await fs.writeFile(outputPath, await page.content(), "utf8");

    await page.goto(pathToFileURL(outputPath).href, { waitUntil: "load", timeout: 120_000 });
    await page.evaluate(() => document.fonts.ready);
    const desktopState = await page.evaluate(() => ({
      designs: document.querySelectorAll(".design-section").length,
      examples: document.querySelectorAll(".simple-example").length,
      diagrams: document.querySelectorAll(".diagram-block svg").length,
      duplicateIds: [...document.querySelectorAll("[id]")].map((element) => element.id)
        .filter((id, index, ids) => ids.indexOf(id) !== index),
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }));
    if (desktopState.designs !== 11 || desktopState.examples !== 11 || desktopState.diagrams !== 12
        || desktopState.duplicateIds.length || desktopState.horizontalOverflow) {
      throw new Error(`Desktop layout failed: ${JSON.stringify(desktopState)}`);
    }
    await page.screenshot({ path: desktopScreenshotPath });

    await page.click(".diagram-expand");
    const dialogState = await page.$eval("#diagram-dialog", (dialog) => ({
      open: dialog.open,
      diagrams: dialog.querySelectorAll("svg").length,
    }));
    if (!dialogState.open || dialogState.diagrams !== 1) {
      throw new Error(`Diagram expansion failed: ${JSON.stringify(dialogState)}`);
    }
    await page.click("#diagram-dialog button[type='submit']");

    await page.click('[data-reading-mode="full"]');
    const detailsVisible = await page.$eval(".depth-detail", (element) => getComputedStyle(element).display !== "none");
    if (!detailsVisible) throw new Error("Interview depth control did not reveal technical details");
    const messagingSection = await page.$("#top-design-11-ai-powered-messaging-system");
    if (!messagingSection) throw new Error("Messaging design section is missing");
    await messagingSection.screenshot({ path: messagingScreenshotPath });

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => localStorage.removeItem("interview-guide-mode"));
    await page.goto(pathToFileURL(outputPath).href, { waitUntil: "load", timeout: 120_000 });
    const mobileState = await page.evaluate(() => ({
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      mobileContentsVisible: getComputedStyle(document.querySelector(".mobile-toc")).display !== "none",
      sidebarHidden: getComputedStyle(document.querySelector(".sidebar")).display === "none",
    }));
    if (mobileState.horizontalOverflow || !mobileState.mobileContentsVisible || !mobileState.sidebarHidden) {
      throw new Error(`Mobile layout failed: ${JSON.stringify(mobileState)}`);
    }
    await page.screenshot({ path: mobileScreenshotPath });
    await page.goto(`${pathToFileURL(outputPath).href}#top-design-11-ai-powered-messaging-system`, { waitUntil: "load", timeout: 120_000 });
    await page.screenshot({ path: mobileMessagingScreenshotPath });
  } finally {
    await browser.close();
  }

  if (browserErrors.length) throw new Error(`Browser errors: ${browserErrors.join(" | ")}`);
  const outputBytes = (await fs.stat(outputPath)).size;
  console.log(`Built ${path.relative(root, outputPath)}: ${(outputBytes / 1024).toFixed(0)} KiB, 11 designs, 12 rendered diagrams.`);
  console.log(`Validated desktop and mobile layouts with screenshots in ${path.relative(root, buildRoot)}.`);
}

await main();