# R3: OpenAI

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R3 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers OpenAI's public guidance and open-source SDK material for structured outputs, tools, agent runtimes, orchestration, evaluation, tracing, computer use, and safety.

Questions:

1. Which OpenAI patterns are durable across models and API generations?
2. How do schemas, tools, handoffs, guardrails, and tracing shape an agent runtime?
3. Which controls are required when agents consume untrusted data or perform actions?
4. What should the book teach about model reasoning without depending on private chain-of-thought?
5. Which product and model claims must remain in the dated technology landscape?

## Durable findings

### Structured outputs create application contracts

JSON Schema and typed application models can constrain the shape of model output. Schema conformance reduces parsing ambiguity but does not prove that field values are factually correct, authorized, or semantically valid. Applications still need domain validation and recovery behavior.

### Tools need a controlled execution loop

Tool calling separates model-proposed intent from application-executed capability. A runtime presents tool definitions, receives a structured request, validates it, applies policy, executes the tool, and returns a bounded result. Hosted tools, local functions, remote protocol tools, and computer controls have different trust and failure boundaries.

### Orchestration can be model-led or code-led

Manager-style orchestration keeps control with one agent and exposes specialists as tools. Handoffs transfer control to a specialist. Code-driven routing provides more deterministic control. These are design choices, not maturity levels, and should be compared on the same tasks and budgets.

### Guardrails are layered checks

Input, output, and tool checks can detect or block classes of failure, but instructions alone do not enforce authorization. Consequential operations need policy outside the model, explicit approvals, scoped credentials, idempotency, and audit evidence.

### Tracing is part of the runtime contract

Agent traces should connect model generations, tool calls, handoffs, guardrail decisions, errors, latency, and usage. Export and retention need redaction, access control, and data-residency decisions. Tracing supports debugging and evaluation but can itself become a sensitive-data store.

### Evaluation should drive development

Production tasks and failure cases should be converted into repeatable evaluations before optimization. Deterministic checks, calibrated model graders, and human review serve different purposes. Changes to models, prompts, tools, and retrieval should pass regression gates as a versioned system.

### Computer use requires environment verification

Visual interfaces are ambiguous and mutable. A model-proposed click or keystroke must execute in an isolated environment, respect policy, and be followed by a fresh observation that verifies the resulting state. High-impact actions require human confirmation.

## Evolving or contested findings

- Current APIs, SDK abstractions, built-in tools, model families, reasoning controls, and tracing backends are volatile.
- Increasing inference-time reasoning can improve selected tasks while increasing latency and cost. Current model-specific tradeoffs require measurement.
- Generated summaries or rationales should not be treated as faithful access to hidden reasoning.
- Agents-as-tools and handoffs offer useful composition patterns, but neither is generally superior.
- Model graders can scale evaluation but may share biases and blind spots with the system being evaluated.
- Computer-use reliability and safety vary by environment, task, model, and interface design.

## Production implications

1. Use typed schemas at model/application boundaries and validate business invariants separately.
2. Keep tool execution in application code with explicit authorization and side-effect policy.
3. Choose model-led versus code-led orchestration based on measured variability and risk.
4. Capture structured traces with configurable redaction and retention.
5. Build an evaluation set before tuning prompts or selecting a more expensive model.
6. Pin SDK and model versions and maintain migration tests around provider boundaries.
7. Sandbox computer and code execution, restrict network access, and verify post-action state.
8. Do not log or require private chain-of-thought; use plans, tool traces, outcomes, and concise rationale.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| Valid JSON means a valid answer | A schema checks shape, not truth, policy, or business meaning. |
| The model executes function calls | The application validates and executes a model-proposed call. |
| An agent SDK supplies a production architecture | An SDK supplies runtime primitives; identity, storage, policy, reliability, and operations remain system concerns. |
| More reasoning effort always improves quality | Benefits and costs are task- and model-dependent and need evaluation. |
| Guardrails make dangerous tools safe | Least privilege, approvals, isolation, and transaction controls enforce safety. |
| Traces are harmless debugging data | Traces may contain prompts, retrieved data, tool inputs, outputs, and identifiers. |
| Computer use is equivalent to an API | Visual state is less structured and needs repeated observation and verification. |

## Candidate primary sources

Every row requires J1 verification. Continuously updated documentation and repositories are volatile even when the architectural lesson is durable.

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R3-01 | OpenAI | A practical guide to building agents | https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf | NEEDS VERIFICATION | 2026-09-05 | Agent components, orchestration patterns, guardrails, and incremental adoption | 1, 8, 14, 17, 25 | evolving |
| R3-02 | OpenAI | OpenAI Agents SDK for Python documentation | https://openai.github.io/openai-agents-python/ | updated continuously | 2026-09-05 | Agents, tools, handoffs, guardrails, sessions, and tracing | 7, 8, 17, 30 | volatile |
| R3-03 | OpenAI | OpenAI Agents SDK for Python repository | https://github.com/openai/openai-agents-python | updated continuously | 2026-09-05 | Versioned implementation and examples | 7, 8, 17, 30 | volatile |
| R3-04 | OpenAI | Responses API reference | https://platform.openai.com/docs/api-reference/responses | updated continuously | 2026-09-05 | Current response items, tools, and request lifecycle | 5, 7, 8 | volatile |
| R3-05 | OpenAI | Structured model outputs | https://platform.openai.com/docs/guides/structured-outputs | updated continuously | 2026-09-05 | JSON Schema-constrained output and current limitations | 5 | volatile |
| R3-06 | OpenAI | Evaluation best practices | https://platform.openai.com/docs/guides/evaluation-best-practices | updated continuously | 2026-09-05 | Task-specific eval design, criteria, and iteration | 19, 20, 21, 23 | volatile |
| R3-07 | OpenAI | Tracing in the Agents SDK | https://openai.github.io/openai-agents-python/tracing/ | updated continuously | 2026-09-05 | Current trace and span concepts in the Python SDK | 23, 30 | volatile |
| R3-08 | OpenAI | Safety in building agents | https://platform.openai.com/docs/guides/agent-builder-safety | updated continuously | 2026-09-05 | Prompt injection, data leakage, structured isolation, and approvals | 24, 25, 27 | volatile |
| R3-09 | OpenAI | Computer use | https://platform.openai.com/docs/guides/tools-computer-use | updated continuously | 2026-09-05 | Current computer-use loop and safety guidance | 13, 25 | volatile |
| R3-10 | OpenAI | OpenAI Model Spec | https://model-spec.openai.com/ | updated periodically | 2026-09-05 | Public model behavior objectives and instruction principles | 5, 26, 27 | volatile |

## Claims requiring release-time verification

- Current model names, availability, context limits, reasoning settings, prices, and rate limits
- Current status and compatibility of Responses, Agents SDK, built-in tools, sessions, and tracing
- Current structured-output schema support and limitations
- Current computer-use interface, supported environments, and safety recommendations
- Current data retention, regional processing, and tracing policies
- Any benchmark or performance comparison involving an OpenAI model

## Recommended chapter placements

- Chapter 5: schema-constrained output and semantic validation
- Chapters 7-8: tool lifecycle and runtime control loop
- Chapters 14 and 17: code-led routing, manager patterns, and handoffs
- Chapter 13: computer-use isolation and state verification
- Chapters 19-23: evaluation-driven development, graders, regression, and trace analysis
- Chapters 24-27: prompt injection, guardrails, approvals, and application authority
- Chapters 28 and 30: provider boundaries, sessions, tracing, and observability

## Discrepancies and unresolved questions

1. SDK documentation describes available primitives, not the private architecture of OpenAI products.
2. Current product terminology and API recommendations may change faster than the durable chapter text.
3. Structured-output reliability for deeply nested schemas needs task-specific measurement.
4. The comparative value of manager orchestration, handoffs, and code routing is workload-specific.
5. Provider-hosted tracing and state introduce retention, residency, portability, and incident-response questions.
6. Public guidance cannot provide a universal reasoning-effort setting or production threshold.