# Module 03 Contract: Context, Knowledge, and Memory

> Status: proposed for J2 acceptance
> Owner: J2 Module 03 contract author
> Scope: Chapters 9-13
> Contract date: 2026-09-06

## Contract role

This contract turns the frozen curriculum and Northstar increments for Chapters 9-13 into
chapter-authoring requirements. It is not chapter prose. Chapter authors may refine examples,
fixtures, and visual design, but they must preserve the questions, prerequisites, measurable
outcomes, Northstar increments, source sets, safety boundaries, and handoffs defined here.

## Module purpose

Teach readers to treat context, retrieval, memory, and multimodal observations as separate,
measurable subsystems. The module moves Northstar from a bounded offline agent loop to a
research assistant that can assemble limited context, retrieve only authorized evidence,
produce resolvable citations, evaluate retrieval choices, retain only justified memory, and
handle a constrained non-text observation accessibly.

The module must repeatedly distinguish these ideas:

- Context is the bounded information supplied for one model call.
- Knowledge sources are external records that remain outside the model.
- Retrieval selects candidate evidence from those sources.
- A citation identifies evidence for a claim, but does not prove that the claim is true.
- Memory is policy-governed state retained for later use, not a transcript kept forever.
- A multimodal observation is an input with modality-specific uncertainty, not automatic
  authority to control a screen or environment.

## Reader entry contract

The reader has completed Chapters 1-8 or can demonstrate the same skills. In particular, the
reader can use versioned message and output schemas from Chapter 5, compare model behavior and
cost from Chapter 6, call typed least-authority tools from Chapter 7, and run the bounded,
offline-tested agent loop from Chapter 8. No machine-learning, search-engine, database, cloud,
or accessibility expertise is assumed.

The first pass in every chapter must begin with a familiar information task, use short concrete
language, and state where its analogy stops matching a real system. Mechanisms and jargon come
after the intuition. Examples and labs use Python 3.11 or later, local fixtures, deterministic
model and tool doubles, and zero provider spend. A live service or Microsoft product mapping
may appear only as an optional, dated extension after the vendor-neutral design.

## Reader exit contract

By the end of Chapter 13, the reader can:

1. Design and measure a context assembly policy under a token budget.
2. Build an offline retrieval pipeline whose source and chunk identifiers remain traceable.
3. Compare retrieval strategies using relevance, recall, citation, permission, freshness,
   latency, and token measures appropriate to the chapter.
4. Prove that unauthorized content is excluded before ranking, generation, caching, and
   citation, including negative tests.
5. Explain why a valid citation supports inspection but does not establish truth, and test
   citation resolution and claim support separately from factual correctness.
6. Admit cross-run memory only after a measured benefit, with purpose, consent, provenance,
   correction, retention, expiry, and deletion controls.
7. Complete a sandboxed multimodal or document task by checking actions against observable
   state and by providing a keyboard-operable, text-equivalent path.
8. Hand Module 04 a permission-aware, observable, bounded research substrate without adding
   planning, durable execution, multi-agent collaboration, or protocol coupling early.

## Vocabulary contract

Each term must be defined in plain language on first use and included in the chapter vocabulary
table. A chapter may use earlier terms without reteaching them only through its prerequisite
closure.

| Term | Required plain-language meaning | Introduced |
|---|---|---:|
| Context | The limited information assembled for one model call | 9 |
| Context window | The model-specific maximum amount of input and generated output it can process together | 9 |
| Token budget | A measured limit on the model input and output units used by a task | 9 |
| Context policy | Deterministic rules for selecting, ordering, labeling, isolating, and compacting information | 9 |
| Compaction | Replacing or removing context to fit a budget while recording what changed | 9 |
| Provenance | A record of where an item came from and which version or transformation produced it | 9 |
| Retrieval-augmented generation (RAG) | Generating an answer with selected evidence fetched from sources outside the model | 10 |
| Corpus | The approved set of source documents available for retrieval | 10 |
| Chunk | A source-linked portion of a document used as a retrieval unit | 10 |
| Grounding | Constraining an answer to use provided evidence and exposing links between claims and evidence | 10 |
| Citation | A resolvable pointer from a claim to a specific source version and span | 10 |
| Lexical retrieval | Finding text through matching words or related text features | 10 |
| Semantic retrieval | Finding text through a numeric representation of meaning | 10 |
| Hybrid retrieval | Combining lexical and semantic retrieval signals | 11 |
| Query decomposition | Splitting one information need into smaller searches | 11 |
| Reranking | Applying another scoring step to reorder retrieved candidates | 11 |
| Permission filter | An authorization rule that excludes sources the requester may not access | 11 |
| Recall | The share of relevant expected items that retrieval found | 11 |
| Citation correctness | Whether a citation resolves to the intended source span and supports the linked claim | 11 |
| Memory | Optional policy-governed state retained for use beyond the current model call or run | 12 |
| Consolidation | A controlled process that combines or updates retained memory while preserving policy and provenance | 12 |
| Retention | The policy-defined period and conditions for keeping data | 12 |
| Expiry | The time or condition after which retained data is no longer eligible for use | 12 |
| Deletion | Removal from active stores and derived copies, plus documented expiry for backups | 12 |
| Memory poisoning | Corrupting retained state so later behavior is misled or unsafe | 12 |
| Multimodal | Using more than one kind of input, such as text and images | 13 |
| Observable state | Environment information that can be checked before and after an action | 13 |
| Accessible alternative | An equivalent way to perceive or complete a task without relying on one sense or input method | 13 |

## Required module artifacts

The chapter sequence must leave these versioned, offline-inspectable artifacts:

1. `ContextPolicy` and `ContextItem` logical schemas with token accounting, source labels,
   priority, authorization scope, and compaction records.
2. A deterministic context-layout fixture set and comparison report.
3. A small approved local corpus with source, document, version, chunk, permission, freshness,
   and content-hash metadata.
4. Vendor-neutral Python interfaces for ingestion, retrieval, reranking, authorization, and
   citation inspection, with deterministic doubles.
5. A retrieval benchmark with relevance judgments, authorization cases, expected citations,
   and baseline versus advanced results.
6. A claim-to-citation manifest that distinguishes identifier resolution, span support,
   source freshness, and factual correctness.
7. A memory policy and data inventory covering read, write, consolidation, correction,
   export, retention, expiry, deletion, and backup expiry.
8. A memory ablation report and tests for consent, provenance, poisoning, stale entries,
   correction, and deletion from active and derived stores.
9. A sandboxed multimodal or document-observation fixture, action trace, state-verification
   record, and equivalent text and keyboard path.
10. A cumulative Northstar report fixture showing permission-filtered evidence, resolvable
    citations, warnings, and no unsupported claim that citation implies truth.

Artifacts are logical requirements, not frozen filenames or framework APIs. They must remain
provider-neutral and composable with the Chapter 8 runtime.

## Chapter 9: Context Engineering

### Reader question

What information should the model see now, and what should stay out?

### Prerequisites

Chapters 5, 6, and 8.

### Measurable outcome

Build a token budget and compare two context layouts on the same tasks, reporting accuracy and
token use. The comparison must use identical deterministic fixtures, define an accuracy rule
before the run, and report omissions and position-related failures as well as aggregate scores.

### Required concepts

- Context as disposable model input, distinct from durable task state, source knowledge, and
  cross-run memory.
- Token estimation and hard input/output budgets.
- Selection by task relevance, authority, recency, and source type.
- Ordering, position effects, instruction and data separation, untrusted-content labels, and
  context isolation.
- Compaction, truncation, summarization risk, provenance, and reconstruction from authorized
  state.
- Context ablation and the long-context baseline: more context is a measured choice, not a
  default improvement.

### Northstar increment

Add explicit context selection, ordering, isolation, compaction, token accounting, and context
provenance. Working context remains bounded and disposable. Compaction must not silently alter
the immutable request, durable task state, permissions, citations, or policy decisions.

### Diagram intents

1. **Concept picture:** Separate a small model-call context box from larger source, task-state,
   and optional-memory stores. Takeaway: information can exist without belonging in the next
   prompt. The text alternative must enumerate each store and the one-way selection into the
   context box.
2. **Decision flow:** Show candidate items passing authorization, relevance, priority, token,
   ordering, and labeling checks before assembly. Takeaway: context is built by policy, not by
   concatenating everything. The text alternative must give the same checks in execution order.
3. **Comparison visual:** Show the same facts placed at the start, middle, and end of two layouts
   with their measured outcomes. Takeaway: position and clutter can change task performance.
   The text alternative must include all values represented visually.

### Safe activity and lab

Use index cards or local JSON records representing task instructions, authorized facts,
irrelevant facts, and one untrusted instruction. First, have the reader choose what fits in a
fixed paper budget. Then implement a Python context assembler and compare a relevance-first
layout with a naive append-only layout using a deterministic model double. No account, personal
data, network access, live model, or private chain-of-thought is required.

### Failures and evaluation

Reproduce lost-in-the-middle behavior, instruction-data mixing, stale item inclusion, token
overflow, silent truncation, and compaction that drops a required constraint. Evaluate task
accuracy, required-fact coverage, forbidden-item inclusion, token count, compaction loss, and
layout stability. A layout fails if it includes an unauthorized item or changes durable state.

### Approved source IDs

SRC-006 and SRC-014. Claims derived from SRC-014 are evolving and must be attributed and
rechecked at chapter verification time.

### Handoff

Chapter 10 receives a tested `ContextPolicy`, token accounting, provenance labels, and a rule
that retrieved evidence competes for bounded context rather than bypassing it.

## Chapter 10: RAG Foundations

### Reader question

How can an answer use trusted documents and show where claims came from?

### Prerequisites

Chapters 5 and 9.

### Measurable outcome

Build an offline retrieval pipeline that returns relevant chunks and produces citations whose
identifiers resolve to source fixtures. Tests must separately check retrieval relevance,
citation identifier resolution, source-version match, span support for the linked claim, and
answer factual correctness.

### Required concepts

- RAG as ingestion, retrieval, bounded evidence assembly, generation, and citation inspection.
- Source identity, document version, chunk identity, content hash, freshness metadata, and
  transformation provenance.
- A simple lexical baseline before semantic or hybrid retrieval.
- Chunk boundaries and the tradeoff between local relevance and missing surrounding context.
- Grounding instructions and claim-to-source citation construction.
- The mandatory correction to the Chapter 10 misconception: retrieval does not make every
  generated claim factual, and a citation does not imply truth.
- Permission checks at ingestion and query time, with reauthorization before source content is
  fetched or exposed. Chapter 11 deepens this boundary, but Chapter 10 may not postpone it.

### Northstar increment

Add ingestion, chunk and source identity, permission-filtered baseline retrieval, grounding,
citation validation, and freshness metadata. The generated report must retain exact source
version and span references for material claims and must label unresolved, stale, conflicting,
or weak evidence.

### Diagram intents

1. **Concept picture:** Connect a report claim to a citation, exact chunk, document version, and
   source fixture. Takeaway: a useful citation is a traceable inspection path. The text
   alternative must list every identifier and link.
2. **Process flow:** Show authorized local documents moving through ingestion, chunking,
   indexing, retrieval, context selection, generation, and citation inspection. Takeaway: RAG
   is a pipeline with testable boundaries. The text alternative must describe each boundary,
   input, and output.
3. **Truth distinction:** Use a small matrix for citation resolves, citation supports claim,
   and claim is factually correct. Takeaway: these are separate questions. The text alternative
   must state all matrix cases rather than relying on color or position.

### Safe activity and lab

Build a Python pipeline over a tiny local corpus of invented research notes. Use a deterministic
tokenizer or word-based chunker, a lexical scorer, fixed permissions, and a report template or
model double. The lab resolves every citation into a local source span and includes one fluent
answer with a real but non-supporting citation. All content is synthetic and safe to delete.

### Failures and evaluation

Reproduce irrelevant retrieval, broken identifiers, version mismatch, stale evidence, chunks
that omit necessary qualifiers, unsupported claims, citation laundering, and an unauthorized
document that scores highly. Evaluate hit relevance, source and span resolution, citation
support, citation coverage for material claims, freshness handling, permission exclusion,
latency, and token use. Any unauthorized exposure is a hard failure independent of average
retrieval quality.

### Approved source IDs

SRC-005 and SRC-043. Every Azure AI Search capability statement is a volatile product claim,
must be clearly dated, and must be reverified against SRC-043 within 30 days of release.

### Handoff

Chapter 11 receives the baseline lexical retriever, authorized corpus, source and chunk schema,
claim-to-citation manifest, benchmark questions, and separate citation and truth checks.

## Chapter 11: Advanced Retrieval

### Reader question

What should we do when one search is not enough or not everyone may see every result?

### Prerequisites

Chapter 10.

### Measurable outcome

Compare baseline and advanced retrieval on a fixed set using recall and citation correctness,
while proving unauthorized documents never appear. The comparison must hold the corpus, user
principal, task set, and evaluation rules constant; report quality, latency, and token costs;
and keep the advanced path only where its declared gain justifies its complexity.

### Required concepts

- Query decomposition and transformation with traceable links to the original question.
- Lexical, semantic, and hybrid retrieval as alternatives with different failure modes.
- Candidate generation, deduplication, reranking, diversity, freshness, and context limits.
- Permission filtering before results enter ranking, caches, model context, citations, logs, or
  evaluation outputs; reauthorization before fetch.
- Permission-filter recall, ordinary recall, citation correctness, latency, and cost.
- Optional graph or multimodal retrieval as a bounded experiment, not a required dependency.
- Prompt injection and poisoned indexes as untrusted-data risks that retrieval quality alone
  cannot solve.

### Northstar increment

Add query decomposition, hybrid retrieval, reranking, permission filtering, freshness, and
citation-span verification only where evaluation supports them. An optional graph or
multimodal retrieval experiment must remain replaceable. Effective source permissions travel
with each result and cannot be broadened by a model-generated query or cache hit.

### Diagram intents

1. **Concept picture:** Show a user principal and source permissions intersecting the corpus
   before candidates reach rankers. Takeaway: relevance cannot grant access. The text
   alternative must explain the deny-by-default intersection and every excluded path.
2. **Retrieval flow:** Show query decomposition, lexical and semantic candidate branches,
   permission enforcement, fusion, reranking, fetch reauthorization, and citation verification.
   Takeaway: advanced retrieval is a measured sequence of typed stages. The text alternative
   must enumerate stage inputs, outputs, and stop conditions.
3. **Baseline comparison:** Plot or tabulate recall, citation correctness, unauthorized hits,
   latency, and tokens for baseline and advanced paths. Takeaway: added sophistication is
   accepted only by explicit criteria. A data table must accompany any chart.

### Safe activity and lab

Extend the Chapter 10 synthetic corpus with public, team-only, and restricted fixtures for two
fictional users. Implement Python lexical retrieval plus a deterministic semantic-score double,
rank fusion, and reranking. Run identical queries as both users and assert that restricted
identifiers and content never occur in candidates, cache entries, context, citations, traces,
or output. Do not use real identities, credentials, embeddings, network services, or personal
documents.

### Failures and evaluation

Reproduce over-decomposition, query drift, rank fusion that buries exact matches, stale ranking,
permission filtering after ranking, a cross-user cache key, fetch without reauthorization,
poisoned metadata, and citation-span mismatch. Evaluate ordinary and permission-filter recall,
precision where useful, citation correctness, unauthorized exposure count, freshness, latency,
token use, and complexity relative to the lexical baseline. Unauthorized exposure must equal
zero in every stage and test slice.

### Approved source IDs

SRC-005, SRC-006, and SRC-043. Product claims based on SRC-043 are volatile, dated, optional,
and subject to release-time reverification. SRC-006 is evolving and must not be generalized
beyond the evaluated task conditions.

### Handoff

Chapter 12 receives permission-filtered retrieval interfaces, provenance, freshness, citation
verification, and a benchmark harness. Retrieved text remains evidence for the current task and
is not automatically promoted to memory.

## Chapter 12: Memory Without Mythology

### Reader question

What should an agent remember, what should it forget, and who decides?

### Prerequisites

Chapters 8, 9, and 10.

### Measurable outcome

Define read, write, consolidation, deletion, and retention policies, then show with an ablation
whether memory improves a named metric. The ablation must compare memory off with the smallest
proposed memory type on the same tasks and report benefit, errors, latency, storage, and policy
failures. Memory is rejected if its measured value does not outweigh its risks and costs.

### Required concepts

- Request state, execution state, working context, artifacts, memory, and evidence as distinct
  data classes with different owners and lifecycles.
- The mandatory correction to the Chapter 12 misconception: memory does not mean storing every
  conversation forever.
- Cross-run memory off by default; conversation history and retrieved text are not memory by
  default.
- Purpose limitation, data minimization, explicit write eligibility, user consent or policy
  authority, provenance, confidence, correction, export, and use-time authorization.
- Read, write, consolidation, conflict, expiry, retention, deletion, backup expiry, and legal or
  policy hold semantics.
- Deletion across primary stores, indexes, caches, summaries, derived memory, and evaluation
  corpora, with documented delayed expiry for backups rather than false instant-deletion claims.
- Poisoning, stale preference, cross-user leakage, and feedback-loop risks.

### Northstar increment

Add only the smallest evaluated memory type, with provenance, purpose, consent or policy basis,
confidence, correction, expiry, retention, deletion, and poisoning tests. Memory remains scoped
to tenant and principal, is excluded from prompts unless currently authorized and relevant, and
can be disabled without breaking the Chapter 10 retrieval baseline.

### Diagram intents

1. **Concept picture:** Place six labeled stores for request, execution, working context,
   artifacts, optional memory, and evidence around the runtime. Takeaway: not all retained state
   is memory. The text alternative must define each store and its lifecycle.
2. **Policy flow:** Show a proposed memory passing purpose, authority, consent, sensitivity,
   provenance, duplication, retention, and value checks before write, followed by checks again
   before read. Takeaway: both storage and later use require policy decisions. The text
   alternative must list all decisions and rejection outcomes.
3. **Deletion flow:** Trace a deletion request through primary records, indexes, caches, derived
   summaries, evaluation copies, and scheduled backup expiry. Takeaway: deletion is a testable
   lifecycle process. The text alternative must name each copy and its expected evidence.

### Safe activity and lab

Use synthetic user preferences and research tasks in local JSON or an in-memory Python store.
Implement memory-off and one minimal user-approved preference memory. Add deterministic read,
write, correction, expiry, and deletion policies, then run an ablation. Include a malicious
retrieved sentence that asks to become memory and prove it is rejected. Cleanup deletes all lab
state and confirms absence from active and derived fixtures.

### Failures and evaluation

Reproduce transcript hoarding, unauthorized writes, stale preferences, contradictory entries,
retrieved-text promotion, cross-user reads, consolidation that loses provenance, poisoning,
expired-memory reuse, incomplete deletion, and backups advertised as instantly erased. Evaluate
the named task metric, policy decision accuracy, provenance coverage, stale-use count,
unauthorized read and write count, poisoning resistance, deletion completeness, latency, and
storage. Zero unauthorized cross-user access is mandatory.

### Approved source IDs

SRC-014 and SRC-050. Both are evolving or volatile. AgentCore capability claims from SRC-050
must be dated, optional, and reverified within 30 days of release. Neither source can substitute
for the module's vendor-neutral memory policy or measured admission gate.

### Handoff

Chapter 13 receives explicit state categories and a rule that observations, extracted text,
screenshots, and action traces are not cross-run memory unless they independently pass the
Chapter 12 write policy. Module 06 later formalizes privacy and identity controls, but this
chapter already enforces authorization, minimization, retention, and deletion.

## Chapter 13: Multimodal and Computer-Using Agents

### Reader question

How can an agent work with pictures, documents, audio, or a screen without losing its place?

### Prerequisites

Chapters 7, 9, and 11.

### Measurable outcome

Complete a sandboxed multimodal or computer-use task and verify each action against observable
state, including one accessibility check. The task must use synthetic local fixtures, record
the expected and observed state before and after each action, and provide an equivalent path
that does not depend on vision, color, pointer precision, hearing, or inaccessible timing.

### Required concepts

- Text, image, document-layout, audio, and screen observations as typed inputs with provenance,
  bounds, confidence, and modality-specific failure modes.
- Context budgeting and permission filtering for extracted text, image regions, document pages,
  transcripts, and screen state.
- Perceive, propose, authorize, act, verify, and stop as separate stages.
- Typed least-authority actions, sandbox boundaries, destination constraints, and denial of
  arbitrary desktop control in the initial Northstar deployment.
- State drift, stale screenshots, coordinate error, hidden content, ambiguous controls,
  destructive actions, and recovery.
- Accessible names, reading and focus order, keyboard operation, non-color status, captions or
  transcripts, text alternatives, zoom and reflow, and equivalent task completion.
- Accessibility checks as measurable acceptance evidence, not a note added after implementation.

### Northstar increment

Add document or screen observations, sandboxed actions, visual-state verification, and
accessible alternatives. For initial Northstar this is a constrained read or document
interaction capability, not general computer control. It cannot browse arbitrary sites,
operate the user's desktop, publish, send messages, change access, or perform another
consequential action.

### Diagram intents

1. **Concept picture:** Show one task represented as image regions, extracted text, document
   structure, accessible names, and a text alternative. Takeaway: one interface has several
   complementary representations. The text alternative must itself carry the complete task
   information.
2. **Control flow:** Show observe, check permission, build bounded context, propose typed action,
   authorize, execute in sandbox, observe again, compare state, and stop or recover. Takeaway:
   every action is bounded and verified against fresh evidence. The text alternative must list
   every transition and denial path.
3. **Accessibility equivalence:** Compare pointer and keyboard paths to the same outcome with
   focus, names, status, and error recovery. Takeaway: the accessible path must complete the
   same task, not merely describe it. The text alternative must include the ordered controls and
   resulting states.

### Safe activity and lab

Prefer an offline document-layout task or a local static HTML sandbox over real desktop control.
Use invented content, fixed screenshots or page fixtures, a typed action allowlist, and a
deterministic observation double. The Python lab may inspect fixture metadata and issue
sandboxed actions, but it must not install browser automation, contact a provider, open the
public internet, use personal files, or control applications outside the lab. Test the same
task through a keyboard-operable, text-equivalent fixture.

### Failures and evaluation

Reproduce stale observation, wrong region or coordinates, OCR or transcription error, hidden
state, focus loss, repeated action after success, permission loss, inaccessible labels,
color-only status, missing text alternatives, and a proposed out-of-sandbox action. Evaluate
task completion, observation accuracy, action validity, pre-action authorization, post-action
state match, unnecessary actions, stop behavior, accessibility checks, latency, and token use.
Any sandbox escape, unauthorized content exposure, consequential action, or lack of equivalent
accessible completion is a hard failure.

### Approved source IDs

SRC-011, SRC-018, SRC-030, and SRC-066. Computer-use capability and safety claims from SRC-018
are volatile and require dated reverification within 30 days of release. SRC-030 is evolving.
WCAG claims must remain tied to the durable normative SRC-066 text and must not be presented as
an automatic statement of legal compliance.

### Handoff

Module 04 receives typed observations and actions, bounded context, permission-filtered
retrieval, optional policy-governed memory, observable state transitions, and deterministic
verification fixtures. Chapter 14 may compare workflows and agent choices over this substrate,
but it may not weaken authorization, sandboxing, citation, memory, or accessibility controls.

## Module acceptance

Module 03 is ready for chapter drafting only when all of the following are true:

- [ ] Chapters 9-13 each preserve the curriculum reader question, direct prerequisites,
  measurable outcome, cumulative Northstar increment, and approved source IDs.
- [ ] Every chapter supports a beginner first pass, defines new jargon immediately, states the
  limit of its analogy, and then supplies an engineering deep dive.
- [ ] Every chapter specifies at least two focused diagram intents, each with a takeaway and an
  equivalent text description. Charts also provide the underlying data table.
- [ ] Every lab uses Python 3.11 or later, deterministic local fixtures and doubles, runs
  offline by default, requires no account or payment, and provides cleanup instructions.
- [ ] Context, source knowledge, retrieval, durable state, artifacts, evidence, and optional
  memory remain distinct in prose, schemas, diagrams, and tests.
- [ ] Permission filtering occurs before ranking or exposure, fetch reauthorization is tested,
  cache and trace isolation are tested, and unauthorized exposure is a zero-tolerance failure.
- [ ] Citation evaluation separately covers identifier resolution, source version, span support,
  material-claim coverage, freshness, and factual correctness. No chapter says or implies that
  a citation proves truth.
- [ ] Memory is off by default and admitted only by a measured ablation. Read, write,
  consolidation, correction, export, retention, expiry, deletion, backup expiry, provenance,
  consent or policy authority, and poisoning behavior are explicit and tested.
- [ ] Multimodal work is sandboxed, least-authority, state-verified, and constrained to local
  synthetic fixtures. General desktop control and consequential actions remain denied.
- [ ] Every multimodal diagram, activity, fixture, and workflow has a complete text equivalent;
  the hands-on path is keyboard operable and does not rely on color, vision, hearing, pointer
  precision, or timing alone.
- [ ] The simple Chapter 10 lexical retrieval baseline remains available. Advanced retrieval and
  memory are retained only after predefined measurable gains justify their complexity.
- [ ] Private chain-of-thought is never requested, stored, logged, cited, or evaluated. Only
  observable inputs, outputs, state transitions, tool calls, policy decisions, citations, and
  outcomes are inspectable artifacts.
- [ ] Microsoft mappings are optional and follow vendor-neutral Python. Volatile product claims
  are dated and reverified against their approved ledger source within 30 days of release.
- [ ] All named source IDs exist in the source ledger with `approved` status, and no source is
  used outside the chapter scope approved by the curriculum map.
- [ ] The cumulative Northstar fixture produces a permission-filtered cited report, reports
  retrieval measures, retains no unjustified memory, and completes one accessible constrained
  multimodal or document task offline.

## Cross-module handoff

### Inputs retained from Modules 01 and 02

Module 03 preserves the deterministic non-agent baseline, probabilistic model boundary,
versioned message and output schemas, provider-neutral model gateway, typed tools, explicit
authority, bounded runtime, budgets, termination, cancellation, and deterministic trace. A
retrieval, memory, or multimodal feature cannot grant new tool authority or bypass those
controls.

### Outputs to Module 04

Module 03 hands off these stable logical contracts and evidence:

- Bounded `ContextPolicy` behavior with token, provenance, isolation, and compaction records.
- Permission-aware retrieval and fetch boundaries with source, version, chunk, freshness,
  authorization, and citation-span metadata.
- Baseline and advanced retrieval results on a fixed deterministic benchmark.
- A claim-to-citation inspection path that does not equate citation with truth.
- Optional memory admitted by measured value and governed through its complete lifecycle.
- Typed multimodal observations and sandboxed actions with fresh-state verification and an
  equivalent accessible path.
- Negative tests for unauthorized retrieval, cross-user caching, unsupported citations,
  poisoned memory, incomplete deletion, stale observations, inaccessible interaction, and
  out-of-sandbox actions.

Chapter 14 may orchestrate these capabilities with deterministic workflows or bounded agent
choices. Chapter 15 may add observable planning. Chapter 16 may add durable execution. Chapter
17 may test isolated multi-agent work. Chapter 18 may add protocol adapters. None may reinterpret
retrieved content as control instructions, broaden permissions, turn context into implicit
memory, remove citation checks, or weaken multimodal accessibility and sandbox boundaries.

Module 05 later expands the benchmark and freezes release thresholds. Module 06 formalizes the
threat, identity, privacy, safety, and governance evidence. Module 07 selects production stores
and operations. Until those modules land, this module makes no production-ready, legal
compliance, tenant-isolation, or cloud-service guarantee.