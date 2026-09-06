# Module 01 Contract: From Zero to Agents

> Status: Proposed for J2
> Module: 01
> Chapters: 1-4
> Contract role: Module brief, not chapter prose

## Module purpose

This module establishes the minimum mental model and design artifacts needed before an
agent runtime is implemented. It teaches readers to distinguish ordinary automation,
workflows, assistants, and agents; trace a bounded observe-decide-act loop; explain the
useful limits of a language model; and place probabilistic model behavior inside dependable
software controls.

The first-pass lane must work for a curious child or nontechnical adult. Every chapter must
begin with a familiar situation, use short concrete language, define jargon only after the
intuition, and state where its analogy stops matching the real system. The engineering lane
may then introduce mechanisms, tradeoffs, and formal boundaries. No chapter may require
machine-learning, cloud, framework, command-line, HTTP, or programming knowledge.

This contract preserves the chapter questions, prerequisites, measurable outcomes,
Northstar increments, and evidence sets frozen by the curriculum map. Chapter authors may
refine examples and presentation, but may not turn this document into chapter prose or
silently expand its scope.

## Reader entry state

The reader can:

- describe a goal and a sequence of everyday steps in ordinary language;
- compare familiar choices without using AI terminology; and
- follow a labeled picture or a short numbered trace.

The reader is not assumed to know Python, software architecture, probability, machine
learning, language models, cloud services, or agent frameworks.

## Reader exit state

By the end of the module, the reader can:

- classify software as automation, workflow, assistant, or agent and justify the minimum
  autonomy needed;
- trace environment, observation, state, policy, decision, action, feedback, and termination
  through a bounded loop;
- explain tokens, probability, context, inference, hallucination, and nondeterminism without
  treating a language model as a factual database;
- separate deterministic controls from probabilistic model calls and name enforceable
  contracts at their boundaries; and
- produce the complete Module 01 Northstar design packet without writing model-dependent
  implementation code.

## Vocabulary introduced

Each term must be defined immediately when first used and added to the chapter vocabulary
table. Definitions must remain consistent with the editorial contract.

| Chapter | Terms introduced |
|---:|---|
| 1 | automation, workflow, assistant, agent, autonomy, goal, agentic system, non-agent baseline |
| 2 | environment, observation, state, policy, decision, action, feedback, control loop, termination, terminal status |
| 3 | artificial intelligence, machine learning, language model, token, embedding, transformer, attention, context window, inference, probability, hallucination, nondeterminism |
| 4 | deterministic, probabilistic, contract, validation, state machine, control plane, data plane, system boundary, domain interface |

Later chapters in this module may reuse only terms introduced by their prerequisite closure.
When an unintroduced term is unavoidable, define it immediately in plain language and record
it in that chapter's vocabulary table.

## Shared artifacts

The module produces one cumulative, versionable Northstar design packet:

1. `Suitability decision record`: research problem, goal, autonomy spectrum, agent
   suitability test, deterministic non-agent baseline, and autonomy boundary.
2. `Loop specification`: environment, observations, permitted actions, state, policy,
   feedback, budgets, stop conditions, and terminal statuses.
3. `Model boundary record`: decisions eligible for model assistance, token and context
   assumptions, uncertainty, hallucination and nondeterminism risks, and deterministic test
   doubles expected in Module 02.
4. `Initial architecture pack`: system-boundary diagram, state-machine sketch, explicit model
   input and output contracts, and deterministic control responsibilities.
5. `Vocabulary table`: one plain-language definition per introduced term, with the chapter of
   introduction.
6. `Evaluation record`: completed classification cases, loop traces, prompt-change
   predictions, boundary checks, and diagnosed failure cases.

Artifacts must be readable without private chain-of-thought. Observable choices, typed
inputs and outputs, state transitions, policy decisions, actions, results, and stop reasons
are the inspectable record.

## Chapter 1: Why Agentic Systems

### Reader question

When should software choose its next step, and when is ordinary automation better?

### Prerequisites

None.

### Measurable outcome

Given five scenarios, the reader classifies each as automation, workflow, assistant, or
agent and justifies the minimum autonomy needed, with at least four correct classifications.

### Required concepts

- Fixed automation, predetermined workflows, interactive assistants, and goal-directed
  agents as distinct design choices.
- Autonomy as a spectrum rather than a yes-or-no label.
- Agent properties: goal pursuit, observation, reaction, initiative, and bounded action.
- Suitability factors: uncertainty in the next step, value of adaptation, consequence of an
  error, available feedback, and ability to stop or obtain human help.
- The simplicity-first rule: prefer the least autonomous design that meets the need.
- The required misconception correction: more autonomy does not always make software more
  capable.
- Where the first-pass analogy stops: people use broad judgment and lived experience, while
  software acts only through its encoded state, policies, model outputs, and allowed tools.

### Northstar increment

Write the Northstar research problem, goal, autonomy spectrum, agent suitability test,
deterministic search-and-template baseline, and autonomy boundary. The initial design may
search only approved sources, return evidence with summaries, and draft a result. It cannot
publish, share, or change records.

### Required diagrams

1. A concept picture placing automation, workflow, assistant, and agent on an autonomy
   spectrum, with uncertainty and control labeled. Takeaway: autonomy should increase only
   when the task needs it and controls can contain it.
2. A decision flow from task predictability and consequence through baseline, workflow, or
   agent selection, including a `do not use an agent` exit. Takeaway: agent adoption is a
   design decision, not a default.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent
step-by-step text description.

### Safe activity or lab direction

Use five paper or offline fixture cards describing familiar tasks. The reader sorts them,
marks what may vary, chooses the least autonomous implementation, and compares answers with
a deterministic rubric. No account, personal data, payment, live model, or code is required.

### Failure and evaluation focus

- Reproduce over-automation by choosing an agent for a fixed, high-consequence rule.
- Evaluate classification accuracy, justification quality, stated autonomy boundary, and
  whether the simpler baseline was considered.
- Fail acceptance when the design uses labels without naming who chooses, what may change,
  or how action is bounded.

### Approved source IDs

SRC-001, SRC-002, SRC-013, SRC-020.

### Handoff to Chapter 2

Chapter 1 selects an agent only where bounded choice may add value. Chapter 2 must make that
choice inspectable by defining what the system observes, decides, does, and treats as a stop.

## Chapter 2: The Observe-Decide-Act Loop

### Reader question

How can a system notice what happened, choose, act, and know when to stop?

### Prerequisites

Chapter 1.

### Measurable outcome

The reader traces an observe-decide-act loop for a paper scenario, identifying environment,
state, policy, action, feedback, and termination with no missing element.

### Required concepts

- Environment, goal, observation, state, policy, decision, action, and feedback.
- The difference between an observation and the system's stored state.
- A policy as the rule or mechanism that selects an allowed next action.
- Feedback as evidence about what changed, not proof that the goal was achieved.
- Explicit stop conditions, terminal statuses, budgets, cancellation, and no-progress exits.
- One validated action per loop step and the need to record observable transitions.
- Where the first-pass analogy stops: software does not notice the whole world; it receives
  only the observations its interfaces expose.

### Northstar increment

Define Northstar's approved-source environment, observations, permitted actions, state,
policy boundary, feedback, budgets, stop conditions, and terminal statuses. The action set is
limited to accepting a research question and source scope, searching approved sources,
reading authorized evidence, recording notes, drafting a cited result, asking for
clarification, and stopping. Publishing and record changes remain prohibited.

### Required diagrams

1. A concept picture showing Northstar inside an environment boundary with labeled
   observations entering and permitted actions leaving. Takeaway: the system can act only on
   what it can observe and only through allowed actions.
2. A process flow for observe, validate state and policy, decide, validate action, act,
   receive feedback, update state, and either repeat or terminate. Takeaway: every loop needs
   guarded transitions and an explicit stop.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent
step-by-step text description.

### Safe activity or lab direction

Run an offline paper simulation in which one person or a deterministic fixture reveals an
observation at a time. The reader updates a state card, applies a written policy, selects one
allowed action, records feedback, and stops on a declared condition. Include success,
budget-exhausted, cancelled, and no-progress traces.

### Failure and evaluation focus

- Reproduce a loop that never stops or repeats an identical action without progress.
- Evaluate completeness of the trace, legal state transitions, action-policy compliance,
  budget accounting, and correct terminal status.
- Fail acceptance if any action occurs without a preceding observation, policy check, and
  state update, or if private reasoning is required to explain the trace.

### Approved source IDs

SRC-001, SRC-002, SRC-012, SRC-027.

### Handoff to Chapter 3

Chapter 2 defines a loop whose policy may select a next action. Chapter 3 explains what a
language model can and cannot contribute to that decision before it is placed in the loop.

## Chapter 3: AI and LLM Primer

### Reader question

How can a language model produce useful words without actually knowing facts like a
database?

### Prerequisites

Chapter 1.

### Measurable outcome

The reader explains tokens, probability, context, inference, and nondeterminism in plain
language, then predicts which of three prompt changes can alter an output.

### Required concepts

- The relationship among artificial intelligence, machine learning, and language models,
  without presenting the terms as interchangeable.
- Tokens as model input and output units, and embeddings as learned numeric representations.
- Transformers and attention as mechanisms for relating token representations in context.
- Inference as running a trained model to produce an output.
- Next-token probability as a useful intuition, plus the limit of that intuition as a full
  explanation of model behavior.
- Context windows, ordering and wording sensitivity, nondeterminism, and capability limits.
- Hallucination as plausible but unsupported or incorrect generated content.
- The required misconception correction: fluent output is not evidence that the model is a
  database or knows whether every sentence is true.
- Where the first-pass analogy stops: word prediction games use human understanding and a
  tiny choice set, while models use learned numeric patterns across many tokens.

### Northstar increment

Mark which Northstar decisions may use a model and which remain deterministic. Record token
and context assumptions, output variability, uncertainty, hallucination risk, unsupported
claim risk, and the need for evidence and validation. Do not select a provider or write
model-dependent code.

### Required diagrams

1. A concept picture from text through tokens and numeric representations to probable next
   tokens, with `not a fact database` called out. Takeaway: a model generates from learned
   patterns in context rather than looking up guaranteed truth.
2. A process flow showing prompt and context entering inference, several plausible outputs,
   and downstream evidence and validation checks. Takeaway: useful model output still needs
   external controls and verification.
3. A focused transformer picture showing token relationships through attention at a
   conceptual level, without matrix mathematics. Takeaway: attention helps the model weigh
   relationships in the provided context.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent
step-by-step text description.

### Safe activity or lab direction

Use an offline token-card and weighted-draw simulation. Change one instruction, one context
fact, and one ordering choice across three runs. The reader predicts output changes, records
variation, and labels unsupported claims. A seeded deterministic script may replace dice,
but no live model or provider account is required.

### Failure and evaluation focus

- Reproduce fluent but unsupported output by omitting evidence while preserving plausible
  wording.
- Evaluate plain-language accuracy, prompt-change predictions, distinction between
  generation and retrieval, uncertainty labels, and identification of hallucination risk.
- Fail acceptance if fluency, confidence, or repetition is treated as factual verification.

### Approved source IDs

SRC-003, SRC-004, SRC-030.

### Handoff to Chapter 4

Chapter 3 establishes that model inference can be useful and variable. Chapter 4 must make
that variability safe to consume by defining deterministic boundaries, validation, and
state transitions around model calls.

## Chapter 4: From Software to AI Systems

### Reader question

How do we put an unpredictable model inside dependable software?

### Prerequisites

Chapters 2 and 3.

### Measurable outcome

The reader draws a system boundary that separates deterministic controls from probabilistic
model calls and specifies one enforceable contract at each boundary.

### Required concepts

- Deterministic and probabilistic components, with examples and limits for each label.
- Explicit input, output, state, tool, policy, budget, and termination contracts.
- Schema and rule validation before model output can influence state or action.
- State machines as deterministic owners of legal transitions and terminal statuses.
- Control plane responsibilities for policy, authority, budgets, configuration, and
  evaluation, distinct from task data moving through the data plane.
- Provider-neutral domain interfaces and replaceable model adapters.
- Fail-closed behavior for invalid output, denied policy, exhausted budget, and unknown
  state.
- The required misconception correction: probabilistic components do not make dependable
  software impossible when deterministic controls bound their influence.
- Where the first-pass analogy stops: a fenced playground suggests containment, but software
  boundaries require enforceable schemas, permissions, state rules, and tests.

### Northstar increment

Produce Northstar's first architecture diagram and state-machine sketch. Place the model
behind explicit input and output contracts. Keep task admission, source scope, policy,
allowed actions, state, budgets, validation, and termination in deterministic components.
Freeze provider-neutral domain interfaces and preserve the deterministic baseline path.

### Required diagrams

1. A system-boundary diagram separating user, deterministic runtime and controls,
   probabilistic model, approved-source interface, and versioned artifacts. Takeaway: the
   model proposes bounded content or choices but does not own policy, authority, state, or
   side effects.
2. A state-machine sketch covering accepted, observing, deciding, validating, acting,
   completed, needs clarification, budget exhausted, cancelled, policy denied, and failed
   states. Takeaway: deterministic state transitions make variable model behavior
   inspectable and stoppable.
3. A control-plane and data-plane view showing policy and budgets apart from task prompts,
   evidence, and drafts. Takeaway: task data cannot rewrite the rules that control it.

Each diagram requires plain-language labels, a one-sentence takeaway, and an equivalent
step-by-step text description.

### Safe activity or lab direction

Use an offline boundary-review exercise with fixed model-output fixtures: valid output,
malformed output, extra fields, prohibited action, repeated action, and uncertain output.
The reader routes each fixture through written validation and state-transition rules, then
records the accepted or terminal result. No live model, external service, or consequential
action is allowed.

### Failure and evaluation focus

- Reproduce a boundary failure in which free-form model text bypasses validation or changes
  policy or state directly.
- Evaluate boundary completeness, contract enforceability, rejection of malformed and
  prohibited outputs, legal state transitions, baseline availability, and provider
  replaceability.
- Fail acceptance if prompts are treated as authority or security boundaries, if the model
  owns terminal status, or if correctness depends on private chain-of-thought.

### Approved source IDs

SRC-070, SRC-071.

### Handoff to the next chapter

Module 01 hands Chapter 5 a provider-neutral boundary and model-risk record. Chapter 5 may
define versioned instructions, message roles, and schema-constrained outputs, but it must
preserve the deterministic controls, explicit state, least-authority action set, and
non-agent baseline established here.

## Module acceptance criteria

- [ ] The deliverable remains a contract and does not contain finished chapter narrative.
- [ ] Chapters 1-4 each appear exactly once and retain their frozen reader question,
      prerequisites, measurable outcome, Northstar increment, and approved evidence set.
- [ ] A curious child or nontechnical adult can complete each first-pass path without prior
      machine-learning, cloud, framework, or programming knowledge.
- [ ] Every analogy states where it stops matching the real system.
- [ ] Every introduced AI term is defined immediately and recorded in the vocabulary table.
- [ ] Every chapter requires at least two diagrams, and every diagram has a one-sentence
      takeaway plus an equivalent text description.
- [ ] Every chapter specifies an offline safe activity or lab that requires no account,
      payment, personal data, live provider, or consequential side effect.
- [ ] Every chapter includes a reproducible failure and measurable evaluation criteria.
- [ ] Chapter 1 includes a deterministic baseline and corrects the claim that more autonomy
      is always better.
- [ ] Chapter 2 includes complete loop elements, budgets, feedback, stop conditions, and
      observable terminal statuses.
- [ ] Chapter 3 distinguishes generation from factual storage and records uncertainty,
      hallucination, context, and nondeterminism risks.
- [ ] Chapter 4 keeps policy, authority, state, validation, budgets, and termination outside
      the model and behind enforceable contracts.
- [ ] The Northstar packet defines approved-source research and cited drafting only;
      publishing, sharing, record changes, arbitrary browsing, and general computer control
      remain prohibited.
- [ ] No activity or acceptance artifact requires private chain-of-thought.
- [ ] All cited source IDs exist in `research/source-ledger.csv` and have status `approved`.
- [ ] Volatile product claims are absent; Microsoft implementation details are deferred until
      supported mappings are required and freshly verified.
- [ ] The cumulative artifact set covers the Module 01 README outcome and Northstar milestone
      without introducing Module 02 implementation work.

## Cross-module handoff

Module 02 receives the accepted Northstar suitability decision record, loop specification,
model boundary record, initial architecture pack, vocabulary table, and evaluation record.
It must implement the smallest useful agent offline with Python 3.11 and deterministic model
and tool doubles. It may add versioned messages, model selection, typed tools, and bounded
runtime behavior, but it must not weaken the fixed-workflow baseline, provider-neutral domain
interfaces, explicit authorization, validation, budgets, termination, or prohibition on
consequential actions. Any change to a frozen Chapter 1-4 prerequisite, outcome, Northstar
responsibility, or approved evidence set requires coordinated contract change before later
module briefs rely on it.