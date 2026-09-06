# R7: Amazon

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R7 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers AWS public guidance relevant to managed agent runtimes, open-source agent SDKs, identity, action boundaries, memory, observability, serverless execution, durable workflows, and Well-Architected operations.

Questions:

1. Which responsibilities belong to Bedrock Agents, AgentCore, Strands Agents, or custom orchestration?
2. How do IAM and action definitions bound an agent's authority?
3. Which AWS services support synchronous, asynchronous, and long-running agent work?
4. How should teams evaluate managed convenience against platform coupling?
5. Which AWS features, status labels, limits, and prices require release-time verification?

## Durable findings

### Managed runtimes and SDKs occupy different layers

A managed agent platform may provide sessions, tools, identity integration, memory, observability, or isolated execution. An SDK can provide an application-level loop and integrations. Custom orchestration provides more control and more operational responsibility. Product choice should follow requirements for state, authority, portability, and operations rather than the word “agent.”

### IAM is part of tool design

Agent actions should execute under explicit principals with least-privilege policies. Model instructions and tool schemas do not replace IAM authorization. Workload roles, delegated user context, resource policies, network boundaries, and audit trails must agree on whose authority an action uses.

### Tool contracts should expose bounded actions

OpenAPI or function schemas can describe action inputs and outputs. Production tools also need domain validation, idempotency, timeouts, retries, result limits, and compensating actions. Code execution and browser use require additional isolation and egress controls.

### Event-driven services support durable agent work

Queues, event buses, workflow services, functions, and containers address different execution needs. Long-running tasks should be decomposed into resumable steps with durable state and explicit deadlines. A synchronous model stream is not a durable workflow by itself.

### Well-Architected principles transfer to agents

Operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability remain relevant. Agent systems add semantic quality, tool authority, token and step budgets, and adversarial input to the review.

## Evolving or contested findings

- Current boundaries among Bedrock Agents, Bedrock AgentCore, Strands Agents, and related AWS services are volatile.
- Managed memory features can reduce implementation work but do not remove retention, deletion, relevance, or privacy decisions.
- Built-in evaluation and observability features vary in scope and cannot replace task-specific release gates.
- Serverless services can scale execution while downstream model, retrieval, and tool quotas remain bottlenecks.
- Current browser and code-execution services need direct verification of isolation, networking, and lifecycle guarantees.

## Production implications

1. Assign a least-privilege execution role to each tool or bounded capability.
2. Preserve delegated user authorization where the action depends on user access.
3. Externalize durable checkpoints for tasks that must survive process or session loss.
4. Design stream consumers for cancellation, partial output, retries, and duplicate events.
5. Include model calls, retrieval, memory, tools, telemetry, and idle capacity in cost estimates.
6. Test service quotas and downstream throttling under realistic concurrency.
7. Keep AWS product APIs behind stable domain interfaces and pin SDK versions.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| A managed agent service solves the whole application | Domain policy, evaluation, data, user experience, and operations remain application concerns. |
| An action schema authorizes an action | IAM and application policy decide whether execution is allowed. |
| Serverless means unlimited scale | Every model, data store, tool, and account has quotas and backpressure. |
| A streaming response is durable execution | Durability requires persisted state, retries, idempotency, and recovery. |
| Managed memory knows what should be remembered | Retention, relevance, consent, and deletion need explicit policy. |
| Cloud-native means provider-specific business logic is harmless | Product churn can make tightly coupled agent designs expensive to migrate. |

## Candidate primary sources

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R7-01 | AWS | Amazon Bedrock Agents user guide | https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html | updated continuously | 2026-09-05 | Current managed-agent concepts, action groups, sessions, and traces | 7, 8, 28, 30 | volatile |
| R7-02 | AWS | Amazon Bedrock AgentCore developer guide | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html | updated continuously | 2026-09-05 | Current AgentCore components and service boundaries | 8, 12, 25, 28, 30 | volatile |
| R7-03 | AWS | Strands Agents SDK for Python | https://github.com/strands-agents/sdk-python | updated continuously | 2026-09-05 | Current open-source Python agent-loop and tool abstractions | 7, 8, 14 | volatile |
| R7-04 | AWS | AWS Well-Architected Framework | https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | updated periodically | 2026-09-05 | Cloud architecture review pillars and tradeoffs | 27, 29, 30, 33 | evolving |
| R7-05 | AWS | Generative AI Lens | https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html | updated periodically | 2026-09-05 | Generative AI workload design questions and practices | 24, 27, 28, 29, 33 | evolving |
| R7-06 | AWS | Security in Amazon Bedrock | https://docs.aws.amazon.com/bedrock/latest/userguide/security.html | updated continuously | 2026-09-05 | Current IAM, data protection, network, and monitoring guidance | 24, 25, 26 | volatile |
| R7-07 | AWS | AWS Step Functions Developer Guide | https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html | updated continuously | 2026-09-05 | Durable workflow, retries, service integration, and execution history | 16, 29, 31 | evolving |
| R7-08 | AWS | Amazon EventBridge documentation | https://docs.aws.amazon.com/eventbridge/ | updated continuously | 2026-09-05 | Event routing and event-driven integration | 16, 28, 32 | volatile |

## Claims requiring release-time verification

- Current status, regions, pricing, quotas, and boundaries of Bedrock Agents and AgentCore
- Current Strands Agents ownership, releases, Python support, and production guidance
- Current managed memory, browser, code execution, identity, evaluation, and observability capabilities
- Current supported models, tool interfaces, session semantics, and trace contents
- Current IAM, network isolation, encryption, retention, and data-residency behavior
- Any migration or deprecation statement about an AWS agent product

## Recommended chapter placements

- Chapters 7-8: action groups, Python SDK loops, and managed runtime boundaries
- Chapters 12 and 16: memory policy, sessions, checkpoints, and durable workflows
- Chapters 24-26: IAM, delegated authority, isolation, and data protection
- Chapters 28-33: managed architecture, reliability, observability, deployment, quotas, and economics
- Chapter 36: cross-cloud architectural comparison, not Microsoft implementation guidance

## Discrepancies and unresolved questions

1. Current product documentation must establish the relationship among Bedrock Agents, AgentCore, and Strands.
2. Managed session and memory guarantees need verification for retention, deletion, export, and recovery.
3. Current evaluation features need comparison with application-owned evaluation sets and graders.
4. Browser and code execution require explicit evidence for sandbox and network controls.
5. Cost and quota guidance needs reproducible workload measurements rather than list prices alone.