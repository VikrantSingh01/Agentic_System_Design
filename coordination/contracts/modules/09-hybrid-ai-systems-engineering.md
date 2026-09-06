# Module 09 Contract: Hybrid AI Systems Engineering

> Status: proposed for J2 freeze
> Owner: J2 Module 09 contract author
> Contract date: 2026-09-06
> Scope: Chapters 36-41
> Evidence baseline: `research/source-ledger.csv` accessed 2026-09-06

## Module purpose

Module 09 turns the evaluated, secured, operable, and economically bounded Northstar Research
Assistant into a coherent hybrid AI system. It teaches how to select among cloud, edge, and
device execution routes; measure hardware behavior; test cross-layer faults; govern a tool
portfolio; assemble security evidence; and design a user experience that keeps people
informed and in control.

This module is an engineering synthesis, not a second treatment of evaluation, security,
production operations, or economics. It consumes accepted evidence from Modules 05-08 and
uses that evidence to make system-level decisions. It may add a new test for a new hybrid
boundary, but it may not redefine an earlier metric, weaken an invariant, or substitute a
new dashboard for missing prerequisite evidence.

All required labs use Python 3.11, deterministic fixtures, and synthetic data. They require
no account, payment, production credential, personal data, hardware stress, network access,
or live model provider. Current model, device, protocol, framework, SDK, product, and service
claims are volatile unless an approved source explicitly supports the exact claim and its
release-time freshness requirement is satisfied.

## Module entry contract

The reader enters with the prerequisite closure of Chapters 19-35 and these accepted inputs:

- Module 05 task contracts, representative datasets, calibrated evaluators, trajectory
  checks, failure taxonomy, ablation records, and versioned regression gates.
- Module 06 threat model, least-authority capabilities, delegated and workload identity
  rules, privacy lifecycle, safety controls, governance owners, incident route, and kill
  authority.
- Module 07 component boundaries, resilience policies, privacy-safe telemetry, runbooks,
  reproducible delivery, rollback evidence, state placement, and recovery tests.
- Module 08 workload classes, accepted-result economics, capacity and quota policy, tenant
  and region rules, measured RPO and RTO, component registry, migration controls, drift
  evidence, and retirement paths.
- A provider-neutral model, tool, retrieval, workflow, policy, state, evaluation, telemetry,
  and experience boundary for Northstar.

Missing or failed prerequisite evidence remains a visible blocker. Module 09 must not invent
a passing result, infer a capability from a product name, or treat an assumed device or cloud
property as measured Northstar behavior.

## Module exit contract

At module exit, the reader can produce and defend a versioned hybrid-systems engineering
packet that:

1. Routes each task only to an eligible execution route after capability, authority, data,
   connectivity, quality, latency, cost, energy, and freshness gates pass.
2. Measures burst and sustained performance, memory, energy, and thermal behavior per
   accepted task without extrapolating beyond the tested hardware and workload.
3. Exercises faults across model, device, network, tool, protocol, state, policy, and user
   interaction boundaries and proves bounded recovery or fail-closed behavior.
4. Minimizes and governs the tool portfolio while preserving typed contracts, least
   authority, protocol lifecycle, cancellation, and replacement paths.
5. Traces material threats and abuse paths to preventive, detective, responsive, and
   recovery controls with executable evidence and named owners.
6. Presents capabilities, progress, uncertainty, approvals, interruption, recovery, and
   accessibility in a tested experience that supports calibrated trust rather than
   engagement at any cost.
7. Hands Module 10 frozen vendor-neutral requirements, accepted evidence, unresolved risks,
   and adapter boundaries instead of preselecting Microsoft products.

## Duplication boundaries for Modules 05-08

Module 09 must preserve these ownership boundaries:

| Earlier owner | Evidence consumed by Module 09 | Work that Module 09 may add | Work Module 09 must not duplicate |
|---|---|---|---|
| Module 05 | Metrics, datasets, evaluator calibration, trajectory checks, regression gates | Hybrid-route slices, cross-layer fault cases, usability measures tied to the same task contract | New definitions of success, replacement holdouts, or uncalibrated judges |
| Module 06 | Threats, identity, privacy, safety, authority, governance, incident and kill ownership | Controls for new device, routing, protocol, tool-portfolio, and experience boundaries | A second generic threat-modeling course or weaker security policy |
| Module 07 | Architecture, resilience, telemetry, delivery, state, recovery, and runbooks | Route, hardware, protocol, and UX signals and faults that extend those contracts | Generic retries, observability, CI/CD, storage, or disaster-recovery teaching |
| Module 08 | Workload, capacity, unit cost, tenant-region, migration, drift, and retirement evidence | Energy, thermal, route, portfolio, and user-outcome dimensions inside the accepted envelope | A second load-testing, cost, multi-region, or lifecycle chapter |

When a Chapter 36-41 exercise reveals an upstream defect, it creates a versioned coordination
request and reruns the affected upstream gate. It does not silently repair the definition
inside Module 09.

## Module vocabulary

| Term | Plain-language meaning |
|---|---|
| Hybrid AI system | A system that can use more than one execution location or AI subsystem while preserving one set of domain contracts and policy gates. |
| Execution route | A complete, versioned path through a model or deterministic subsystem, runtime, hardware location, policy, and fallback behavior. |
| Orchestrator | The policy-enforcing component that decides whether and where eligible work may run. |
| Eligibility gate | A test that a route must pass before optimization can compare it with other routes. |
| Escalation | A controlled move from a smaller or local route to a more capable eligible route. |
| Fail closed | Refuse or safely narrow work when no route can satisfy mandatory controls. |
| Time to first token | The elapsed time between an accepted request and the first generated token. |
| Inter-token latency | The elapsed time between successive generated tokens during decoding. |
| Energy per accepted task | Measured energy divided by tasks that pass the frozen acceptance gate. |
| Thermal throttling | A device reducing performance to remain inside temperature or power limits. |
| Fault model | A declared set of failures, timing assumptions, affected boundaries, and expected observations. |
| Fault containment | Keeping one failure from crossing an intended boundary or causing an unauthorized effect. |
| Tool portfolio | The governed set of capabilities exposed to the agent, including owners, authority, versions, cost, risk, and retirement state. |
| Protocol adapter | Replaceable code that maps a stable domain capability to a protocol without making the protocol the domain model. |
| Assurance case | A structured claim supported by arguments, controls, tests, operating evidence, residual risks, and owners. |
| Calibrated trust | User reliance that matches the system's demonstrated capability and limits. |
| Recoverable interaction | An interaction that exposes pause, cancel, correction, retry, undo where feasible, and clear terminal states. |

## Required module artifacts

Chapters 36-41 cumulatively produce one versioned `HybridSystemsPacket` containing:

- `route_catalog.json`: complete execution routes, capabilities, policy constraints,
  compatibility, calibration dates, fallback edges, and owners.
- `routing_policy.json`: ordered eligibility gates, optimization objectives, escalation,
  degradation, fail-closed, and explanation rules.
- `hardware_profile.json`: tested device class, workload, software versions, warmup, sample
  windows, latency, throughput, memory, energy, thermal, and throttling evidence.
- `fault_campaign.json`: fault model, injection points, expected observations, containment,
  recovery, residual risk, and regression links.
- `tool_portfolio.json`: capability, owner, protocol, authority, data class, side effects,
  version, cost, telemetry, evaluation, replacement, and retirement state.
- `assurance_case.json`: threat-to-control-to-test-to-evidence traceability with freshness,
  exceptions, residual risks, release consequences, and named decision owners.
- `experience_contract.json`: capability disclosure, progress states, uncertainty language,
  approval and consent rules, interruption, recovery, preference, feedback, retention, and
  accessibility requirements.
- Deterministic Python simulations, fixtures, expected traces, test results, cleanup steps,
  and one traceability index back to Modules 05-08 evidence versions.

The schemas remain provider neutral and small enough for a beginner to inspect. A route,
tool, control, or experience state with no owner, evidence version, or rejection behavior is
incomplete.

## Chapter 36: Hybrid AI and Model Orchestration

### Purpose

Teach the reader to choose among deterministic, device, edge, and cloud routes at runtime
without letting latency, cost, or availability bypass capability, authority, privacy, safety,
or quality requirements. Chapter 6 owns static model selection, Chapter 28 owns the model
gateway boundary, Chapter 33 owns workload economics, and Chapter 35 owns component change.
This chapter owns only policy-driven route eligibility and orchestration across those inputs.

### Reader question

When should work run on a deterministic subsystem, device model, edge model, or cloud model,
and how can the system choose without weakening its contracts?

### Prerequisites

Chapters 6, 8, 19, 28, 29, 33, and 35.

### Measurable outcome

Implement an offline orchestrator that selects only eligible routes for a fixed task set and
passes seeded cases for restricted data, missing connectivity, stale calibration, inadequate
capability, failed quality, exhausted latency or cost budget, fallback, cancellation, and no
eligible route. Every decision must record policy version and observable reason without
recording private chain-of-thought.

### Required concepts

- Complete route descriptions across model, subsystem, location, identity, data movement,
  capability, context, quality, latency, cost, energy, connectivity, and version compatibility.
- Ordered gates: authority and data first, then capability and quality, then operational
  budgets, followed by optimization among routes that remain eligible.
- The distinction between an orchestrator that makes policy decisions and a model gateway
  that executes an accepted route.
- Deterministic baseline, escalation, fallback, bounded degradation, cancellation, and
  fail-closed behavior when no route qualifies.
- Route calibration, compatibility graphs, decision telemetry, and measured evidence for
  adopting hybrid complexity over a single-route baseline.

### Northstar increment

Add a provider-neutral route catalog and orchestrator before the existing model gateway.
Northstar may use a deterministic, device, edge, or cloud route only when the route passes
the same frozen task, authority, data, and safety contract. Preserve a single-route baseline
and remove hybrid routing when it does not demonstrate a declared gain.

### Diagram intents

1. A route-boundary diagram shows one task envelope entering the orchestrator and eligible
   deterministic, device, edge, and cloud routes behind separate identity, data, and network
   boundaries. Equivalent text must list every boundary and data movement.
2. A gate-order decision flow checks authority, classification, capability, compatibility,
   quality, connectivity, latency, cost, energy, and freshness before optimization. It ends
   in select, escalate, degrade, or fail closed.
3. A fallback state diagram shows selected, executing, validating, escalating, degraded,
   cancelled, failed closed, and completed states with bounded transitions.

### Safe activity and offline lab

Use synthetic task envelopes and fictional route records with deterministic model doubles.
The Python lab evaluates a fixed ordered gate pipeline, records decision reasons, executes
the chosen double, validates its result, and applies at most one declared fallback edge. It
uses no real model, device API, network, credential, personal data, or provider price.

### Failure and evaluation focus

Inject a restricted task offered only to cloud, a stale device calibration, a disconnected
edge, an over-budget capable route, an attractive route with failed quality, a fallback loop,
and a cancellation during escalation. Evaluate policy determinism, zero forbidden route
selections, task acceptance, p95 decision overhead, budget compliance, bounded fallback, and
the measured gain over the simplest eligible single route.

### Approved sources

SRC-103, SRC-106, SRC-107, and SRC-111. Routing studies are evolving empirical evidence;
repository and runtime behavior is volatile. Reverify scope, methods, versions, hardware,
and interfaces before publication and do not generalize beyond reported conditions.

### Handoff

Pass Chapter 37 selected route classes, hardware assumptions, route-specific latency and
energy fields, calibration rules, and admission constraints. Pass Chapter 38 the gate trace,
fallback graph, cancellation states, and fail-closed cases. No Microsoft product is selected.

## Chapter 37: Performance, Energy, and Thermal Engineering

### Purpose

Teach the reader to measure whether an execution route remains useful under burst and
sustained load on a declared hardware class. Chapter 33 retains ownership of end-to-end
capacity and cost. This chapter adds device-level latency, memory, energy, temperature, and
throttling evidence needed by the Chapter 36 route policy.

### Reader question

How do latency, throughput, memory, energy, and heat change which AI work a device can accept?

### Prerequisites

Chapters 30, 33, 34, and 36.

### Measurable outcome

Run a deterministic hardware-profile simulation for burst and sustained workloads, report
time to first token, inter-token latency, throughput, peak memory, energy per attempt, energy
per accepted task, temperature, throttling, queue delay, and rejection counts, then enforce
admission before a declared memory, thermal, latency, or concurrency limit is crossed.

### Required concepts

- Reproducible workload shape, warmup, sample windows, tested hardware and software versions,
  ambient assumptions, and the limits of synthetic or vendor-reported measurements.
- Time to first token, inter-token latency, end-to-end latency, throughput, queue delay,
  memory high-water mark, power, energy, temperature, and sustained performance.
- Why energy per attempt can reward failed work and why accepted-task denominators must reuse
  Module 05 acceptance rules.
- Burst versus sustained tests, thermal throttling, memory pressure, concurrency admission,
  backpressure, and honest rejection or degradation.
- Hardware-specific calibration and safe profiling that never requires readers to stress a
  personal device.

### Northstar increment

Add versioned hardware profiles and route admission limits to Northstar. Feed measured or
explicitly assumed energy, memory, thermal, and sustained-performance fields into Chapter
36 eligibility without changing Chapter 33 quality, latency, capacity, or cost thresholds.

### Diagram intents

1. A measurement-boundary diagram follows an accepted task through queue, prefill, decode,
   validation, and acceptance, labeling time, memory, power, energy, and temperature signals.
2. A sustained-load timeline shows warmup, stable sampling, heat accumulation, throttling,
   queue growth, admission control, recovery, and cooldown.
3. An admission flow checks memory, thermal headroom, concurrency, latency objective, and
   route calibration before accept, queue, degrade, reroute, or reject.

### Safe activity and offline lab

Use supplied synthetic traces and a deterministic Python device simulator. Compare a burst
with a sustained run, inject thermal throttling and memory pressure, calculate metrics per
accepted task, and exercise admission rules. The lab performs no hardware benchmark, stress
test, network call, live inference, battery access, or device inspection.

### Failure and evaluation focus

Inject skipped warmup, cherry-picked samples, an energy denominator based on attempts,
concurrency above memory capacity, thermal throttling hidden by an average, a fast route with
low acceptance, and stale calibration. Evaluate reproducibility, p50 and p95 distributions,
accepted-task efficiency, limit enforcement, transparent rejections, and claims limited to
the tested device class and workload.

### Approved sources

SRC-104, SRC-105, SRC-108, and SRC-111. These sources provide evolving model and device
measurements or volatile runtime benchmarks. Reverify current revisions and never present
reported hardware results as measurements of the reader's device or Northstar deployment.

### Handoff

Return accepted hardware-profile fields and route limits to Chapter 36. Pass Chapter 38 burst,
sustained, thermal, memory, queue, and admission traces as fault-campaign fixtures.

## Chapter 38: AI System Testing and Fault Tolerance

### Purpose

Teach the reader to test the AI system as interacting deterministic, probabilistic, device,
network, protocol, policy, data, and human-facing layers. Module 05 retains ownership of task
quality and regression methodology; Chapters 29-31 retain ownership of generic resilience,
observability, and release. This chapter owns cross-layer fault models, containment evidence,
and system-level recovery verdicts for the hybrid design.

### Reader question

How can we prove that faults across models, devices, tools, state, and networks stay bounded
and lead to recovery or a safe stop?

### Prerequisites

Chapters 22, 23, 24, 29, 30, 35, 36, and 37.

### Measurable outcome

Build and run a deterministic fault campaign that covers at least one fault in each declared
system layer, detects every seeded fault through approved observations, prevents duplicate or
unauthorized effects, and reaches an expected recovered, degraded, cancelled, or fail-closed
terminal state within its time and retry budget.

### Required concepts

- Fault model, injection point, trigger, observability requirement, containment boundary,
  expected terminal state, recovery objective, and residual risk.
- Layered tests spanning schema, model output, route decision, device capacity, network,
  protocol, tool effect, queue, state, policy, telemetry, and user interruption.
- Deterministic doubles, record and replay, property and metamorphic checks, fault matrices,
  seeded schedules, and coverage limits.
- Oracle quality and the difference between detecting a fault, tolerating it, recovering from
  it, and hiding it.
- System-level verdicts that combine Module 05 outcome gates, Module 06 invariants, Module 07
  recovery evidence, and Module 08 workload envelopes.

### Northstar increment

Add a versioned hybrid fault model and automated campaign to Northstar. Extend the existing
regression suite with route, hardware, protocol, and interaction faults while retaining the
same task contract, threat controls, telemetry schema, and recovery objectives.

### Diagram intents

1. A layered fault map shows injection points and containment boundaries across experience,
   orchestrator, model, tool, protocol, state, device, network, and provider dependencies.
2. A fault-to-verdict flow connects injection, expected observation, invariant check,
   containment, recovery, regression comparison, and release decision.
3. A timeline contrasts a contained failure, bounded degradation, recovery, and an unsafe
   cascade, including the signal that distinguishes each outcome.

### Safe activity and offline lab

Use a Python event scheduler, fake clock, deterministic component doubles, synthetic tenant
data, and a fixed fault matrix. Inject malformed model output, route timeout, device pressure,
protocol mismatch, duplicate tool delivery, stale state, missing policy, lost telemetry, and
user cancellation. Cleanup removes only generated local reports.

### Failure and evaluation focus

Seed a fault that produces no alert, a retry that repeats an effect, a recovery path that
bypasses authorization, correlated failures misclassified as independent, an evaluator that
misses the bad outcome, and a test that passes because expected evidence is absent. Evaluate
fault detection, false positives, containment, duplicate effects, recovery time, invariant
preservation, trace completeness, and regression coverage. Zero observed faults outside the
fixture set is not proof of universal fault tolerance.

### Approved sources

SRC-024, SRC-025, SRC-057, SRC-058, and SRC-060. Evaluation and tracing interfaces are
volatile; risk and adversarial guidance is durable or evolving input. Pin versions and keep
test claims limited to the declared campaign.

### Handoff

Pass Chapter 39 protocol, discovery, version, authorization, cancellation, timeout, duplicate
delivery, and tool-effect fault cases. Pass Chapter 40 the complete fault-to-control evidence
and unresolved abuse paths. Pass Chapter 41 user-visible failure and recovery states.

## Chapter 39: MCP and Tool Portfolio Engineering

### Purpose

Teach the reader to design the smallest useful portfolio of versioned, governed tools and to
use MCP only as a replaceable protocol boundary. Chapter 7 owns typed tool contracts,
Chapter 18 owns protocol fundamentals, and Chapter 25 owns least authority. This chapter owns
portfolio-level admission, overlap, lifecycle, evidence, and retirement decisions.

### Reader question

Which tools should the system expose, how should MCP carry them, and when should a tool be
combined, replaced, restricted, or retired?

### Prerequisites

Chapters 7, 18, 23, 25, 28, 30, and 38.

### Measurable outcome

Produce a tool-portfolio registry and protocol adapter that pass offline tests for discovery,
schema validation, version negotiation, authorization denial, lifecycle completion,
cancellation, timeout, duplicate delivery, audit, and replacement. Retain each tool only when
measured task value exceeds its added authority, failure, maintenance, latency, and cost.

### Required concepts

- Capability inventory, ownership, overlap, side-effect class, authority, data class, cost,
  dependency, evaluation, telemetry, support, deprecation, and retirement state.
- Stable domain tools versus MCP client, server, transport, discovery, schema, and lifecycle
  concerns behind adapters.
- Portfolio minimization, composition versus broad tools, least-authority credentials,
  egress policy, approval, rate and transaction limits, revocation, and isolation.
- Version and capability negotiation, cancellation, progress, timeouts, idempotency,
  unsupported-feature behavior, and replacement tests.
- Evidence-based admission and retirement using task success, selection precision, failures,
  security exposure, latency, cost, operator load, and user recovery.

### Northstar increment

Add a governed tool registry and one protocol adapter without changing Northstar's stable tool
interface. Remove redundant or unproved capabilities, preserve deny-by-default authorization,
and demonstrate that the adapter can be replaced by the offline direct-call implementation.

### Diagram intents

1. A portfolio map groups tools by user goal and shows overlap, authority, side effects,
   owners, dependencies, and retirement candidates.
2. A protocol-boundary sequence shows domain request, adapter, MCP discovery and invocation,
   policy decision, tool execution, progress, cancellation, result, and audit evidence.
3. A tool-admission flow compares measured task gain with authority, data, failure, latency,
   cost, support, and replacement burden before admit, restrict, combine, or reject.

### Safe activity and offline lab

Use a local in-memory MCP-shaped fixture and fictional tools. The Python lab inventories the
portfolio, validates schemas and versions, denies an unauthorized effect, cancels a long
operation, deduplicates a repeated request, and substitutes a direct-call adapter. No socket,
subprocess, external server, credential, file mutation outside a temporary fixture, or live
tool action is required.

### Failure and evaluation focus

Inject ambiguous descriptions, overlapping tools, schema drift, unsupported protocol
capability, overbroad credentials, hidden network egress, missing cancellation, duplicate
effect, stale owner, and a tool retained with no measured gain. Evaluate tool-selection
precision, task acceptance, authorization denials, protocol conformance for the pinned
fixture, bounded lifecycle, effect uniqueness, portfolio size, and replacement success.

### Approved sources

SRC-016, SRC-017, SRC-038, SRC-060, and SRC-112. Protocol and vendor documentation is
volatile and must be pinned and freshly verified. Research and adversarial sources inform
evaluation and abuse cases but do not establish protocol conformance or tool safety.

### Handoff

Pass Chapter 40 the minimized portfolio, protocol trust boundaries, authority matrix, egress
rules, threat cases, lifecycle tests, owners, and residual risks. Pass Chapter 41 capability,
progress, cancellation, approval, and error states that the experience must represent.

## Chapter 40: Secure by Design AI Systems

### Purpose

Teach the reader to assemble an assurance case in which security requirements shape routes,
components, protocols, tools, data flows, delivery, and operating decisions from the start.
Module 06 retains ownership of threat modeling, identity, privacy, safety, and governance.
This chapter owns traceable architectural enforcement and executable assurance evidence for
the new hybrid boundaries introduced in Chapters 36-39.

### Reader question

How do we make security a property of the hybrid architecture and its evidence rather than a
review added after implementation?

### Prerequisites

Chapters 24, 25, 26, 27, 28, 31, 38, and 39.

### Measurable outcome

Produce an assurance case that traces every material hybrid threat and abuse path to an
architectural control, owner, executable test, operating signal, response, recovery path, and
residual-risk decision. A deterministic review must block release for a missing control,
failed invariant, stale evidence, unowned exception, or untested kill path.

### Required concepts

- Security requirements as architecture inputs, with trust boundaries, assets, principals,
  authority, data movement, supply chain, control plane, and evidence plane kept explicit.
- Preventive, detective, responsive, and recovery controls mapped to concrete abuse paths.
- Control independence, defense in depth, deny by default, secure defaults, least authority,
  provenance, signed or verified artifacts, secret isolation, and change control.
- Hybrid-specific risks: route-policy bypass, unsafe local artifacts, device compromise,
  edge-cloud identity confusion, protocol and tool supply chain, stale models, and evidence
  gaps during degraded operation.
- Assurance claims, evidence freshness, negative tests, control failure, compensating control,
  exception expiry, residual risk, qualified review, and release consequence.

### Northstar increment

Add a hybrid assurance case and machine-checkable traceability index to Northstar. Link the
accepted Module 06 controls to Chapters 36-39 routes, hardware profiles, faults, protocols,
and tools, then prove enforcement through Module 07 delivery and operating evidence.

### Diagram intents

1. An assurance-case diagram links claim, threat, boundary, control, test, evidence, owner,
   residual risk, and release verdict without presenting the diagram as proof by itself.
2. A hybrid trust-boundary diagram follows identity, data, model artifacts, policy, tools,
   telemetry, and updates across device, edge, cloud, and control-plane boundaries.
3. A release decision flow blocks missing, failed, stale, contradictory, inaccessible, or
   unowned evidence and shows exception expiry and kill authority.

### Safe activity and offline lab

Use fictional threats, controls, owners, and evidence records. The Python lab validates
traceability completeness and freshness, injects failed and missing control evidence,
simulates a route-policy bypass and compromised tool artifact, and produces accept,
conditional, or reject with reasons. It performs no exploit against a real system and needs
no network, credential, product, personal data, or privileged operation.

### Failure and evaluation focus

Seed a control that exists only in prose, shared user and workload identity, unsigned model
artifact, stale allowlist, protocol server with excess authority, telemetry that leaks source
content, exception with no expiry, failed recovery control, and missing kill owner. Evaluate
threat coverage, control-test traceability, negative-test results, evidence freshness,
exception age, containment, recovery, and whether every blocking defect stops release.

### Approved sources

SRC-057, SRC-058, SRC-059, and SRC-060. Standards, frameworks, and taxonomies structure
questions and abuse cases; they do not prove Northstar controls effective or establish legal
compliance. Reverify evolving and volatile material before release.

### Handoff

Pass Chapter 41 capability limits, approval and consent requirements, safe defaults,
user-visible risk and recovery states, accessibility obligations, kill behavior, and evidence
needed from usability tests. Pass Module 10 the accepted assurance case and unresolved risks.

## Chapter 41: Product and UX Design for Agentic Systems

### Purpose

Teach the reader to design an agentic product around user goals, calibrated trust, informed
control, recoverable interactions, and accessibility. Chapter 13 retains ownership of
multimodal mechanics, Chapter 19 owns system outcome metrics, Chapter 26 owns privacy and
identity, Chapter 30 owns operator observability, and Chapter 35 owns production change.
This chapter owns the user-facing contract and evidence for understanding and control.

### Reader question

How should an agentic product communicate capability, progress, uncertainty, control, and
recovery so people can use it effectively without misplaced trust?

### Prerequisites

Chapters 13, 19, 21, 23, 26, 27, 30, 35, 38, and 40.

### Measurable outcome

Build and test an offline Northstar interaction prototype that exposes capability limits,
source-backed progress, uncertainty, approval consequences, pause, resume, cancel, correction,
and terminal outcomes. It passes task-completion, comprehension, error-recovery, preference
deletion, keyboard, focus, status-announcement, contrast, and no-dark-pattern checks against
declared thresholds.

### Required concepts

- User goal, mental model, affordance, expectation setting, onboarding, calibrated trust,
  uncertainty, explanation, provenance, and progressive disclosure.
- Observable progress based on real system states rather than fabricated activity or private
  chain-of-thought.
- Informed approval and consent with exact action, scope, destination, reversibility, cost,
  data use, denial, and expiry stated before commitment.
- Pause, cancel, redirect, correct, retry, undo where feasible, escalation, partial result,
  degraded mode, and clear success, failure, and stopped states.
- Accessibility across keyboard, focus, names, structure, status messages, timing, contrast,
  reduced motion, language, and nonvisual alternatives.
- Product evidence that distinguishes task success and durable value from engagement,
  anthropomorphism, acquiescence, automation bias, or retention at any cost.

### Northstar increment

Add a versioned experience contract and tested interaction state machine to Northstar. Show
what the assistant can and cannot do, expose cited progress and uncertainty, require informed
approval for consequential actions, support interruption and recovery, minimize retained
preferences, and meet declared accessibility criteria.

### Diagram intents

1. An interaction state diagram shows request, clarification, planning summary, working,
   approval waiting, paused, degraded, partial, completed, failed, cancelled, and recoverable
   transitions with available user controls.
2. A trust-calibration flow connects capability disclosure, evidence, uncertainty, user
   decision, outcome, correction, and updated expectation without revealing private
   chain-of-thought.
3. An accessible approval anatomy labels action, target, data, consequence, cost, expiry,
   reversibility, confirm, deny, focus order, and status announcement.

### Safe activity and offline lab

Use local HTML or terminal fixtures backed by a deterministic Python state machine and
fictional research tasks. Readers compare two interaction variants, complete scripted
success, uncertainty, denial, failure, and recovery tasks, and run automated checks over
state transitions and accessibility attributes. The lab collects no personal data, sends no
message, performs no consequential action, and stores preferences only in a temporary local
fixture that the reader deletes.

### Failure and evaluation focus

Inject fabricated progress, unsupported confidence, anthropomorphic pressure, bundled
consent, inaccessible approval, hidden cancel, lost work after interruption, action after
denial, preference retention after deletion, and engagement as the only success metric.
Evaluate task completion, time and steps, comprehension, appropriate reliance, error
recovery, interruption success, approval accuracy, accessibility checks, reported workload,
and qualitative findings with stated sample limits.

### Approved sources

SRC-057, SRC-066, SRC-113, SRC-114, and SRC-115. Human-AI and accessibility guidance informs
design and test criteria but does not prove usability for Northstar's users. Living guidance
must be reverified, and consequential product decisions require task-specific research with
representative users, including disabled users.

### Handoff

Pass Module 10 the frozen experience contract, capability boundaries, usability evidence,
accessibility results, approved wording categories, user-control state machine, unresolved
research questions, and any release blockers. Microsoft mappings must preserve these
requirements behind replaceable adapters and may not treat product availability as UX proof.

## Cross-module handoff contract

### Inputs consumed

- Module 05 supplies accepted metrics, datasets, evaluators, trajectory checks, and regression
  gates. Module 09 adds slices and cases but retains their versions and owners.
- Module 06 supplies threat, authority, identity, privacy, safety, governance, incident, and
  kill controls. Module 09 extends them only to newly introduced hybrid boundaries.
- Module 07 supplies architecture, resilience, telemetry, delivery, state, and recovery
  contracts. Module 09 adds signals and faults without replacing those mechanisms.
- Module 08 supplies workload, economics, capacity, tenant-region, migration, drift, and
  retirement evidence. Module 09 uses it to constrain routes, hardware, tools, and experience.

### Outputs supplied to Module 10

Module 09 hands Chapter 42:

- accepted provider-neutral route, hardware, fault, tool, assurance, and experience contracts;
- complete traceability to Modules 05-08 evidence versions and acceptance results;
- adapter boundaries and replacement tests for models, runtimes, protocols, tools, telemetry,
  identity, state, policy, and experience integrations;
- workload, device, tenant, region, data, identity, accessibility, recovery, cost, energy,
  and operational constraints that candidate services must satisfy;
- unresolved assumptions, stale or missing evidence, residual risks, qualified-review needs,
  owners, deadlines, fallbacks, and release consequences;
- no preselected Microsoft service and no authority to relax a requirement to fit a product.

## Module acceptance criteria

- [ ] Chapters 36-41 each appear exactly once and preserve the curriculum map's reader
      question, prerequisites, measurable outcome, Northstar increment, and source boundary.
- [ ] The module consumes and cites Modules 05-08 artifacts without redefining their metrics,
      security invariants, operating controls, economics, or lifecycle decisions.
- [ ] Every chapter defines at least two diagram intents with equivalent-text requirements.
- [ ] Every required lab is Python 3.11, offline, deterministic, synthetic, safe, and runnable
      without an account, payment, personal data, network, live model, or hardware stress.
- [ ] Chapter 36 checks mandatory eligibility before optimization and retains a single-route
      baseline, bounded fallback, cancellation, and fail-closed behavior.
- [ ] Chapter 37 reports distributions and accepted-task denominators for burst and sustained
      behavior and limits claims to the tested hardware and workload.
- [ ] Chapter 38 declares a cross-layer fault model, expected observations, containment,
      recovery verdicts, residual risk, and campaign limits.
- [ ] Chapter 39 keeps MCP behind a replaceable adapter and admits tools only with measured
      value, least authority, lifecycle support, ownership, and retirement evidence.
- [ ] Chapter 40 traces every material hybrid threat to architecture, controls, tests,
      operating evidence, owners, residual risk, and blocking release behavior.
- [ ] Chapter 41 tests capability disclosure, progress, uncertainty, approval, interruption,
      recovery, preference deletion, appropriate reliance, and accessibility.
- [ ] Private chain-of-thought is absent from routes, traces, explanations, progress,
      evaluations, approvals, labs, and evidence.
- [ ] Product, model, runtime, protocol, device, SDK, framework, price, quota, and service
      claims receive their approved evidence and freshness treatment.
- [ ] Qualified legal, privacy, accessibility, safety, and compliance review remains assigned
      to qualified owners and is not inferred from a framework, standard, test, or product.
- [ ] Module 10 receives frozen requirements and accepted evidence for Chapter 42, not a
      Microsoft product selection or a weakened acceptance threshold.

## Contract handoff

Chapter authors must preserve this contract's ownership boundaries and identify the exact
upstream artifact versions used. Any incompatible change to a prerequisite, metric, threat,
interface, workload, recovery objective, or user-control requirement requires a coordination
request and rerun of affected gates. The Module 09 lead delivers the accepted
`HybridSystemsPacket` to the Module 10 capstone lead before Microsoft mapping begins.