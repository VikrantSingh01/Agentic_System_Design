# Book Publication Review

Date: 2026-09-06
Scope: Read-only publication-quality audit of the full repository (README, all 9 module
indexes, all 36 chapters, `research/`, `coordination/`, `reviews/`, `scripts/`, `tests/`,
`visuals/agent-system-journey/`, CI workflow) performed after the technical review fixes
described in `reviews/book-editorial-review-2026-09-06.md`.
Focus: information architecture, navigation, progressive disclosure, template and
terminology consistency, cross-links, code-sample completeness, diagram accessibility,
status/metadata accuracy, maintenance ownership, and truthfulness of the repository map.
Method: manual inspection plus repository-wide statistics (word/line/heading counts,
relative-link resolution, duplicate-file diffing, CI workflow inspection). No files other
than this one were modified; no git state was changed.

This review records **observations at the time of the audit**. Several items below already
have remediation underway; each finding carries a `Status` field so later passes can update
it in place instead of re-litigating settled points.

## Evidence summary

- 36 chapter files across 9 modules; 86 Markdown files repository-wide.
- Chapter word counts: total 126,883 words, mean 3,525 words/chapter, max 9,217
  (Chapter 36), min 1,362.
- Relative Markdown links checked repository-wide: 82; genuinely broken: 0.
- Chapters containing at least one Markdown link to another `.md` file: 2 of 36, and both
  of those link only to the same external visuals transcript, not to another chapter.
- `visuals/agent-system-journey/tests/check_asset_offline.py` executed directly: 6 of 6
  checks reported `PASS`.
- `research/source-ledger.csv`: 91 rows; freshness classes `durable` (16), `evolving` (24),
  `volatile` (51); all rows show `accessed_date` of 2026-09-05 or 2026-09-06; all rows
  `status = approved`.
- `research/dossiers/R1..R9` compared byte-for-byte against `coordination/agents/research/
  R1..R9`: identical content in both locations.
- `.github/workflows/validate.yml` runs exactly two steps:
  `python scripts/validate_repository.py` and `python -m unittest discover -s tests -v`.

## Findings

Ordered by severity. Each finding lists exact location(s), reader/maintainer impact,
surgical fix, and current status.

### 1. README repository map references a directory that does not exist
- **Location:** `README.md:55` — `` `labs/python/`: runnable generic and Microsoft Python
  labs``.
- **Evidence:** recursive search of the working tree finds no `labs/` directory anywhere.
  All runnable examples are embedded as fenced Python blocks inside each chapter's
  `## Build it in Python` section.
- **Impact:** a reader or contributor following the map reaches a nonexistent path;
  the map states shipped structure that was never built.
- **Fix:** remove the `labs/python/` bullet, or replace it with the true location
  ("runnable examples are embedded per chapter under **Build it in Python**").
- **Status:** open.

### 2. `case-study/northstar/` is described as containing more than it does
- **Location:** `README.md:56` — `` `case-study/northstar/`: cumulative production
  reference implementation``.
- **Evidence:** `case-study/northstar/` contains exactly one file,
  `architecture-contract.md` (a design contract). No implementation code exists in that
  directory.
- **Impact:** "reference implementation" sets an expectation of runnable, cumulative code
  that is not present, which can mislead a reader assessing production-readiness.
- **Fix:** reword to describe the directory as the case study's architecture/requirements
  contract, or add the implementation the current label promises.
- **Status:** open.

### 3. The animation/accessibility validator is undocumented and unenforced
- **Location:** `visuals/agent-system-journey/tests/check_asset_offline.py`; absent from
  `README.md:70-75` ("Validate locally"), absent from `CONTRIBUTING.md`, absent from
  `.github/workflows/validate.yml`.
- **Evidence:** the script exists, is documented in
  `visuals/agent-system-journey/README.md`, and passes when run directly (6/6 `PASS`).
  It is not referenced by the top-level validation instructions or by CI.
- **Impact:** this is a real quality gate for a WCAG-relevant, offline/accessibility-audited
  asset (ARIA live regions, reduced-motion handling, keyboard controls, caption transcript
  parity). A regression here would not be caught by CI and is not discoverable from the
  documented validation path.
- **Fix:** add a step to `.github/workflows/validate.yml` running this script, and add its
  command to the "Validate locally" section of `README.md`.
- **Status:** open.

### 4. All 36 chapters still declare `Status: drafting`
- **Location:** line 3 of every `modules/*/chapters/*.md` file (36 of 36).
- **Evidence:** `coordination/contracts/chapter-template.md:3` defines a status vocabulary
  (`planned | researching | drafting | reviewing | accepted`) that is never used beyond
  `drafting`, despite completed passes recorded in git history (diagram-accessibility work
  across all 9 modules, simplification of foundational explanations, improved reading
  paths) and the applied-changes list in
  `reviews/book-editorial-review-2026-09-06.md`. That same review already identified this
  exact gap as finding 6 ("Status metadata needs one repository-wide meaning").
- **Impact:** readers and maintainers cannot distinguish reviewed chapters from
  untouched drafts from the status line alone.
- **Fix:** run the mechanical status pass the prior review already recommended: set
  `Status:` to the correct template value per chapter, owned by one person, in one PR.
- **Status:** fix in progress — remediation identified in the prior editorial review and
  now scheduled; not yet applied to any chapter file as of this audit.

### 5. `reviews/` does not yet contain the review types the map promises
- **Location:** `README.md:61` — `` `reviews/`: independent pedagogy, technical, and
  production reviews``; convention defined in `CONTRIBUTING.md:46`
  (`reviews/<chapter>/<role>.md`).
- **Evidence:** at the time of this audit, `reviews/` contained one file,
  `book-editorial-review-2026-09-06.md` (an editorial/pedagogy review), with no
  chapter/role subdirectory structure. This file adds a second review artifact but does
  not by itself cover the "technical" or "production" review types named in the map.
- **Impact:** a maintainer or auditor cannot yet verify a technical or production review
  occurred from an artifact in `reviews/`, even though related fixes are visible in commit
  history.
- **Fix:** produce technical- and production-review artifacts (or summarize the
  already-applied technical fixes retroactively), and/or narrow the README bullet to what
  currently exists.
- **Status:** fix in progress — this publication review is itself part of closing the gap;
  a dedicated technical-review and production-review artifact are still outstanding.

### 6. Chapter 36 is an overlong page with no in-page navigation
- **Location:**
  `modules/09-microsoft-synthesis-capstone/chapters/36-northstar-on-microsoft-stack.md`.
- **Evidence:** 9,217 words / 1,170 lines / 43 H2+H3 headings — 2.6x the current
  36-chapter mean (3,525 words) and 6.8x the shortest chapter (1,362 words). No table of
  contents or anchor-link index precedes its 43 headings.
- **Impact:** the capstone chapter is hardest to scan exactly where readers most need to
  jump between sections (per-cloud comparisons, deep-dive appendix, Python build section).
  This is a navigation/progressive-disclosure gap, not a reason to cut content.
- **Fix:** add a short anchor-linked outline immediately after the chapter title, and
  consider splitting `### Engineering appendix: full stable-core contract map` (line 283)
  into a linked companion document since it is already framed as an appendix.
- **Status:** open.

### 7. Research briefs are maintained in two places
- **Location:** `research/dossiers/R1-foundations-academia.md` … `R9-*.md` and
  `coordination/agents/research/R1-*.md` … `R9-*.md`.
- **Evidence:** byte-for-byte diff confirms identical content between the two locations
  for all nine `R*` files. Two supplemental dossiers
  (`microsoft-agent-delegation.md`, `child-friendly-agent-architecture-animation.md`)
  exist only under `research/dossiers/`. The validator
  (`scripts/validate_repository.py`) reads only `coordination/agents/research/`.
- **Impact:** doubled maintenance surface for the same nine files with no documented sync
  rule; an edit applied to one copy and not the other would silently diverge undetected.
- **Fix:** designate one location as canonical (the validator already treats
  `coordination/agents/research/` as canonical) and remove or symlink the duplicate,
  updating `research/dossiers/README.md` accordingly.
- **Status:** open.

### 8. In-chapter cross-links are nearly absent
- **Location:** all `modules/*/chapters/*.md` files.
- **Evidence:** only 2 of 36 chapter files contain any Markdown link to another `.md`
  file (`04-from-software-to-ai-systems.md:61` and
  `28-reference-architecture.md:35`), and both link only to the same external visuals
  transcript, not to another chapter or to their own module `README.md`.
- **Impact:** there is no previous/next chapter navigation or breadcrumb inside the
  reading surface itself; readers depend entirely on the browser back button or the
  module index page.
- **Fix:** add a "Previous / Next" link pair under each chapter's `## Recap and next
  step` section, generated from the module's chapter list to avoid drift.
- **Status:** open.

### 9. `Owner:` metadata is inconsistent and not individually accountable
- **Location:** line 4 of every chapter file.
- **Evidence:** four distinct placeholder formats are in use across the 36 files:
  `Module 03`, `Module 05 author`, `Module 02 Chapter 05 author`, `Chapter 34 author`.
  No `CODEOWNERS` file exists anywhere in the repository.
- **Impact:** "maintenance ownership" is described in `CONTRIBUTING.md` but is not
  verifiable or contactable in practice from the metadata alone.
- **Fix:** standardize on one label format; where a real owner cannot yet be assigned,
  state that explicitly (e.g., `Owner: Module 0N (unassigned)`) rather than varying the
  placeholder text.
- **Status:** open.

### 10. README repository map omits `visuals/`
- **Location:** `README.md:52-63` (repository map section).
- **Evidence:** the map lists `modules/`, `case-study/`, `research/`, `coordination/`,
  `reviews/`, `scripts/` but does not mention `visuals/agent-system-journey/`, which
  exists, functions, passes its own offline validator, and is referenced from two chapters.
- **Impact:** minor discoverability gap; the map is not fully truthful about top-level
  structure.
- **Fix:** add one bullet, e.g. `` `visuals/agent-system-journey/`: offline accessible
  companion animation for Chapter 28``.
- **Status:** open.

## What already passed this audit

- **Choose-your-path table** (`README.md:11-17`) is genuinely goal-based and task-oriented,
  not a bare chapter list.
- **Template consistency is mechanically enforced.** `scripts/validate_repository.py`
  checks an exact 21-section H2 contract, a diagram minimum, a required `**Takeaway:**`
  plus step-by-step text alternative per diagram, and chapter/module link integrity, and
  runs in CI on every pull request and push to `main`.
- **Diagram accessibility exceeds basic alt-text.** The validator requires a takeaway and
  a prose walkthrough per diagram (confirmed present across sampled chapters), and the
  `visuals/agent-system-journey` asset adds ARIA live regions, reduced-motion handling,
  keyboard controls, forced-colors support, and a full caption transcript.
- **Link integrity is solid.** Zero genuinely broken relative links were found among the
  82 checked repository-wide.
- **Source freshness discipline is real.** The 91-row source ledger uses explicit
  `durable`/`evolving`/`volatile` classes; all 51 volatile-class rows show access dates
  within the two days preceding this audit, with no detected stale volatile claims.
- **Contributor-facing vs. reader-facing content is correctly separated.**
  `research/dossiers/README.md:3` explicitly states dossiers are "evidence input, not
  publishable chapter prose," and no chapter's `## Sources` section links directly into a
  dossier file.

## Publication-readiness checklist

1. Repository map in `README.md` lists only paths that exist and describes them
   accurately (closes findings 1, 2, 10).
2. Every quality-gate script that exists also has a CI step and a documented run command
   (closes finding 3).
3. Chapter `Status:` metadata uses the template's defined vocabulary and reflects actual
   review state, updated in the same pull request as the content change it describes
   (closes finding 4).
4. `reviews/` contains at least one artifact per review discipline named in the README,
   following the `reviews/<chapter>/<role>.md` convention from `CONTRIBUTING.md`
   (closes finding 5).
5. Any chapter exceeding roughly twice the repository's mean word count carries an
   in-page anchor outline (closes finding 6).
6. Each duplicated asset class has one canonical location, with non-canonical copies
   removed or symlinked (closes finding 7).
7. Every chapter links to its immediate neighboring chapters and its module index
   (closes finding 8).
8. Every chapter states an owner resolvable to a person, team, or an explicit
   "unassigned" marker, backed by a `CODEOWNERS` file where feasible (closes finding 9).
9. No finding in this review requires deleting existing content; all recommended fixes
   are metadata corrections, CI wiring, or navigation affordances.

## Note on scope

No wholesale rewrites, deletions, or subjective wordsmithing are recommended anywhere in
this review. All ten findings are objectively verifiable (missing paths, byte-identical
duplicates, absent CI steps, counted headings/words/links) rather than stylistic
preferences.
