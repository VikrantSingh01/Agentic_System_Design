# R8: Standards and Frontier

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R8 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers interoperability protocols, observability conventions, security knowledge bases, and frontier capabilities whose production maturity must be assessed separately from their novelty.

Questions:

1. What do MCP, A2A, and AG-UI standardize, and what do they leave to applications?
2. Which OpenTelemetry conventions can describe model and agent operations?
3. Which OWASP, NIST, and MITRE resources inform an agent threat model?
4. Which frontier capabilities have reproducible production evidence?
5. What belongs in durable chapters versus the dated technology landscape?

## Durable findings

### Protocols solve different boundaries

MCP connects AI applications to context and capabilities. A2A addresses task-oriented interaction between agents. AG-UI addresses event-based interaction between agent backends and user-facing applications. They are complementary in scope, and none supplies an application's complete identity, authorization, safety, or business semantics.

Durable protocol concerns include capability negotiation, versioning, authentication, authorization, consent, cancellation, deadlines, idempotency, error semantics, backpressure, audit, and untrusted payloads.

### Observability needs common semantic boundaries

OpenTelemetry can correlate model calls, agent invocations, tool operations, retrieval, and application requests. Semantic conventions evolve, so instrumentation should preserve stable internal events and map them to the current external schema. Sensitive prompts, tool inputs, and retrieved data should not be exported by default.

### Agent security combines AI and conventional threats

Prompt injection, excessive agency, sensitive-data disclosure, data and model poisoning, insecure output handling, supply-chain compromise, denial of service, and unbounded consumption interact with familiar identity, network, application, and cloud risks. An agent threat model must follow data and authority across every tool and protocol boundary.

### Frontier capabilities require workload evidence

Reasoning models, deep research, coding, computer use, multimodality, long context, model routing, verifiable rewards, and agent observability should be evaluated on production-like tasks. A capability becomes a durable architectural recommendation only when it has a clear use case, reproducible benefit, known failure modes, and acceptable cost and operations.

### Durable execution predates LLM agents

Workflow histories, checkpoints, retries, timeouts, cancellation, compensation, and idempotency are established distributed-systems patterns. Agent frameworks should integrate these patterns rather than recreate them through prompt instructions.

## Evolving or contested findings

- MCP, A2A, and AG-UI specifications, governance, SDKs, transports, and authorization profiles are evolving.
- OpenTelemetry generative AI and agent conventions may change names or stability levels.
- OWASP project names and risk rankings change across editions; risk classes matter more than numbering.
- Reasoning and long-context benefits vary by model and task and often trade latency and cost for quality.
- Model-based evaluators and verifiable rewards can scale feedback while introducing reward hacking, bias, and correlated error.
- Current coding, browser, and computer-use agents do not establish general reliability for arbitrary environments.

## Production implications

1. Keep domain tool contracts independent of MCP, REST, or provider SDK transports.
2. Threat-model every protocol peer and validate all remote content as untrusted.
3. Define internal telemetry events, then map them to the current OpenTelemetry conventions.
4. Redact or summarize sensitive telemetry before export and restrict trace access.
5. Use a durable workflow engine or equivalent state model for long-running side effects.
6. Admit frontier capabilities through evaluation and cost gates, not announcements.
7. Pin protocol, schema, SDK, and telemetry convention versions.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| One protocol will cover every agent integration | MCP, A2A, and AG-UI target different boundaries. |
| Protocol compatibility creates trust | Identity, policy, validation, and authorization remain separate. |
| OpenTelemetry tells you exactly what to log | Conventions aid interoperability; privacy and application semantics still need design. |
| The OWASP list is a complete threat model | It is an input to a system-specific analysis of assets, actors, and trust boundaries. |
| A frontier benchmark proves production readiness | Production adds changing data, tools, users, attacks, latency, and cost. |
| Prompting an agent to retry creates durability | Durable execution requires persisted state and safe side-effect handling. |

## Candidate primary sources

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R8-01 | Model Context Protocol | MCP specification | https://modelcontextprotocol.io/specification/ | updated continuously | 2026-09-05 | Current MCP architecture, lifecycle, primitives, and authorization | 18, 25 | volatile |
| R8-02 | A2A Project | Agent2Agent Protocol specification | https://a2a-protocol.org/latest/specification/ | updated continuously | 2026-09-05 | Current A2A task, message, artifact, and capability model | 18, 25 | volatile |
| R8-03 | AG-UI | AG-UI documentation | https://docs.ag-ui.com/ | updated continuously | 2026-09-05 | Current agent-to-user-interface event protocol | 18 | volatile |
| R8-04 | OpenTelemetry | Semantic conventions for generative AI systems | https://opentelemetry.io/docs/specs/semconv/gen-ai/ | updated continuously | 2026-09-05 | Current model and agent telemetry conventions | 30 | volatile |
| R8-05 | NIST | Artificial Intelligence Risk Management Framework (AI RMF 1.0) | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf | 2023 | 2026-09-05 | Govern, Map, Measure, and Manage risk functions | 19, 24, 27 | durable |
| R8-06 | NIST | Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | 2024 | 2026-09-05 | Generative AI risks and suggested actions | 24, 27 | evolving |
| R8-07 | OWASP | OWASP Top 10 for Large Language Model Applications | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | updated periodically | 2026-09-05 | Current community risk taxonomy for LLM applications | 24, 25 | volatile |
| R8-08 | MITRE | MITRE ATLAS | https://atlas.mitre.org/ | updated continuously | 2026-09-05 | Adversarial tactics, techniques, case studies, and mitigations | 24, 25 | evolving |
| R8-09 | Temporal | Temporal Platform documentation | https://docs.temporal.io/ | updated continuously | 2026-09-05 | Durable workflow histories, retries, timers, and activities | 16, 29 | volatile |
| R8-10 | TACL | Lost in the Middle: How Language Models Use Long Contexts | https://arxiv.org/abs/2307.03172 | 2023 | 2026-09-05 | Long-context position effects | 9, 11 | evolving |

## Claims requiring release-time verification

- Current MCP, A2A, and AG-UI versions, governance, SDKs, transports, and security guidance
- Stability status and exact names of OpenTelemetry generative AI and agent attributes
- Current OWASP project edition, categories, and terminology
- Current NIST publications and crosswalks relevant to generative or agentic AI
- Current benchmark and product results for reasoning, research, coding, computer use, and long context
- Current production evidence for verifiable rewards, model routing, and automated evaluators

## Recommended chapter placements

- Chapter 18: protocol scopes, adapters, identity, authorization, lifecycle, and threats
- Chapters 24-25: OWASP, NIST, MITRE, remote-tool trust, and excessive agency
- Chapter 30: stable internal telemetry mapped to evolving OpenTelemetry conventions
- Chapters 6, 9, 13, 15, 22, and 33: dated frontier evidence and evaluation gates
- Chapters 16 and 29: durable workflow semantics and side-effect recovery
- Chapter 35 and technology landscape: capabilities without stable production evidence

## Discrepancies and unresolved questions

1. Protocol governance and adoption do not guarantee semantic interoperability.
2. Cross-protocol identity and authorization mappings need implementation evidence.
3. OpenTelemetry stability levels must be reconciled with long-lived internal schemas.
4. Agent benchmark environments and contamination status can decay over time.
5. Frontier claims need cost- and reliability-matched baselines, not only capability demonstrations.