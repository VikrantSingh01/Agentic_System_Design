# Book Editorial Review

Date: 2026-09-06
Scope: 36 chapters across 9 modules
Focus: simplicity, progressive disclosure, task orientation, and technical accuracy

## Review standard

This review applies the repository editorial contract and these Google developer documentation
principles:

- Write for a defined audience and their goal.
- Put the main point before details and exceptions.
- Prefer short, direct sentences and active voice.
- Use familiar words before specialized terms.
- Organize procedures as steps and choices as tables.
- Use headings that help readers find the task or answer they need.
- Keep terminology consistent.

Primary references:

- [Google developer documentation style guide highlights](https://developers.google.com/style/highlights)
- [Google guidance on tone](https://developers.google.com/style/tone)
- [Google guidance on sentence structure](https://developers.google.com/style/sentence-structure)
- [Repository editorial contract](../coordination/contracts/editorial-contract.md)

## Evidence reviewed

The review covered the root reading path, the editorial contract, every module, and samples from
beginner, implementation, evaluation, security, production, scale, and Microsoft chapters.
Three independent read-only passes reviewed Modules 1-3, 4-6, and 7-9.

A simple readability scan measured 97,527 words across 36 chapters, or about 2,709 words per
chapter. Average sentence length was generally reasonable. The main comprehension problem was
not raw sentence length. It was delayed structure: several chapters explain a taxonomy inside
paragraphs before showing readers the map.

## What already works

1. **The audience is explicit.** The first-pass path assumes no machine-learning background.
2. **Analogies have boundaries.** "Where the analogy stops" prevents a useful metaphor from
   becoming a false technical claim.
3. **Diagrams have text support.** A takeaway and walkthrough make each diagram usable without
   relying on vision alone.
4. **The Northstar case study creates continuity.** Readers can see one system gain capabilities
   and controls over time.
5. **Labs are safe by default.** Offline deterministic doubles and synthetic data let readers
   reproduce failures without live credentials or targets.
6. **Vendor-neutral design comes first.** Microsoft mappings remain implementation choices rather
   than substitutes for architecture.

These patterns should remain mandatory.

## Highest-priority findings

### 1. The entry point did not help readers choose a route

The root README listed modules but did not answer common reader questions such as "Where do I
start if I only want to build a small agent?" Its status also said Stage 0 was in progress after
all 36 chapters had been written.

Action taken: added goal-based reading routes, explained the repeated chapter structure, and
replaced the stale status.

### 2. Foundational chapters sometimes hide the map inside the explanation

Chapters 3 and 6 contain accurate explanations, but a new reader must hold several unfamiliar
ideas before seeing how they fit together.

Action taken: Chapter 3 now previews one model call as five steps. Chapter 6 now presents model
selection as five gates before introducing the library-helper analogy.

Apply the same pattern when a first-pass section introduces more than three related concepts:
show a short list or table first, then explain each item.

### 3. Some opening paragraphs use expert vocabulary before motivation

Chapter 15 opened with task IDs, dependencies, completion tests, uncertainty, authority, and
budgets in one sentence. Those are useful terms, but the reader had not learned them yet.

Action taken: rewrote the sentence with familiar actions: name tasks, show ordering, check
completion, and limit permissions. The precise terms remain in the first-pass and vocabulary
sections.

### 4. The chapter contract and chapter headings are converging during active edits

At the review snapshot, the repository validator reported 14 H2 order mismatches. Some chapters
contain useful extra H2 sections; others place required sections in an older order. Concurrent
work reduced a larger failure set during this review.

Recommendation: finish the active migration in path-owned batches. Decide whether useful extra
sections belong as H3 subsections or whether the validator should permit declared optional H2
sections. Do not weaken checks silently.

### 5. Production procedures should be easier to scan

Several production chapters explain operational decisions in dense paragraphs. The content is
sound, but operators need to find a step quickly during design and incident review.

Recommendation: use numbered steps for ordered work, decision tables for alternatives, and
"stop when" bullets for hard failure boundaries. Keep the deeper rationale immediately after
that scannable layer.

### 6. Status metadata needs one repository-wide meaning

Many complete chapters still say `Status: drafting`. A reader cannot tell whether that means
"content exists but is under review," "not technically verified," or "not ready to run."

Recommendation: define a small status vocabulary, such as `draft`, `technical review`,
`release candidate`, and `published`, with an owner and transition rule. Then update status in a
separate mechanical pass.

## Applied changes

- `README.md`: goal-based routes, chapter reading rhythm, and current project status.
- Chapter 3: five-step model-call roadmap before detailed concepts.
- Chapter 6: five model-selection gates before candidate comparison.
- Chapter 15: plain-language motivation and consistent `Step by step` diagram walkthroughs.

## Acceptance checks for future editorial passes

For each changed chapter:

1. A reader can state the chapter's problem after the opening paragraph.
2. The first unfamiliar term is defined where it appears.
3. A list or table previews any taxonomy with more than three parts.
4. Ordered work appears as numbered steps.
5. Every diagram has one takeaway and one complete `Step by step` walkthrough.
6. The analogy states where it stops matching the real system.
7. The safe exercise states the expected blocked or contained result.
8. The chapter passes the repository validator and relevant tests after concurrent migrations
   have joined.
