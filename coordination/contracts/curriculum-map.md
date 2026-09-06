# Curriculum Map Contract

Status: Proposed for J2  
Freeze date: 2026-09-05  
Owner: CURRICULUM  
Scope: Chapters 1-36

## Purpose

This contract fixes the learning progression for the module briefs created after J2. It is not chapter prose. Module leads may refine examples, labs, and figures, but they must preserve each chapter's reader question, prerequisites, measurable outcome, Northstar increment, and approved evidence set unless a coordinated contract change is accepted.

The first-pass lane starts with familiar choices and feedback before introducing model or systems jargon. The engineering lane adds mechanisms only after the reader can explain the intuition in plain language. Chapters 1-4 require no machine-learning background. Later chapters may rely only on the prerequisites listed here and on terms already introduced by those chapters.

## Module 01: From Zero to Agents

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 1 | When should software choose its next step, and when is ordinary automation better? | None | Given five scenarios, classify each as automation, workflow, assistant, or agent and justify the minimum autonomy needed with at least four correct classifications. | Write the problem statement, non-agent baseline, goal, and autonomy boundary. | SRC-001, SRC-002, SRC-013, SRC-020 |
| 2 | How can a system notice what happened, choose, act, and know when to stop? | 1 | Trace an observe-decide-act loop for a paper scenario, identifying environment, state, policy, action, feedback, and termination with no missing element. | Define observations, permitted actions, state, feedback, and stop conditions. | SRC-001, SRC-002, SRC-012, SRC-027 |
| 3 | How can a language model produce useful words without actually knowing facts like a database? | 1 | Explain tokens, probability, context, inference, and nondeterminism in plain language, then predict which of three prompt changes can alter an output. | Mark which Northstar decisions may use a model and record uncertainty and hallucination risks. | SRC-003, SRC-004, SRC-030 |
| 4 | How do we put an unpredictable model inside dependable software? | 2, 3 | Draw a system boundary that separates deterministic controls from probabilistic model calls and specify one enforceable contract at each boundary. | Produce the first architecture diagram and state-machine sketch, with the model behind explicit input and output contracts. | SRC-070, SRC-071 |

## Module 02: Build the Smallest Useful Agent

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 5 | How do we ask clearly and make the answer safe for software to use? | 3, 4 | Define a versioned message contract and schema, then reject all malformed outputs in a supplied fixture set. | Add versioned instructions, structured report requests, schema validation, and deterministic fixtures. | SRC-004, SRC-007, SRC-022, SRC-023 |
| 6 | Which model is good enough for this job, and what does the choice cost? | 3, 5 | Run a controlled selection experiment and choose a model tier from measured quality, latency, context, and cost rather than reputation. | Add a provider-neutral model interface, selection rubric, and offline model double. | SRC-003, SRC-004, SRC-030, SRC-036 |
| 7 | How can a model use a capability without receiving unlimited power? | 4, 5, 6 | Implement a typed read-only tool and a consequential tool, validate arguments, classify side effects, and prove a repeated request is idempotent. | Add typed source-search and document-read tools plus an approval-gated report action. | SRC-008, SRC-017, SRC-022, SRC-031, SRC-038 |
| 8 | What keeps an agent loop bounded, understandable, and stoppable? | 2, 5, 6, 7 | Implement an offline runtime that passes tests for success, invalid output, tool failure, budget exhaustion, cancellation, and termination. | Deliver the first offline-tested loop with step, token, time, and cost budgets and an expected trace. | SRC-008, SRC-013, SRC-020, SRC-041, SRC-051 |

## Module 03: Context, Knowledge, and Memory

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 9 | What information should the model see now, and what should stay out? | 5, 6, 8 | Build a token budget and compare two context layouts on the same tasks, reporting accuracy and token use. | Add explicit context selection, ordering, isolation, compaction, and token accounting. | SRC-006, SRC-014 |
| 10 | How can an answer use trusted documents and show where claims came from? | 5, 9 | Build an offline retrieval pipeline that returns relevant chunks and produces citations whose identifiers resolve to source fixtures. | Add ingestion, hybrid retrieval, grounding, citation validation, and freshness metadata. | SRC-005, SRC-043 |
| 11 | What should we do when one search is not enough or not everyone may see every result? | 10 | Compare baseline and advanced retrieval on a fixed set using recall and citation correctness, while proving unauthorized documents never appear. | Add query decomposition, reranking, permission filtering, and an optional graph or multimodal retrieval experiment. | SRC-005, SRC-006, SRC-043 |
| 12 | What should an agent remember, what should it forget, and who decides? | 8, 9, 10 | Define read, write, consolidation, deletion, and retention policies, then show with an ablation whether memory improves a named metric. | Add only the smallest evaluated memory type, with provenance, expiry, deletion, and poisoning tests. | SRC-014, SRC-050 |
| 13 | How can an agent work with pictures, documents, audio, or a screen without losing its place? | 7, 9, 11 | Complete a sandboxed multimodal or computer-use task and verify each action against observable state, including one accessibility check. | Add document or screen observations, sandboxed actions, visual-state verification, and accessible alternatives. | SRC-011, SRC-018, SRC-030, SRC-066 |

## Module 04: Reasoning, Workflows, and Collaboration

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 14 | Which jobs need a fixed recipe, and which need choices along the way? | 4, 8 | Implement two workflow patterns for one task and select one using measured quality, latency, cost, and failure behavior. | Put predictable research stages in deterministic workflows and reserve agent choices for uncertain steps. | SRC-001, SRC-013, SRC-020, SRC-032, SRC-051 |
| 15 | How can a system break down a hard job and notice that its plan is failing? | 8, 14 | Produce an observable plan, validate its dependencies and budget, inject a failed step, and demonstrate bounded replanning without logging private chain-of-thought. | Add task decomposition, uncertainty flags, plan validation, and bounded replanning. | SRC-001, SRC-007, SRC-008, SRC-027, SRC-038 |
| 16 | How can a long job pause, survive a crash, and continue safely? | 7, 8, 14 | Resume a workflow from a checkpoint after injected failure and show that repeated delivery causes no duplicate consequential action. | Add durable state, queues, checkpoints, leases, deadlines, approval wait states, and idempotent activities. | SRC-049, SRC-054, SRC-061 |
| 17 | When do several agents help more than one agent or a workflow? | 8, 14, 15 | Compare a multi-agent design with a single-agent or workflow baseline and retain it only if a predefined gain exceeds its communication and failure cost. | Add an isolated worker experiment with explicit handoff contracts and failure containment, not a default production dependency. | SRC-002, SRC-013, SRC-014, SRC-020, SRC-042 |
| 18 | How can agents, tools, and user interfaces cooperate without sharing one codebase? | 7, 16, 17 | Implement one protocol-bounded capability and test discovery, authorization failure, version mismatch, cancellation, and lifecycle completion. | Expose one least-authority capability through a versioned protocol adapter while keeping domain interfaces protocol-neutral. | SRC-016, SRC-034, SRC-055 |

## Module 05: Evaluation and Improvement

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 19 | What does a good result mean, and how will we know? | 8, 10, 14 | Turn a vague goal into a task contract with thresholds for outcome quality, safety, latency, and cost, including a stated tradeoff rule. | Define report correctness, citation quality, tool choice, safety, latency, and cost indicators and thresholds. | SRC-009, SRC-024, SRC-057 |
| 20 | Which test tasks represent the real work well enough to guide changes? | 19 | Build a versioned train, development, and test set with coverage tags, provenance, contamination checks, and at least one difficult negative case. | Create representative research tasks, golden evidence, deterministic fixtures, and protected holdout cases. | SRC-009, SRC-024 |
| 21 | Who or what should judge an answer, and can that judge be trusted? | 19, 20 | Calibrate a deterministic, model-based, or human rubric against labeled cases and report agreement, bias checks, and uncertainty. | Add layered evaluators with human escalation for consequential or low-confidence judgments. | SRC-009, SRC-024 |
| 22 | Should we score only the final answer, or also the path taken to get it? | 7, 11, 13, 20, 21 | Score both outcomes and trajectories for tool choice, retrieval, robustness, and safety, then explain one disagreement between those scores. | Add trajectory, tool-selection, retrieval, adversarial, and simulation checks to the evaluation harness. | SRC-008, SRC-010, SRC-011 |
| 23 | How do we find the cause of a failure and improve without breaking something else? | 20, 21, 22 | Use traces and an ablation to isolate one failure cause, ship one measured change, and block a seeded regression. | Add a failure taxonomy, experiment records, regression gates, and privacy-safe feedback handling. | SRC-024, SRC-025, SRC-039 |

## Module 06: Security, Safety, and Governance

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 24 | What could an attacker, a bad document, or a mistaken agent make the system do? | 7, 10, 12, 19 | Produce a threat model naming assets, actors, trust boundaries, abuse paths, and mitigations, then test one indirect prompt-injection path. | Draw trust boundaries and add tests for injection, exfiltration, confused deputy behavior, supply-chain risk, and memory poisoning. | SRC-026, SRC-035, SRC-057, SRC-058, SRC-060 |
| 25 | How do we let tools do useful work while limiting damage? | 7, 16, 18, 24 | Enforce least privilege, secret isolation, egress controls, approval, transaction limits, and audit evidence in a sandbox escape or misuse test. | Replace broad tool access with scoped capabilities, sandboxing, allowlists, approval gates, and revocation. | SRC-016, SRC-020, SRC-026, SRC-053, SRC-059 |
| 26 | How do we act for the right person while protecting identity, privacy, and access? | 11, 12, 13, 24, 25 | Trace delegated identity through one request and prove tenant isolation, data minimization, retention, deletion, encryption, and content-safety behavior. | Add user-scoped authorization, tenant filters, privacy controls, content-safety checks, and accessible user interactions. | SRC-037, SRC-044, SRC-053, SRC-063, SRC-066 |
| 27 | Who is accountable for the system, its risks, and decisions to change or stop it? | 19, 21, 23, 24, 26 | Create a governance record with risk classification, owners, evidence, human oversight, incident path, accessibility review, and qualified legal-review flags. | Add risk ownership, approval evidence, red-team findings, incident disclosure routing, vendor review, and a kill authority. | SRC-015, SRC-057, SRC-062, SRC-064, SRC-068 |

## Module 07: Production Architecture and Operations

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 28 | What parts does the whole production system need, and where do responsibilities belong? | 16, 18, 23, 25, 26 | Draw a deployable reference architecture and assign every runtime, model, tool, policy, data, evaluation, telemetry, and admin responsibility to one boundary. | Assemble the evaluated and secured components behind API, model, and tool gateways with separate data and control planes. | SRC-033, SRC-040, SRC-045, SRC-050, SRC-070 |
| 29 | How should the system behave when dependencies slow down, fail, or repeat work? | 16, 22, 25, 28 | Pass failure-injection tests for timeout, retry with jitter, circuit breaking, bulkheading, backpressure, compensation, and graceful degradation. | Add resilience policies, idempotency keys, fallback modes, queues, chaos cases, and recovery objectives. | SRC-028, SRC-029, SRC-045, SRC-049, SRC-061 |
| 30 | How will operators see trouble, protect sensitive telemetry, and respond? | 22, 23, 27, 28, 29 | Trace one request end to end, derive service-level indicators, trigger an alert, follow a runbook, and verify telemetry redaction. | Add correlated traces, logs, metrics, dashboards, service-level objectives, alerts, runbooks, and postmortem records. | SRC-021, SRC-025, SRC-028, SRC-047, SRC-056 |
| 31 | How can we release changes repeatedly and roll them back safely? | 23, 27, 28, 29, 30 | Promote a reproducible artifact through staged environments with infrastructure as code, evaluation gates, a canary, and tested rollback. | Package Northstar for a justified compute target and add CI/CD, secrets handling, release evidence, canary, and rollback. | SRC-029, SRC-033, SRC-036, SRC-045, SRC-048 |
| 32 | Where should sessions, documents, indexes, messages, and checkpoints live at scale? | 10, 12, 16, 26, 28, 29 | Choose stores and consistency rules for each state type, then pass schema-evolution, retention, backup, restore, partition, and hot-key tests. | Add durable stores, caches, indexes, queues, partition keys, lifecycle policies, and a tested restore path. | SRC-049, SRC-063, SRC-072 |

## Module 08: Scale, Economics, and Lifecycle

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 33 | What will each useful result cost, and where will load create delay? | 19, 23, 29, 30, 31, 32 | Build a workload and unit-economics model, run a load test, and meet stated quality, latency, throughput, quota, and cost thresholds. | Add model routing, caching, batching, concurrency and quota controls, capacity estimates, and per-task cost reporting. | SRC-046, SRC-052 |
| 34 | How do we serve many tenants across regions without mixing data or losing recovery? | 26, 29, 31, 32, 33 | Demonstrate tenant isolation and noisy-neighbor controls, then execute a regional failover that meets stated recovery time and recovery point objectives. | Add per-tenant identity, data, quota, and cost boundaries plus residency, replication, failover, and disaster-recovery plans. | SRC-045, SRC-072 |
| 35 | How can the system learn from production and change models, prompts, or indexes safely? | 23, 27, 30, 31, 33, 34 | Detect a seeded drift or regression and complete a privacy-safe shadow, migration, rollback, deprecation, and kill-switch exercise. | Add sampled feedback, drift monitors, experiment governance, shadow traffic, versioned migrations, rollback, and retirement controls. | SRC-012, SRC-028, SRC-064, SRC-070 |

## Module 09: Microsoft Synthesis and Capstone

| Ch | Reader question | Prerequisite chapters | Measurable outcome | Northstar increment | Approved source IDs |
|---:|---|---|---|---|---|
| 36 | How should we map the proven design to Microsoft services without surrendering our requirements or interfaces? | 27, 28, 29, 30, 31, 32, 33, 34, 35 | Produce and defend a build, buy, or hybrid architecture whose service mappings satisfy the frozen quality, security, reliability, operations, recovery, and cost requirements, with every volatile claim freshly verified. | Map the accepted vendor-neutral Northstar interfaces to current Microsoft services, SDKs, infrastructure as code, and delivery controls, then complete a production-readiness review. | SRC-040, SRC-042, SRC-044, SRC-045, SRC-046 |

## Misconception Progression

Module briefs must assign each misconception to the named chapter and must not assume the corrected concept before that point.

| Chapter | Misconception to correct |
|---:|---|
| 1 | More autonomy always makes software more capable. |
| 3 | A fluent model is a database that knows whether each sentence is true. |
| 4 | Probabilistic components make dependable software impossible. |
| 8 | An agent framework supplies goals, safety, budgets, and correctness automatically. |
| 10 | Retrieval makes every generated claim factual. |
| 12 | Memory means storing every conversation forever. |
| 15 | Better reasoning requires collecting private chain-of-thought. |
| 17 | More agents necessarily produce a better result. |
| 19 | A few impressive demos are an evaluation. |
| 21 | A model judge is objective because it returns a number. |
| 24 | A system prompt is a security boundary. |
| 27 | Governance is a final compliance document owned by someone else. |
| 29 | Retries make distributed actions reliable by themselves. |
| 30 | Logging everything guarantees observability. |
| 33 | The cheapest model creates the cheapest useful system. |
| 34 | A shared application layer guarantees tenant isolation. |
| 35 | Production feedback can be reused without privacy, bias, or rollback controls. |
| 36 | A cloud product choice replaces system design. |

## Cross-Module Prerequisite Rules

1. Prerequisites are direct learning dependencies. Completion of a listed chapter implies its own prerequisite closure; module briefs must not expand every row into a cumulative list.
2. A chapter may use a term without re-teaching it only when the term's introducing chapter is in its prerequisite closure. Otherwise, define the term immediately in plain language.
3. Modules 01 and 02 establish the minimum vocabulary and bounded single-agent baseline. No later module may present retrieval, memory, planning, multi-agent collaboration, or a managed framework as a substitute for that baseline.
4. Context and data features in Module 03 depend on typed boundaries from Chapters 5-8. Permission-aware retrieval must precede identity and tenant-isolation claims in Chapter 26.
5. Workflow, planning, and collaboration choices in Module 04 must retain a simpler baseline. Durable execution in Chapter 16 is required before protocol lifecycle and production reliability work.
6. Chapter 19 freezes measurable success before later optimization, security acceptance, production readiness, or economics claims. Chapters 20-23 supply the regression gate required by all production changes.
7. Security is cumulative, not deferred to Module 06. Earlier chapters must preserve least authority and safe fixtures; Chapters 24-27 formalize the threat, identity, privacy, safety, and governance evidence required by Modules 07-09.
8. Module 07 may distribute only designs already evaluated in Module 05 and controlled in Module 06. Reliability precedes observability, delivery, and scaled state decisions where listed.
9. Module 08 may optimize only against Chapter 19 thresholds and Module 07 telemetry. Cost reductions that violate quality, safety, privacy, reliability, or recovery thresholds fail acceptance.
10. Chapter 36 is synthesis, not first exposure. It must map accepted vendor-neutral interfaces and requirements to Microsoft services, preserve build/buy/hybrid alternatives, and reverify volatile sources within 30 days of release.
11. Cross-module additions or reordered prerequisites require an accepted coordination request. A breaking change invalidates affected downstream briefs and must be reconciled at the next join.

## J2 Acceptance Checklist

- [ ] Chapters 1-36 each appear exactly once and retain all six columns in the chapter matrix.
- [ ] Every chapter has one plain-language reader question, explicit prerequisites, one observable and assessable outcome, one cumulative Northstar increment, and 2-5 approved source IDs.
- [ ] Every source ID exists in `research/source-ledger.csv` with status `approved`; no dossier-only candidate is cited.
- [ ] Every prerequisite points to an earlier chapter, and the prerequisite graph is acyclic.
- [ ] Chapters 1-4 are teachable without machine-learning or cloud background; jargon is defined only after intuition and only within prerequisite closure.
- [ ] Each module outcome and Northstar milestone in the module README is covered by its chapter rows with no orphaned promise.
- [ ] The Northstar increments form a cumulative path from a non-agent baseline through bounded runtime, cited retrieval, evaluated memory, durable work, evaluation, security, operations, scale, and Microsoft synthesis.
- [ ] Multi-agent, protocol, memory, cloud, and optimization choices include a simpler baseline or a measurable adoption criterion.
- [ ] Consequential actions retain authorization, idempotency, audit, cancellation, and recovery requirements wherever applicable.
- [ ] Private chain-of-thought is not required as an interface, trace, outcome, or evaluation artifact.
- [ ] Accessibility, privacy, tenant isolation, source freshness, rollback, and qualified legal review appear before production-readiness acceptance.
- [ ] Module leads can derive chapter briefs without inventing new prerequisites, outcomes, Northstar responsibilities, or unapproved evidence.
- [ ] CURRICULUM and NORTHSTAR contracts have been reconciled with no incompatible milestone API, data, threat-boundary, evaluation, or architecture requirements.
- [ ] The Editor-in-Chief records J2 acceptance before Stage S3 begins; unresolved blocking coordination requests keep J2 open.