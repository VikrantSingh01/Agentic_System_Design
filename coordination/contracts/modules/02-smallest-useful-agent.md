# Module 02 Contract: Build the Smallest Useful Agent

> Status: proposed for J2
> Scope: Chapters 5-8
> Contract type: module and chapter requirements, not chapter prose

## Module purpose

Define the smallest transparent Northstar agent that can request a structured report, select
a sufficient model through evidence, use typed capabilities within bounded authority, and
stop predictably. The module preserves the deterministic search-and-template workflow as the
baseline. Agentic behavior is admitted only where a measured task need justifies it.

All runnable examples and labs use Python 3.11 or later. Offline deterministic fixtures and
model or tool doubles are the default path. Live providers are optional, explicitly enabled,
and budget capped. Domain interfaces remain independent of frameworks and providers.

## Reader entry

The reader has completed Chapters 1-4 and can:

- distinguish automation, workflows, assistants, and agents;
- trace an observe-decide-act loop with state, feedback, and termination;
- explain that model output is probabilistic rather than a factual database lookup; and
- separate deterministic controls from probabilistic model calls with explicit contracts.

The first-pass lane must still begin with a familiar situation, use short concrete language,
define jargon immediately, and state where each analogy stops matching the real system. It
must remain understandable to a curious child or nontechnical adult before introducing the
engineering mechanism.

## Reader exit

The reader can implement and inspect a provider-neutral, offline-tested Python runtime that:

- accepts versioned messages and rejects output that violates a closed schema;
- selects a model tier from measured quality, latency, context, and cost evidence;
- exposes typed tools whose authority and side effects are explicit;
- requires approval and idempotency for a consequential report action;
- enforces step, token, time, and cost budgets; and
- terminates deterministically on success, invalid output, tool failure, exhaustion,
  cancellation, or a declared stop condition.

## Vocabulary

| Term | Required plain-language meaning | Introduced |
|---|---|---:|
| Message | A typed piece of information exchanged with a model, including its role and content. | 5 |
| Prompt | The complete bounded input assembled for a model call, not a security boundary. | 5 |
| Message role | A label that identifies where a message came from and how it should be treated. | 5 |
| Structured output | Model output required to match a machine-checkable shape. | 5 |
| Schema | A versioned contract for allowed fields, types, values, and limits. | 5 |
| Validation | A deterministic check that accepts data matching a contract and rejects other data. | 5 |
| Untrusted content | Text or data that may inform a task but cannot grant authority or change policy. | 5 |
| Inference | Running a trained model to produce an output from an input. | 6 |
| Model tier | A capability and resource class compared through measured task results. | 6 |
| Context window | The bounded amount of input and output a model can handle for one call. | 6 |
| Model double | A deterministic local substitute that returns scripted model responses in tests. | 6 |
| Model gateway | A provider-neutral interface that applies model-call contracts and records usage. | 6 |
| Tool | A typed capability through which an agent reads or changes an environment. | 7 |
| Tool call | A model-proposed request that the runtime validates before any capability executes. | 7 |
| Authority class | A category describing whether a capability reads, writes, or causes a consequence. | 7 |
| Approval | An authenticated decision bound to one exact consequential action, payload, and expiry. | 7 |
| Idempotency | The property that repeating the same request does not repeat its effect. | 7 |
| Runtime | The deterministic control loop that manages state, model calls, tools, budgets, and termination. | 8 |
| Budget | A hard ceiling on a resource such as steps, tokens, elapsed time, or cost. | 8 |
| Terminal status | A named final state after which the loop performs no further action. | 8 |
| Trace | An inspectable record of inputs, typed requests, results, policy decisions, state transitions, and outcomes. | 8 |

Private chain-of-thought is not vocabulary, an interface, a trace field, or an evaluation
artifact. Observable decisions and state transitions are sufficient for inspection.

## Shared artifacts

Chapter labs cumulatively build one framework-independent Python package and fixture set. The
chapter authors may choose exact filenames, but these logical artifacts and responsibilities
are fixed.

| Artifact | Contract |
|---|---|
| `ReportRequestV1` | Versioned request with bounded question, source scope, and requested report shape. |
| `DraftReportV1` | Closed structured output; unknown, missing, malformed, or oversized fields fail validation. |
| Message fixture set | Valid, missing-field, extra-field, wrong-type, oversized, and untrusted-instruction cases. |
| `ModelGateway` | Provider-neutral model interface returning typed output and usage metadata. |
| Model selection rubric | Compares task quality, latency, context fit, and cost against explicit thresholds. |
| `DeterministicModelDouble` | Scripted offline responses and usage values with no network dependency or spend. |
| Tool registry | Allowlists typed tools and records authority class, argument schema, result schema, and retry policy. |
| `search_sources` | Class A read-only tool over approved offline source metadata, with bounded results and provenance. |
| `fetch_source` | Class A read-only tool over approved offline documents, with bounded content and provenance. |
| `publish_report` | Class C consequential tool double requiring exact-payload approval and an idempotency key. |
| `RunBudget` | Hard ceilings for loop steps, model calls, tool calls, tokens, elapsed time, retries, and cost. |
| Runtime state machine | Executes at most one validated transition per step and ends in a declared terminal status. |
| Expected traces | Deterministic success and failure trajectories without private reasoning or secret values. |
| Baseline runner | Deterministic search-and-template path used as the minimum-complexity comparison. |

No fixture contains personal, confidential, tenant, credential, or live-provider data.
Consequential tools are doubles only in this module and cannot publish, send, purchase,
change access, or contact an external system.

## Chapter 5: Messages, Prompts, and Structured Output

### Reader question

How do we ask clearly and make the answer safe for software to use?

### Prerequisites

Chapters 3 and 4.

### Measurable outcome

Define a versioned message contract and schema, then reject all malformed outputs in a
supplied fixture set.

### Required concepts

- message roles, instruction precedence, and separation of instructions from untrusted data;
- prompt inputs as explicit bounded fields rather than string concatenation from ambient state;
- schema versions, required fields, closed objects, enums, lengths, and collection limits;
- deterministic parsing and validation before output enters state or reaches a tool;
- repair or retry as a bounded runtime decision, never silent acceptance of malformed data;
- output contracts that request conclusions and evidence, never private chain-of-thought; and
- volatile provider structured-output features as optional adapters, not domain guarantees.

### Northstar increment

Add versioned instructions, structured report requests, schema validation, and deterministic
fixtures. The increment must also label untrusted content and reject unknown or extra fields.

### Required diagram intents

1. Concept picture: contrast a free-form answer handed directly to software with a structured
   answer passing through a schema gate. Takeaway: fluent text is not trusted application data.
2. Data flow: show trusted instructions, typed request fields, and labeled untrusted content
   entering prompt assembly, followed by model output, parsing, validation, and accept or reject
   branches. Takeaway: deterministic validation controls entry into Northstar state.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent text
description for readers who cannot see it.

### Safe activity and lab

- First pass: sort paper cards representing instructions, user data, source text, and output
  fields, then explain why a source card cannot rewrite the rules.
- Python lab: implement `ReportRequestV1` and `DraftReportV1` validation using only local
  fixtures. Run valid and malformed cases, including embedded instructions in source text.
- Safety boundary: no account, network call, payment, personal data, or executable content.

### Failure and evaluation focus

- Reproduce missing fields, extra fields, wrong types, invalid enum values, excessive lengths,
  malformed JSON, and untrusted text that asks to bypass the schema.
- Pass only when every valid fixture is accepted, every invalid fixture is rejected, the
  rejection reason is typed, and no invalid output mutates runtime state.
- Evaluate contract-version reporting and confirm no trace or output requires private
  chain-of-thought.

### Approved source IDs

SRC-004, SRC-007, SRC-022, SRC-023.

Provider behavior from SRC-022 and SRC-023 is volatile. Chapter claims based on those sources
must be dated and reverified before release.

### Next handoff

Chapter 6 receives the versioned request and output contracts, fixture corpus, validation
results, and a provider-neutral call boundary. It may compare model behavior but may not
weaken the schema or move validation into provider-specific code.

## Chapter 6: Models and Inference

### Reader question

Which model is good enough for this job, and what does the choice cost?

### Prerequisites

Chapters 3 and 5.

### Measurable outcome

Run a controlled selection experiment and choose a model tier from measured quality, latency,
context, and cost rather than reputation.

### Required concepts

- inference capabilities and limits relevant to the fixed Northstar report task;
- model tiers and capability profiles without equating size, brand, or novelty with fitness;
- controlled comparison on identical requests, fixtures, schema, and evaluation rules;
- quality, latency, context fit, token use, and estimated cost as separate measurements;
- nondeterminism, repeated trials, and uncertainty in measured results;
- provider-neutral `ModelGateway`, timeout and usage metadata, and replaceable adapters; and
- fallback as an explicit policy that preserves schema, authority, and budget constraints.

### Northstar increment

Add a provider-neutral model interface, selection rubric, and offline model double. The model
gateway must expose typed usage and failure information needed by Chapter 8 budgets.

### Required diagram intents

1. Concept picture: show several model tiers attempting the same bounded task and crossing or
   missing independent quality, latency, context, and cost thresholds. Takeaway: the best model
   is the least costly tier that satisfies the task contract, not the most famous model.
2. Experiment flow: show fixed fixtures entering each candidate through the same
   `ModelGateway`, then validation, measurement, comparison, and a recorded selection decision.
   Takeaway: a controlled comparison changes one model choice while holding the task constant.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent text
description for readers who cannot see it.

### Safe activity and lab

- First pass: compare three pretend helpers using cards for answer correctness, waiting time,
  space, and tokens, then choose the first helper that meets every stated need.
- Python lab: run scripted small, medium, and large model doubles over the Chapter 5 fixture
  set, calculate the rubric fields, and emit a selection record with uncertainty noted.
- Optional live extension: disabled by default, explicitly enabled, uses the same gateway and
  fixtures, declares a monetary cap, and is never required for completion.

### Failure and evaluation focus

- Reproduce a cheap model that fails quality, a high-quality model that exceeds latency or
  cost, an input that exceeds context, malformed usage metadata, timeout, and nondeterministic
  score variation.
- Pass only when the selection record contains all rubric dimensions, threshold evidence,
  repeated-trial handling where applicable, and a reason no simpler tier qualifies.
- Reject selection by reputation, a single impressive output, or an unbounded aggregate score
  that hides a failed safety or schema requirement.

### Approved source IDs

SRC-003, SRC-004, SRC-030, SRC-036.

Model release, artifact, license, prompt-format, and capability claims from SRC-036 are
volatile. Any release-specific claims must be dated and reverified before release.

### Next handoff

Chapter 7 receives `ModelGateway`, `DeterministicModelDouble`, the selected capability profile,
typed usage metadata, and the unchanged Chapter 5 schemas. Tool requests remain proposals and
gain no authority from the selected model.

## Chapter 7: Tools and Function Calling

### Reader question

How can a model use a capability without receiving unlimited power?

### Prerequisites

Chapters 4, 5, and 6.

### Measurable outcome

Implement a typed read-only tool and a consequential tool, validate arguments, classify side
effects, and prove a repeated request is idempotent.

### Required concepts

- tools as typed capabilities invoked only through a deterministic runtime boundary;
- closed argument and result schemas, canonical identifiers, size limits, and typed errors;
- tool registry allowlisting and denial of unknown tools or undeclared arguments;
- authority classes A through D, with the most restrictive applicable policy winning;
- model proposals separated from policy decisions, authorization, and execution;
- provenance and permission metadata for read results;
- exact-payload, expiring approval for Class C consequences; and
- idempotency keys and durable outcome records for repeated effect requests.

### Northstar increment

Add typed `search_sources` and `fetch_source` tools plus an approval-gated `publish_report`
action. The chapter implementation remains offline: reads use local fixtures and publication
uses a recording double that cannot reach an external destination.

### Required diagram intents

1. Authority picture: place read-only, reversible write, consequential effect, and denied
   external or high-impact capabilities on an authority ladder with their controls. Takeaway:
   each capability receives only the authority its consequence requires.
2. Decision flow: show a model-proposed tool call passing through registry lookup, schema
   validation, task and authority checks, approval and idempotency checks when required,
   execution, and a typed result or denial. Takeaway: model output proposes an action, while
   deterministic controls decide whether it runs.
3. Idempotency sequence: show two identical approved publish requests producing one recorded
   effect and the same receipt. Takeaway: retries do not duplicate a consequential effect.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent text
description for readers who cannot see it.

### Safe activity and lab

- First pass: assign pretend keys for reading a shelf, writing a private note, and posting a
  notice, then match each key to the permission and approval it needs.
- Python lab: implement a typed offline read tool and a recording consequential tool double.
  Test valid, malformed, unknown, forbidden, oversized, unapproved, approved, and duplicate
  calls.
- Safety boundary: no shell, arbitrary URL, credential, live publication, message sending,
  file-system write outside a temporary lab area, or Class D capability.

### Failure and evaluation focus

- Reproduce schema smuggling, unknown tools, argument overflow, permission denial, tool
  dependency failure, forged or stale approval, changed payload after approval, and duplicate
  delivery.
- Pass only when denied calls cause no effect, read results include provenance, a changed
  payload invalidates approval, and repeated approved requests produce exactly one effect.
- Evaluate typed error classification and retry eligibility. Prompts alone do not count as
  authorization, approval, or idempotency control.

### Approved source IDs

SRC-008, SRC-017, SRC-022, SRC-031, SRC-038.

Tool-interface behavior from SRC-017, SRC-022, and SRC-031 is volatile. Provider examples are
dated adapters after the vendor-neutral Python contract.

### Next handoff

Chapter 8 receives the model gateway, validated tool registry, authority metadata, approval
and idempotency contracts, typed errors, deterministic doubles, and fixture outcomes. The
runtime owns execution policy and must not let a model call tools directly.

## Chapter 8: The Agent Runtime

### Reader question

What keeps an agent loop bounded, understandable, and stoppable?

### Prerequisites

Chapters 2, 5, 6, and 7.

### Measurable outcome

Implement an offline runtime that passes tests for success, invalid output, tool failure,
budget exhaustion, cancellation, and termination.

### Required concepts

- explicit observe, decide, validate, act, record, and stop transitions;
- deterministic runtime control around probabilistic model proposals;
- one validated transition per step and no model-to-tool bypass;
- immutable task input, explicit runtime state, and bounded observations;
- hard step, model-call, tool-call, token, elapsed-time, retry, and cost budgets;
- cancellation, deadlines, repeated no-progress detection, and declared terminal statuses;
- expected traces containing observable requests, results, policy decisions, usage, and state
  transitions without private chain-of-thought;
- baseline routing when the deterministic search-and-template workflow is sufficient; and
- frameworks and hosted runtimes as optional adapters that do not supply goals, safety,
  budgets, authority, evaluation, or correctness automatically.

### Northstar increment

Deliver the first offline-tested loop with step, token, time, and cost budgets and an expected
trace. It must integrate the Chapter 5 schemas, Chapter 6 model gateway, Chapter 7 tools and
authority controls, and the fixed deterministic baseline path.

### Required diagram intents

1. State-machine picture: show admission, observe, decide, validate, act, record, and terminal
   states, including rejection, cancellation, failure, and budget-exhausted branches. Takeaway:
   every cycle and exit is an explicit runtime transition.
2. Budget flow: show each accepted model or tool operation debiting the relevant hard ceilings
   before the next operation is allowed. Takeaway: exhausted capacity stops the loop rather
   than becoming a suggestion to the model.
3. Success and failure trace comparison: align two observable traces until one completes and
   the other safely terminates after invalid output or tool failure. Takeaway: traces explain
   runtime behavior without exposing private reasoning.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent text
description for readers who cannot see it.

### Safe activity and lab

- First pass: role-play a helper with a limited number of turns, tokens, seconds, and coins;
  stop the activity as soon as any counter reaches its limit.
- Python lab: assemble the cumulative offline runtime and replay deterministic scenarios for
  baseline completion, agent success, invalid output, tool failure, budget exhaustion,
  cancellation, deadline, repeated request, and explicit termination.
- Use virtual time and scripted usage values where practical so tests are fast and repeatable.
  No live provider, network access, account, payment, personal data, or real consequence is
  required.

### Failure and evaluation focus

- Reproduce endless continuation, repeated identical tool requests, malformed model output,
  nonretryable and exhausted-retry tool failures, token overrun, time overrun, cost overrun,
  cancellation race, missing terminal condition, and framework-default behavior that violates
  the local contract.
- Pass only when all required scenarios end in their expected terminal status, perform no
  post-terminal action, remain inside hard budgets, and produce a deterministic expected trace.
- Compare the agent path with the baseline on the same fixture. Retain the agent path only for
  a declared advantage or learning objective.
- Correct the required misconception: an agent framework does not automatically supply goals,
  safety, budgets, authority, evaluation, or correctness.

### Approved source IDs

SRC-008, SRC-013, SRC-020, SRC-041, SRC-051.

Hosted runtime and SDK behavior from SRC-041 and SRC-051 is volatile. Microsoft mapping uses
supported Python interfaces where applicable, is clearly dated, and remains optional after
the vendor-neutral offline implementation.

### Next handoff

Module 03 receives the bounded single-agent runtime, explicit state, schemas, model gateway,
typed tools, authority controls, deterministic fixtures, expected traces, baseline runner,
and budget accounting. Chapter 9 may change context selection and ordering, but it may not
bypass validation, expand authority, hide budget use, or replace durable task state with a
prompt transcript.

## Module acceptance

The module contract is accepted only when all checks below are satisfied.

- [ ] Chapters 5-8 each preserve the curriculum question, direct prerequisites, measurable
  outcome, Northstar increment, and approved source IDs exactly.
- [ ] Every chapter supplies the editorial-contract sections, including a curious-child first
  pass, immediate jargon definitions, analogy limit, failure analysis, evaluation, review,
  design exercise, safe activity, common misunderstanding, recap, and hands-on lab.
- [ ] Every chapter contains at least the required concept picture and process, data, or
  decision-flow diagram, each with a takeaway and equivalent text description.
- [ ] All runnable examples and required labs use Python 3.11 or later and pass offline with
  deterministic fixtures and doubles before any optional provider exercise.
- [ ] The cumulative lab passes success, malformed output, permission denial, tool failure,
  duplicate effect, budget exhaustion, cancellation, deadline, and termination tests.
- [ ] Unknown fields, tools, authority, and terminal transitions fail closed.
- [ ] Consequential behavior is simulated only, requires exact-payload approval, and proves
  idempotency. Class D behavior remains denied.
- [ ] Step, model-call, tool-call, token, time, retry, and cost ceilings are hard runtime
  controls, and every required scenario remains at zero provider spend.
- [ ] Traces expose typed requests, results, policy decisions, budget changes, transitions,
  and outcomes, but no private chain-of-thought, credentials, or unrestricted content bodies.
- [ ] The deterministic baseline remains runnable and is compared with the agent path.
- [ ] Framework and cloud mappings are optional adapters after vendor-neutral Python and all
  volatile product claims are dated and reverified before release.
- [ ] Approved source IDs resolve to `research/source-ledger.csv`, have status `approved`, and
  include their assigned chapter in the ledger.
- [ ] The Module 02 README outcome and Northstar milestone are fully covered with no added
  retrieval, memory, planning, multi-agent, protocol, production, or regulated-decision scope.

## Cross-module handoff

### Inputs from Module 01

- Northstar problem statement, deterministic baseline, goal, autonomy boundary, and permitted
  actions;
- observe-decide-act vocabulary, state, feedback, and stop conditions;
- probabilistic model assumptions and hallucination risk record; and
- architecture boundary separating deterministic controls from probabilistic model calls.

If any input is missing, Module 02 must stop at the affected boundary rather than infer new
authority, goals, or architecture.

### Outputs to Module 03

- versioned request, message, output, error, model, tool, approval, budget, trace, and terminal
  status contracts;
- the provider-neutral Python runtime and model gateway;
- typed read tools and a simulated approval-gated consequential action;
- deterministic fixture corpus, model and tool doubles, baseline runner, and expected traces;
- measured model-selection record and usage accounting; and
- test evidence for schema rejection, bounded authority, idempotency, hard budgets,
  cancellation, and termination.

Module 03 owns context assembly, retrieval, grounding, memory, and multimodal additions. Those
additions must consume these typed boundaries, preserve least authority and offline fixtures,
and remain comparable with the bounded baseline established here.