# R1: Foundations and Academia

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R1 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier supports the conceptual foundation of the book: what agents are, how language models fit inside agent systems, which classical ideas remain useful, and how to evaluate claims about planning, memory, and multi-agent behavior.

Questions:

1. Which definitions distinguish agents from workflows and ordinary automation without relying on vendor terminology?
2. Which classical agent and planning concepts remain useful for LLM-based systems?
3. What minimum knowledge of transformers, probability, embeddings, and inference does a system designer need?
4. What published evidence supports planning, retrieval, memory, reflection, and multi-agent patterns?
5. Why do static model benchmarks fail to establish production readiness?

## Durable findings

### Agents are systems, not models

An agent can be modeled as a system that observes an environment, selects actions in pursuit of an objective, acts through bounded capabilities, and incorporates feedback. The model may help select an action, but state management, tools, authorization, budgets, and termination belong to the surrounding software.

There is no single universally accepted boundary between an agent, assistant, workflow, and automation. The book should therefore define these terms operationally and treat autonomy as a spectrum. A useful distinction is whether control flow is predetermined or selected dynamically under explicit constraints.

### Classical architectures still supply useful vocabulary

Reactive, deliberative, hybrid, and belief-desire-intention architectures help readers reason about latency, state, goals, plans, and commitments. Modern implementations differ, but they face the same systems questions: what is observed, what state is trusted, how an action is selected, and when execution stops.

Classical planning also contributes durable concepts such as state, actions, preconditions, effects, search, decomposition, and replanning. LLM-generated plans do not remove the need to validate feasibility or observe execution results.

### A language model is a probabilistic component

Transformer language models generate token sequences from conditional probability distributions. Training changes model parameters; inference uses those parameters for a request. Sampling settings can change output variability, but low variability does not establish correctness.

Embeddings provide learned vector representations useful for similarity and retrieval. Their scores are model-dependent signals, not truth or authorization decisions.

### Retrieval and context are explicit system components

Retrieval-augmented generation separates parametric model behavior from non-parametric evidence retrieval. Chunking, filtering, ranking, context assembly, and citation verification each require evaluation. Longer context does not eliminate relevance selection, ordering, privacy, or cost constraints.

### Agent evaluation must include interaction

An agent can reach a correct answer through an unsafe or prohibitively expensive path. Production evaluation therefore needs both outcome measures and trajectory measures, including tool selection, side effects, policy compliance, latency, and cost. Static benchmarks are useful diagnostics but do not replace task-specific evaluation under realistic constraints.

## Evolving or contested findings

- Step-by-step prompting, explicit search, reflection, and test-time compute can improve some tasks, but benefits depend on the model, task, budget, and evaluator. No technique should be presented as a universal reasoning upgrade.
- Generated rationales are not guaranteed to be faithful explanations of internal computation. The book should evaluate observable outputs and actions rather than require private chain-of-thought.
- Memory taxonomies borrowed from cognitive science are useful design metaphors, but software stores do not become human memory merely by adopting those names.
- Multi-agent specialization, parallelism, and independent verification can help in suitable tasks. Coordination overhead, correlated errors, and weak single-agent baselines make broad superiority claims unreliable.
- Benchmark contamination, evaluator bias, and rapidly changing environments complicate comparisons among agent systems.

## Production implications

1. Put deterministic controls around probabilistic model behavior.
2. Enforce step, time, token, cost, and side-effect budgets in the runtime.
3. Version models, prompts, tools, retrieval indexes, policies, and evaluation sets together.
4. Validate plans and tool arguments against current environment state.
5. Establish a strong workflow or single-agent baseline before adding agents.
6. Evaluate outcome quality, trajectory safety, latency, and cost separately.
7. Trace model calls, tool calls, state transitions, approvals, and errors with privacy controls.
8. Treat benchmark scores as evidence about a bounded test, not proof of production fitness.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| An LLM call is an agent | An agent includes a controlled loop, state, tools, feedback, and termination. |
| A confident answer is probably correct | Fluency and factual correctness are different properties. |
| More context always helps | Irrelevant or poorly placed context can reduce quality while increasing latency and cost. |
| A generated plan guarantees success | Plans must be checked against tool contracts and current environment state. |
| Memory means storing every conversation | Useful memory requires selective write, retrieval, retention, deletion, and privacy policies. |
| Multiple agents are automatically better | Additional agents add communication cost and failure modes and need an empirical baseline. |
| A benchmark score predicts production quality | Production includes changing data, users, tools, attacks, latency, cost, and side effects. |

## Candidate primary sources

These are candidates for verification at J1. Exact bibliographic metadata and URLs must be checked before ledger approval.

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R1-01 | Pearson | Artificial Intelligence: A Modern Approach, Fourth Edition | https://aima.cs.berkeley.edu/ | 2020 | 2026-09-05 | Rational-agent framing, environments, search, planning | 1, 2, 14, 15 | durable |
| R1-02 | IEEE | Intelligent Agents: Theory and Practice | https://doi.org/10.1017/S0269888900008122 | 1995 | 2026-09-05 | Autonomy, reactivity, proactiveness, and social ability | 1, 2, 17 | durable |
| R1-03 | NeurIPS | Attention Is All You Need | https://arxiv.org/abs/1706.03762 | 2017 | 2026-09-05 | Transformer and attention foundations | 3, 6 | durable |
| R1-04 | NeurIPS | Language Models are Few-Shot Learners | https://arxiv.org/abs/2005.14165 | 2020 | 2026-09-05 | In-context task adaptation and scale-era language models | 3, 5, 6 | durable |
| R1-05 | NeurIPS | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://arxiv.org/abs/2005.11401 | 2020 | 2026-09-05 | Combining generation with external retrieval | 10, 11 | durable |
| R1-06 | TACL | Lost in the Middle: How Language Models Use Long Contexts | https://arxiv.org/abs/2307.03172 | 2023 | 2026-09-05 | Position and context-length effects in retrieval tasks | 9, 11 | evolving |
| R1-07 | NeurIPS | Chain-of-Thought Prompting Elicits Reasoning in Large Language Models | https://arxiv.org/abs/2201.11903 | 2022 | 2026-09-05 | Task-dependent gains from reasoning demonstrations | 5, 15 | evolving |
| R1-08 | ICLR | ReAct: Synergizing Reasoning and Acting in Language Models | https://arxiv.org/abs/2210.03629 | 2023 | 2026-09-05 | Interleaving generated reasoning and environment actions | 7, 8, 15, 22 | evolving |
| R1-09 | ICML | Holistic Evaluation of Language Models | https://arxiv.org/abs/2211.09110 | 2023 | 2026-09-05 | Multi-metric evaluation and scenario-based comparison | 19, 20, 21 | evolving |
| R1-10 | arXiv | WebShop: Towards Scalable Real-World Web Interaction with Grounded Language Agents | https://arxiv.org/abs/2207.01206 | 2022 | 2026-09-05 | Interactive task evaluation and environment feedback | 22 | evolving |
| R1-11 | NeurIPS | OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments | https://arxiv.org/abs/2404.07972 | 2024 | 2026-09-05 | Evaluation of computer-using agents in realistic environments | 13, 22 | evolving |
| R1-12 | MIT Press | Reinforcement Learning: An Introduction, Second Edition | http://incompleteideas.net/book/the-book-2nd.html | 2018 | 2026-09-05 | Policies, rewards, environment interaction, and feedback | 2, 35 | durable |

## Claims requiring release-time verification

- Current results and contamination status of all named benchmarks
- Current evidence for test-time compute and reasoning-model scaling
- Current context-window claims and long-context behavior by model
- Current agent benchmark suites and whether their environments remain reproducible
- Any quantitative claim that one planning, reflection, memory, or multi-agent method outperforms another

## Recommended chapter placements

- Chapters 1-2: operational agent definition, autonomy spectrum, environments, and classical architectures
- Chapters 3 and 6: transformer, probability, inference, and model-selection foundations
- Chapters 9-12: context limits, retrieval, and careful use of memory metaphors
- Chapters 14-17: planning, action validation, reflection, and multi-agent tradeoffs
- Chapters 19-23: multidimensional, trajectory-aware, production-like evaluation
- Chapters 28-35: runtime controls, observability, reliability, and economic constraints

## Discrepancies and unresolved questions

1. Agent definitions differ across AI, software engineering, robotics, and product documentation. The book needs an explicit operational definition rather than claiming consensus.
2. Generated rationales may improve answers without faithfully describing model internals. Evaluation guidance must not equate explanation fluency with causal transparency.
3. Published agent studies often use different models, prompts, tools, budgets, and evaluators, making architecture-level comparisons difficult.
4. Evidence for long-horizon reliability remains weaker than evidence for short benchmark tasks.
5. A principled method for deciding between workflow, single-agent, and multi-agent designs remains application-specific and should be taught as an evaluation problem.