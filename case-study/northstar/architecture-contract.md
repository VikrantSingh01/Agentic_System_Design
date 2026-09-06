# Northstar Research Assistant Architecture Contract

> Status: Stage S2 candidate for J2 freeze
> Owner: NORTHSTAR architecture agent
> Contract date: 2026-09-05
> Evidence baseline: `research/source-ledger.csv` accessed 2026-09-05

## Contract role

This document defines the cumulative architecture contract for the Northstar Research
Assistant. It constrains later module briefs, chapters, labs, and the production reference
implementation. It does not draft chapter prose or prescribe implementation code.

The durable architecture is vendor-neutral. Product mappings are replaceable adapters, not
domain dependencies. Private chain-of-thought is never an input, output, log, approval
artifact, or evaluation requirement. Observable plans, state transitions, tool requests,
tool results, policy decisions, approvals, citations, and outcomes are the inspectable record.

## Purpose and non-agent baseline

Northstar helps an authorized knowledge worker answer a research question using approved
enterprise and public sources, then produces a report whose material claims can be traced to
those sources. It may resume long-running work and, only within delegated authority, request
consequential actions such as publishing or sharing a report.

The mandatory non-agent baseline is a deterministic search-and-template workflow:

1. Accept a question and explicit source scope.
2. Apply identity and tenant filters.
3. Run a fixed retrieval query.
4. Rank and select a fixed number of results.
5. Fill a report template with extracts and source links.
6. Require a person to review and publish the report.

Every agentic addition must beat or complement this baseline on declared quality, safety,
latency, or cost measures. If it does not, Northstar uses the baseline. This simplicity-first
rule is supported by SRC-013 and SRC-020.

## Users and declared deployment context

### Users

- Researcher: submits questions, narrows scope, reviews drafts, and owns the task outcome.
- Reviewer or approver: has authority and enough context to approve a consequential action.
- Source owner: controls access, freshness, and permitted use of an indexed source.
- Tenant administrator: configures connectors, policy, budgets, retention, and roles.
- Operator or SRE: operates the service without receiving unrestricted content access.
- Security, privacy, legal, accessibility, and responsible-AI reviewers: assess evidence
  within their qualifications and authority.
- Auditor: reads minimized, access-controlled evidence but cannot alter execution history.

### Initial declared context

The initial production target is an internal enterprise application for knowledge workers.
It serves one organization, one tenant, and one primary region. It searches only sources that
the organization has approved and that the requesting user may access. It produces advisory
research reports, not binding decisions. It does not make employment, credit, healthcare,
legal, safety-critical, or other high-impact decisions. It does not browse arbitrary sites,
control a general desktop, purchase goods, send messages, or publish externally by default.

The initial data plane remains in the declared primary region unless an approved connector or
model endpoint has a documented transfer path. The organization is assumed to control user
identity, source authorization, retention policy, and the final publication decision.

These deployment statements are design assumptions, not findings of legal applicability or
compliance. Jurisdiction, sector, organizational role, data-transfer rules, accessibility
duties, records duties, and retention requirements require qualified review before deployment.
Legal sources inform engineering questions but do not make this contract legal advice
(SRC-057, SRC-058, SRC-062, SRC-063, SRC-064, SRC-065, SRC-066, SRC-067, SRC-068,
SRC-069).

## Goals

1. Produce useful reports with source-level citations for material factual claims.
2. Preserve source permissions and delegated user authority through retrieval and actions.
3. Make the observe-decide-act trajectory inspectable without exposing private reasoning.
4. Bound every run by explicit step, model, tool, time, token, and monetary budgets.
5. Pause for meaningful human approval before consequential or expanded-authority actions.
6. Resume long-running work without duplicating side effects.
7. Measure retrieval, report, trajectory, safety, latency, reliability, and cost quality.
8. Isolate tenant data, policy, encryption context, quotas, traces, and administrative access.
9. Support regional recovery and component replacement without changing domain contracts.
10. Retain only policy-required, purpose-limited state and evidence.

## Non-goals

- General autonomous web browsing or computer control.
- Open-ended action outside an allowlisted task and tool policy.
- Replacing professional judgment or making regulated or high-impact decisions.
- Treating a long context window, vector index, transcript, or model weights as memory by
  default.
- Requiring multiple agents when a deterministic workflow or single agent is sufficient.
- Training a foundation model or preserving private model reasoning.
- Claiming that citations prove truth, that approval removes risk, or that a product makes the
  system compliant.
- Guaranteeing universal protocol interoperability, exact model behavior, or zero failure.

## System invariants

1. Deny by default: no tool executes without a task, tenant, principal, policy decision, and
   validated typed request.
2. Authority cannot increase through model output, retrieved content, protocol messages, or a
   retry.
3. Retrieval results never exceed the requesting principal's effective source permissions.
4. Untrusted content is data, never control-plane instruction.
5. Consequential effects require a valid approval bound to the exact action payload and
   expiry window.
6. Every effect uses an idempotency key and a durable outcome record.
7. Tenant identity is carried and checked at every state, data, cache, queue, tool, trace, and
   administrative boundary.
8. Budget exhaustion, policy uncertainty, stale approval, identity loss, or state conflict
   terminates or safely pauses the run.
9. Generated text cannot directly invoke infrastructure or data-plane credentials.
10. Logs and traces are minimized and redacted by default.

## Observe-decide-act loop

Northstar uses an explicit state machine around probabilistic model calls (SRC-001, SRC-002,
SRC-008).

### Observe

The runtime assembles a bounded observation from the task specification, principal and tenant
context, policy snapshot, current checkpoint, remaining budgets, approved source metadata,
prior typed tool results, approval state, and cancellation or deadline signals. Retrieved
documents and remote protocol payloads are labeled untrusted. Context selection is explicit,
measured, and compacted without silently changing durable task state (SRC-006, SRC-014).

### Decide

The policy gate first determines which transitions and tools are eligible. A deterministic
workflow or model then proposes one typed next action, a bounded plan update, a request for
clarification, a request for approval, or termination. The runtime validates the proposal
against schema, authority, budget, and task state. Model text cannot override policy.

### Act

The runtime executes at most one validated transition, records its result, updates budgets,
and checkpoints durable state. Read tools return provenance and authorization metadata.
Effectful tools require idempotency and may require approval. The next observation contains a
bounded result, not implicit access to the environment.

### Feedback and stop

Tool errors, retrieval quality, evaluator signals, user changes, approvals, cancellation,
deadlines, and budget consumption become feedback. The loop stops with one terminal status:
`completed`, `completed_with_warnings`, `needs_clarification`, `awaiting_approval`,
`budget_exhausted`, `cancelled`, `policy_denied`, `failed_recoverable`, or `failed_terminal`.

## Typed tools and authority boundaries

All types below are logical contracts. Transport and provider schemas are adapters.

| Tool contract | Typed input | Typed output | Authority class | Required controls |
|---|---|---|---|---|
| `search_sources` | `SearchQuery`, `SourceScope`, `PrincipalContext`, `PageCursor?` | `SearchPage<SourceHit>` | Read | Permission filter, query limit, provenance, no cross-tenant cache |
| `fetch_source` | `SourceRef`, `PrincipalContext`, `ContentRange?` | `AuthorizedDocument` | Read | Reauthorize on fetch, content hash, classification, size limit |
| `inspect_citation` | `CitationRef`, `ClaimText` | `CitationEvidence` | Read | Exact source span, version, access decision, no truth claim |
| `save_checkpoint` | `RunId`, `ExpectedVersion`, `Checkpoint` | `CheckpointReceipt` | Internal write | Compare-and-set, encryption, tenant scope, retention tag |
| `store_draft` | `RunId`, `DraftReport`, `ExpectedVersion` | `DraftReceipt` | Reversible write | Versioning, tenant scope, classification, no publication |
| `request_approval` | `ActionIntent`, `PayloadDigest`, `RiskSummary`, `Expiry` | `ApprovalRequest` | Control-plane write | Named approver role, exact payload binding, audit record |
| `publish_report` | `ApprovedAction`, `ReportVersion`, `IdempotencyKey` | `PublicationReceipt` | Consequential effect | Fresh approval, delegated authority, destination allowlist, dedupe |
| `cancel_run` | `RunId`, `PrincipalContext`, `Reason` | `CancellationReceipt` | Control-plane write | Ownership or operator role, durable cancellation propagation |
| `emit_evidence` | `EvidenceEvent` | `EvidenceReceipt` | Audit write | Redaction, append-only semantics, access policy, retention tag |

Required shared types:

- `PrincipalContext`: tenant ID, subject ID, authentication method, delegated scopes, workload
  identity, policy version, and expiry. User and workload identities remain distinct.
- `SourceRef`: tenant, source system, immutable or versioned object ID, version, and locator.
- `AuthorizedDocument`: content or extract plus source version, content hash, classification,
  permission decision ID, and retrieval time.
- `ActionIntent`: tool, exact destination, exact payload digest, consequence class, purpose,
  requested principal, deadline, and compensation option.
- `ApprovalRecord`: approver identity and role, action digest, decision, reason, policy version,
  issued time, expiry, and revocation status.
- `EvidenceEvent`: tenant, run, trace, actor, event type, schema version, timestamp, redacted
  attributes, and integrity metadata.

Tool schemas use explicit enums, bounded strings and collections, normalized identifiers, and
closed objects where practical. Unknown fields fail validation. Tool errors are typed as
`invalid_request`, `unauthenticated`, `forbidden`, `not_found`, `conflict`, `rate_limited`,
`deadline_exceeded`, `dependency_failed`, or `internal_error`. Retries are allowed only for
declared retryable errors.

## Authority model

Authority is the intersection of task policy, tenant policy, user delegation, workload
identity, tool policy, source or destination policy, approval state, region policy, and
remaining budget. The most restrictive result wins.

- Class A, read-only: search and fetch approved content already visible to the user.
- Class B, reversible internal write: save a checkpoint or private draft.
- Class C, consequential internal effect: share, notify, alter a governed record, or expose a
  report beyond the task owner.
- Class D, external or high-impact effect: publish externally, spend money, change access,
  execute code, or affect a person. Class D is outside the initial deployment.

Class A may run automatically within scope. Class B requires declared task consent and audit.
Class C requires per-action approval. Class D is denied until a later contract revision,
qualified review, dedicated evaluation, and explicit governance acceptance.

## Data classes and retention assumptions

| Class | Examples | Default handling | Initial retention assumption |
|---|---|---|---|
| D0 Public | Approved public pages, public citations | Integrity and provenance controls | Source metadata while indexed; content per source license and policy |
| D1 Internal | Internal documents, task metadata, drafts | Tenant access control and encryption | Draft and run state 30 days after terminal status |
| D2 Confidential | Restricted research, user prompts, retrieved extracts | Least privilege, field redaction, no default trace body | Extracts only for active run; minimized evidence 90 days |
| D3 Highly restricted | Secrets, credentials, special-category or regulated data | Reject or use a separately approved isolated path | Not accepted by initial Northstar |
| D4 Security and audit | Policy decisions, approvals, effect receipts, incident evidence | Append-only logical record, restricted access, integrity checks | 365 days, subject to qualified policy review |

Retention values are initial design assumptions, not legal requirements. Source contracts,
litigation holds, records schedules, privacy rights, security needs, and jurisdictional rules
may require shorter or longer periods after qualified review. Deletion must cover primary
stores, indexes, caches, derived memory, evaluation corpora, and scheduled backup expiry.
Backups need documented expiry rather than an immediate-deletion promise.

Credentials, raw secrets, private chain-of-thought, and unrestricted source bodies are never
stored in prompts, memory, traces, or approval records. Evaluation data is a separate purpose
with separate access and retention approval.

## State and memory

Northstar separates six forms of state:

1. Request state: immutable task goal, source scope, output contract, owner, and deadlines.
2. Execution state: state-machine position, attempts, leases, budgets, and checkpoints.
3. Working context: bounded, disposable model input reconstructed from authorized state.
4. Artifact state: versioned notes, citation graph, draft, and final report.
5. Memory: an optional, evaluated store of user-approved facts or preferences with provenance,
   confidence, purpose, expiry, edit, export, and deletion controls.
6. Evidence state: minimized policy, approval, trajectory, evaluator, release, and incident
   records.

Conversation history is not automatically memory. Retrieved text is not promoted to memory.
Cross-run memory is off by default and cannot cross tenants. A memory feature is admitted only
when a representative evaluation shows benefit over reconstructing context and when deletion,
correction, provenance, poisoning resistance, and retention controls pass review (SRC-014).

## Budgets and termination

Each run receives a signed or policy-bound `RunBudget` with hard ceilings for model calls, tool
calls by class, loop steps, input and output tokens, wall-clock time, retry attempts, retrieved
bytes, concurrent subtasks, and monetary cost. Child tasks draw from the parent's budget and
cannot mint capacity.

Initial offline lab defaults are 12 loop steps, 8 model calls, 20 read-tool calls, 2 write-tool
calls, 32,000 total model tokens, 20 MiB retrieved content, 10 minutes wall time, 2 attempts per
retryable operation, no Class C or D effects, and zero provider spend. Live exercises are
opt-in and require a separately configured monetary ceiling. Production values remain an
unresolved capacity decision and must be measured before J5 acceptance.

The runtime terminates or safely pauses on completion criteria, user cancellation, deadline,
budget exhaustion, repeated no-progress transitions, repeated identical tool requests,
unresolved schema failure, policy denial, lost identity, approval expiry, state-version
conflict, dependency circuit opening, or operator stop. Partial artifacts are labeled with
status and must never appear as approved final reports.

## Human approvals

Approval is a state transition, not a chat phrase. The reviewer receives the proposed action,
destination, exact report version and payload digest, source and citation summary, data
classification, known warnings, policy result, cost or exposure consequence, rollback or
compensation limits, and approval expiry.

The approver must be authenticated, authorized for that consequence class, distinct from the
workload identity, and able to reject, edit, narrow, or cancel. Approval cannot be reused after
payload, destination, principal, policy, or report version changes. Self-approval is denied
where tenant policy requires separation of duties. Bulk approval is outside the initial
deployment. Reviewer wait time, rejection and override rates, stale approvals, and workload
are measured to detect rubber-stamping and fatigue.

What constitutes legally sufficient or meaningful human oversight is context-dependent and
requires qualified legal, domain, accessibility, and governance review.

## Threat model

### Protected assets

Source content and permissions, tenant boundaries, identities and tokens, report integrity,
citations, policy and approval records, execution state, budgets, service availability,
telemetry, encryption material, and evaluator or release evidence.

### Trust boundaries

User interface to API, API to runtime, runtime to model, runtime to tools, connector to source,
protocol adapter to remote peer, queue to worker, worker to state store, application to
telemetry backend, tenant administration to control plane, region to region, and build to
deployment. Model output, retrieved content, uploaded files, remote peers, and tool responses
are untrusted even when authenticated.

### Priority threats and required treatments

| Threat | Required treatments |
|---|---|
| Direct or indirect prompt injection | Separate instructions from data, label provenance, constrain tools, validate outputs, test adversarial sources |
| Excessive agency or confused deputy | Capability allowlists, delegated scopes, workload/user identity separation, approval binding, deny by default |
| Cross-tenant or permission leakage | Tenant-scoped keys and queries, source reauthorization, cache partitioning, negative isolation tests |
| Data exfiltration | Destination allowlists, egress policy, classification, DLP-style checks, redacted telemetry, output limits |
| Insecure tool input or output | Closed schemas, canonicalization, size limits, content handling, sandboxing for any future code execution |
| Memory or index poisoning | Trusted ingestion, source versioning, provenance, quarantine, rollback, anomaly and quality checks |
| Identity or token theft | Short-lived credentials, secretless workload identity where available, audience restriction, rotation, no prompt exposure |
| Approval spoofing or replay | Authenticated approver, payload digest, nonce, expiry, revocation, append-only decision evidence |
| Duplicate or partial side effect | Idempotency key, transactional intent/outcome record, retry policy, reconciliation, compensation where valid |
| Denial of service or budget abuse | Per-user and tenant quotas, bounded fan-out, deadlines, backpressure, rate limits, circuit breakers |
| Supply-chain compromise | Pinned dependencies, provenance, scanning, isolated builds, signed artifacts, staged release and rollback |
| Sensitive observability | Data minimization, attribute allowlists, sampling, encryption, role-limited trace access, retention expiry |
| Evaluator manipulation | Held-out sets, evaluator calibration, human audits, versioning, anti-gaming tests, independent safety gates |
| Regional failure or inconsistent policy | Versioned policy replication, fail-closed routing, recovery objectives, reconciliation drills |

The threat model uses system-specific analysis informed by NIST AI RMF, OWASP, MITRE ATLAS,
and secure AI lifecycle guidance; no taxonomy is treated as complete (SRC-035, SRC-057,
SRC-058, SRC-059, SRC-060).

## Evaluation and SLO outline

### Evaluation gates

- Task outcome: answer completeness, factual correctness, uncertainty handling, and report
  usefulness against representative tasks.
- Citations: citation precision, citation coverage for material claims, source version match,
  and entailment between claim and cited span.
- Retrieval: permission-filter recall, relevance, freshness, diversity, and no unauthorized
  result exposure.
- Trajectory: correct tool choice and arguments, policy adherence, progress, stop behavior,
  retry safety, and approval behavior.
- Security and safety: injection resistance, exfiltration attempts, tenant isolation, harmful
  content handling, and authority escalation tests.
- Human factors: approval comprehension, accessibility, reviewer burden, automation bias, and
  recovery from errors.
- Operations: latency, availability, resume success, queue age, error rates, saturation,
  recovery, and data restore.
- Economics: tokens, model calls, retrieval work, storage, telemetry, and cost per accepted
  report, compared with the baseline.

Evaluation sets are versioned by task, tenant-safe data class, difficulty, language or modality
where applicable, risk, and expected evidence. Deterministic evaluators run first. Calibrated
model-based evaluators may supplement, not silently replace, human judgment. Evaluator
agreement, false-positive and false-negative rates, and drift are measured (SRC-009, SRC-024,
SRC-057).

### Candidate service levels

These are initial design targets, not measured commitments. J5 must replace or ratify them
using workload evidence.

| Signal | Candidate target | Status |
|---|---|---|
| Unauthorized source or cross-tenant disclosure | 0 known events; immediate incident path | Safety invariant |
| Consequential action without valid approval | 0 events | Safety invariant |
| Citation precision on accepted benchmark reports | >= 98% | Quality SLI |
| Material-claim citation coverage | >= 95% | Quality SLI |
| Benchmark report acceptance without material correction | >= 85% | Outcome SLI |
| Interactive API availability | >= 99.5% monthly | Availability SLO |
| Short benchmark report latency | p95 <= 5 minutes | Latency SLO |
| Durable run recovery after worker interruption | >= 99% in recovery tests | Reliability SLO |
| Runs respecting hard budgets | 100% | Control invariant |
| Approval request delivery | p95 <= 60 seconds when dependency is healthy | Workflow SLO |

Error budgets govern rollout speed for service-level failures but never authorize spending a
safety invariant. SLO and incident practices follow durable SRE principles (SRC-028, SRC-029).

## Durable execution

The durable unit is a `Run` with an immutable request and versioned state. Each transition is
recorded before dependent work proceeds. Workers are stateless and acquire renewable leases.
Activities have stable IDs, deadlines, typed retry policy, and idempotency keys. Model calls
and reads may be repeated only when policy permits; effectful operations use intent, outcome,
and reconciliation records.

Checkpoints store logical state, not process memory. Resume reconstructs bounded context from
the latest committed checkpoint and revalidates identity, policy, source access, budgets,
approval freshness, and component versions. Human approval is a durable wait with cancellation
and expiry. Fan-out is bounded, child state is tenant-scoped, and joins define partial-failure
behavior. Non-idempotent effects require a provider-supported dedupe mechanism or explicit
reconciliation; prompt instructions to avoid duplication are insufficient.

Recovery testing covers worker loss, model timeout, queue redelivery, duplicate messages,
checkpoint conflict, dependency outage, approval during failover, cancellation races, region
loss, and restore from backup. These semantics reflect established durable workflow patterns
(SRC-049, SRC-054, SRC-061).

## Multi-tenant and multi-region path

### Tenant path

The first deployment is single-tenant but every domain key includes `tenant_id`. Shared
components are admitted only after isolation tests cover identity, policy, data stores,
indexes, caches, queues, encryption context, telemetry, evaluation data, quotas, billing, and
operator access. Per-tenant configuration is versioned. No global memory or cross-tenant
retrieval corpus is allowed. High-sensitivity or high-scale tenants may receive dedicated
stamps without changing domain interfaces.

### Region path

The first deployment uses one primary region plus tested backup and restore. The next step is
a deployment-stamp model with a tenant home region, region-aware routing, replicated control
metadata, region-local data plane, and explicit recovery point and recovery time objectives.
Failover revalidates data residency, model and tool availability, policy versions, keys,
approvals, queue ownership, and idempotency records. Active-active execution is not assumed;
single-writer ownership or conflict semantics must be proven before concurrent regional work.

Routing never moves a task merely because capacity is available. Tenant policy, source
location, contractual transfer limits, qualified legal review, and dependency availability
must permit the move. Regional product availability, quotas, prices, and data handling are
release-time facts, not durable assumptions (SRC-045, SRC-046).

## Vendor-neutral component model

| Component | Durable responsibility | Replaceable boundary |
|---|---|---|
| Experience adapter | Task entry, progress, clarification, approval, cancellation, accessible report delivery | Web, chat, API, or protocol UI |
| API and admission control | Authentication, validation, tenant resolution, rate limits, request IDs | Gateway and transport |
| Task service | Immutable task contract, ownership, status, artifact references | Database implementation |
| Runtime | Observe-decide-act state machine, budgets, termination, context assembly | Custom or framework adapter |
| Policy decision point | Authority intersection, consequence classification, approval rules | Policy engine |
| Model gateway | Model capability contract, routing, timeout, quota, safety metadata | Model provider |
| Retrieval service | Permission-aware search, ranking, source versions, citation spans | Search engine and index |
| Connector and tool gateway | Typed tools, credential isolation, validation, egress, idempotency | Native, REST, MCP, or other adapter |
| Workflow service | Durable timers, retries, queues, waits, checkpoints, cancellation | Workflow or messaging platform |
| State and artifact stores | Versioned run state, drafts, reports, citation graph, evidence | Data products by access pattern |
| Approval service | Exact-action review, decision evidence, expiry, revocation | UI and workflow integration |
| Evaluation service | Datasets, deterministic and calibrated evaluators, release gates | Evaluation platform |
| Observability pipeline | Stable internal events, redaction, metrics, logs, traces, alerts | Telemetry backend and conventions |
| Governance control plane | Tenant config, inventory, retention, model and source registry, evidence | Administrative platform |
| Deployment platform | Isolation, scaling, health, rollout, rollback, regional stamps | Compute and delivery platform |

MCP, A2A, and AG-UI may be adapters at different boundaries. They do not replace domain
identity, authorization, consent, policy, or business semantics. Protocol and telemetry
schemas are pinned and translated from stable internal contracts (SRC-016, SRC-034, SRC-055,
SRC-056).

## Microsoft target mapping

This section is a dated target mapping, not the durable architecture. Every statement in this
table is a volatile product claim and must be reverified against its listed approved ledger
source within 30 days of release. Regional availability, release state, SDK support, service
limits, prices, identity behavior, network features, data handling, and exact product names
remain unasserted until that verification.

| Vendor-neutral responsibility | Dated Microsoft target candidate | Claim status and approved ledger evidence |
|---|---|---|
| Model, agent, evaluation, and operations project surface | Microsoft Foundry | VOLATILE PRODUCT CLAIM, SRC-040 |
| Optional hosted agent execution boundary | Foundry Agent Service | VOLATILE PRODUCT CLAIM, SRC-041 |
| Optional Python agent framework adapter | Microsoft Agent Framework | VOLATILE PRODUCT CLAIM, SRC-042 |
| Permission-aware lexical, vector, or hybrid retrieval candidate | Azure AI Search | VOLATILE PRODUCT CLAIM, SRC-043 |
| Python credential adapter for configured user or workload identity paths | Azure Identity client library for Python | VOLATILE PRODUCT CLAIM, SRC-044 |
| Architecture and regional design review inputs | Azure Architecture Center guidance | VOLATILE MICROSOFT GUIDANCE CLAIM, SRC-045 |
| Reliability, security, cost, operations, and performance review input | Azure Well-Architected Framework | VOLATILE MICROSOFT GUIDANCE CLAIM, SRC-046 |
| OpenTelemetry export and application telemetry candidate | Azure Monitor and Application Insights integration | VOLATILE PRODUCT CLAIM, SRC-047 |
| Managed container hosting and event-driven scaling candidate | Azure Container Apps | VOLATILE PRODUCT CLAIM, SRC-048 |
| Durable command queue and topic candidate | Azure Service Bus | VOLATILE PRODUCT CLAIM, SRC-049 |

Chapter 42 names additional Microsoft targets, including Azure OpenAI, Cosmos DB, Microsoft
Entra ID, Key Vault, content safety and governance products, API Management, delivery systems,
and infrastructure-as-code tooling. The approved ledger does not yet contain claim-level
entries for those specific mappings. They are unresolved and must not be presented as selected
or supported components until the Source Editor adds approved evidence and release-time review
marks every resulting product claim volatile.

## Chapter-by-chapter cumulative increments

Each increment preserves all earlier invariants. An increment defines the Northstar artifact
or decision that its chapter must add; it is not a chapter draft.

| Chapter | Cumulative Northstar increment | Acceptance evidence |
|---:|---|---|
| 1 | Record the research problem, autonomy spectrum, agent suitability test, and deterministic non-agent baseline. | Decision record compares no-agent, workflow, and agent options (SRC-001, SRC-002, SRC-013, SRC-020). |
| 2 | Add the environment, observations, decisions, actions, feedback, state, goals, and terminal statuses. | State-machine diagram and trace enumerate every transition. |
| 3 | Mark model inference as probabilistic and bound tokens, context, hallucination, and nondeterminism assumptions. | Model contract lists measured capabilities and failure cases (SRC-003, SRC-004). |
| 4 | Separate deterministic control plane from probabilistic decisions and freeze domain interfaces. | Boundary review shows policy, state, and authority outside prompts (SRC-070). |
| 5 | Add versioned message roles, prompt inputs, untrusted-content labels, and schema-constrained outputs. | Invalid and extra fields fail closed; no private reasoning is required (SRC-023). |
| 6 | Add a model gateway, capability profile, selection criteria, fallback policy, and model-specific evaluation set. | At least one deterministic model double and one replaceable provider adapter contract. |
| 7 | Add the typed read tools, error taxonomy, schema validation, provenance, and tool-specific authority. | Contract tests cover valid, malformed, forbidden, and oversized calls (SRC-008, SRC-038). |
| 8 | Assemble the first bounded offline runtime with explicit budgets, stop rules, and the fixed baseline path. | Deterministic trace completes and budget exhaustion terminates safely (SRC-013, SRC-020). |
| 9 | Add measured context assembly, prioritization, compaction, and context provenance. | Context ablation checks quality, token use, and lost-in-the-middle failure (SRC-006, SRC-014). |
| 10 | Add retrieval ingestion, chunk and source identity, permission filters, and claim-to-source citations. | Retrieval fixture proves grounding and access filtering (SRC-005). |
| 11 | Add hybrid retrieval, reranking, query transformation, freshness, and citation-span verification where evaluation supports them. | Retrieval benchmark reports recall, precision, latency, and permission-filter results (SRC-005, SRC-006). |
| 12 | Add optional cross-run memory only behind provenance, consent, correction, expiry, and measured-value gates. | Baseline comparison justifies each memory field; deletion test removes derived copies (SRC-014). |
| 13 | Add accessible multimodal input or document interaction as a constrained read capability, not general computer control. | Modality-specific evaluation and accessible alternative pass; arbitrary desktop action remains denied (SRC-011, SRC-066). |
| 14 | Add explicit deterministic workflow patterns and routing criteria around the agent loop. | Workflow beats or loses to the agent on declared task classes with recorded tradeoffs (SRC-013, SRC-020). |
| 15 | Add bounded, observable plan artifacts, replanning triggers, and plan validation without collecting private reasoning. | Planning evaluation measures outcome, extra steps, latency, cost, and recovery (SRC-007, SRC-008). |
| 16 | Add durable checkpoints, queues, timers, retries, cancellation, approval waits, idempotency, and reconciliation. | Interruption and duplicate-delivery tests resume without duplicate effects (SRC-049, SRC-054, SRC-061). |
| 17 | Add multi-agent collaboration only for an evaluated decomposition, with parent budgets and isolated contexts. | Multi-agent version is compared with the workflow and single-agent baseline and can be disabled (SRC-002, SRC-013, SRC-020). |
| 18 | Expose one protocol-bounded capability through an adapter with versioning, identity, authorization, cancellation, and untrusted payload handling. | Contract and adversarial tests prove protocol compatibility does not imply trust (SRC-016, SRC-034, SRC-055). |
| 19 | Freeze measurable outcome, citation, retrieval, trajectory, safety, latency, reliability, human-factor, and cost definitions. | Metric specification names owners, slices, thresholds, and failure actions (SRC-009, SRC-057). |
| 20 | Build versioned representative evaluation sets with provenance, risk slices, expected evidence, and leakage controls. | Dataset review covers representativeness, privacy, contamination, and change history. |
| 21 | Add deterministic evaluators, calibrated model-based evaluators, and qualified human review. | Calibration reports agreement and error rates; no single model judge is an unreviewed release gate (SRC-009, SRC-024). |
| 22 | Evaluate complete trajectories, tool selection, argument validity, stop behavior, approvals, and recovery in simulated environments. | Replayable traces include successful, failed, adversarial, and budget-exhausted runs (SRC-008, SRC-010, SRC-011). |
| 23 | Add trace-based debugging, component ablations, regression gates, and cost-quality optimization. | A diagnosed regression maps from SLI to trace to component fix and rollback (SRC-024, SRC-025). |
| 24 | Complete the asset, actor, boundary, misuse-case, and risk-register threat model. | Security review maps prioritized threats to tests and owners (SRC-035, SRC-057, SRC-058, SRC-059, SRC-060). |
| 25 | Add least-authority tool gateways, sandbox requirements for any future code or computer use, egress control, and protocol-peer distrust. | Injection, exfiltration, schema, destination, and escalation tests fail safely (SRC-026, SRC-059, SRC-060). |
| 26 | Propagate delegated identity, isolate workload identity, classify data, enforce privacy lifecycle controls, and test accessible approvals and outputs. | End-to-end authorization, deletion, export, redaction, and accessibility evidence is reviewed (SRC-044, SRC-063, SRC-066, SRC-067). |
| 27 | Add accountable ownership, intended-use inventory, risk acceptance, meaningful oversight measures, incident handling, change evidence, and retirement criteria. | Governance review links policy to operating evidence; legal conclusions remain with qualified reviewers (SRC-015, SRC-057, SRC-058, SRC-062, SRC-064, SRC-065, SRC-068, SRC-069). |
| 28 | Assemble the vendor-neutral production reference architecture and deployment-context decision record. | Every component has an owner, interface, data class, trust boundary, failure mode, and replacement path (SRC-045, SRC-070). |
| 29 | Add dependency objectives, backpressure, circuit breakers, load shedding, recovery objectives, backups, restores, and failure drills. | Reliability tests cover dependency and worker loss; restore meets candidate objectives (SRC-028, SRC-029, SRC-049). |
| 30 | Add stable internal telemetry events, redaction, correlation, SLIs, SLOs, alerts, dashboards, and incident links. | A synthetic failure is detected and diagnosed without exposing protected content (SRC-028, SRC-029, SRC-056). |
| 31 | Add isolated build, configuration, infrastructure, staged deployment, release gates, rollback, and environment promotion. | A failed canary rolls back while durable runs remain recoverable (SRC-029, SRC-045). |
| 32 | Add tenant-keyed partitioning, concurrency control, index lifecycle, evidence integrity, backup expiry, and data migration semantics. | Scale, conflict, restore, retention, and deletion tests cover primary and derived state (SRC-049, SRC-063). |
| 33 | Add workload model, per-accepted-report economics, caching policy, batching or routing only when measured, quotas, and capacity plan. | Load test reports quality, p50/p95/p99 latency, saturation, unit cost, and hard-budget compliance (SRC-046, SRC-052). |
| 34 | Add tenant stamps, isolation tiers, home-region routing, residency constraints, regional recovery, and failover consistency rules. | Cross-tenant negative tests and regional game day meet declared RPO and RTO assumptions (SRC-045). |
| 35 | Add versioned model, prompt, policy, evaluator, connector, index, and schema migrations with shadowing, canary, rollback, and retirement. | Change record proves compatibility, regression gates, rollback, and post-release monitoring (SRC-012, SRC-028, SRC-064, SRC-070). |
| 36 | Add policy-controlled routing across deterministic, device, edge, and cloud paths without weakening quality, privacy, authority, or compatibility gates. | Replayable routing tests explain every selected and rejected path and preserve an accepted deterministic fallback. |
| 37 | Add end-to-end latency, energy, thermal, network, and sustained-operation budgets for supported device and cloud classes. | Benchmarks report accepted outcomes under warm, cold, throttled, disconnected, and constrained-power conditions. |
| 38 | Add layered component, contract, system, fault-injection, and recovery tests for the hybrid architecture. | Fault evidence shows useful work survives expected failures while duplicate, dangerous, or uncertain work remains bounded. |
| 39 | Add a governed tool portfolio with lifecycle metadata and an authorization-filtered, task-relevant tool frontier. | Tests prove unavailable, incompatible, excessive, and unauthorized tools never enter the model-visible set. |
| 40 | Add preventive, detective, containment, recovery, test, evidence, and ownership controls for hybrid AI threats. | Continuous assurance links each prioritized threat to controls, telemetry, exercises, evidence, and an accountable owner. |
| 41 | Add a tested user contract that makes system capability, authority, state, evidence, uncertainty, controls, and limits legible. | Usability and accessibility evidence shows users can predict behavior, inspect evidence, intervene, recover, and report harm. |
| 42 | Map the accepted architecture to verified Microsoft targets and conduct a production-readiness review without weakening vendor-neutral contracts. | Every product claim is marked volatile, cites an approved ledger ID, and is reverified within 30 days; unresolved mappings remain explicit (SRC-040 through SRC-049). |

## Unresolved decisions

The owner and join gate must either resolve each item or carry it forward with an owner,
deadline, and consequence.

| ID | Decision | Required evidence or owner |
|---|---|---|
| U-01 | Exact production step, token, time, cost, retrieval, retry, and concurrency budgets | Capacity and evaluation owners after representative benchmark |
| U-02 | Final quality and SLO thresholds, error-budget policy, RPO, and RTO | Product, SRE, security, and data owners before J5 |
| U-03 | Source systems, source licenses, indexing boundaries, and authorization semantics | Source owners, security, privacy, and legal reviewers |
| U-04 | Whether cross-run personal or organizational memory has measurable value | Evaluation and privacy review; default remains off |
| U-05 | Which Class C actions beyond report publication are in scope | Product and governance decision plus dedicated threat and evaluation evidence |
| U-06 | Approval separation of duties, expiry, escalation, and emergency-stop policy | Tenant governance, security, accessibility, and qualified legal review |
| U-07 | Initial jurisdiction, sector, organizational legal role, records schedule, and transfer constraints | Qualified legal and privacy reviewers; no compliance claim before resolution |
| U-08 | Tenant isolation tier and criteria for dedicated deployment stamps | Security, SRE, data, and economics evidence |
| U-09 | Regional topology, home-region policy, data replication, RPO, RTO, and active-active eligibility | Architecture, data, SRE, and qualified transfer review |
| U-10 | Durable workflow and messaging products | Architecture decision against the durable semantics in this contract |
| U-11 | Model gateway providers, fallback behavior, and data-use terms | Evaluation, procurement, security, privacy, and legal review |
| U-12 | Protocol adapters and pinned versions, if any | Demonstrated partner need and contract, identity, and threat tests |
| U-13 | Multimodal formats and any future computer-use boundary | Accessibility, security, safety, and task-value evidence; default denied |
| U-14 | Operator access, evidence integrity mechanism, and incident disclosure workflow | Security, SRE, privacy, governance, and legal review |
| U-15 | Microsoft mappings named by Chapter 42 but absent from the approved ledger | Source Editor adds claim-level evidence before product selection or prose |
| U-16 | Current names, availability, regions, SDKs, quotas, prices, data handling, and service boundaries for every Microsoft target | Release Editor rechecks primary sources within 30 days of release |

## J2 acceptance checklist

- [ ] Purpose, users, non-agent baseline, and the initial deployment context are explicit.
- [ ] Goals and non-goals bound the system and exclude high-impact autonomous decisions.
- [ ] The observe-decide-act loop has typed states, feedback, and terminal conditions.
- [ ] Tool inputs, outputs, errors, authority classes, identities, and effect controls are typed.
- [ ] Consequential actions require exact-payload approval, delegated authority, idempotency,
  and durable evidence.
- [ ] Data classes, minimization, retention assumptions, deletion, backup expiry, and evaluation
  data separation are specified.
- [ ] Request, execution, context, artifact, memory, and evidence state are distinct.
- [ ] Budgets include steps, models, tools, tokens, time, retries, bytes, fan-out, and money;
  child work cannot increase them.
- [ ] Termination, cancellation, no-progress detection, recovery, and partial-artifact labeling
  are defined.
- [ ] Human approval is informed, authorized, accessible, expiring, revocable, and measurable.
- [ ] The threat model covers assets, actors, boundaries, AI threats, conventional threats,
  tenants, regions, supply chain, observability, and evaluators.
- [ ] Evaluation covers outcomes, citations, retrieval, trajectories, safety, human factors,
  operations, and economics against a simpler baseline.
- [ ] Candidate SLIs and SLOs are labeled unmeasured; safety invariants cannot be spent as
  error budget.
- [ ] Durable execution defines checkpoints, retries, waits, leases, idempotency,
  reconciliation, resume revalidation, and failure drills.
- [ ] Tenant and regional evolution preserve isolation, residency constraints, policy,
  approvals, budgets, and effect deduplication.
- [ ] Vendor-neutral components have stable responsibilities and replaceable adapters.
- [ ] Every Microsoft product or guidance claim is explicitly marked volatile and cites an
  approved `SRC-*` ledger ID; unsupported mappings remain unresolved.
- [ ] All 36 chapter increments are present once, are cumulative, and align with the nine
  module outcomes.
- [ ] Legal, regulatory, privacy, records, transfer, accessibility, and compliance statements
  are assumptions or review inputs requiring qualified review.
- [ ] Private chain-of-thought is absent from interfaces, logs, approvals, and evaluations.
- [ ] No chapter prose or implementation code is introduced by this contract.
- [ ] All cited IDs exist in `research/source-ledger.csv` with approved status.
- [ ] Volatile product and protocol claims have a named release-time freshness check.
- [ ] Each unresolved decision has an owner or required evidence and a later acceptance gate.