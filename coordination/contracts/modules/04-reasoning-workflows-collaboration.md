# Module 04 Contract: Reasoning, Workflows, and Collaboration

> Status: proposed for J2 acceptance
> Owner: J2 module-contract author, Module 04
> Contract date: 2026-09-06
> Scope: Chapters 14-18
> Evidence baseline: `research/source-ledger.csv` accessed 2026-09-05

## Module purpose

Module 04 moves Northstar from one bounded agent loop to controlled work that may branch,
pause, resume, or delegate. Readers learn to choose the least complex control structure that
meets a measured need: deterministic workflow first, bounded planning for uncertainty,
durable execution for long-running work, and multiple agents only after a simpler baseline
has been evaluated. The module ends by placing protocol adapters at explicit trust boundaries
without allowing interoperability to grant authority.

The module never treats model-generated private reasoning as an engineering artifact.
Inspectability comes from observable plan items, dependencies, uncertainty flags, state
transitions, typed tool requests and results, policy decisions, approvals, citations,
budgets, and outcomes.

## Entry contract

Readers entering this module can:

- separate deterministic controls from probabilistic model calls (Chapter 4);
- run and stop a bounded offline agent runtime with explicit budgets (Chapter 8);
- use typed tools whose authority and side effects are validated (Chapter 7, when required);
- interpret task state, tool traces, terminal statuses, and deterministic model doubles;
- work with Python 3.11, basic functions, typed records, JSON fixtures, and unit tests.

No cloud account, live model, orchestration framework, or protocol service is required.
Chapter-specific prerequisites remain authoritative and are not expanded into cumulative
lists.

## Exit contract

By the end of Chapter 18, the reader can:

1. compare deterministic workflow patterns and agent choices using quality, latency, cost,
   and failure evidence;
2. create and validate an observable plan, then replan within fixed triggers and budgets;
3. checkpoint and resume long-running work without duplicating consequential effects;
4. justify or reject a multi-agent design against a workflow or single-agent baseline;
5. expose one least-authority capability through a versioned protocol adapter and test its
   lifecycle and trust boundary;
6. preserve cancellation, authorization, idempotency, audit evidence, and bounded child
   budgets across workflow, worker, agent, and protocol boundaries.

## Module vocabulary

| Term | Contract meaning |
|---|---|
| Workflow | A predetermined control flow that may contain model calls. |
| Router | A deterministic or evaluated decision that selects one bounded path. |
| Plan artifact | A versioned, observable set of tasks, dependencies, status, budgets, and uncertainty flags. It excludes private chain-of-thought. |
| Replanning | A bounded update to a plan after a declared trigger, with validation before execution continues. |
| Durable execution | Execution whose logical state survives process or worker loss and can be reconstructed from committed records. |
| Checkpoint | A versioned record of logical run state from which execution can safely resume. |
| Activity | A bounded unit of work with typed input, timeout, retry policy, and a stable identity. |
| Lease | A time-limited claim that permits one worker to process an activity while ownership remains valid. |
| Idempotency key | A stable identifier used to recognize repeated requests and prevent duplicate effects. |
| Reconciliation | Checking intended and observed outcomes when an effect cannot be assumed to execute exactly once. |
| Agent handoff | A typed transfer of task scope, context references, authority, budget, and expected output between agents. |
| Protocol adapter | A boundary component that translates a stable domain contract to or from a protocol. |
| Capability discovery | A protocol exchange that describes available operations. It is not authorization. |
| Trust boundary | A boundary across which identity, data, instructions, or authority must be revalidated. |

## Module artifacts

All artifacts are vendor-neutral, serializable, and testable with offline fixtures:

- a workflow comparison record with declared task classes and selection criteria;
- a Python workflow runner with deterministic model and tool doubles;
- a versioned `Plan` containing task IDs, dependencies, status, uncertainty, and budgets;
- plan validation and bounded replanning traces without private reasoning;
- durable run, activity, checkpoint, lease, approval-wait, intent, and outcome records;
- interruption, redelivery, cancellation, expiry, and reconciliation fixtures;
- a multi-agent experiment report compared with workflow and single-agent baselines;
- typed worker and handoff contracts with isolated context and inherited budgets;
- one protocol-neutral capability plus a versioned protocol adapter;
- protocol lifecycle, authorization, compatibility, cancellation, and adversarial fixtures;
- a cumulative Northstar architecture decision record for module acceptance.

Labs use Python 3.11 and the standard library where practical. They run offline by default,
use deterministic clocks and identifiers, make zero provider calls, incur zero provider cost,
and perform no Class C or Class D effect. Optional framework, cloud, or live-provider mappings
must remain behind the same domain interfaces, be explicitly enabled and budget capped, and
be labeled with their verification date.

## Chapter 14: Workflow Patterns

### Reader question

Which jobs need a fixed recipe, and which need choices along the way?

### Prerequisites

Chapters 4 and 8.

### Measurable outcome

Given one fixed Northstar research fixture, the reader implements two workflow patterns and
selects one using recorded quality, latency, cost, and failure behavior. The comparison must
include the existing bounded agent loop or deterministic search-and-template baseline and
must state when the simpler option wins.

### Concepts and boundaries

- Workflow versus agent control flow: who selects the next step and under what contract.
- Prompt chaining, routing, parallel fan-out and join, orchestrator-worker, evaluator-optimizer,
  and map-reduce as patterns with different failure surfaces.
- Deterministic stage boundaries around probabilistic calls.
- Bounded concurrency, child budgets, join rules, partial results, cancellation, and stop
  conditions.
- Pattern selection by task variability, decomposability, verification cost, latency, and
  consequence, not by framework availability.
- Simpler baselines as permanent fallback paths rather than disposable demos.

Framework APIs are optional mappings. Domain workflow state and routing criteria must not
depend on a framework or cloud provider.

### Northstar increment

Put predictable research stages in deterministic workflows and reserve agent choices for
uncertain steps. Add explicit routing criteria around the Chapter 8 loop. Record whether a
fixed search, parallel source inspection, or bounded agent path is selected, and preserve the
deterministic search-and-template baseline.

Acceptance evidence is a workflow comparison showing where each candidate wins or loses on
declared task classes and metrics.

### Diagram intents

1. **Control-choice map:** show a fixed workflow, a router with bounded branches, and an agent
   loop on one continuum. The visual must identify who chooses the next step and where policy
   and budgets remain deterministic.
2. **Fan-out and join sequence:** show one parent budget split among source workers, bounded
   parallel execution, cancellation propagation, and a join that handles success, timeout,
   and partial results.
3. **Pattern selection decision flow:** start with task predictability and testability, then
   route to a fixed pipeline, evaluated router, or bounded agent. End every rejected complex
   option at the simpler baseline.

Each rendered diagram needs a one-sentence takeaway and an equivalent text walkthrough.

### Safe activity and offline lab

On paper, learners route familiar chores through a checklist, a small decision tree, or an
open choice and explain the minimum flexibility needed.

The Python lab implements two patterns for a fixed set of local research documents, such as
sequential prompt chaining and bounded parallel map-reduce. A deterministic model double and
read-only tool fixtures return predefined outputs. Tests cover normal completion, one failed
branch, cancellation, budget exhaustion, deterministic ordering, and partial-result policy.
The lab records task quality, simulated latency, call count as a cost proxy, and failure rate.

### Failures and evaluation

Reproduce over-orchestration, unbounded fan-out, a router that chooses the wrong path, a join
that hides a failed branch, and an evaluator-optimizer loop that never stops. Corrections must
add explicit bounds, typed branch results, fallback behavior, and terminal conditions.

Evaluate outcome correctness, branch-selection accuracy, total work, simulated p50 and p95
latency, failure containment, cancellation latency, and cost proxy. A more complex pattern is
accepted only when its predefined gain outweighs added calls, latency, and failure modes.

### Approved sources

- SRC-001: durable foundations for search and planning.
- SRC-013: evolving workflow patterns and simplicity-first guidance.
- SRC-020: evolving orchestration and incremental-adoption guidance.
- SRC-032: volatile product documentation used only for a dated optional framework mapping.
- SRC-051: volatile Python SDK documentation used only for a dated optional implementation
  comparison.

Volatile claims from SRC-032 and SRC-051 require revalidation within 30 days of release.

### Handoff to Chapter 15

Chapter 14 hands off a selected workflow, its baseline, task and budget contracts, typed stage
results, and comparison metrics. Chapter 15 may make uncertain work plannable, but it may not
replace predictable stages with unconstrained model decisions or remove the baseline.

## Chapter 15: Planning and Reasoning

### Reader question

How can a system break down a hard job and notice that its plan is failing?

### Prerequisites

Chapters 8 and 14.

### Measurable outcome

The reader produces an observable plan, validates its dependencies and budget, injects a
failed step, and demonstrates bounded replanning. The trace contains plan changes, triggers,
tool interactions, and outcomes, but no private chain-of-thought.

### Concepts and boundaries

- Goal and constraint parsing, task decomposition, dependency graphs, and completion criteria.
- Plan schemas with stable task IDs, status, prerequisites, expected artifacts, uncertainty,
  authority class, budget allocation, and retry or replan limits.
- Deterministic validation for cycles, missing dependencies, impossible budgets, excessive
  authority, invalid terminal states, and unbounded fan-out.
- Replanning triggers based on observable events: failed dependency, stale evidence, changed
  user constraint, deadline risk, low-confidence result, or no progress.
- Search, critique, reflection, and uncertainty as candidate techniques that require measured
  value and bounded outputs.
- Structured rationale appropriate for a decision record, such as selected option, rejected
  alternatives, evidence, uncertainty, and policy result. Private model reasoning is neither
  requested nor stored.
- The conditions under which direct prompting, a fixed decomposition, or no plan is better.

### Northstar increment

Add task decomposition, uncertainty flags, plan validation, and bounded replanning to the
uncertain research path. Plans are versioned artifacts outside model context. Each child task
inherits tenant, authority, deadline, and budget constraints and cannot mint capacity.

Acceptance evidence measures final outcome, extra steps, latency, cost proxy, validation
failures, and recovery after an injected step failure.

### Diagram intents

1. **Observable plan graph:** show versioned tasks and dependencies with status, uncertainty,
   expected artifact, and allocated budget. Deliberately omit hidden reasoning and label the
   inspectable evidence fields.
2. **Validate-execute-replan state machine:** show proposal, deterministic validation,
   execution, feedback, bounded replan, and terminal states. Invalid or exhausted plans must
   stop or request clarification.
3. **Planning adoption decision:** compare direct answer, fixed decomposition, and dynamic
   planning based on task difficulty, uncertainty, verification, and measured overhead.

Each rendered diagram needs a one-sentence takeaway and an equivalent text walkthrough.

### Safe activity and offline lab

Learners arrange paper task cards with prerequisites and a fixed token budget, then respond to
one removed resource by changing only affected cards. They explain the plan using observable
dependencies and outcomes, not hidden thought processes.

The Python lab defines frozen `Plan`, `PlanStep`, and `PlanEvent` records, parses deterministic
planner-double output, and validates a directed acyclic dependency graph. Fixtures include a
valid plan, a cycle, an unknown dependency, budget over-allocation, forbidden authority, and a
step failure that permits one bounded replan. Expected traces assert exact plan versions and
terminal status.

### Failures and evaluation

Reproduce plan cycles, vague steps with no completion test, authority escalation, budget
creation, endless decomposition, stale-plan execution, replan loops, and logging of sensitive
free-form reasoning. Corrections use closed schemas, plan versions, observable trigger codes,
redacted event fields, and hard replan limits.

Evaluate plan-validity rate, task success, dependency correctness, invalid-plan rejection,
recovery rate, unnecessary-step count, tool calls, simulated latency, cost proxy, and budget
compliance. Compare dynamic planning with direct prompting and the fixed Chapter 14 workflow.

### Approved sources

- SRC-001: durable search and planning foundations.
- SRC-007: evolving evidence about task-dependent reasoning demonstrations, not a requirement
  to collect private reasoning.
- SRC-008: evolving evidence for interleaving model outputs with observable actions.
- SRC-027: durable planning, policy, value, and environment-interaction foundations.
- SRC-038: evolving evidence about choosing and using tools.

### Handoff to Chapter 16

Chapter 15 hands off a validated, versioned plan and event schema, stable task IDs, inherited
budgets, explicit replan triggers, terminal conditions, and redaction rules. Chapter 16 makes
these logical artifacts durable across time and worker loss without treating process memory
or a transcript as state.

## Chapter 16: Durable Execution

### Reader question

How can a long job pause, survive a crash, and continue safely?

### Prerequisites

Chapters 7, 8, and 14.

### Measurable outcome

The reader resumes a workflow from a checkpoint after an injected worker failure and proves
that repeated delivery does not duplicate a consequential action. The run also responds
correctly to cancellation, deadline expiry, and an approval wait.

### Concepts and boundaries

- Logical durable state versus disposable process memory and reconstructed model context.
- Runs, activities, stable IDs, checkpoints, optimistic versions, queues, leases, timers,
  deadlines, and durable wait states.
- At-least-once delivery and why exactly-once execution is usually an unsafe assumption.
- Idempotent activity design, intent and outcome records, provider deduplication, and
  reconciliation for ambiguous effects.
- Typed retry policies, retryable error classes, backoff represented with a fake clock,
  cancellation propagation, and lease expiry.
- Approval as a durable state transition bound to an exact payload digest, identity, policy
  version, and expiry.
- Resume-time revalidation of identity, authority, policy, budgets, approval freshness,
  source access, and component versions.

### Northstar increment

Add durable state, queues, checkpoints, leases, deadlines, approval wait states, cancellation,
idempotent activities, and reconciliation. The immutable request and versioned run state are
the durable unit. Workers remain stateless and context is rebuilt from authorized committed
records.

Acceptance evidence covers interruption and duplicate delivery, with no duplicate effect and
with a durable receipt or explicit reconciliation status.

### Diagram intents

1. **Durable run state machine:** show admitted, ready, running, checkpointed,
   awaiting-approval, cancelling, and terminal states, including deadline and policy exits.
2. **Crash and redelivery sequence:** show intent recording, worker lease, injected crash,
   queue redelivery, checkpoint load, idempotency lookup, outcome reconciliation, and commit.
3. **Approval wait boundary:** show the requester, runtime, approval service, authenticated
   approver, expiry timer, and exact payload digest. A chat message alone must not cross the
   approval boundary.

Each rendered diagram needs a one-sentence takeaway and an equivalent text walkthrough.

### Safe activity and offline lab

Learners use index cards as an append-only history, stop midway, and give the cards to another
person who resumes from the last committed state. Repeating an effect card must return the
same recorded receipt rather than perform the effect again.

The Python lab uses an in-memory queue and repository, deterministic clock, stable ID fixture,
and fake publication adapter. Failure injection stops a worker after intent commit and before
outcome commit. Tests cover checkpoint conflict, lease expiry, duplicate message, timeout,
retryable and terminal errors, approval granted or expired, cancellation race, ambiguous
effect reconciliation, and resume from a fresh runtime instance.

### Failures and evaluation

Reproduce checkpoint-after-effect data loss, duplicate publication, stale lease ownership,
retry storms, ignored cancellation, approval replay, non-versioned state overwrite, and
resume under changed authority. Corrections establish commit ordering, compare-and-set state,
stable operation identity, bounded retries, approval binding, and resume-time checks.

Evaluate resume success, duplicate-effect count, checkpoint conflicts, queue redeliveries,
time to cancellation, deadline compliance, stale-approval rejection, reconciliation outcome,
and deterministic replay consistency. Required invariants are zero duplicate effects in the
fixture and 100 percent respect for hard budgets and terminal states.

### Approved sources

- SRC-049: volatile Microsoft messaging guidance for a dated optional adapter mapping.
- SRC-054: evolving AWS durable-workflow and retry guidance for comparative mapping.
- SRC-061: volatile Temporal durable-workflow documentation for comparative mapping.

Product semantics and APIs require revalidation within 30 days of release. The durable domain
contract must be taught and implemented before any product mapping.

### Handoff to Chapter 17

Chapter 16 hands off durable run and activity schemas, parent and child budget rules,
checkpoint and lease semantics, cancellation propagation, effect-safety records, and failure
fixtures. Chapter 17 must use these controls for delegated workers and must not introduce
ephemeral handoffs that cannot be recovered or audited.

## Chapter 17: Multi-Agent Systems

### Reader question

When do several agents help more than one agent or a workflow?

### Prerequisites

Chapters 8, 14, and 15.

### Measurable outcome

The reader compares a multi-agent design with a single-agent or deterministic-workflow
baseline on the same fixtures and retains it only if a predefined quality or latency gain
exceeds communication, cost, and failure overhead. The multi-agent path can be disabled
without changing the task contract.

### Concepts and boundaries

- Decomposition criteria: independent expertise, context isolation, parallelizable work, and
  independently verifiable artifacts.
- Supervisor-worker, typed handoff, debate, blackboard, evaluator-worker, and team patterns as
  hypotheses rather than maturity levels.
- Explicit worker role, input, output schema, allowed tools, source scope, deadline, budget,
  and terminal status.
- Isolated contexts and least-authority capabilities instead of shared transcripts or shared
  unrestricted tool access.
- Communication and coordination costs, correlated errors, group amplification, deadlock,
  cascading retries, and compromised-worker containment.
- Durable parent-child state, bounded fan-out, join policy, cancellation, and disable or
  fallback paths.
- The misconception that adding agents necessarily improves results.

### Northstar increment

Add one isolated worker experiment for a justified research decomposition, with explicit
handoff contracts, inherited budgets, context isolation, durable results, join behavior, and
failure containment. It remains an optional experiment, not a default production dependency.

Acceptance evidence is a preregistered comparison against both the deterministic workflow and
single-agent path. The decision record retains, narrows, or rejects the multi-agent design.

### Diagram intents

1. **Baseline comparison:** show the same Northstar task entering a deterministic workflow, a
   single agent, and a supervisor-worker experiment, all producing the same report contract
   and metric record.
2. **Authority and context isolation:** show a parent creating bounded child tasks with
   separate context, source scope, tool allowlist, and budget. Explicitly mark the child-to-
   parent handoff as typed data, not a shared hidden reasoning stream.
3. **Failure containment and join:** show one worker timeout or malformed result, sibling
   isolation, cancellation, partial-result policy, and fallback to the simpler path.

Each rendered diagram needs a one-sentence takeaway and an equivalent text walkthrough.

### Safe activity and offline lab

Small groups solve a source-sorting exercise first as one group and then as isolated workers
with typed handoff cards. They count communication rounds and compare correctness before
claiming that collaboration helped.

The Python lab runs identical local research fixtures through a deterministic workflow, one
agent double, and a supervisor with two isolated worker doubles. Worker outputs are closed
schemas containing findings, source references, uncertainty, and status. Tests cover a
malformed handoff, worker timeout, conflicting claims, budget exhaustion, parent cancellation,
correlated wrong answers, and fallback with no change to the final report interface.

### Failures and evaluation

Reproduce needless role proliferation, shared-context contamination, recursive delegation,
budget multiplication, circular handoffs, majority agreement on a wrong answer, and one
worker gaining another worker's authority. Corrections use typed handoffs, depth and fan-out
limits, independent evidence checks, isolated capability sets, and durable parent ownership.

Before running the comparison, define a retention rule such as: keep the multi-agent path
only if report correctness improves by at least 10 percentage points or simulated p95 latency
improves by at least 20 percent, while citation correctness and safety do not regress and
total call count stays within its declared ceiling. Report quality, citation correctness,
latency, calls, communication bytes, failure rate, recovery, and containment separately.

### Approved sources

- SRC-002: durable foundations for agent social ability.
- SRC-013: evolving evidence for workflow and orchestrator-worker patterns plus simplicity.
- SRC-014: evolving context-isolation and subagent-context guidance.
- SRC-020: evolving incremental-adoption and orchestration guidance.
- SRC-042: volatile Microsoft framework source for a dated optional mapping only.

SRC-042 claims require revalidation within 30 days of release.

### Handoff to Chapter 18

Chapter 17 hands off protocol-neutral task, worker, handoff, artifact, cancellation, status,
and budget contracts plus an evaluated adoption decision. Chapter 18 may transport these
contracts across codebase boundaries, but protocol compatibility must not weaken isolation,
authority, validation, or fallback behavior.

## Chapter 18: Interoperability Protocols

### Reader question

How can agents, tools, and user interfaces cooperate without sharing one codebase?

### Prerequisites

Chapters 7, 16, and 17.

### Measurable outcome

The reader implements one protocol-bounded capability and tests discovery, authorization
failure, version mismatch, cancellation, and lifecycle completion. The adapter proves that
discovery or successful connection does not grant tool authority.

### Concepts and boundaries

- Stable domain interfaces versus protocol roles, messages, transports, and adapters.
- Capability discovery, initialization and negotiation, task or request lifecycle, progress,
  artifacts, errors, cancellation, and completion.
- Schema and protocol versioning, capability negotiation, unknown-field handling, timeout,
  retry, and downgrade or refusal policy.
- Distinct user, client, server, agent, tool, and workload identities.
- Authentication versus authorization; discovery versus permission; transport security
  versus payload trust.
- Remote messages, capability descriptions, tool results, model output, and UI events as
  untrusted inputs even when the peer is authenticated.
- Least-authority scopes, destination and egress controls, confused-deputy prevention,
  injection handling, audit evidence, revocation, and protocol-specific threat models.
- MCP, A2A, and AG-UI as evolving adapter examples at different boundaries, not universal
  domain models or automatic trust mechanisms.

### Northstar increment

Expose one least-authority read capability through a versioned protocol adapter while
keeping Northstar domain interfaces protocol-neutral. Pin the adapter schema and translate
protocol messages into validated internal requests carrying tenant, principal, task, policy,
budget, cancellation, and correlation context.

Acceptance evidence covers lifecycle completion, denied authority, incompatible version,
malformed and injected payloads, cancellation, timeout, and a clean replacement with a local
adapter using the same domain contract.

### Diagram intents

1. **Protocol-neutral adapter boundary:** show the Northstar domain capability behind an
   adapter, with protocol client and transport outside. Mark validation, identity, policy,
   schema translation, and audit points.
2. **Lifecycle sequence:** show initialize or negotiate, discover, request, authorize,
   progress, cancel or complete, and artifact delivery. Include version mismatch and timeout
   exits.
3. **Protocol trust-boundary threat view:** show an authenticated but untrusted peer attempting
   instruction injection, authority escalation, replay, oversized payload, and confused-
   deputy access, with the control that rejects each path.

Each rendered diagram needs a one-sentence takeaway and an equivalent text walkthrough.

### Safe activity and offline lab

Pairs exchange versioned capability cards. One side may advertise available operations, but
the other must present a separate authorization card before any request is accepted. Learners
then introduce an incompatible version and cancellation message and trace the terminal state.

The Python lab defines a protocol-neutral read-only source-summary capability and an in-memory
JSON adapter inspired by one approved protocol. No network socket or external server is
required. Contract tests cover initialization, discovery, allowed request, missing or expired
identity, forbidden scope, version mismatch, unknown capability, malformed and oversized
payload, injected instruction text treated as data, replay, timeout, cancellation, progress,
completion, and adapter replacement.

### Failures and evaluation

Reproduce discovery treated as authorization, protocol identity confused with user delegation,
remote text treated as control instructions, silent version downgrade, cancellation loss,
unbounded payloads, lifecycle completion without a durable artifact, and adapter details
leaking into domain types. Corrections use explicit policy checks, identity separation,
closed schemas, pinned versions, size limits, durable task state, and translation tests.

Evaluate contract-test pass rate, unauthorized-operation count, lifecycle completeness,
version-mismatch detection, cancellation completion, malformed-input rejection, adapter
replacement effort, and audit-event coverage. Required safety results are zero accepted
unauthorized requests and no authority increase through any protocol field.

### Approved sources

- SRC-016: volatile MCP specification for current roles, lifecycle, capabilities, and
  messages.
- SRC-034: volatile A2A specification for current tasks, capabilities, messages, and artifacts.
- SRC-055: volatile AG-UI documentation for current agent-to-interface event concepts.

All protocol names, roles, versions, fields, lifecycle claims, and compatibility claims are
volatile and require primary-source revalidation within 30 days of release. Core lessons must
remain valid if all three protocol adapters are replaced.

### Handoff to Module 05

Chapter 18 hands off versioned domain and adapter contracts, lifecycle traces, trust-boundary
tests, protocol threat cases, and baseline comparison results. Chapter 19 uses these artifacts
to freeze outcome, trajectory, safety, latency, reliability, human-factor, and cost metrics.
No Module 04 experiment becomes a production default before Modules 05 and 06 evaluate and
control it.

## Module acceptance

Module 04 is ready for chapter authoring only when all of the following are true:

- [ ] Chapters 14-18 preserve the curriculum questions, direct prerequisites, measurable
  outcomes, Northstar increments, and approved source IDs without additions that require a
  cross-module contract change.
- [ ] Every chapter specifies at least two diagram intents with a takeaway and equivalent text
  requirement.
- [ ] Every chapter has a safe no-account activity and a deterministic Python 3.11 offline lab
  with fixtures, expected traces, failure injection, automated checks, and zero provider cost.
- [ ] Chapter 14 keeps the deterministic Northstar baseline and measures complexity before
  selecting a workflow or agent path.
- [ ] Chapter 15 stores observable plans, dependencies, uncertainty, triggers, and outcomes,
  and never requires private chain-of-thought as input, output, trace, or evaluation evidence.
- [ ] Chapter 16 proves recovery, cancellation, approval expiry, and duplicate-delivery safety
  using durable records and idempotency or reconciliation.
- [ ] Chapter 17 preregisters an adoption threshold, compares workflow, single-agent, and
  multi-agent paths, contains worker failures, and retains a disable or fallback path.
- [ ] Chapter 18 keeps domain interfaces protocol-neutral and tests lifecycle, versioning,
  identity, authorization, cancellation, malformed input, and untrusted peer content.
- [ ] Consequential behavior preserves exact-action approval, idempotency, audit evidence,
  cancellation, authority, tenant context, deadlines, and budgets at every boundary.
- [ ] All source IDs exist in the approved ledger, and volatile framework, product, and
  protocol claims carry a 30-day release revalidation requirement.
- [ ] The cumulative Northstar result can resume long-running research, wait for approval,
  compare optional multi-agent work with simpler baselines, and expose one protocol-bounded
  capability without weakening earlier invariants.

## Author handoff

Chapter authors receive this contract, the editorial contract, chapter template, curriculum
map, Northstar architecture contract, Module 04 README, and approved source-ledger rows.
Authors own chapter prose and chapter-local artifacts only. They must report:

1. the reader question and measurable outcome satisfied;
2. prerequisite terms used and newly defined vocabulary;
3. Northstar artifacts added without changing frozen domain boundaries;
4. diagrams, text alternatives, safe activity, lab fixtures, expected traces, and tests;
5. baseline comparison, failure injections, metrics, and acceptance thresholds;
6. source IDs used, claim-level support, and volatile claims needing release verification;
7. unresolved risks or cross-module requests.

Any change to a frozen prerequisite, outcome, Northstar responsibility, approved evidence set,
or shared domain contract requires an accepted coordination request. Chapter authors must not
patch another module, the shared source ledger, or the Northstar architecture contract.

## Downstream handoff

The Module 04 acceptance package consists of the five chapter completion manifests, offline
test results, workflow and agent comparison records, plan-validation evidence, durable-
recovery evidence, multi-agent adoption decision, protocol contract tests, and the cumulative
Northstar architecture decision record. Module 05 consumes the metric candidates and traces;
Module 06 consumes authority and protocol threat boundaries; Module 07 consumes only designs
that those modules later evaluate and control.