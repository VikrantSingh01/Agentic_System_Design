# R4: Google and DeepMind

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R4 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers Google and DeepMind's public work on planning, multimodal models, agent frameworks, interoperability, evaluation, safety, cloud architecture, and site reliability engineering.

Questions:

1. Which planning and agent concepts transfer from DeepMind research to production software?
2. What do Gemini tool and multimodal interfaces imply for system design?
3. What responsibilities belong to ADK, managed agent platforms, and A2A?
4. How should established SRE practices change for probabilistic behavior?
5. Which Google product claims require release-time verification?

## Durable findings

### Planning is a system operation, not only generated text

DeepMind's planning research illustrates durable distinctions among a learned model, search, a policy, a value estimate, and environment feedback. Enterprise agents rarely reproduce these algorithms directly, but the design lesson transfers: generated plans need feasibility checks, bounded search, execution feedback, and replanning.

### Tools and modalities expand both evidence and attack surface

Function calling uses typed capability descriptions and application-executed calls. Images, audio, video, and interface state can ground a task, but they also introduce ambiguous observations, larger payloads, and non-text prompt injection. A fresh observation must verify consequential state changes.

### Frameworks do not remove application responsibilities

An agent development kit can provide agents, tools, sessions, callbacks, orchestration, and telemetry hooks. A managed runtime can provide hosting and operational integration. Neither decides an application's authorization model, data policy, task-specific evaluations, or acceptable autonomy.

### Inter-agent protocols need capability and trust negotiation

A2A-style protocols address capability discovery, task exchange, status, and artifacts across agents. Durable protocol concerns include identity, authorization, version negotiation, cancellation, deadlines, idempotency, observability, and untrusted content. Protocol compatibility does not imply policy compatibility.

### SRE supplies the operational discipline

Service-level indicators, objectives, error budgets, monitoring, incident response, canaries, capacity planning, and postmortems remain relevant. Agent systems add semantic failures such as unsupported answers, wrong tool choices, and policy violations. These need sampled evaluations and quality indicators alongside conventional availability and latency metrics.

## Evolving or contested findings

- The current relationship among Gemini APIs, ADK, Vertex AI agent products, and A2A is product-specific and volatile.
- Reasoning and test-time compute tradeoffs vary by model and task.
- Agentic retrieval may improve flexible tasks but adds model calls and failure modes compared with deterministic retrieval.
- Multimodal input can improve grounding in suitable tasks but does not generally eliminate hallucination.
- Agent-to-agent protocols are evolving and do not yet settle cross-platform identity, policy, and semantics.
- Public game-playing and planning results do not directly establish enterprise-agent reliability.

## Production implications

1. Separate planning, execution, and verification in high-impact workflows.
2. Validate function arguments and multimodal inputs before execution or storage.
3. Keep framework-specific code behind stable domain interfaces.
4. Add semantic quality and safety indicators to ordinary SRE telemetry.
5. Define protocol-level identity, authorization, cancellation, and audit before connecting remote agents.
6. Load-test model quotas and long-tail latency rather than relying on average request time.
7. Use error budgets to govern releases, not to excuse known unsafe behavior.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| A generated plan is the same as search-based planning | Generated text may propose steps; explicit search and environment validation are separate mechanisms. |
| Multimodal input prevents hallucination | It provides additional evidence and introduces additional ambiguity and attacks. |
| ADK or a managed runtime is the complete application | Identity, data, policy, evaluation, and operations remain application responsibilities. |
| A2A makes independent agents trustworthy | A protocol connects systems; trust and authority require separate controls. |
| Availability is enough for an agent SLO | A fast response can still be unsupported, unsafe, or wrong. |

## Candidate primary sources

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R4-01 | DeepMind | Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model | https://www.nature.com/articles/s41586-020-03051-4 | 2020 | 2026-09-05 | Learned models, search, policy, value, and environment interaction | 2, 15 | durable |
| R4-02 | Google | Site Reliability Engineering | https://sre.google/sre-book/table-of-contents/ | 2016 | 2026-09-05 | SLOs, error budgets, monitoring, automation, and incident response | 29, 30, 35 | durable |
| R4-03 | Google | The Site Reliability Workbook | https://sre.google/workbook/table-of-contents/ | 2018 | 2026-09-05 | Practical SRE implementation and production readiness | 29, 30, 31 | durable |
| R4-04 | Google DeepMind | Gemini: A Family of Highly Capable Multimodal Models | https://arxiv.org/abs/2312.11805 | 2023 | 2026-09-05 | Multimodal model architecture and evaluation | 3, 6, 13 | evolving |
| R4-05 | Google | Gemini API function calling | https://ai.google.dev/gemini-api/docs/function-calling | updated continuously | 2026-09-05 | Current function declaration and tool-calling interface | 7, 8 | volatile |
| R4-06 | Google | Agent Development Kit documentation | https://google.github.io/adk-docs/ | updated continuously | 2026-09-05 | Current agent, tool, session, orchestration, and callback concepts | 8, 14, 17, 30 | volatile |
| R4-07 | Google | Agent Development Kit for Python repository | https://github.com/google/adk-python | updated continuously | 2026-09-05 | Versioned Python implementation and examples | 8, 14, 17 | volatile |
| R4-08 | Google Cloud | Vertex AI Agent Engine overview | https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview | updated continuously | 2026-09-05 | Current managed runtime responsibilities and integration | 28, 31 | volatile |
| R4-09 | A2A Project | Agent2Agent Protocol specification | https://a2a-protocol.org/latest/specification/ | updated continuously | 2026-09-05 | Current task, capability, message, and artifact protocol | 18 | volatile |
| R4-10 | Google | Secure AI Framework | https://saif.google/ | updated periodically | 2026-09-05 | Security risk framing across AI system lifecycle | 24, 25, 27 | evolving |

## Claims requiring release-time verification

- Current Gemini model names, tool support, context limits, regions, prices, and quotas
- Current ADK package versions, APIs, language support, and production guidance
- Current Vertex AI agent product names, release states, and service boundaries
- Current A2A specification version, governance, authentication guidance, and implementations
- Current system cards, safety filters, data handling, and monitoring integrations
- Any comparison of Gemini or Google agent products with another provider

## Recommended chapter placements

- Chapters 2 and 15: planning, policies, search, feedback, and replanning
- Chapters 7-8 and 13: tool calling and multimodal execution
- Chapters 17-18: ADK composition and A2A interoperability boundaries
- Chapters 24-27: multimodal threats and Secure AI Framework concepts
- Chapters 28-31: managed runtime choices and SRE practices
- Chapters 33-35: capacity, error budgets, canaries, and lifecycle

## Discrepancies and unresolved questions

1. Research-system success does not establish enterprise production fitness.
2. Current ADK, Vertex AI, and A2A boundaries need primary documentation reconciliation.
3. Semantic quality SLOs need sampling and evaluators whose own error is measured.
4. Cross-agent identity and authorization remain deployment-specific despite protocol progress.
5. Agentic retrieval needs fair comparison with deterministic and hybrid baselines.