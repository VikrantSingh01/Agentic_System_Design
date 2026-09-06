# Module 05 Contract: Evaluation and Improvement

> Status: proposed for J2 acceptance
> Owner: J2 module-contract author
> Contract date: 2026-09-06
> Scope: Chapters 19-23

## Purpose

This contract turns evaluation from an occasional demonstration into a repeatable engineering
control. It fixes the learning progression and deliverables for defining metric contracts,
building representative evaluation sets, calibrating evaluators, comparing outcomes with
trajectories, debugging failures, and blocking regressions.

This is a chapter-authoring contract, not chapter prose. Chapter authors may refine examples,
fixtures, and visual layouts, but must preserve the reader question, prerequisites, measurable
outcome, Northstar increment, evaluation obligations, approved source IDs, and handoff for each
chapter.

## Module entry contract

The reader enters after Chapters 8, 10, and 14 and can already:

- run a bounded offline agent loop with deterministic model and tool doubles;
- inspect typed states, tool calls, results, budgets, and terminal status;
- retrieve approved source fixtures and resolve report citations;
- compare a deterministic workflow with an agentic path.

The module must not assume statistics, machine-learning, cloud, or evaluation-platform
experience. Each chapter starts with a familiar example, defines jargon immediately, and then
moves to the engineering mechanism.

## Module exit contract

By the end of Chapter 23, the reader can build and explain an offline Python 3.11 evaluation
harness that:

1. declares versioned task and metric contracts before running an experiment;
2. separates development cases from a protected test holdout;
3. combines deterministic checks with calibrated model-based or human judgments;
4. scores both final reports and observable execution trajectories;
5. slices failures, uses traces and ablations to test causes, and records experiments;
6. blocks a seeded regression when any required quality or safety threshold fails;
7. reports latency and estimated cost without making a live provider call.

The completed increment supplies the regression gate required before Module 06 formalizes
security acceptance and before Modules 07-09 make production, scale, or vendor-mapping claims.

## Beginner-first and implementation constraints

- Begin with everyday comparisons such as a checklist, practice set, judging rubric, route
  record, or controlled repair. State where each analogy stops matching an AI system.
- Use Python 3.11, standard-library types, JSON or JSON Lines fixtures, and deterministic doubles
  before any framework-specific or hosted evaluator.
- Every lab runs offline with fixed seeds or scripted outputs and zero provider spend.
- A live model judge may be described only as optional, explicitly enabled, budget capped, and
  non-authoritative until calibrated.
- Never require private chain-of-thought. Evaluate observable plans, tool requests, tool results,
  policy decisions, state transitions, citations, approvals, budgets, and outcomes.
- Keep vendor-neutral evaluator and dataset interfaces separate from framework and cloud
  adapters.
- Treat safety thresholds and authority invariants as hard gates, not values that can be traded
  for average quality, latency, or cost gains.
- Use synthetic, public, or purpose-built fixtures. Do not require accounts, personal data,
  confidential content, or consequential actions.

## Shared vocabulary

| Term | Plain-language meaning |
|---|---|
| Evaluation | A repeatable measurement of an outcome, trajectory, safety property, latency, or cost. |
| Task contract | A versioned statement of inputs, allowed behavior, expected output, constraints, and success rules. |
| Metric contract | A versioned definition of what is measured, how it is calculated, on which cases, at what threshold, and what happens on failure. |
| Indicator | A measured signal, such as citation precision or elapsed time. |
| Threshold | The boundary that separates an acceptable result from a failure or review state. |
| Slice | A named subset of cases used to reveal performance hidden by an overall average. |
| Representative set | A collection of tasks chosen to reflect declared real-work categories, risks, and difficult cases. |
| Development set | Cases used while choosing and improving a design. |
| Test holdout | Protected cases used only for final comparison or release decisions. |
| Golden evidence | Expected facts, source spans, actions, or labels against which a run is checked. |
| Contamination | Accidental exposure of protected evaluation answers or cases to the system being improved. |
| Evaluator | Code, a model, or a person that applies a metric or rubric to an artifact or run. |
| Rubric | Explicit criteria and rating guidance used to make a judgment repeatable. |
| Calibration | Comparing an evaluator with trusted labeled cases to measure agreement and error. |
| Uncertainty | A declared lack of confidence that triggers review rather than a forced judgment. |
| Outcome evaluation | Scoring what the system finally produced. |
| Trajectory evaluation | Scoring the observable path of states, tools, evidence, policy decisions, and stop behavior. |
| Trace | A correlated record of observable events from one run, minimized and redacted by design. |
| Ablation | A controlled experiment that removes or replaces one component to test whether it caused a result. |
| Regression | A previously passing behavior that fails after a change. |
| Regression gate | An automated decision that blocks promotion when required checks or thresholds fail. |

Chapter authors may add local terms, but they must not redefine these terms incompatibly.

## Shared artifacts

The five chapters cumulatively produce one small, inspectable evaluation package:

| Artifact | First owned by | Required content |
|---|---:|---|
| `TaskContract` | 19 | Task version, input and output schema, allowed behavior, constraints, metric references, and owner. |
| `MetricSpec` | 19 | Name, purpose, unit, direction, calculation, eligible cases, slices, threshold, tradeoff rule, owner, and failure action. |
| Evaluation manifest | 20 | Dataset version, split, case IDs, coverage tags, provenance, risk, difficulty, expected evidence, and change history. |
| Offline case fixtures | 20 | Train, development, and protected test cases using synthetic or approved content. |
| Evaluator interface and rubric | 21 | Versioned inputs, outputs, reason codes, confidence or review state, and rubric criteria. |
| Calibration report | 21 | Labeled cases, agreement, false positives, false negatives, slice results, bias probes, uncertainty, and limits. |
| Replayable trajectory schema | 22 | Observable events, stable IDs, typed actions and results, budgets, terminal state, and redaction rules. |
| Evaluation report | 22 | Outcome, trajectory, retrieval, tool, safety, latency, and estimated-cost results by case and slice. |
| Failure taxonomy | 23 | Failure classes, evidence needed, likely owning component, and escalation route. |
| Experiment record | 23 | Hypothesis, single controlled change, baseline, result, uncertainty, decision, and rollback condition. |
| Regression gate | 23 | Required suites, thresholds, hard invariants, comparison rule, failure output, and override policy. |

Artifact names are logical contracts. Labs may represent them with Python dataclasses, typed
dictionaries, JSON Schema, or equivalent simple structures without introducing a framework.

## Chapter 19: What Does Good Mean?

### Purpose

Replace vague claims such as "the report looks good" with task-specific, versioned metric
contracts that make quality, safety, latency, and cost tradeoffs explicit before optimization.

### Reader question

What does a good result mean, and how will we know?

### Prerequisites

Chapters 8, 10, and 14.

### Measurable outcome

Turn a vague goal into a task contract with thresholds for outcome quality, safety, latency,
and cost, including a stated tradeoff rule.

### Required concepts

- The difference between a goal, an indicator, a metric calculation, a threshold, and a gate.
- Task-specific evaluation rather than a single universal score.
- Outcome, citation, retrieval, trajectory, safety, human-factor, latency, reliability, and cost
  metric families, with only applicable families activated for a task.
- Metric direction, units, denominator, missing-data behavior, aggregation, and slice reporting.
- Hard invariants versus negotiable tradeoffs. Safety and authority failures cannot be averaged
  away or exchanged for lower cost.
- Baseline comparison against Northstar's deterministic search-and-template workflow.
- Metric ownership, versioning, review cadence, and the action taken after a failed threshold.
- Proxy risk: a convenient number may not measure the result people actually need.

### Northstar increment

Freeze report correctness, citation quality, retrieval, tool choice, trajectory, safety,
latency, reliability, human-factor, and cost definitions. The metric specification must name
owners, slices, thresholds, tradeoff rules, and failure actions.

### Diagram intents

1. Concept diagram: map the task goal to metric families, indicators, thresholds, and a final
   accept, review, or reject decision. Takeaway: a score becomes useful only when its meaning
   and consequence are declared.
2. Decision-flow diagram: show hard invariant checks first, then quality thresholds, then
   latency and cost tradeoffs, with the deterministic baseline as a comparison branch.
   Takeaway: cheap or fast never compensates for an authority or safety failure.
3. Optional metric-card anatomy: label owner, formula, slices, threshold, data source, version,
   and failure action. Takeaway: every metric is an operational contract, not a loose number.

Each diagram needs an equivalent step-by-step text description.

### Safe activity and offline lab

First, give the reader five paper report cards and ask which ones can be compared fairly when
their scoring rules differ. Then implement `TaskContract` and `MetricSpec` in Python. Evaluate
scripted Northstar report fixtures for material-claim citation coverage, citation correctness,
task completion, unsafe action count, elapsed milliseconds, and estimated cost. Include one
case where a high average hides a failed safety invariant and one where a faster agent loses
to the deterministic baseline.

### Failure and evaluation focus

Reproduce metric ambiguity, an undefined denominator, an average that hides a weak slice, and
a weighted score that masks a hard failure. The correction must make each result produce an
unambiguous `pass`, `review`, or `fail` with reason codes. Evaluation checks that every required
metric has a unit, calculation, threshold, slice policy, owner, and failure action.

### Approved source IDs

SRC-009, SRC-024, SRC-057.

### Handoff

Pass the frozen task and metric contracts to Chapter 20. Chapter 20 must construct cases that
can actually exercise each metric and named slice. Do not tune thresholds to fit the data set
after seeing protected test results.

## Chapter 20: Building Evaluation Sets

### Purpose

Build a small but defensible evaluation set that represents declared work, exposes difficult
and unsafe cases, preserves provenance, and separates improvement work from final testing.

### Reader question

Which test tasks represent the real work well enough to guide changes?

### Prerequisites

Chapter 19.

### Measurable outcome

Build a versioned train, development, and test set with coverage tags, provenance,
contamination checks, and at least one difficult negative case.

### Required concepts

- Sampling from a declared task distribution instead of collecting only convenient examples.
- Coverage dimensions for Northstar: research intent, source type, question difficulty,
  expected evidence, citation density, ambiguity, risk, language or modality where applicable,
  and expected terminal state.
- Positive, negative, boundary, adversarial, malformed-input, no-answer, permission-denied,
  budget-exhausted, and baseline-favoring cases.
- Train, development, and protected test splits, including why repeated holdout inspection
  turns the holdout into development data.
- Golden evidence with source versions and resolvable spans, while recognizing that a rubric
  may allow more than one valid report.
- Provenance, consent, privacy, retention, deduplication, contamination checks, and dataset
  version history.
- Case weighting and slice reporting without claiming that a small fixture set perfectly
  reproduces production.

### Northstar increment

Create versioned representative research tasks, golden evidence, deterministic fixtures, risk
slices, and protected holdout cases. Record representativeness limits, privacy decisions,
contamination checks, and every accepted dataset change.

### Diagram intents

1. Concept diagram: show real-work categories flowing through a coverage matrix into selected
   cases and named slices. Takeaway: representativeness is argued from coverage, not from case
   count alone.
2. Data-flow diagram: show source case intake, provenance and privacy review, deduplication,
   split assignment, protected storage, and versioned release. Takeaway: a test set needs a
   lifecycle and access boundary.
3. Leakage diagram: contrast clean development against a loop that repeatedly reveals test
   answers and overfits the system. Takeaway: a visible holdout stops being a holdout.

Each diagram needs an equivalent step-by-step text description.

### Safe activity and offline lab

Sort a deck of synthetic research-task cards into coverage categories, then identify the gaps.
In Python, build a JSON Lines manifest and validator for at least 12 synthetic cases. Require
stable IDs, split, provenance, coverage tags, expected evidence, difficulty, risk, and expected
terminal state. Include at least one no-answer case, permission-denied case, misleading-source
case, malformed citation case, and task where the deterministic baseline should win. Tests must
detect duplicate content across splits and prevent normal lab output from revealing holdout
answers.

### Failure and evaluation focus

Reproduce convenience sampling, duplicate leakage across splits, missing provenance, and a
set with no difficult negatives. The repaired manifest must pass schema, split-isolation,
deduplication, coverage, and golden-evidence resolution checks. Report uncovered slices rather
than silently claiming completeness.

### Approved source IDs

SRC-009, SRC-024.

### Handoff

Pass a versioned development set, protected test set, labels, and golden evidence to Chapter
21. Evaluator calibration may use labeled calibration cases from train or development splits,
but it must not consume protected test labels.

## Chapter 21: Evaluators

### Purpose

Show how deterministic checks, model-based judgments, and qualified human review complement
one another, and require calibration before any evaluator controls a release decision.

### Reader question

Who or what should judge an answer, and can that judge be trusted?

### Prerequisites

Chapters 19 and 20.

### Measurable outcome

Calibrate a deterministic, model-based, or human rubric against labeled cases and report
agreement, bias checks, and uncertainty.

### Required concepts

- Deterministic evaluators for schemas, exact constraints, citation resolution, tool argument
  validity, budgets, and forbidden events.
- Rubric-based evaluators for correctness, completeness, usefulness, and evidence support where
  simple exact matching is insufficient.
- Human review for consequential, disputed, novel, or low-confidence judgments.
- Evaluator inputs and outputs as versioned typed contracts with criterion-level reason codes.
- Calibration against trusted labels using agreement, false-positive rate, false-negative rate,
  confusion counts, and per-slice results before optional advanced statistics.
- Inter-rater disagreement, ambiguity, position or style bias, self-preference, verbosity bias,
  prompt sensitivity, and evaluator drift.
- Abstention and escalation when confidence is low or rubric criteria conflict.
- Layering deterministic checks before expensive judgments and never treating a model judge as
  objective merely because it returns a number.

### Northstar increment

Add layered deterministic evaluators, calibrated model-based evaluators, and qualified human
review. Human escalation is mandatory for consequential or low-confidence judgments. No
single unreviewed model judge may be the only release gate.

### Diagram intents

1. Concept diagram: arrange deterministic checks, rubric judgments, and human review as layers
   with explicit escalation paths. Takeaway: evaluators have different valid scopes rather
   than forming a single accuracy ladder.
2. Calibration-flow diagram: move labeled cases through an evaluator, comparison matrix, slice
   analysis, bias probes, threshold selection, and accept, revise, or reject decision.
   Takeaway: the judge is evaluated before it evaluates releases.
3. Disagreement diagram: show two evaluators producing conflicting labels and route the case to
   adjudication and rubric repair. Takeaway: disagreement is evidence, not noise to hide.

Each diagram needs an equivalent step-by-step text description.

### Safe activity and offline lab

Have two readers apply a short rubric to synthetic report snippets, compare disagreements, and
rewrite one ambiguous criterion. Then implement a common Python evaluator protocol with a
deterministic evaluator and a scripted model-judge double. Calibrate both against labeled
development fixtures. Produce confusion counts, agreement, false positives, false negatives,
slice results, abstentions, and reason codes. Seed verbosity bias so the first judge prefers a
long unsupported answer, then revise the rubric or routing until the case escalates or fails.

### Failure and evaluation focus

Reproduce an uncalibrated judge, rubric ambiguity, verbosity bias, and forced decisions on
uncertain cases. Acceptance requires a calibration report that names label provenance,
evaluator and rubric versions, error rates, weak slices, bias probes, escalation threshold,
and limitations. A high overall agreement cannot hide a safety-critical false negative.

### Approved source IDs

SRC-009, SRC-024.

### Handoff

Pass versioned evaluator interfaces, accepted calibration evidence, explicit evaluator scope,
and escalation rules to Chapter 22. Chapter 22 may apply evaluators only to the criteria for
which calibration evidence exists.

## Chapter 22: Agent and Tool Evaluation

### Purpose

Evaluate both what Northstar produces and how it gets there, using replayable observable
trajectories and simulated environments without collecting private reasoning.

### Reader question

Should we score only the final answer, or also the path taken to get it?

### Prerequisites

Chapters 7, 11, 13, 20, and 21.

### Measurable outcome

Score both outcomes and trajectories for tool choice, retrieval, robustness, and safety, then
explain one disagreement between those scores.

### Required concepts

- Outcome checks for report correctness, completeness, citation coverage, citation support,
  and appropriate uncertainty.
- Trajectory checks for tool selection, argument validity, permission-aware retrieval, source
  choice, policy adherence, progress, retries, approvals, budgets, recovery, and stop behavior.
- Why a correct final answer can follow an unsafe path, and why a safe sensible path can still
  produce an incomplete answer.
- Replayable traces with stable event IDs, typed payloads, timestamps or logical order, budgets,
  terminal status, evaluator results, and redaction.
- Simulated environments and deterministic tool doubles for success, dependency failure,
  misleading evidence, adversarial content, repeated calls, denial, cancellation, and budget
  exhaustion.
- Retrieval and tool metrics by step and task, not just token-level or answer-only similarity.
- Robustness through controlled perturbations and repeated scripted variants.
- No private chain-of-thought in traces, rubrics, expected outputs, or debugging evidence.

### Northstar increment

Add trajectory, tool-selection, retrieval, adversarial, and simulation checks to the evaluation
harness. Replayable traces must cover successful, failed, adversarial, denied, cancelled, and
budget-exhausted runs.

### Diagram intents

1. Paired-view concept diagram: compare a final report score with its trajectory score and show
   four combinations of good or poor outcome and good or poor path. Takeaway: outcome and path
   answer different safety and quality questions.
2. Sequence diagram: show task admission, model proposal, policy validation, tool call, tool
   result, evaluator events, and terminal state in a simulated Northstar run. Takeaway: typed
   observable events are sufficient for trajectory evaluation.
3. Evaluation-flow diagram: replay one trace through retrieval, tool, policy, budget, stop, and
   outcome evaluators, then aggregate by case and slice. Takeaway: one run can support several
   independent checks without one blended score.

Each diagram needs an equivalent step-by-step text description.

### Safe activity and offline lab

Give the reader two paper routes to the same destination, one short and legal and one that
crosses a closed area, then explain why arrival alone is not enough. In Python, replay scripted
Northstar traces against deterministic tool and environment doubles. Score final report
quality separately from tool choice, argument validity, citation retrieval, forbidden events,
budget use, repeated no-progress calls, and terminal status. Include one correct report reached
through an unauthorized source attempt and one incomplete report reached through a safe path.

### Failure and evaluation focus

Reproduce outcome-only evaluation, trajectory-only evaluation, a trace with sensitive body
content, an invalid tool argument, and failure to stop after repeated calls. The repaired
harness must explain outcome-trajectory disagreement with criterion-level evidence and must
reject traces that omit required control events or violate redaction rules.

### Approved source IDs

SRC-008, SRC-010, SRC-011.

### Handoff

Pass replayable traces, criterion-level evaluation reports, outcome-trajectory disagreements,
and failing case IDs to Chapter 23. Preserve evaluator and dataset versions so debugging does
not compare incompatible runs.

## Chapter 23: Debugging and Optimization

### Purpose

Turn evaluation failures into testable causal hypotheses, make one measured improvement at a
time, and prevent accepted behavior from regressing.

### Reader question

How do we find the cause of a failure and improve without breaking something else?

### Prerequisites

Chapters 20, 21, and 22.

### Measurable outcome

Use traces and an ablation to isolate one failure cause, ship one measured change, and block a
seeded regression.

### Required concepts

- Failure taxonomy spanning task contract, dataset, evaluator, prompt or model, context,
  retrieval, tool, workflow or runtime, policy, environment, and infrastructure.
- Trace-based localization from failed indicator to case, event, component boundary, and owner.
- Correlation versus causation and the role of a falsifiable hypothesis.
- Ablation, controlled comparison, repeated runs where nondeterminism exists, and one-change-at-
  a-time experiment records.
- Error analysis by slice and severity before aggregate optimization.
- Regression suites built from diagnosed failures without leaking protected holdout answers into
  normal development.
- Gates for hard invariants, absolute thresholds, baseline comparison, and allowed non-inferior
  changes in quality, latency, and cost.
- Evaluator regressions, dataset-version changes, rollback conditions, and explicit override
  evidence.
- Privacy-safe feedback intake: minimize content, preserve provenance, control access and
  retention, and never promote production feedback directly into training or test data.

### Northstar increment

Add a failure taxonomy, trace-based debugging, component ablations, experiment records,
privacy-safe feedback handling, cost-quality optimization, rollback conditions, and regression
gates. A diagnosed regression must map from indicator to trace to component fix and rollback.

### Diagram intents

1. Diagnostic funnel: move from a failed gate to metric, slice, case, trace event, component,
   and falsifiable cause. Takeaway: debugging narrows evidence before changing the system.
2. Experiment loop: show baseline, hypothesis, one controlled change, evaluation, comparison,
   decision, and recorded rollback condition. Takeaway: an improvement is a measured result,
   not a plausible edit.
3. Regression-gate flow: run hard invariants, required slices, baseline comparison, and quality,
   latency, and cost budgets before promote or block. Takeaway: release gates preserve accepted
   behavior across several dimensions.

Each diagram needs an equivalent step-by-step text description.

### Safe activity and offline lab

Use a paper assembly line with four stages and one defective output; let the reader remove one
stage at a time to locate the fault, then state where this analogy fails for interacting AI
components. In Python, start from a seeded Northstar retrieval or citation failure. Use the
trace to propose competing causes, run at least one ablation, apply one local fix, and compare
the same dataset and evaluator versions before and after. Add the failure as a development
regression case, then seed a second change that improves latency but breaks citation quality
and prove the gate blocks it.

### Failure and evaluation focus

Reproduce random prompt tweaking, simultaneous component changes, evaluator-version mismatch,
holdout overfitting, and an optimization that improves averages while regressing a critical
slice. Acceptance requires a complete experiment record, a supported cause, before-and-after
results, uncertainty or repeated-run notes, rollback condition, and machine-readable gate
failure with case and metric reason codes.

### Approved source IDs

SRC-024, SRC-025, SRC-039.

### Handoff

Pass the accepted metric contracts, versioned data manifests, calibration reports, trajectory
schema, failure taxonomy, experiment records, and executable regression gate to Module 06.
Module 06 adds formal threat, safety, identity, privacy, and governance evidence as new hard
gates. Module 05 does not claim that its current safety fixtures complete that work.

## Cross-module handoff contract

### Inputs from earlier modules

- Module 02 provides typed model and tool boundaries, deterministic doubles, bounded execution,
  terminal statuses, and the first offline trace.
- Module 03 provides permission-aware retrieval, citation identities, source versions, and
  modality-specific observations that become evaluation dimensions and fixtures.
- Module 04 provides workflow and agent baselines, observable plans, durable states, simulated
  interruptions, collaboration handoffs, and protocol events that become trajectory cases.

If an upstream interface changes, its dependent fixtures and metrics must receive a new
version. Historical results remain linked to the old version and must not be silently compared.

### Outputs to later modules

- Module 06 extends Chapter 19 metrics and Chapter 23 gates with threat, authorization,
  privacy, safety, accessibility, human-oversight, and governance acceptance evidence.
- Module 07 may deploy only a design that passes the versioned Module 05 gate. It adds service
  reliability, observability, release, rollback, and storage checks without weakening existing
  hard invariants.
- Module 08 may optimize scale and unit economics only inside frozen quality, safety, privacy,
  reliability, and recovery thresholds. Production feedback follows Chapter 23 provenance and
  privacy controls.
- Module 09 consumes accepted evaluator, trajectory, telemetry, and release-gate evidence for
  hybrid routing, cross-layer fault, tool-portfolio, assurance, and user-experience decisions.
  It may add slices and fixtures but cannot replace metric definitions, calibration evidence,
  protected sets, or regression tests.
- Module 10 Chapter 42 maps accepted vendor-neutral evaluator, telemetry, and release-gate
  interfaces to current Microsoft services. A product selection cannot replace their evidence
  or weaken their thresholds.

Any breaking change to a task contract, metric formula, dataset split, golden evidence,
evaluator rubric, trajectory schema, threshold, or aggregation rule creates a new version and
requires an explicit comparability decision. Safety invariants cannot be waived by an average
score or informal override.

## Acceptance criteria

- [ ] Chapters 19-23 each preserve the curriculum reader question, prerequisites, measurable
  outcome, cumulative Northstar increment, and approved source IDs exactly in substance.
- [ ] Each chapter includes a beginner-first explanation plan, immediate vocabulary support,
  at least two diagram intents with text-equivalent requirements, and one safe activity or
  offline Python lab.
- [ ] The lab path runs on Python 3.11 with deterministic model, evaluator, tool, and environment
  doubles and requires no account, payment, personal data, live provider, or consequential
  action.
- [ ] Chapter 19 defines versioned task and metric contracts with owners, calculations, units,
  slices, thresholds, tradeoff rules, and failure actions.
- [ ] Chapter 20 separates train, development, and protected test cases and records coverage,
  provenance, privacy, contamination checks, difficult negatives, and version history.
- [ ] Chapter 21 layers deterministic, calibrated model-based, and human evaluators; reports
  agreement and error rates; checks bias and uncertainty; and provides escalation.
- [ ] Chapter 22 evaluates outcomes and observable trajectories, including retrieval, tools,
  policy, budgets, robustness, safety, recovery, and stop behavior, without private reasoning.
- [ ] Chapter 23 uses traces and ablations to test causes, records controlled experiments,
  handles feedback safely, and blocks a seeded regression.
- [ ] Northstar report correctness, citation quality, tool selection, safety, latency, and cost
  all appear in executable or machine-checkable gate evidence.
- [ ] Hard safety and authority invariants cannot be averaged away or traded for quality,
  latency, or cost.
- [ ] Every result identifies task, dataset, evaluator, rubric, metric, code or configuration,
  and trace versions needed for reproducibility.
- [ ] Every source ID is approved in `research/source-ledger.csv` and assigned to the relevant
  chapter. Volatile source claims are marked for reverification when chapter prose is drafted.
- [ ] The final artifact bundle is sufficient for Module 06 to add formal safety and governance
  gates and for Modules 07-09 to consume one vendor-neutral regression decision.

## Source boundary

The approved evidence boundary for this module is:

- Chapter 19: SRC-009, SRC-024, SRC-057.
- Chapter 20: SRC-009, SRC-024.
- Chapter 21: SRC-009, SRC-024.
- Chapter 22: SRC-008, SRC-010, SRC-011.
- Chapter 23: SRC-024, SRC-025, SRC-039.

Chapter authors must use the ledger claim associated with each source and must not cite a
dossier-only candidate. SRC-024 and SRC-025 are volatile and require release-time
reverification. Interpretations must be labeled as synthesis rather than attributed findings.