# Candidate Dossier: Child-Friendly Agent Architecture Animation

> Prepared: 2026-09-06
> Scope: forward-looking optional companion for Chapter 4, "From Software to AI Systems," and
> Chapter 28, "Reference Architecture"
> Source status: chapter prose must be checked against `research/source-ledger.csv` before use.

## Purpose and governing contracts

This dossier specifies a child-friendly, technically grounded, accessible animation of an
agentic system and its end-to-end data flow. The animation is optional progressive enhancement:
it supports, but never replaces, a chapter's mandatory static Mermaid diagrams.

The implementation must preserve these repository contracts:

- The first explanation must work for a curious child or nontechnical adult, as required by
  `coordination/contracts/editorial-contract.md`.
- Every analogy must say where it stops matching reality
  (`coordination/contracts/editorial-contract.md`).
- Every chapter must contain **at least two Mermaid visuals**: a concept picture and a process,
  data, or decision flow. Each needs a one-sentence takeaway and equivalent text description
  (`coordination/contracts/editorial-contract.md` and
  `coordination/contracts/chapter-template.md`).
- Every chapter must include a **defensive, offline security or safety test using synthetic
  data**, with an expected blocked or contained result. It must not use real credentials,
  personal data, malware, or a live target
  (`coordination/contracts/editorial-contract.md` and
  `coordination/contracts/chapter-template.md`).
- Private chain-of-thought is not an interface, log, or evaluation artifact. Show only
  observable plans, tool traces, outcomes, and critiques
  (`coordination/contracts/editorial-contract.md` and `CONTRIBUTING.md`).
- `scripts/validate_repository.py` still requires the chapter's fenced Mermaid block and
  required headings. An animation must never satisfy or bypass those checks.

## Metaphor: a help center

A child brings a question to a **front door** (experience adapter). A **badge check** confirms
who is asking and what they may request (identity and policy). A **coordinator** (runtime) works
at a desk with a notepad and kitchen timer (state and budgets).

The coordinator may open only approved **reference binders** (retrieval and context). A sticky
note inside a binder is something to read, never a new instruction. A **next-step guesser**
(model) proposes one useful next step from learned patterns; it guesses rather than knows. A
**rulebook checker** (policy decision point) approves or denies the proposal before anything
happens.

The coordinator can reach only a locked **toolbox** containing tools approved for this job
(tool gateway). A consequential action, such as publishing something to the whole town, needs a
supervisor's signature on the exact page (payload-bound human approval). Answers from the
**outside world** are marked "double-check this" until verified. A **records area** captures
redacted, minimal evidence of observable steps, never secrets or private scratch work. If time
runs out or a failed move repeats, the front door explains the safe stop rather than guessing
forever.

This extends Chapter 28's beginner picture of a request moving through a front door,
coordinator, specialist services, and records area, rather than introducing a competing model.

### Where the metaphor stops

1. The model does not understand like a person. It predicts likely tokens and can be confidently
  wrong. Narration says "proposes" or "predicts," not "thinks," "understands," or "knows."
2. A human coordinator remembers naturally; the runtime deliberately reconstructs bounded,
   explicit context. Cross-turn memory is a separate, evaluated, opt-in feature
  (see the memory model in `case-study/northstar/architecture-contract.md`).
3. A software approval is narrower than a human signature: it is bound to an exact payload
   digest, expires, and cannot be reused after a change
  (see the approval model in `case-study/northstar/architecture-contract.md`).
4. A person may improvise beyond a rulebook. This system must not: authority never increases at
   runtime, and anything not explicitly allowed is denied
  (see the authority invariants in `case-study/northstar/architecture-contract.md`).
5. "Specialist desks" are bounded software workers exchanging structured requests and results,
   not colleagues exercising independent judgment.

## Grounded component and data-flow model

Use dual labels: plain-language metaphor first and the repository component name second.

```text
Child/User
  -> Front Door (Experience adapter)
  -> Ticket Window (API and admission control: authentication, request ID, rate limit)
  -> Badge Check (Identity and policy decision point: delegated authority and tenant)
  -> Coordinator's Desk (Runtime: observe -> decide -> act; budgets and state)
       +-> Reference Shelf (Context/retrieval service: read-only, untrusted content)
       +-> Next-Step Guesser (Model gateway: proposes one typed action; never executes)
       +-> Rulebook Checker (Policy decision point: approves or denies)
       +-> Toolbox (Connector and tool gateway: typed, least-privilege, idempotent tools)
       |    +-> Specialist Desk A (bounded worker with its own rules and toolbox)
       |    +-> Specialist Desk B (bounded worker with its own rules and toolbox)
       +-> Outside World (External systems: untrusted responses)
       +-> Supervisor's Stamp (Approval service for consequential/Class C actions)
  -> Records Area (Observability and audit pipeline: minimized, redacted, append-only)
  -> Front Door returns Response to Child/User

Coordinator symbols:
  clock = budgets and timeouts
  stop sign = terminal state
  loop arrow = retry within budget
```

This view maps to the vendor-neutral component catalog and the observe, decide, act, feedback,
and stop mechanics in `case-study/northstar/architecture-contract.md`. Terminal outcomes must
use the contract's exact statuses:
`completed`, `completed_with_warnings`, `needs_clarification`, `awaiting_approval`,
`budget_exhausted`, `cancelled`, `policy_denied`, `failed_recoverable`, and `failed_terminal`.

### Relationship to each chapter's static diagrams

**Chapter 4** currently has three static diagrams:

1. Deterministic and probabilistic comparison: a fixed rule gives the same choice for the same
  known input, while several model outputs may be possible. Takeaway: "Fixed rules are
  predictable, while model proposals can vary."
2. Checked proposal flow: a goal reaches a model proposal, ordinary code checks it, and only an
  allowed proposal reaches a bounded tool. Takeaway: "A model can propose an action, but only
  checked code can let a tool run."
3. State machine: `Received`, `Validating`, `AwaitingApproval`, `Executing`, `Rejected`,
  `Cancelled`, `Succeeded`, and `Failed`. Takeaway: "A state machine makes forbidden jumps,
  such as acting before required approval, unavailable."

Reuse the current flow labels verbatim:
`G[Goal] --> M[Model proposes] --> C[Code checks] --|allowed|--> T[Bounded tool]`,
`C --|denied|--> S[Stop or ask]`, and `T --> R[Recorded result]`
(see the "Picture the idea" section in Chapter 4).

**Chapter 28** has three frozen diagram intents:

1. Beginner concept picture: front door, coordinator, specialist services, records area.
2. Production boundary: complete component catalog with control/data-plane and trust-boundary
   overlays.
3. Sequence: one research request through admission, durable runtime, retrieval, model,
   evaluation, and artifact storage.

The companion may expand a static diagram only with concepts already established in the chapter
prose or Northstar architecture contract. It must not introduce a new architecture claim. A
manifest must map each scene to its supporting chapter label, takeaway, prose section, or
Northstar invariant so the static and animated explanations cannot drift.

## Twelve-scene storyboard and narration

One reusable scene pattern supports two chapter-scoped instances. Every on-screen caption is
also the verbatim transcript line.

### Chapter 4 "lite" instance

1. **The Question.** "A request enters the system at a clear boundary."
2. **Two Kinds of Steps.** "A fixed rule gives the same result for the same input. A model may
  propose different results."
3. **The Guess.** "The model proposes one next step. It is guessing from patterns, not knowing."
4. **The Check.** "Ordinary code checks the proposal before anything happens."
5. **Allowed or Stopped.** "An allowed step reaches a narrow tool. A denied or uncertain step
  stops or asks."
6. **Recorded.** "The result is written down."
7. **The State Machine.** "A request moves only through named states: arriving, being checked,
   waiting for approval when needed, doing allowed work, and ending in success, failure,
  rejection, or cancellation. It cannot skip a required check."

### Chapter 28 "full" instance

1. **The Front Door.** "A person asks a question at the front door."
2. **Badge Check.** "The front desk checks who is asking and what they are allowed to request."
   Being polite is not the same as being authorized.
3. **The Coordinator's Desk.** "A coordinator takes the question to a desk with a notepad and a
  kitchen timer."
4. **The Reference Shelf.** "The coordinator opens only approved binders. A sticky note inside
  one is something to read, never a new instruction."
5. **The Next-Step Guesser.** "A machine predicts one useful next step from patterns it has seen.
  It is guessing, not knowing."
6. **The Rulebook Checker.** "A checker compares the proposed step with the rules. A disallowed
  guess stops here."
7. **The Toolbox.** "The coordinator may use only tools approved for this job."
8. **Calling a Specialist.** "For a bounded part, the coordinator sends a clear written request
  to a specialist desk with its own toolbox and rules."
9. **Going Outside.** "Answers from outside are labeled 'double-check this' until verified."
10. **The Supervisor's Stamp.** "A consequential action needs a supervisor to approve the exact
   page before it goes out."
11. **The Records Area.** "Observable steps go into a logbook. Secrets and private scratch notes
   do not."
12. **Answer or Stop.** "The coordinator returns an answer or explains a safe stop when time
   runs out or the rules say no, instead of guessing forever."

## Mandatory static Mermaid fallback

- Author the chapter's Mermaid diagrams first. They must be sufficient when the animation is
  unavailable and render in GitHub Markdown without dependencies.
- Preserve at least the contract's two required diagram roles, even where a chapter elects to
  include three: one concept picture and one process/data/decision flow.
- Keep a one-sentence takeaway and numbered equivalent text description for every diagram.
- Frame the companion as enrichment: "To see this move, open the companion animation." Never
  make it prerequisite reading.
- Use Mermaid `accTitle` and `accDescr` directives, after verifying syntax against GitHub's
  pinned Mermaid version.

## Reusable visual patterns

| Pattern | Meaning |
|---|---|
| Rounded rectangle | Component, service, or responsibility |
| Diamond | Decision or policy check, with labeled `allowed` and `denied` edges |
| Stadium/pill | Start or terminal status |
| Cylinder | State, artifact, or evidence store |
| Visible `(untrusted)` text tag | External or unverified content; never color alone |
| Visible `(approval required)` text tag | Consequential/Class C or D action |

Naming grammar:

- **Concept picture:** static structure without time-ordered arrows.
- **Flow diagram:** ordered process, data, or decision steps.
- **State diagram:** `stateDiagram-v2` with named terminal states.
- **Sequence diagram:** component interactions over time.

Terms such as "secret flow," "capacity flow," and "data flow" are subject-specific uses of the
flow-diagram primitive, not additional diagram categories. This grammar is a recommendation,
not yet an approved repository-wide contract.

## Self-contained HTML/SVG/JavaScript plan

Ship required Mermaid diagrams in Markdown and a separate companion made from static
HTML/CSS/vanilla JavaScript. It must work from `file://` and may also be served by GitHub Pages.
Do not rely on raw script in Markdown, an autoplaying GIF, or video as the primary artifact.

Use one inline `<svg>` rather than canvas. JavaScript toggles each node's/edge's visibility and
highlight state by scene. SVG preserves an accessible DOM: each meaningful group can expose a
`<title>` and `<desc>`, remain inspectable by assistive technology, and respond to CSS media
queries. There is no build step, external font, CDN, tracker, or network request. Define scene
data as a local JavaScript object; do not `fetch()` local JSON because browser `file://`
restrictions vary.

### Controls and motion

- Start paused; never autoplay.
- Use native `<button>` elements for Play/Pause, Step Back, Step Forward, Replay, Stop, and
  speed (0.5x/1x/1.5x), plus a native scene selector.
- Document keyboard controls on screen: `Space`/`Enter` play or pause, arrow keys step, `R`
  replays, `Escape` stops and returns to scene 1, and digits jump to a scene.
- With `prefers-reduced-motion: reduce`, disable travel, easing, and auto-advance. Change scenes
  instantly; a brief opacity change is acceptable only if the user has not disabled all motion.
- Provide a visible "Disable motion" control independent of the operating-system setting.
- Never require a timed response and never steal focus on scene changes.
- Mark the current scene with text and `aria-current`.
- Put the exact caption in an `aria-live="polite"` region when a user changes scenes.
- Offer a high-contrast theme and respect `prefers-contrast: more` and forced-colors mode.

## Accessibility requirements

- [ ] Transcript matches every caption one-to-one and is available without playing.
- [ ] Every meaningful SVG node has a concise accessible name/description.
- [ ] Information is not communicated by color alone.
- [ ] All controls are keyboard operable, with visible focus and no keyboard trap.
- [ ] No autoplay and no flashing more than three times per second.
- [ ] Reduced-motion preferences and the independent motion toggle work.
- [ ] Semantic HTML and native controls are used; ARIA supplements rather than replaces them.
- [ ] Screen-reader operation is verified with NVDA or VoiceOver.
- [ ] Content reflows at 400% zoom without two-dimensional scrolling.
- [ ] Text and controls meet WCAG 2.2 AA contrast in default and high-contrast themes.
- [ ] Captions and text descriptions make the SVG nonessential.
- [ ] The chapter's static Mermaid diagrams remain complete when JavaScript is disabled.
- [ ] Network inspection from `file://` shows zero outbound requests.

## Security teaching moments and offline tests

Each chapter still needs its own defensive offline test using synthetic data and an expected
blocked or contained result. The animation illustrates why the test exists; it does not count
as the test.

| Scene | Lesson and architecture guarantee | Offline synthetic test and expected result |
|---|---|---|
| Badge Check | Authentication is not authorization; deny by default | Valid-looking but unauthorized badge fixture -> `forbidden`; no tool call |
| Reference Shelf | Untrusted content is data, never control-plane instruction | Retrieved fixture says "ignore prior rules" -> text is not executed |
| Next-Step Guesser | Model output is a proposal and cannot override policy | Model fixture names a disallowed tool -> checker rejects it |
| Toolbox | Only typed, allowlisted, least-privilege tools are reachable | Out-of-allowlist call -> `invalid_request` or `forbidden` |
| Specialist | Delegation does not expand authority | Out-of-scope handoff -> specialist boundary rejects it |
| Going Outside | External responses remain untrusted until verified | Missing/mismatched provenance -> result labeled and withheld from citation |
| Supervisor's Stamp | Approval binds to an exact payload and expires | Changed payload or stale approval -> denial |
| Records Area | Logs are minimized and redacted | Synthetic secret in trace input -> evidence record redacts it |
| Answer or Stop | Budget exhaustion is a safe terminal outcome | Forced exhaustion -> `budget_exhausted`, with no silent retry loop |

These expectations trace to the authority, tool, retrieval, approval, evidence, and budget
invariants in `case-study/northstar/architecture-contract.md`.

## Proposed file layout

Primary instances:

- `modules/01-from-zero-to-agents/assets/ch04-agentic-system-flow/`
- `modules/07-production-architecture-operations/assets/ch28-reference-architecture-flow/`

```text
modules/<module>/assets/<chapter-slug>/
|-- README.md                 # manifest, label mapping, accessibility, license, opening steps
|-- index.html                # semantic, self-contained shell
|-- styles.css                # themes, reduced motion, contrast, shared visual grammar
|-- script.js                 # vanilla-JS scene state machine
|-- scenes.js                 # exact chapter labels, takeaways, captions, ARIA descriptions
|-- diagram.svg               # accessible SVG, or inline equivalent in index.html
|-- transcript.md             # complete captions/narration
`-- tests/
    `-- check_asset_offline.py # network, accessibility marker, and label-parity checks
```

The manifest should map every scene to its chapter Mermaid label/takeaway and document browser
support, the offline/no-tracker guarantee, accessibility features, and both `file://` and GitHub
Pages use.

## Validation plan

1. **Traceability:** map every scene to an existing frozen Mermaid node/label/takeaway and
   Northstar component or invariant. Reject new architecture claims.
2. **Diagram contract:** confirm the chapter independently retains at least two static Mermaid
  diagrams, the concept picture and process/data/decision flow, each with takeaway and equivalent
   text. Additional diagrams do not weaken this minimum.
3. **Security contract:** run at least one synthetic, offline, defensive test from the table
   above and assert its explicit blocked or contained result.
4. **Label parity:** automatically confirm `scenes.js` labels occur verbatim in the relevant
   chapter Mermaid blocks.
5. **Offline behavior:** scan HTML, CSS, SVG, and JavaScript for outbound URLs/CDNs; open via
   `file://` and confirm zero network requests.
6. **Accessibility:** keyboard-only walkthrough; NVDA or VoiceOver pass; reduced-motion,
   forced-colors/high-contrast, no-motion toggle, and 400% zoom checks.
7. **Pedagogy:** review against the curious-child bar, purposeful-motion guidance, and CAST UDL
   Guidelines 3.0; then conduct a small comprehension check with nontechnical readers.
8. **Regression:** run `python scripts/validate_repository.py` and
   `python -m unittest discover -s tests -v`.
9. **Independent review:** route through pedagogy, technical, security, and responsible-AI
  review. Assign explicit WCAG sign-off because Stage S6 in
  `coordination/dependency-graph.yml` has no named accessibility reviewer. The Stage S7
  `ACCESSIBILITY` synthesis node is a later integration check, not a substitute for that owner.

## Chapter placement

- **Primary:** Module 01, Chapter 4, using the seven-scene lite instance. This is the first
  architecture/state-machine lesson and remains within the no-ML-background portion of the
  curriculum (`coordination/contracts/curriculum-map.md`).
- **Secondary:** Module 07, Chapter 28, using the twelve-scene full instance. Its frozen concept
  picture already uses this dossier's front-door/coordinator/specialists/records-area structure.
- **Cross-links, not duplicates:** Chapter 8 for budgets and termination; Chapter 18 for
  tool/subagent protocol boundaries; Chapters 24-26 for the security moments; Chapter 36 for a
  capstone recap.

## Sources, freshness, and confidence

| Source | Claim supported | Published | Accessed | Freshness | Confidence |
|---|---|---:|---:|---|---|
| [GitHub: Creating diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) | Native Mermaid rendering | Continuously updated | 2026-09-06 | Volatile | High |
| [GitHub Flavored Markdown Spec 0.29](https://github.github.com/gfm/) | Disallowed raw HTML/sanitization basis | 2019-04-06 | 2026-09-06 | Durable spec; live behavior volatile | Medium-high |
| [WCAG 2.2: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | Disable nonessential interaction motion | 2023 | 2026-09-06 | Durable | High |
| [WCAG 2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Control moving/auto-updating content | 2023 | 2026-09-06 | Durable | High |
| [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | OS reduced-motion mechanism | Long-lived | 2026-09-06 | Durable | Medium |
| [WAI-ARIA APG: Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) | Native semantics and "a role is a promise" | Continuously updated | 2026-09-06 | Evolving | High |
| [Mermaid accessibility](https://mermaid.js.org/config/accessibility.html) | `accTitle`/`accDescr` support | Continuously updated | 2026-09-06 | Volatile | Medium |
| [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) | Static HTML/CSS/JS hosting | Continuously updated | 2026-09-06 | Volatile | High |
| [CAST UDL Guidelines 3.0](https://udlguidelines.cast.org/) | Multiple means of representation and engagement | 2024-07-30 | 2026-09-06 | Evolving | High |
| [NN/g: Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/) | Purposeful versus distracting motion | Undated/updated | 2026-09-06 | Evolving | Medium |
| [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | Workflow/agent and orchestrator/worker patterns | 2024 | 2026-09-06 | Evolving | High |

Repository contracts and chapter drafts cited above were read directly and are treated as
durable to the repository freeze of 2026-09-05. WCAG 2.2 is already represented by SRC-066 and
Anthropic's article by SRC-013 in `research/source-ledger.csv`.

## Gaps and uncertainties

- Re-verify current WAI-ARIA guidance for live regions; the expected APG page was not retrievable
  during research.
- MDN's reduced-motion article body was not fully retrievable. Browser-support details should
  be checked during implementation.
- Re-check Mermaid `accTitle`/`accDescr`, pill, and diamond syntax against GitHub's pinned
  Mermaid version before authoring.
- GitHub's exact live HTML-sanitizer allowlist was not independently inspected. A smoke test
  should confirm that rendered Markdown cannot execute inline script.
- The reusable visual grammar is a proposal; no approved
  `coordination/contracts/visual-pattern-library.md` exists.
- Exact frozen diagram sets for the proposed Chapter 8, 18, and 24-26 cross-links need
  line-by-line verification before those links are added.
- OpenAI's "A Practical Guide to Building Agents" PDF was not freshly parsed; any exact wording
  from it must be rechecked by the Source Editor.
- No comprehension testing with children or other nontechnical readers has occurred. Heuristic
  review is not a substitute for lightweight user testing.
- Stage S6 lacks an explicit accessibility reviewer, so ownership of WCAG sign-off must be
  assigned before integration.
