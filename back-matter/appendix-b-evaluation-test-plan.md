# Appendix B: Evaluation and AI System Test Plan

Use this appendix as a reusable plan for testing an AI system from local components through production operation. Replace bracketed text, remove rows that are out of scope, and add project-specific thresholds before approval.

## Related Chapters

Use these chapters when a plan needs more detail about a test surface or release decision:

- [Chapter 19: What Does Good Mean?](../modules/05-evaluation-improvement/chapters/19-what-does-good-mean.md)
- [Chapter 20: Building Evaluation Sets](../modules/05-evaluation-improvement/chapters/20-building-evaluation-sets.md)
- [Chapter 21: Evaluators](../modules/05-evaluation-improvement/chapters/21-evaluators.md)
- [Chapter 22: Agent and Tool Evaluation](../modules/05-evaluation-improvement/chapters/22-agent-and-tool-evaluation.md)
- [Chapter 23: Debugging and Optimization](../modules/05-evaluation-improvement/chapters/23-debugging-and-optimization.md)
- [Chapter 29: Reliability Engineering](../modules/07-production-architecture-operations/chapters/29-reliability-engineering.md)
- [Chapter 30: Observability and SRE](../modules/07-production-architecture-operations/chapters/30-observability-and-sre.md)
- [Chapter 31: Deployment and Delivery](../modules/07-production-architecture-operations/chapters/31-deployment-and-delivery.md)
- [Chapter 33: Performance and Cost Engineering](../modules/08-scale-economics-lifecycle/chapters/33-performance-cost-engineering.md)
- [Chapter 36: Hybrid AI Model Orchestration](../modules/09-hybrid-ai-systems-engineering/chapters/36-hybrid-ai-model-orchestration.md)
- [Chapter 37: Performance, Energy, and Thermal Engineering](../modules/09-hybrid-ai-systems-engineering/chapters/37-performance-energy-thermal-engineering.md)
- [Chapter 38: AI System Testing and Fault Tolerance](../modules/09-hybrid-ai-systems-engineering/chapters/38-ai-system-testing-fault-tolerance.md)
- [Chapter 39: MCP Tool Portfolio Engineering](../modules/09-hybrid-ai-systems-engineering/chapters/39-mcp-tool-portfolio-engineering.md)
- [Chapter 40: Secure-by-Design AI Systems](../modules/09-hybrid-ai-systems-engineering/chapters/40-secure-by-design-ai-systems.md)
- [Chapter 41: Product and UX Design for Agentic Systems](../modules/09-hybrid-ai-systems-engineering/chapters/41-product-ux-design-agentic-systems.md)

## 1. Plan Identity and Scope

| Field | Entry |
|---|---|
| System or feature | [Name and short description] |
| Plan version | [Version] |
| Owner | [Name or team] |
| Reviewers | [Engineering, product, security, operations, accessibility] |
| Change under test | [Model, prompt, policy, retrieval, tool, runtime, client, infrastructure] |
| User outcomes in scope | [Observable outcomes] |
| Consequential actions in scope | [Writes, purchases, messages, permissions, or none] |
| Environments | [Local, test, staging, shadow, canary, production] |
| Device and network scope | [Device classes and network profiles] |
| Data classification | [Synthetic, public, internal, restricted] |
| Explicit exclusions | [What this plan does not test] |
| Release window | [Date or release identifier] |
| Rollback owner | [Name or on-call role] |
| Evidence location | [Dashboard, run record, or artifact path] |

### System Boundary

Record the components that can change the observed outcome:

| Component | Version or configuration | In scope | Test double available | Production signal |
|---|---|---:|---:|---|
| Client or device | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| Runtime or orchestrator | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| Model or router | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| Prompt and policy | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| Retrieval and index | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| MCP server and tool catalog | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| State, memory, and cache | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| External dependency | [Value] | [Yes/No] | [Yes/No] | [Signal] |
| Evaluator | [Value] | [Yes/No] | [Yes/No] | [Signal] |

## 2. Oracle, Evaluator, and Decision Vocabulary

A **test oracle** is the rule or mechanism that determines the expected result for a test. An oracle can be an exact value, schema, invariant, state transition, policy decision, approved trace, or human-authored label. The oracle belongs to the requirement and must not silently change when the system under test changes.

An **evaluator** measures or estimates a property of an observed result. It can apply code, a rubric, a model, or human review. An evaluator must be versioned, calibrated, and tested against oracle-backed examples. An evaluator does not become the oracle merely because it produces a score.

| Term | Plan usage |
|---|---|
| Assertion | A machine-checkable comparison between an observation and an oracle. |
| Evaluator | A scoring or labeling component used where an exact assertion is unavailable or incomplete. |
| Trial | One execution of one case under one recorded configuration. |
| Repeated trial | Multiple trials used to measure variation in a nondeterministic path. |
| Outcome evaluation | Evaluation of the final user-visible result and side effects. |
| Trajectory evaluation | Evaluation of the observable sequence of states, model calls, tool calls, controls, and handoffs. Private chain-of-thought is not required. |
| Accepted outcome | An outcome that passes every required oracle, evaluator threshold, and safety gate for its stratum. |
| False allow | The system allows an action when the policy oracle says it must not allow it. |
| False deny | The system denies an action when the policy oracle says it may allow it. |

### Expected Safe Outcomes

Every safety, fault, and recovery case must name one of these expected outcomes. Do not use a generic value such as "handles error."

| Outcome | Required behavior | Required evidence |
|---|---|---|
| `DENY` | Stop the disallowed request or action before an unauthorized side effect. | Decision reason, policy version, no prohibited side effect, user-safe response. |
| `FALLBACK` | Use an approved reduced-capability path when the preferred path is unavailable or unsuitable. | Fallback selection, capability limits, preserved safety checks, resulting outcome. |
| `RETRY` | Repeat a transient operation within a bounded policy. | Attempt count, backoff or retry policy, idempotency evidence, terminal result. |
| `RECONCILE` | Compare intended and observed state, then reach a known consistent state or escalate without guessing. | State comparison, corrective action, final state, unresolved discrepancy if any. |

## 3. Test Strategy

Build the plan from deterministic checks outward. Give every row an owner, environment, entry condition, exit condition, and retained evidence.

| Test layer | Primary purpose | Oracle or evaluator | Execution mode | Evidence to retain |
|---|---|---|---|---|
| Deterministic unit tests | Verify pure logic, policy, routing, budgets, and state transitions. | Exact oracle and invariants | Per change | Inputs, expected value, actual value, result |
| Schema and contract tests | Verify request, response, event, tool, and persisted-state shapes. | Versioned schema oracle | Per change and provider update | Schema version, compatibility result, rejected examples |
| Model doubles | Force named model outputs, malformed outputs, delays, refusals, and errors. | Scripted oracle | Per change | Double scenario, calls, output, control decision |
| Tool doubles | Force tool success, denial, timeout, partial result, duplicate result, and side-effect behavior. | Scripted oracle and state invariant | Per change | Arguments, authorization, idempotency key, state ledger |
| Retrieval tests | Verify selection, permissions, provenance fields, contamination handling, and no-result behavior. | Labeled corpus oracle plus answer evaluator | Per index, embedding, query, or policy change | Corpus version, query, retrieved IDs, ranks, decision |
| Evaluator calibration | Verify evaluator agreement with oracle-backed labels and review disagreements. | Human-authored or deterministic oracle | Per evaluator or rubric change | Calibration set, confusion matrix, disagreements, version |
| Outcome evaluations | Measure task result, safety, quality, latency, and cost. | Assertions plus calibrated evaluators | Repeated trials | Trial records, aggregate, confidence interval, failures |
| Trajectory evaluations | Verify allowed steps, tool choice, arguments, budgets, termination, and side effects. | Trace invariants plus calibrated evaluators | Repeated trials | Redacted trace, policy decisions, tool sequence, state changes |
| Security and adversarial tests | Exercise abuse, injection, data exposure, privilege, and policy boundaries. | Security and policy oracle | Per change and scheduled campaign | Payload class, expected safe outcome, observed effect |
| Integration tests | Verify contracts across real components in a controlled environment. | End-to-end state and contract oracle | Per change and release candidate | Component versions, trace, final state, cleanup result |
| Load, soak, and device tests | Exercise concurrency, duration, resource, network, and client variation. | Service and device thresholds | Release candidate and scheduled | p50/p95/p99, errors, cost, thermal, battery, saturation |
| Fault injection | Exercise one controlled failure at a named boundary. | Resilience invariant and safe outcome | Release candidate | Injection, detection, recovery, data and side-effect state |
| Chaos tests | Exercise approved combinations or timing of failures within a bounded blast radius. | Steady-state and recovery oracle | Scheduled in controlled scope | Hypothesis, scope, abort signal, timeline, recovery |
| Shadow tests | Compare candidate behavior on copied eligible traffic without candidate side effects. | Baseline comparison and safety oracle | Before canary | Eligibility, comparison, blocked side effects, deltas |
| Canary tests | Expose a bounded segment to the candidate with automatic stop conditions. | Release thresholds and rollback oracle | Before broad rollout | Segment, duration, alerts, gate result, rollback status |
| Accessibility and usability tests | Verify task completion through supported interaction modes. | Acceptance criteria plus moderated rubric | Per user-facing change | Input mode, assistive setup, completion, errors, feedback |
| Production monitoring | Detect regressions, drift, policy failures, cost changes, and recovery events. | Service objectives and alert rules | Continuous | Metric, threshold, alert, owner, linked incident or run |

### Nondeterminism and Repeated Trials

Use a deterministic test whenever the property is deterministic. For nondeterministic behavior, define the trial protocol before running the candidate.

| Trial field | Entry |
|---|---|
| Sampling unit | [Prompt, task, conversation, user journey, or session] |
| Evaluation strata | [Risk, language, device, tool path, user group, or other] |
| Fixed factors | [Dataset version, prompt version, tool catalog, policies, time source] |
| Varied factors | [Seed, model sample, retrieval tie, network profile, concurrency] |
| Trials per case and stratum | [Count] |
| Randomization or ordering | [Method] |
| Independence constraints | [Shared cache, session, user, or state controls] |
| Stopping rule | [Predeclared rule] |
| Confidence level | [Value] |
| Confidence interval method | [Method appropriate to the metric] |
| Pass rule | [Point estimate and lower or upper confidence bound] |
| Failed-trial handling | [Count, retry, exclude, and reason rules] |

For each aggregate, report the trial count, numerator, denominator, point estimate, and confidence interval. Keep safety-critical strata visible instead of replacing them with only a combined average. Record both false allow and false deny counts against the policy oracle.

## 4. Requirement-to-Test Traceability

Create at least one row for every user outcome, safety invariant, operational objective, accessibility requirement, and recovery requirement.

| Requirement ID | Requirement or invariant | Risk | Oracle | Test IDs | Strata | Pass threshold | Release gate | Production signal | Owner |
|---|---|---|---|---|---|---|---|---|---|
| [REQ-001] | [Observable requirement] | [Low/Medium/High/Critical] | [Exact expected result] | [TC-001, EV-001] | [Applicable strata] | [Threshold and confidence bound] | [Gate ID] | [Metric or alert] | [Owner] |
| [REQ-002] | [Safe behavior or recovery invariant] | [Risk] | [`DENY`, `FALLBACK`, `RETRY`, or `RECONCILE` plus state] | [Test IDs] | [Applicable strata] | [Threshold] | [Gate ID] | [Metric or alert] | [Owner] |

## 5. Test Case Record

### Required Test Case Fields

| Field | Required content |
|---|---|
| Test ID and title | Stable identifier and behavior under test. |
| Requirement IDs | Links to traceability rows. |
| Risk and priority | Consequence and execution priority. |
| Test layer | One or more layers from the strategy. |
| Preconditions | Required identity, state, data, configuration, and environment. |
| Versions | Model, prompt, policy, evaluator, corpus, tools, runtime, and client. |
| Inputs | Synthetic fixture, request, history, device state, and fault parameters. |
| Oracle | Exact expected value, invariant, policy decision, state, or approved label. |
| Evaluator | Name, version, rubric, threshold, and calibration set, or `None`. |
| Procedure | Reproducible setup, action, observation, and cleanup steps. |
| Repeated trials | Trial count, strata, varied factors, and confidence interval method. |
| Expected safe outcome | `DENY`, `FALLBACK`, `RETRY`, `RECONCILE`, or `Not applicable`. |
| Expected trajectory | Allowed tools, forbidden tools, ordering, budget, retries, and termination. |
| Expected side effects | Exact authorized writes and idempotency expectations, or `None`. |
| Observations | Outcome, trajectory, state changes, telemetry, latency, resource, and cost. |
| Pass rule | Assertions, evaluator thresholds, confidence bounds, and zero-tolerance events. |
| Cleanup and recovery | State restoration, reconciliation, and evidence of completion. |
| Evidence | Run ID, logs, traces, screenshots, profiles, reports, and retained artifacts. |
| Result and defect | Pass, fail, blocked, waived, defect ID, and approver. |

### Copyable Test Case

| Field | Entry |
|---|---|
| Test ID and title | [TC-___: title] |
| Requirement IDs | [REQ-___] |
| Risk and priority | [Value] |
| Test layer | [Value] |
| Preconditions | [Value] |
| Versions | [Value] |
| Inputs | [Value] |
| Oracle | [Value] |
| Evaluator | [Value or None] |
| Procedure | [1. Setup; 2. Act; 3. Observe; 4. Clean up] |
| Repeated trials | [Protocol or Not applicable] |
| Expected safe outcome | [`DENY`/`FALLBACK`/`RETRY`/`RECONCILE`/Not applicable] |
| Expected trajectory | [Value] |
| Expected side effects | [Value or None] |
| Observations | [Value] |
| Pass rule | [Value] |
| Cleanup and recovery | [Value] |
| Evidence | [Value] |
| Result and defect | [Value] |

## 6. Retrieval, Tool, Outcome, and Trajectory Coverage

### Retrieval Cases

Define a versioned synthetic corpus and expected document IDs where an exact retrieval oracle is possible. Separate retrieval selection from answer evaluation.

| Case | Controlled variation | Retrieval oracle | Answer check | Safe outcome |
|---|---|---|---|---|
| Relevant item present | [Query wording or rank tie] | [Expected IDs or acceptable set] | [Grounding or task rubric] | [Normal result] |
| No relevant item | [Empty or unrelated corpus] | [No qualifying item] | [No unsupported answer] | `FALLBACK` |
| Unauthorized item ranks highly | [Identity and ACL fixture] | [Item must not be returned] | [No restricted content] | `DENY` |
| Conflicting items | [Contradictory fixtures] | [Both IDs and metadata] | [Conflict surfaced or policy applied] | `RECONCILE` |
| Malicious retrieved instruction | [Synthetic injection fixture] | [Item may be retrieved but not treated as authority] | [Instruction not followed] | `DENY` |
| Retrieval dependency unavailable | [Timeout or error] | [Failure detected] | [Bounded degraded response] | `RETRY` or `FALLBACK` |

### MCP Tool Portfolio and Selection Cases

Test the selected tool and the tools that must not be selected. Record the tool catalog version in every run.

| Case | Catalog condition | Oracle | Expected safe outcome |
|---|---|---|---|
| Correct tool available | Minimal approved catalog | Exact tool name, schema-valid arguments, and authorization | [Normal result] |
| Wrong-tool selection pressure | Similar names or overlapping descriptions | Required tool selected; prohibited alternatives not called | `DENY` if no safe selection exists |
| MCP tool pollution | Irrelevant, duplicate, stale, or low-trust tools added to the catalog | Approved tool allowlist and selection invariant remain satisfied | `DENY` or `FALLBACK` |
| Tool schema changed | Required field added, removed, or changed in a double | Contract mismatch detected before side effect | `FALLBACK` |
| Tool result contains instructions | Synthetic untrusted content in result | Result handled as data, not control policy | `DENY` |
| Tool times out after request | Delayed double with known side-effect state | No blind duplicate; status checked before another write | `RECONCILE` |
| Duplicate delivery | Same call or event delivered twice | One authorized effect under the idempotency oracle | `RECONCILE` |

### Outcome and Trajectory Checks

| Surface | Outcome checks | Trajectory checks |
|---|---|---|
| Task | Correct completion, abstention, or escalation | Valid state transitions and bounded termination |
| Policy | Final action matches the policy oracle | Policy checked before consequential action |
| Tools | Intended external state | Correct tool, schema-valid arguments, authorization, and idempotency |
| Retrieval | Required evidence present or explicit no-result behavior | Authorized query, allowed corpus, and provenance fields retained |
| Handoff | Recipient receives sufficient structured context | Handoff occurs once at an allowed boundary |
| Budget | Outcome stays within the accepted budget | Model, tool, token, time, and retry limits enforced |
| Recovery | Final state is known and consistent | Detection, retry or fallback, reconciliation, and escalation are visible |

## 7. Evaluator Calibration Plan

Do not evaluate an evaluator only on examples it helped create. Keep calibration evidence separate from candidate run evidence.

| Field | Entry |
|---|---|
| Evaluator name and version | [Value] |
| Property measured | [Value] |
| Oracle-backed calibration set | [ID, version, and label owner] |
| Label classes or score range | [Value] |
| Blind review procedure | [Value] |
| Agreement measures | [Exact match, confusion matrix, or score error] |
| False pass tolerance | [Threshold] |
| False fail tolerance | [Threshold] |
| Subgroup or stratum checks | [Value] |
| Uncertain-score handling | [Human review, abstain, or second evaluator] |
| Recalibration trigger | [Rubric, evaluator, model, domain, or distribution change] |
| Approval owner | [Value] |

Review evaluator disagreements by comparing the evaluator output with the oracle and rubric. Do not resolve a disagreement by changing the oracle to match the candidate result without a separately reviewed requirement change.

## 8. Fault, Security, and Adversarial Matrix

Use synthetic data and controlled environments. For each injection, verify detection, containment, user-visible behavior, telemetry, rollback, and recovery.

| Scenario | Injection or stimulus | Protected invariant or oracle | Expected safe outcome | Required telemetry | Rollback or recovery check |
|---|---|---|---|---|---|
| Direct prompt injection | Synthetic instruction that conflicts with policy | Policy and authorization remain controlling | `DENY` | Policy decision and blocked action | No prohibited state change |
| Indirect prompt injection | Synthetic instruction in retrieved or tool content | Untrusted content cannot grant authority | `DENY` | Content source and blocked instruction | Continue safely or end cleanly |
| Sensitive data request | Synthetic restricted record and unauthorized identity | Access oracle denies disclosure | `DENY` | Access decision without sensitive payload | No cache, log, or response leakage |
| Excessive privilege | Tool double offers broader action than required | Least-authority tool and argument oracle | `DENY` | Requested scope and denied call | No side effect |
| MCP tool pollution | Add irrelevant, duplicate, stale, and low-trust tools | Approved catalog and selection policy | `DENY` or `FALLBACK` | Catalog version and candidate ranking | Restore approved catalog |
| Wrong-tool selection | Present a plausible but disallowed tool | Required tool or no-call oracle | `DENY` | Considered and selected tool IDs | No disallowed call |
| Malformed model output | Return invalid structure or missing decision | Schema and state transition invariant | `RETRY` or `FALLBACK` | Parse failure and attempt count | Valid terminal state |
| Model unavailable | Timeout, refusal, or service error | Bounded execution and user-safe response | `RETRY` or `FALLBACK` | Error class, attempts, selected route | Preferred route can be restored |
| Retrieval unavailable | Timeout, empty index, or dependency error | No fabricated evidence | `RETRY` or `FALLBACK` | Dependency status and response mode | Index health verified before restore |
| Partial write | Tool reports uncertainty after a possible write | No duplicate effect and known final state | `RECONCILE` | Request ID, idempotency key, state query | Intended and observed state compared |
| Duplicate event | Deliver the same event more than once | One logical state transition | `RECONCILE` | Deduplication decision | Final state matches one execution |
| Rate limit | Tool or model double returns a limit response | Retry budget and deadline | `RETRY` or `FALLBACK` | Backoff, attempts, deadline | Queue and state drain cleanly |
| Network partition | Block one dependency during an in-flight task | Bounded wait and consistent state | `RETRY` or `RECONCILE` | Dependency state and timeout | State repaired after connectivity returns |
| Corrupt memory or cache | Inject stale or schema-invalid state | Durable source and schema oracle | `RECONCILE` | Corruption detection and source chosen | Cache rebuilt or isolated |
| Budget exhaustion | Reach token, cost, time, or tool-call limit | Hard budget and no uncontrolled continuation | `FALLBACK` or `DENY` | Budget counters and termination reason | No work continues after termination |
| Client resource pressure | Constrain memory, battery, or thermal headroom | Device threshold and usable safe state | `FALLBACK` | Thermal, battery, memory, selected route | Normal route restored within policy |
| Rollback failure | Make the first rollback path unavailable in a double | Escalation and state consistency oracle | `RECONCILE` | Rollback attempts and escalation | Final state known or isolated |

## 9. Integration, Performance, Device, and Resilience Plan

### Integration Runs

| Run | Components kept real | Components doubled | Data and side-effect boundary | Entry condition | Exit condition |
|---|---|---|---|---|---|
| Local contract | [Runtime and adapters] | [Model, tools, clock, network] | [Synthetic and local] | [Unit and schema pass] | [Contracts and cleanup pass] |
| Controlled integration | [Named dependencies] | [Unavailable or unsafe dependencies] | [Sandbox and synthetic] | [Local contract pass] | [End-to-end invariants pass] |
| Release candidate | [Production-like components] | [Consequential actions as required] | [Approved staging boundary] | [Prior gates pass] | [Release thresholds pass] |

### Load and Soak Profile

| Profile ID | Workload and mix | Concurrency or arrival pattern | Duration | Network profile | Required measures | Pass rule |
|---|---|---|---|---|---|---|
| [LOAD-01] | [Task and risk mix] | [Value] | [Value] | [Value] | Latency p50/p95/p99, accepted outcomes, errors, queue, saturation, cost | [Thresholds] |
| [SOAK-01] | [Long-duration mix] | [Value] | [Value] | [Value] | Latency p50/p95/p99 by interval, leaks, drift, retries, cost, recovery | [Thresholds] |

Report latency p50, p95, and p99 for each required end-to-end and component boundary. Define the start and stop event for every latency measure. Keep timeouts and denied requests in named categories rather than silently removing them.

Calculate and report:

`cost per accepted outcome = total attributable run cost / number of accepted outcomes`

State which model, tool, compute, network, storage, and evaluator costs are included. Report a separate value for each required stratum when the release gate is stratum-specific.

### Device, Thermal, and Battery Matrix

| Device class | OS and runtime | Processor or accelerator | Memory | Power mode | Network | Workload and duration | Thermal measures | Battery measures | Pass rule | Result |
|---|---|---|---|---|---|---|---|---|---|---|
| [Reference low] | [Value] | [Value] | [Value] | [Value] | [Value] | [Value] | [Temperature, throttling, time in state] | [Start/end, energy, drain per accepted outcome] | [Threshold] | [Result] |
| [Reference target] | [Value] | [Value] | [Value] | [Value] | [Value] | [Value] | [Temperature, throttling, time in state] | [Start/end, energy, drain per accepted outcome] | [Threshold] | [Result] |
| [Reference high] | [Value] | [Value] | [Value] | [Value] | [Value] | [Value] | [Temperature, throttling, time in state] | [Start/end, energy, drain per accepted outcome] | [Threshold] | [Result] |

### Fault Injection and Chaos Record

| Field | Entry |
|---|---|
| Hypothesis | [When fault occurs, the named invariant and safe outcome remain true] |
| Steady-state indicators | [Values before injection] |
| Injection and boundary | [Single fault or approved combination] |
| Scope and blast radius | [Environment, users, devices, tenants, or requests] |
| Preconditions | [Backups, owner, communications, and verified rollback] |
| Abort conditions | [Automatic and manual stop signals] |
| Expected safe outcome | [`DENY`/`FALLBACK`/`RETRY`/`RECONCILE`] |
| Detection target | [Signal and threshold] |
| Recovery target | [Service and data state target] |
| Rollback procedure | [Version, configuration, traffic, data, and owner steps] |
| Reconciliation procedure | [Intended versus observed state comparison] |
| Observed timeline | [Inject, detect, contain, recover, reconcile] |
| Residual risk and action | [Value] |

Run chaos only within its approved scope. Stop at the abort condition, execute rollback, and verify recovery plus reconciliation before closing the run.

## 10. Shadow, Canary, Accessibility, and Usability

### Shadow and Canary

| Stage | Traffic or participant scope | Candidate side effects | Comparison | Stop condition | Promotion condition | Rollback and recovery |
|---|---|---|---|---|---|---|
| Shadow | [Eligible copied traffic] | Blocked or redirected to doubles | Outcome, trajectory, false allow/deny, p50/p95/p99, cost | [Safety, privacy, or resource trigger] | [Required thresholds and confidence intervals] | [Disable shadow and remove retained candidate state] |
| Canary | [Bounded segment and duration] | [Explicitly allowed set] | Baseline and candidate gates | [Automatic rollback thresholds] | [Required thresholds and minimum evidence] | [Route back, restore version, reconcile effects, verify recovery] |

### Accessibility and Usability Matrix

| Journey | Mode or participant | Acceptance oracle | Observation or evaluator | Error recovery | Result |
|---|---|---|---|---|---|
| [Critical journey] | Keyboard only | [Completion criteria] | [Focus order and task completion] | [Undo, retry, or safe exit] | [Result] |
| [Critical journey] | Screen reader and supported browser | [Names, states, announcements, completion] | [Structured observation] | [Recovery path] | [Result] |
| [Critical journey] | Zoom, reflow, and text scaling | [No blocked task step] | [Structured observation] | [Recovery path] | [Result] |
| [Critical journey] | Color and contrast review | [Project criterion] | [Automated and manual checks] | [Not applicable] | [Result] |
| [Critical journey] | Voice, switch, touch, or device input in scope | [Completion criteria] | [Structured observation] | [Recovery path] | [Result] |
| [Critical journey] | Moderated usability session | [Task and safety criteria] | [Rubric, completion, errors, user feedback] | [Help, correction, undo, escalation] | [Result] |

Include comprehension of model uncertainty, confirmation before consequential action, progress during waits, clear denial or fallback messaging, correction, cancellation, undo where supported, and recovery after interruption in the relevant journey criteria.

## 11. Production Monitoring and Response

Map each release requirement to a production signal or state why production observation is not applicable.

| Signal | Definition and dimensions | Window | Threshold | Alert owner | Automated response | Investigation evidence |
|---|---|---|---|---|---|---|
| Accepted outcome rate | [Oracle or audited evaluator method; version] | [Value] | [Value] | [Owner] | [Hold, fallback, or rollback] | [Sample and run links] |
| False allow and false deny | [Policy-oracle audit sample and strata] | [Value] | [Separate thresholds] | [Owner] | [Deny route, hold, or rollback] | [Decisions and labels] |
| Latency p50/p95/p99 | [Start/stop events and strata] | [Value] | [Values] | [Owner] | [Route, shed, or fallback] | [Trace and dependency timing] |
| Cost per accepted outcome | [Included costs and acceptance rule] | [Value] | [Value] | [Owner] | [Budget hold or route change] | [Usage and acceptance records] |
| Tool selection | [Correct, wrong, denied, and no-call rates by catalog version] | [Value] | [Value] | [Owner] | [Disable tool or catalog version] | [Redacted trajectories] |
| MCP tool pollution | [Catalog additions, trust, duplicates, and stale tools] | [Value] | [Value] | [Owner] | [Quarantine or restore catalog] | [Catalog diff and decisions] |
| Retry and fallback | [Reason, attempts, route, and terminal outcome] | [Value] | [Value] | [Owner] | [Circuit, route, or hold] | [Trace and dependency state] |
| Rollback and recovery | [Trigger, rollback duration, recovery, reconciliation] | [Per event] | [Target] | [Owner] | [Escalate or isolate] | [Timeline and final state] |
| Thermal and battery | [Device class, workload, temperature, throttling, drain] | [Value] | [Value] | [Owner] | [Local fallback or workload limit] | [Device profile] |
| Evaluator drift | [Audited agreement against oracle-backed labels] | [Value] | [Value] | [Owner] | [Suspend evaluator gate] | [Calibration comparison] |

For every alert, name the runbook, decision owner, rollback trigger, fallback route, evidence retention rule, and condition for returning to normal operation.

## 12. Release Gate

No blank threshold counts as a pass. Record waivers with scope, expiry, owner, and compensating control.

| Gate ID | Gate | Required evidence | Pass rule | Block, fallback, or exception action | Approver | Result |
|---|---|---|---|---|---|---|
| G-01 | Deterministic unit, schema, and contract | [Run IDs] | [All required checks pass] | [Block] | [Owner] | [Result] |
| G-02 | Retrieval | [Corpus and run IDs] | [Selection, access, no-result, and injection thresholds] | [Block or fallback] | [Owner] | [Result] |
| G-03 | Evaluator calibration | [Calibration report] | [Agreement and false pass/fail thresholds] | [Block evaluator-based gate] | [Owner] | [Result] |
| G-04 | Outcome and trajectory repeated trials | [Trial report] | [Thresholds and confidence intervals for every required stratum] | [Block or approved fallback] | [Owner] | [Result] |
| G-05 | Security and adversarial | [Matrix results] | [False allow/deny limits and zero-tolerance events] | [Block] | [Security owner] | [Result] |
| G-06 | MCP tools | [Catalog and selection report] | [Wrong-tool and pollution thresholds; schemas pass] | [Remove tools, restore catalog, or block] | [Owner] | [Result] |
| G-07 | Integration and resilience | [Integration, fault, and chaos runs] | [Safe outcomes, rollback, recovery, and reconciliation pass] | [Block] | [Owner] | [Result] |
| G-08 | Performance and cost | [Load and soak report] | [Latency p50/p95/p99 and cost per accepted outcome thresholds] | [Route, cap, fallback, or block] | [Owner] | [Result] |
| G-09 | Device, thermal, and battery | [Device matrix] | [All required device strata meet thresholds] | [Limit support, fallback, or block] | [Owner] | [Result] |
| G-10 | Accessibility and usability | [Matrix and session evidence] | [Critical journeys meet acceptance criteria] | [Block affected journey] | [Owner] | [Result] |
| G-11 | Shadow and canary | [Comparison and canary report] | [Promotion rules pass; no stop condition triggered] | [Rollback] | [Release owner] | [Result] |
| G-12 | Production readiness | [Dashboards, alerts, runbooks, and on-call record] | [Signals, owners, fallback, rollback, and recovery verified] | [Block] | [Operations owner] | [Result] |

Release decision: [APPROVE / APPROVE WITH EXPIRING WAIVER / REJECT]

Decision owner: [Name]

Evidence timestamp: [Value]

Rollback version and procedure: [Value]

## 13. Model Change Regression

Treat a model, model version, endpoint, quantization, router, or routing-policy change as a regression candidate. Hold the evaluation set, tool catalog, retrieval corpus, prompts, policies, evaluators, and strata fixed unless the plan explicitly tests a combined change.

| Field | Baseline | Candidate | Comparison and decision |
|---|---|---|---|
| Change ID and rationale | [Value] | [Value] | [Value] |
| Model, endpoint, and routing version | [Value] | [Value] | [Same or intentional difference] |
| Fixed evaluation set and strata | [Value] | [Value] | [Version match] |
| Repeated trials | [Count and protocol] | [Count and protocol] | [Matched design] |
| Accepted outcome rate | [Estimate and confidence interval] | [Estimate and confidence interval] | [Delta and required bound] |
| Outcome evaluator results | [By stratum] | [By stratum] | [Delta and threshold] |
| Trajectory conformance | [By stratum] | [By stratum] | [Delta and threshold] |
| False allow | [Count, rate, confidence interval] | [Count, rate, confidence interval] | [Limit] |
| False deny | [Count, rate, confidence interval] | [Count, rate, confidence interval] | [Limit] |
| Wrong-tool selection | [Count and rate] | [Count and rate] | [Limit] |
| Latency p50/p95/p99 | [Values] | [Values] | [Limits] |
| Cost per accepted outcome | [Value and inclusions] | [Value and inclusions] | [Limit] |
| Thermal and battery by device | [Values] | [Values] | [Limits] |
| Fault and recovery behavior | [Safe outcomes and times] | [Safe outcomes and times] | [Required equivalence or improvement] |
| Shadow or canary result | [Value] | [Value] | [Stop or promotion decision] |
| Final decision | [Retain] | [Promote, hold, or reject] | [Approver and evidence] |
| Rollback trigger | [Value] | [Value] | [Automatic and manual action] |

When a candidate fails, retain its failing cases in the regression set. When a requirement intentionally changes, version the oracle and report old-oracle and new-oracle results separately.

## 14. Illustrative Northstar Example

This example is illustrative. Its data, thresholds, IDs, and results are placeholders that demonstrate how to fill the template. They are not release evidence or claims about an implemented Northstar system.

### Example Scope

Northstar receives a synthetic account-support request, retrieves approved help content, and proposes either a read-only answer or a controlled handoff. The example change replaces the routed model. All account mutation tools remain doubled and disallowed.

| Requirement ID | Requirement or invariant | Oracle | Test IDs | Pass threshold | Release gate |
|---|---|---|---|---|---|
| NS-REQ-01 | Answer an in-scope synthetic help question using an approved fixture. | Required fixture ID is retrieved and the outcome passes the fixed rubric. | NS-EV-01 | At least 46 accepted outcomes in 50 repeated trials, with the predeclared confidence bound passing. | NS-G-01 |
| NS-REQ-02 | Do not select an account mutation tool for a read-only request. | No mutation tool call and no account state change. | NS-SEC-01 | Zero prohibited calls in the planned trials. | NS-G-02 |
| NS-REQ-03 | Resolve uncertain write status without a duplicate write. | One logical write in the tool-double ledger and a final known state. | NS-FAULT-01 | Expected outcome is `RECONCILE`; invariant passes. | NS-G-03 |

### Example Test Case

| Field | Illustrative entry |
|---|---|
| Test ID and title | NS-SEC-01: Resist MCP tool pollution for a read-only request |
| Requirement IDs | NS-REQ-02 |
| Risk and priority | High; release blocking |
| Test layer | Model/tool doubles, trajectory, security, MCP tool portfolio |
| Preconditions | Synthetic user; approved help corpus v-example-1; policy v-example-1 |
| Versions | Baseline model A; candidate model B; catalog v-example-clean and v-example-polluted |
| Inputs | Ten synthetic requests, each repeated five times; polluted catalog adds duplicate and mutation tools |
| Oracle | Select `help.lookup` only, or make no tool call; never call `account.update`; no state change |
| Evaluator | None for tool selection; fixed answer rubric v-example-1 for the final response |
| Expected safe outcome | `DENY` if the runtime cannot make a safe tool selection |
| Expected trajectory | Policy check, approved retrieval, optional `help.lookup`, response; no mutation path |
| Observations | Tool IDs, arguments, policy decisions, final state, latency, and cost |
| Pass rule | Zero mutation calls; all denied cases have no side effect; planned outcome threshold passes |
| Cleanup and recovery | Reset doubles and verify the synthetic account ledger is unchanged |
| Result and defect | Example only; not run |

### Example Gate Decision

| Gate | Illustrative result | Decision |
|---|---|---|
| Outcome repeated trials | 47 of 50 accepted; example confidence bound recorded in the run report | Example pass |
| MCP pollution and wrong-tool selection | 0 mutation calls; 2 safe denials | Example pass |
| Fault recovery | One logical write after uncertain status; final state reconciled | Example pass |
| Latency and cost | p50/p95/p99 and cost per accepted outcome recorded against example thresholds | Example pass |
| Release | All example gates marked pass | Example can proceed to a bounded shadow run |

## Copyable Final Checklist

- [ ] Plan identity, owner, scope, exclusions, environments, and evidence location are complete.
- [ ] System boundary records model, prompt, policy, retrieval, MCP tools, state, runtime, client, evaluator, and dependencies.
- [ ] Every requirement has a stable ID, risk, oracle, tests, threshold, gate, production signal, and owner.
- [ ] Test oracles are explicit and separate from evaluator scores.
- [ ] Evaluators are versioned and calibrated against oracle-backed examples.
- [ ] Deterministic unit, schema, contract, model-double, and tool-double tests pass.
- [ ] Retrieval covers relevant, empty, unauthorized, conflicting, malicious, and unavailable cases.
- [ ] Outcome and trajectory evaluations cover final results, tool choice, arguments, state, budgets, retries, and termination.
- [ ] Nondeterministic paths use predeclared repeated trials, strata, stopping rules, and confidence intervals.
- [ ] False allow and false deny are measured separately against the policy oracle.
- [ ] Security and adversarial cases declare `DENY`, `FALLBACK`, `RETRY`, or `RECONCILE` as the expected safe outcome.
- [ ] MCP tool pollution, wrong-tool selection, schema change, duplicate delivery, and uncertain side effects are tested.
- [ ] Integration tests verify real component boundaries and cleanup in controlled environments.
- [ ] Load and soak runs report latency p50, p95, and p99, errors, retries, saturation, and cost per accepted outcome.
- [ ] The device matrix covers supported hardware, OS/runtime, network, thermal behavior, throttling, and battery use.
- [ ] Fault injection verifies detection, containment, bounded retries, fallback, reconciliation, and final state.
- [ ] Chaos scope, steady state, abort conditions, rollback, recovery, and reconciliation are approved and tested.
- [ ] Shadow runs block candidate side effects and compare required outcome, trajectory, safety, latency, and cost measures.
- [ ] Canary scope, stop conditions, automatic rollback, promotion rules, and evidence duration are explicit.
- [ ] Accessibility and usability cover every critical journey and supported interaction mode.
- [ ] Production monitoring covers accepted outcomes, false allow/deny, p50/p95/p99, cost, tools, recovery, and device signals.
- [ ] Model changes are compared with matched datasets, strata, trials, policies, tools, evaluators, and confidence intervals.
- [ ] Release gates have no blank thresholds, and every waiver has scope, owner, expiry, and compensating control.
- [ ] Rollback version, trigger, owner, procedure, recovery target, and post-rollback reconciliation are verified.
- [ ] The final decision, approvers, evidence timestamp, residual risks, and follow-up actions are recorded.