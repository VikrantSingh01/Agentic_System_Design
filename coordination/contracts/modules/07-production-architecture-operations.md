# Module 07 Contract: Production Architecture and Operations

> Status: proposed for J2 freeze
> Owner: J2 Module 07 contract author
> Contract date: 2026-09-06
> Scope: Chapters 28-32

## Purpose

This contract turns the evaluated, secured Northstar Research Assistant into an operable
production system. It fixes what Chapters 28-32 must teach, build, measure, and hand to
Module 08. It is a chapter-authoring contract, not chapter prose or an implementation.

The module must begin each topic with a familiar, nontechnical first pass and explicitly
state where the analogy stops matching a distributed system. It must then teach the deeper
production mechanism, alternatives, tradeoffs, and failure behavior. Vendor-neutral
responsibilities and interfaces come before product mappings. Every runnable example and lab
uses Python 3.11. No JavaScript, TypeScript, C#, Java, shell implementation, or provider-only
sample may be required to meet a learning outcome.

## Module entry contract

Readers enter with the prerequisite closure of Chapters 16, 18, 22-23, and 25-27. In
particular, they already have:

- a durable workflow with checkpoints, cancellation, approval waits, idempotent activities,
  and duplicate-delivery tests from Chapter 16;
- versioned protocol adapters around provider-neutral domain interfaces from Chapter 18;
- trajectory evaluation, regression diagnosis, and release gates from Chapters 22-23;
- least-authority tools, identity and privacy controls, and accountable governance from
  Chapters 25-27;
- the Chapter 19 quality, safety, latency, and cost thresholds that production changes must
  preserve.

The module must not reopen those contracts or weaken them for operational convenience.
Private chain-of-thought is not a prerequisite, log field, debugging artifact, or evaluation
input.

## Module exit contract

The reader exits with a deployable, vendor-neutral architecture for Northstar and evidence
that it is observable, resilient, releasable, and recoverable. The completed increment must:

1. assign every runtime, model, tool, policy, data, evaluation, telemetry, and administrative
   responsibility to one explicit boundary;
2. pass deterministic dependency-failure and duplicate-delivery exercises;
3. trace a request end to end without exposing protected content;
4. define service-level indicators and candidate objectives with actionable alerts and a
   tested runbook;
5. promote a reproducible artifact through staged release gates, detect a bad canary, and
   roll back without corrupting durable runs;
6. assign each state type to a store and pass evolution, retention, partition, backup, and
   restore checks.

The module does not claim multi-region readiness, proven unit economics, or safe production
learning. Those are Module 08 responsibilities built on this module's evidence.

## Shared vocabulary

| Term | Plain-language meaning |
|---|---|
| Control plane | The components that set policy, configuration, ownership, releases, and administrative decisions. |
| Data plane | The components that process a user's request, model calls, tools, documents, and run state. |
| Responsibility boundary | The place where one component's duty ends and another component's typed contract begins. |
| Failure domain | A set of work that can fail together because it shares a dependency or resource. |
| Idempotency | The property that repeating an operation with the same key has the same effect as doing it once. |
| Backpressure | A signal that slows or rejects new work when downstream capacity is exhausted. |
| Circuit breaker | A stateful guard that temporarily stops calls to an unhealthy dependency. |
| Bulkhead | Resource isolation that prevents one workload or dependency failure from consuming all capacity. |
| Graceful degradation | A bounded fallback that preserves a smaller useful service while declaring reduced capability. |
| Telemetry | Minimized operational signals emitted as metrics, logs, and traces. |
| Trace | Correlated records that follow one request or run across component boundaries. |
| SLI | Service-level indicator, a measured signal of service behavior. |
| SLO | Service-level objective, a target range for an SLI over a stated window. |
| Error budget | The allowed gap between perfect service and an SLO, never permission to violate a safety invariant. |
| Canary | A limited release exposed to a small, controlled slice before wider promotion. |
| Rollback | A tested return to a previously accepted application, configuration, model, prompt, policy, or schema version. |
| Migration | A controlled change to stored data or its schema with compatibility and recovery rules. |
| Partition key | A field used to distribute related records while preserving required isolation and access patterns. |
| Hot key | A partition value that receives enough traffic to become a bottleneck. |
| RPO | Recovery point objective, the maximum acceptable amount of data loss measured in time. |
| RTO | Recovery time objective, the target time to restore an acceptable service. |

Chapter authors may add terms, but they must use these meanings consistently and define each
term in the first-pass lane before relying on it.

## Required module artifacts

The five chapters cumulatively produce one coherent Northstar production packet:

- a component and responsibility catalog with owners, interfaces, trust boundaries, data
  classes, failure modes, and replacement paths;
- separate data-plane and control-plane diagrams;
- a dependency and resilience policy matrix;
- deterministic Python failure-injection fixtures and expected traces;
- a privacy-safe telemetry schema and redaction test set;
- an SLI, SLO, alert, dashboard, runbook, and postmortem packet;
- a versioned release manifest, staged promotion record, canary decision, and rollback record;
- a state-placement and consistency decision table;
- schema migration, retention, deletion, backup, restore, partition, and hot-key evidence;
- an updated Northstar deployment-context decision record listing unresolved production
  budgets, objectives, product choices, and qualified-review needs.

Artifacts must use synthetic tenant-safe fixtures. Live cloud accounts, paid providers,
personal data, production credentials, and consequential actions are optional and cannot be
required for acceptance.

## Chapter 28: Reference Architecture

### Purpose

Teach the reader to turn a collection of evaluated features into a deployable system whose
parts have explicit, nonoverlapping responsibilities. The first pass uses a well-run library:
the front desk accepts requests, librarians perform work, archives store records, and
managers set rules. The analogy stops because software boundaries need typed interfaces,
machine-enforced identity, failure isolation, and measurable replacement contracts.

### Reader question

What parts does the whole production system need, and where do responsibilities belong?

### Prerequisites

Chapters 16, 18, 23, 25, and 26.

### Entry contract

The reader brings Northstar's durable workflow, protocol boundary, regression evidence,
least-authority tool gateway, delegated identity, privacy lifecycle, and fixed domain
interfaces. The chapter may assemble these parts but may not hide policy, authority, durable
state, or evaluation inside prompts or a managed agent product.

### Measurable outcome and exit contract

Given the Northstar requirements, the reader draws a deployable reference architecture and
assigns every runtime, model, tool, policy, data, evaluation, telemetry, and administrative
responsibility to exactly one owning boundary. Acceptance requires every component to list an
owner, typed interface, data class, trust boundary, principal, failure mode, and replacement
path, with no orphaned responsibility.

### Vocabulary delta

Responsibility boundary, control plane, data plane, gateway, adapter, workload identity,
trust boundary, deployment context, and failure domain.

### Required concepts

- Start with the user request path, then add only the components needed to satisfy an existing
  requirement or invariant.
- Separate experience adapter, admission control, task service, runtime, policy decision
  point, model gateway, retrieval service, tool gateway, workflow service, state stores,
  approval service, evaluation service, observability pipeline, governance control plane,
  and deployment platform.
- Distinguish ownership from hosting. A managed service can host behavior without owning
  Northstar's domain policy or contracts.
- Carry tenant, principal, run, trace, policy version, budget, classification, and region
  context across every applicable boundary.
- Keep model output and retrieved content in the data plane as untrusted data. They cannot
  mutate policy, credentials, deployment configuration, or administrative state.
- Compare a modular deployment with a simpler consolidated deployment. Split a component
  only for a measured ownership, scaling, security, lifecycle, or failure-isolation need.
- Identify synchronous request paths, asynchronous durable work, administrative paths, and
  evidence paths separately.

### Northstar increment

Assemble the evaluated and secured components behind API, model, and tool gateways with
separate data and control planes. Add the production reference architecture and a
deployment-context decision record. Preserve Northstar's single-tenant, single-primary-region
initial context and vendor-neutral domain interfaces.

### Required artifacts

- component and responsibility catalog;
- interface and context-propagation matrix;
- data-class and trust-boundary overlay;
- deployment-context decision record comparing consolidated and separated options;
- list of unresolved product, budget, isolation, and recovery decisions with owners.

### Diagram intents

1. Beginner concept picture: a request moving through a front door, coordinator, specialist
   services, and records area, with one plain responsibility per box.
2. Production boundary diagram: separate control and data planes, label trust boundaries,
   principals, gateways, stores, and telemetry flow.
3. Sequence diagram: follow one Northstar research request through admission, durable runtime,
   retrieval, model, evaluation, approval state, and artifact storage.

Each diagram needs a one-sentence takeaway and an equivalent numbered text description.

### Safe activity and Python lab

The safe activity assigns paper cards for Northstar responsibilities to component envelopes,
then checks for duplicates and gaps. The offline Python lab represents components as typed
`dataclass` records and validates that every required responsibility has one owner, every
interface propagates required context, and forbidden data-plane-to-control-plane edges fail.
No network or provider SDK is required.

### Failures and evaluation

Seed an orphaned retention responsibility, shared credentials, a direct model-to-tool edge,
and telemetry that bypasses redaction. The reader must locate each defect from the catalog
and boundary graph. Evaluate completeness, single ownership, least authority, context
propagation, failure isolation, replacement feasibility, and preservation of Chapter 19 and
Module 06 gates.

### Common misunderstanding

A cloud service diagram is not a reference architecture. Product boxes do not establish
responsibility, identity, data handling, or failure contracts.

### Approved sources

- SRC-033 and SRC-040: current managed platform responsibility examples. Treat all product
  scope and capability claims as volatile and reverify within 30 days of release.
- SRC-045: evolving architecture guidance for boundaries and workload decisions.
- SRC-050: volatile cross-provider evidence about current agent-runtime component boundaries.
- SRC-070: durable evidence about hidden dependencies and production-system technical debt.

### Handoff

Hand the component catalog, dependency edges, failure domains, and initial recovery assumptions
to Chapter 29. Chapter 29 may add resilience behavior but may not silently move ownership or
merge trust boundaries.

## Chapter 29: Reliability Engineering

### Purpose

Teach the reader to decide what happens when a dependency is slow, unavailable, overloaded,
or asked to repeat work. The first pass uses a restaurant kitchen that limits incoming orders,
keeps stations separate, and offers a reduced menu when one station closes. The analogy stops
because distributed work can be duplicated, reordered, partially committed, and resumed long
after the original process disappears.

### Reader question

How should the system behave when dependencies slow down, fail, or repeat work?

### Prerequisites

Chapters 16, 22, 25, and 28.

### Entry contract

The reader starts with durable activity semantics, replayable trajectory tests, least-authority
boundaries, and Chapter 28's component and dependency catalog. Retries are not introduced as
a universal fix. Every retry policy must depend on typed error, deadline, idempotency, and
remaining budget.

### Measurable outcome and exit contract

The reader passes deterministic failure-injection tests for timeout, retry with bounded
exponential backoff and jitter, circuit breaking, bulkheading, backpressure, compensation,
and graceful degradation. Tests must also prove duplicate delivery does not duplicate a
consequential effect and that terminal or policy errors are not retried.

### Vocabulary delta

Timeout, retry budget, exponential backoff, jitter, circuit breaker, bulkhead, backpressure,
load shedding, compensation, graceful degradation, dependency objective, RPO, and RTO.

### Required concepts

- Set end-to-end deadlines and derive per-dependency timeouts rather than stacking unlimited
  waits.
- Classify failures as transient, persistent, overload, caller defect, policy denial,
  conflict, or unknown before choosing recovery behavior.
- Bound retries by attempt count, elapsed time, budget, and idempotency. Add jitter to avoid
  synchronized retry waves.
- Explain circuit-breaker states and probes, and keep breaker state scoped to the relevant
  dependency and failure domain.
- Isolate model, retrieval, tool, tenant, and background-work capacity with bulkheads and
  concurrency limits.
- Apply backpressure before queues, memory, or downstream quotas are exhausted. Define when
  to reject, delay, shed, or degrade work.
- Distinguish rollback from compensation. Do not promise compensation when an external effect
  cannot actually be reversed.
- Define fallback modes that preserve authorization, provenance, quality labels, and safety.
  A fallback model or stale cache is not automatically acceptable.
- State candidate availability, recovery, and dependency objectives as unmeasured until load
  and recovery evidence ratifies them.

### Northstar increment

Add resilience policies, idempotency keys, fallback modes, queues, chaos cases, candidate RPO
and RTO, and recovery objectives to Northstar. Preserve intent, outcome, and reconciliation
records for effectful operations.

### Required artifacts

- dependency criticality and objective matrix;
- typed error-to-policy table;
- timeout, retry, breaker, bulkhead, and backpressure policy records;
- fallback and graceful-degradation decision table;
- deterministic failure scenarios, expected traces, and recovery evidence.

### Diagram intents

1. Beginner concept picture: normal service, crowded service, and reduced service, showing
   that overload is controlled before total failure.
2. Retry decision flow: typed error, deadline, idempotency, budget, backoff, jitter, and stop
   branches.
3. Circuit-breaker state diagram: closed, open, half-open, successful probe, and failed probe.
4. Failure-domain picture: isolated worker pools and queues for retrieval, models, and tools.

Each diagram needs a one-sentence takeaway and an equivalent numbered text description.

### Safe activity and Python lab

The safe activity uses dice or supplied event cards to simulate healthy, slow, overloaded,
and failed dependencies while the reader applies a policy table. The offline Python lab uses
a seeded fake clock and deterministic dependency doubles. It must not sleep or call a live
service. It verifies deadlines, seeded jitter values, breaker transitions, queue limits,
idempotency receipts, fallback labels, and compensation decisions.

### Failures and evaluation

Reproduce a retry storm, a queue redelivery, a hot tenant consuming a shared worker pool, a
half-completed publish action, and a fallback that violates source permissions. Evaluate
recovery success, duplicate effects, queue age, rejected work, degraded-result labeling,
budget compliance, and time to restore the candidate service level. Safety invariants remain
nonspendable even when an SLO has error budget.

### Common misunderstanding

Retries do not make distributed actions reliable by themselves. They can amplify overload or
repeat an effect unless the operation and its durable records support safe repetition.

### Approved sources

- SRC-028 and SRC-029: durable SRE principles and practical reliability guidance.
- SRC-045: evolving architecture patterns and workload guidance.
- SRC-049 and SRC-061: volatile messaging and durable-workflow semantics. Reverify current
  product behavior within 30 days of release.

### Handoff

Hand Chapter 30 stable failure events, dependency objectives, degradation states, queue and
breaker signals, and recovery criteria. Observability must measure these policies rather than
inventing unrelated dashboards.

## Chapter 30: Observability and SRE

### Purpose

Teach the reader how operators detect, understand, and respond to service trouble without
turning telemetry into a second copy of sensitive user data. The first pass uses package
tracking: a small identifier and checkpoints reveal where a package stopped without copying
its contents at every stop. The analogy stops because telemetry can itself expose prompts,
documents, identities, decisions, and credentials unless schemas, access, sampling, and
retention are controlled.

### Reader question

How will operators see trouble, protect sensitive telemetry, and respond?

### Prerequisites

Chapters 22, 23, 27, 28, and 29.

### Entry contract

The reader brings replayable trajectories, regression diagnosis, incident ownership, the
reference architecture, and explicit resilience states. The chapter observes typed events,
state transitions, policy decisions, tool requests and results, approvals, citations, and
outcomes. It never requires private chain-of-thought or raw source bodies.

### Measurable outcome and exit contract

The reader traces one synthetic request end to end, derives SLIs from declared user and
dependency outcomes, triggers an actionable alert, follows a runbook to diagnosis and
mitigation, and proves telemetry redaction against a seeded secret and confidential document
fixture. Correlation must survive queue delivery and resumed execution.

### Vocabulary delta

Metric, log, trace, span, correlation ID, cardinality, sampling, redaction, SLI, SLO, error
budget, burn rate, alert, dashboard, runbook, incident, and postmortem.

### Required concepts

- Start from operator questions and user-visible outcomes, then choose the smallest metrics,
  logs, and traces that answer them.
- Define a stable internal event schema before mapping it to a telemetry backend or external
  semantic convention.
- Propagate tenant-safe correlation across API, queue, worker, model gateway, retrieval, tool,
  evaluation, and approval boundaries.
- Use allowlisted attributes, data classification, redaction before export, bounded lengths,
  cardinality budgets, role-limited access, sampling, encryption, and retention expiry.
- Exclude raw prompts, unrestricted documents, credentials, approval payloads, personal data,
  and private reasoning by default. Record hashes, versions, classifications, counts, and
  decision identifiers when those signals answer the operational question.
- Derive availability, latency, correctness, durable-resume, queue-age, saturation, and
  dependency SLIs. Keep safety invariants separate from spendable error budgets.
- Design alerts for urgency, owner, user impact, and action. Avoid alerts that merely restate
  a metric threshold with no response.
- Connect dashboard, alert, runbook, incident timeline, mitigation, evidence preservation,
  communication, and blameless postmortem improvement.
- Mark candidate Northstar targets as unmeasured until representative evidence ratifies them.

### Northstar increment

Add correlated traces, minimized logs, metrics, dashboards, candidate SLOs, burn-rate alerts,
runbooks, incident links, and postmortem records. Add telemetry access and retention policy
without expanding operator access to research content.

### Required artifacts

- versioned telemetry event schema and attribute allowlist;
- redaction, sampling, cardinality, access, and retention policy;
- trace exemplar crossing a queue and resumed worker;
- SLI and candidate SLO specification tied to Chapter 19 thresholds;
- dashboard and actionable alert specification;
- runbook, synthetic incident record, and postmortem template.

### Diagram intents

1. Beginner concept picture: one request ID crossing checkpoints while protected content stays
   inside the service boundary.
2. Telemetry pipeline: emit, classify, redact, sample, export, store, authorize, and expire.
3. SRE response loop: SLI breach, alert, triage, mitigation, recovery verification,
   postmortem, and backlog action.

Each diagram needs a one-sentence takeaway and an equivalent numbered text description.

### Safe activity and Python lab

The safe activity asks readers to sort sample fields into allow, transform, or reject bins.
The offline Python lab emits structured synthetic events through a redacting processor,
reconstructs a trace across a queued resume, calculates SLIs and burn rate from fixtures, and
routes one alert to a local runbook. Tests seed API keys, names, document text, oversized
values, and high-cardinality fields and require their rejection or approved transformation.

### Failures and evaluation

Reproduce broken correlation after queue redelivery, a secret in an exception string, an
unbounded document ID label, alert noise, and an SLO that hides failed but fast reports.
Evaluate trace completeness, redaction false negatives, diagnostic usefulness, signal cost,
cardinality, alert precision, time to detect, time to mitigate, and preservation of safety and
quality slices.

### Common misunderstanding

Logging everything does not guarantee observability. It can make diagnosis slower, costlier,
and less safe while still omitting the signal that explains user impact.

### Approved sources

- SRC-021 and SRC-025: volatile examples of current Python agent tracing. Reverify within 30
  days of release and do not make their SDK schemas Northstar's domain contract.
- SRC-028: durable SLO, monitoring, automation, and incident-response principles.
- SRC-047: volatile Microsoft Python telemetry export guidance. Reverify supported SDK and
  configuration claims within 30 days of release.
- SRC-056: volatile generative-AI telemetry conventions. Pin the mapped version and preserve
  Northstar's stable internal schema.

### Handoff

Hand Chapter 31 release SLIs, regression and safety gates, canary signals, alert ownership,
runbooks, and telemetry privacy tests. A deployment cannot promote when required signals are
missing or redaction fails.

## Chapter 31: Deployment and Delivery

### Purpose

Teach the reader to release application, configuration, model, prompt, policy, evaluator,
connector, and infrastructure changes repeatedly without treating deployment success as user
success. The first pass uses replacing one checkout lane before replacing every lane. The
analogy stops because software releases include stored state, in-flight work, identity,
secrets, compatibility windows, and multiple independently versioned artifacts.

### Reader question

How can we release changes repeatedly and roll them back safely?

### Prerequisites

Chapters 23, 27, 28, 29, and 30.

### Entry contract

The reader starts with regression gates, accountable change authority, a deployable component
model, recovery policies, and privacy-safe release telemetry. The chapter promotes only
evaluated and secured designs. A passing build is necessary but not sufficient for release.

### Measurable outcome and exit contract

The reader promotes one reproducible Northstar artifact through isolated development, test,
and production-like stages using infrastructure as code, evaluation and security gates, a
small canary, and a tested rollback. A seeded canary regression must halt promotion and return
application and compatible configuration to an accepted version while durable runs remain
resumable or safely paused.

### Vocabulary delta

Reproducible artifact, provenance, infrastructure as code, environment promotion, release
manifest, compatibility window, canary, progressive delivery, feature flag, rollback,
roll-forward, and release evidence.

### Required concepts

- Build once and promote an immutable, identified artifact with dependency, test, evaluation,
  scan, approval, and provenance evidence.
- Separate code from environment configuration while versioning both. Validate configuration
  and policy before traffic reaches a release.
- Use workload identity or approved secret injection. Never place credentials in source,
  images, prompts, fixtures, telemetry, or release manifests.
- Represent infrastructure declaratively and review changes to compute, identity, network,
  data, telemetry, and policy boundaries.
- Define compatibility among API, event, checkpoint, schema, prompt, model, policy, tool, and
  evaluator versions. Account for old workers and in-flight runs.
- Gate promotion on deterministic tests, representative evaluation, security and privacy
  checks, data compatibility, operational readiness, and required human authority.
- Expose a canary to a controlled synthetic or approved slice, compare it with the accepted
  version, and stop automatically on quality, safety, reliability, latency, or cost breach.
- Test rollback before release. State which changes can roll back, need roll-forward, or
  require dual-read, dual-write, drain, pause, or migration handling.
- Keep deployment rollback distinct from undoing a consequential external action.

### Northstar increment

Package Northstar for a justified compute target and add CI/CD, isolated builds, configuration
validation, secret handling, release evidence, staged environments, canary analysis, and
rollback. Product selection remains an architecture decision, not a curriculum assumption.

### Required artifacts

- versioned release manifest and artifact provenance record;
- environment and infrastructure contract;
- compatibility matrix for code, state, events, models, prompts, policies, and tools;
- promotion gate and authority matrix;
- canary hypothesis, metrics, thresholds, and decision record;
- rollback and roll-forward runbook with durable-run handling.

### Diagram intents

1. Beginner concept picture: one tested lane changes first, its outcomes are compared, and
   wider release happens only after acceptance.
2. Delivery pipeline: source, isolated build, artifact evidence, test and evaluation gates,
   staged promotion, canary, and full release.
3. Rollback decision flow: detect breach, stop traffic growth, classify compatibility, drain
   or pause work, restore accepted versions, verify recovery, and preserve evidence.

Each diagram needs a one-sentence takeaway and an equivalent numbered text description.

### Safe activity and Python lab

The safe activity orders release cards and asks which evidence is required before each
promotion. The offline Python lab models environments and artifacts as immutable Python data,
executes local gates against fixtures, routes synthetic traffic between accepted and canary
implementations, detects a seeded regression, and performs a logical rollback. The lab uses
temporary local directories and deterministic clocks, leaves no service running, and requires
no registry, cloud subscription, or real secret.

### Failures and evaluation

Reproduce mutable artifact tags, configuration drift, a missing redaction gate, incompatible
checkpoint readers, a canary with too little evidence, and a rollback that strands in-flight
runs. Evaluate reproducibility, provenance completeness, gate coverage, canary detection
power, false promotion rate, rollback time, resume success, and preservation of Chapter 19
quality and Module 06 controls.

### Common misunderstanding

A successful deployment only proves that an artifact reached an environment. It does not
prove that reports remain correct, safe, private, reliable, or recoverable.

### Approved sources

- SRC-029: durable practical production-readiness and release guidance.
- SRC-033, SRC-036, and SRC-048: volatile examples of current managed runtime, model artifact,
  and container hosting surfaces. Reverify within 30 days of release.
- SRC-045: evolving architecture guidance for deployment and workload decisions.

### Handoff

Hand Chapter 32 the compatibility matrix, migration gates, durable-run version rules,
backup-before-change requirement, and rollback constraints. Data evolution must integrate
with release promotion instead of becoming an untracked manual step.

## Chapter 32: Data and State at Scale

### Purpose

Teach the reader to place each kind of state according to its access, consistency, isolation,
lifecycle, and recovery needs. The first pass uses a school with a sign-in sheet, active
work folders, a library catalog, locked records, and a delivery tray. The analogy stops
because distributed stores replicate asynchronously, partition load, deliver messages more
than once, retain derived copies, and evolve schemas while old code is still running.

### Reader question

Where should sessions, documents, indexes, messages, and checkpoints live at scale?

### Prerequisites

Chapters 10, 12, 16, 26, 28, and 29.

### Entry contract

The reader brings permission-aware retrieval, evaluated memory policy, durable execution,
privacy lifecycle controls, the production component model, and recovery behavior. The
chapter preserves Northstar's distinction among request, execution, working context,
artifact, optional memory, and evidence state. Conversation history is not automatically
memory, and a vector index is not the source of truth.

### Measurable outcome and exit contract

For each Northstar state type, the reader chooses a store category, key, consistency rule,
concurrency rule, retention policy, deletion path, and recovery behavior. The design then
passes deterministic schema-evolution, retention, backup, restore, partition-distribution,
and hot-key tests, including checks that tenant isolation and derived-copy deletion are
preserved.

### Vocabulary delta

Source of truth, transactional state, object store, index, cache, queue, partition key, hot
key, optimistic concurrency, compare-and-set, eventual consistency, materialized view,
schema evolution, tombstone, backup, restore, RPO, and RTO.

### Required concepts

- Classify request, execution, context, artifact, memory, evidence, source, index, cache, and
  message state before selecting a data product.
- Choose stores by access pattern, atomicity, consistency, query, size, latency, retention,
  isolation, and recovery requirements rather than by one-store convenience.
- Treat source documents and authorized versions as provenance-bearing records. Treat search
  indexes and caches as rebuildable derived state with freshness and permission metadata.
- Use tenant-scoped keys everywhere. Explain when a run or source key also needs time,
  version, or shard components for distribution.
- Define single-writer, compare-and-set, lease, deduplication, and reconciliation behavior for
  concurrent workers and duplicate messages.
- Explain strong and eventual consistency through user-visible consequences, including stale
  policy, stale permissions, stale citations, and conflicting report versions.
- Evolve schemas with versioned readers and writers, expand-and-contract changes, migration
  checkpoints, compatibility tests, and rollback or roll-forward rules.
- Apply retention and deletion to primary records, indexes, caches, optional memory,
  evaluation copies, and scheduled backup expiry. Do not promise immediate erasure from an
  immutable backup.
- Test backup restoration, not just backup creation. Define the restored consistency point,
  key and policy dependencies, integrity checks, RPO, and RTO evidence.
- Detect skew and hot keys with synthetic distributions, then compare repartitioning,
  salting, aggregation, admission control, and dedicated isolation tradeoffs.

### Northstar increment

Add durable stores, caches, indexes, queues, tenant-keyed partitioning, lifecycle policies,
concurrency control, evidence integrity, backup expiry, migration semantics, and a tested
restore path. Cross-run memory remains off unless Chapter 12's value and privacy gates pass.

### Required artifacts

- state inventory and store-selection decision table;
- key, partition, consistency, and concurrency specification;
- source-of-truth and derived-state lineage map;
- versioned schema and migration plan;
- retention, deletion, backup-expiry, and legal-review assumption record;
- backup and restore procedure with integrity, RPO, and RTO evidence;
- partition-distribution and hot-key test report.

### Diagram intents

1. Beginner concept picture: distinct places for active work, permanent records, a catalog,
   temporary copies, and messages, each labeled by purpose.
2. State lineage diagram: authorized source to index and cache, request to checkpoint and
   report, and evidence to retention and backup paths.
3. Partitioning diagram: tenant and run keys distributed across partitions, including one hot
   key and two mitigation options.
4. Migration sequence: old and new readers, expand, backfill, verify, switch, contract, and
   rollback or roll-forward decision.

Each diagram needs a one-sentence takeaway and an equivalent numbered text description.

### Safe activity and Python lab

The safe activity sorts synthetic record cards by purpose, consistency, lifetime, and rebuild
cost, then selects a store category. The offline Python lab uses standard-library SQLite,
`dataclass` schemas, temporary files, and in-memory queues or deterministic doubles. It
simulates compare-and-set conflicts, duplicate delivery, migration across schema versions,
retention and tombstones, backup and restore, partition distributions, and a seeded hot key.
It must use fake tenant IDs and generated document content.

### Failures and evaluation

Reproduce cross-tenant cache collision, stale permission metadata in an index, lost update,
duplicate message, incompatible schema reader, incomplete derived-state deletion, unusable
backup, and hot partition. Evaluate isolation, consistency behavior, migration compatibility,
data loss against candidate RPO, restore time against candidate RTO, deletion coverage,
integrity, distribution skew, and rebuild success.

### Common misunderstanding

One scalable database does not remove the need to classify state. Different records still
need different consistency, authorization, retention, indexing, and recovery behavior.

### Approved sources

- SRC-049: volatile messaging behavior and delivery guidance. Reverify within 30 days of
  release.
- SRC-063: evolving official data-protection principles and rights. Use it as qualified-review
  input, not as legal advice or a compliance claim.
- SRC-072: durable replication, partitioning, consistency, distributed-data, and recovery
  tradeoffs.

### Handoff

Hand Module 08 the measured state access patterns, queue and store saturation signals,
partition distribution, restore evidence, tenant-scoped keys, candidate RPO and RTO, and
explicit single-region assumptions. Module 08 owns economics, multi-tenant and multi-region
evolution, failover, and lifecycle optimization.

## Cross-module handoff contract

### Inputs retained from earlier modules

- Module 03 owns retrieval provenance, permission filtering, memory admission, and deletion
  semantics. Module 07 places and operates that state without redefining its meaning.
- Module 04 owns durable workflow and protocol semantics. Module 07 adds dependency policies,
  deployment boundaries, and operational evidence without weakening cancellation,
  idempotency, or lifecycle contracts.
- Module 05 owns outcome definitions, representative evaluations, evaluators, trajectories,
  and regression diagnosis. Module 07 uses those as release and SLO inputs rather than
  substituting infrastructure health for task quality.
- Module 06 owns threat, authority, identity, privacy, governance, incident authority, and
  qualified-review requirements. Module 07 operationalizes them in architecture, telemetry,
  release, and data controls.

Any incompatible prerequisite change requires a coordination request and J2 reconciliation.

### Outputs to Module 08

Module 07 hands Module 08 a tested single-tenant, single-primary-region production baseline:

- explicit component and failure boundaries;
- resilience and degradation policies with failure traces;
- privacy-safe SLIs, telemetry cost inputs, and saturation signals;
- reproducible release, canary, and rollback controls;
- state placement, partition, consistency, retention, and restore evidence;
- unresolved production budgets, final SLOs, RPO, RTO, tenant isolation tier, and regional
  topology decisions with named owners.

Chapter 33 may optimize capacity and cost only against these quality, safety, privacy,
reliability, and recovery controls. Chapter 34 may add tenants and regions only after proving
isolation and recovery. Chapter 35 may use production feedback only through the privacy-safe
telemetry and governed release paths established here.

### Outputs to Modules 09 and 10

Module 09 receives stable vendor-neutral interfaces, component and failure boundaries,
telemetry, delivery, state, and recovery evidence, not preselected cloud products. Chapters
36-41 may extend that evidence for hybrid routes, hardware, cross-layer faults, tool
portfolios, assurance, and user experience but may not redefine the production mechanisms.

Module 10 Chapter 42 receives the accepted Module 09 engineering packet plus the retained
Module 07 evidence. Microsoft mappings in Chapters 28-32 are dated examples only. Chapter 42
must reverify every volatile product, SDK, availability, region, quota, identity,
data-handling, and service-boundary claim within 30 days of release and preserve build, buy,
and hybrid alternatives.

## Module acceptance checklist

- [ ] Chapters 28-32 each appear exactly once and preserve the curriculum reader question,
  prerequisites, measurable outcome, Northstar increment, and approved source set.
- [ ] Every chapter has a concrete purpose, entry contract, exit contract, vocabulary delta,
  required concepts, required artifacts, at least two diagram intents, safe activity, offline
  Python 3.11 lab, failure cases, evaluation criteria, approved sources, misunderstanding,
  and handoff.
- [ ] Every first pass starts with a familiar situation and states where the analogy stops.
- [ ] Engineering detail follows the beginner explanation and covers alternatives,
  constraints, tradeoffs, mechanisms, and failure behavior.
- [ ] Responsibility boundaries assign runtime, model, tool, policy, data, evaluation,
  telemetry, deployment, and administration duties without orphaned or hidden ownership.
- [ ] Data and control planes, user and workload identities, trust boundaries, and replaceable
  adapters remain explicit.
- [ ] Reliability covers deadlines, typed retries with jitter, circuit breaking, bulkheads,
  backpressure, load shedding, compensation limits, degradation, idempotency, and recovery.
- [ ] Telemetry is minimized, classified, redacted before export, access controlled, sampled,
  cardinality bounded, and expired. Protected content and private chain-of-thought are not
  required.
- [ ] SLIs include user outcomes and quality, not only infrastructure health. Safety
  invariants cannot be spent as error budget.
- [ ] Delivery covers reproducible artifacts, provenance, infrastructure as code,
  configuration and secret handling, compatibility, staged gates, canary, rollback, and
  durable in-flight work.
- [ ] Data and state cover sources of truth, derived indexes and caches, messages,
  partitioning, hot keys, consistency, concurrency, evolution, retention, deletion, backup
  expiry, and tested restore.
- [ ] All consequential effects preserve authorization, exact-action approval, idempotency,
  durable outcomes, cancellation, reconciliation, and audit evidence.
- [ ] All labs run offline with deterministic Python doubles and synthetic data. Live
  providers, cloud accounts, payment, personal data, and production credentials are not
  acceptance requirements.
- [ ] Product-specific and SDK-specific claims are marked volatile and have a 30-day
  release-time freshness check. Domain contracts remain provider neutral.
- [ ] Legal and privacy sources are framed as qualified-review inputs, not legal advice or
  automatic compliance.
- [ ] Candidate SLO, RPO, RTO, capacity, retry, and cost values remain labeled unmeasured
  until representative evidence ratifies them.
- [ ] Module 08 receives the architecture, telemetry, release, partition, saturation,
  recovery, and unresolved-decision evidence needed for Chapters 33-35.
- [ ] No chapter prose, framework dependency, cloud product selection, or unsupported source
  is introduced by this contract.

## Evidence and freshness rule

Only the approved source IDs listed under each chapter may support that chapter's contracted
claims. A source may illustrate a provider approach without turning its API or product model
into Northstar's durable interface. Every volatile claim must record the source access date,
the exact claim checked, and a release-time verification no older than 30 days. If a current
claim cannot be verified, the chapter must state it as unresolved rather than infer support.