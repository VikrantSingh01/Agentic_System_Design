# R6: Microsoft

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R6 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier maps durable agent-system responsibilities to Microsoft's current model, agent, data, identity, security, observability, messaging, compute, delivery, and governance services, with Python as the implementation language.

Questions:

1. What are the current names and boundaries of Microsoft's agent platform and SDKs?
2. When should a team use a managed agent service, Semantic Kernel, AutoGen or its successors, or custom Python orchestration?
3. Which Azure services implement retrieval, memory, identity, policy, messaging, observability, and deployment responsibilities?
4. Which compute option fits event-driven, containerized, or Kubernetes workloads?
5. Which product claims must be isolated from durable architecture chapters?

## Durable findings

### Separate model, runtime, framework, and application responsibilities

A model endpoint provides inference. An agent framework provides abstractions such as tools, state, orchestration, and middleware. A managed agent service may provide hosted execution, persistence, integrated tools, identity, or monitoring. The application still owns domain policy, user experience, task evaluation, data governance, and acceptable autonomy.

### Enterprise identity should replace embedded credentials

Microsoft Entra ID, managed identities, workload federation, and Azure role-based access control provide mechanisms for service and user authorization. `DefaultAzureCredential` simplifies development-to-production credential selection, but production deployments should deliberately configure credential sources and least-privilege roles.

Delegated user authority and workload identity are different. An agent must not silently replace the user's narrower permissions with a broad service identity.

### Retrieval requires permission-aware data flow

Azure AI Search can provide lexical, vector, and hybrid retrieval; Cosmos DB and other stores can persist sessions, facts, events, or vectors where appropriate. Indexing, chunking, freshness, authorization filtering, citations, retention, and deletion remain application design concerns.

### Durable work needs messaging and checkpoints

Service Bus, Event Hubs, Durable Functions, storage, and database services solve different problems. Commands and resumable work need durable delivery, idempotency, checkpoints, deadlines, and compensation. Telemetry streams are not interchangeable with command queues.

### Compute choice follows workload shape

Functions suit bounded event-driven work. Container Apps suit managed container workloads and queue-driven scaling. AKS offers greater control for complex networking, scheduling, policy, or existing Kubernetes platforms, with greater operational burden. Agent autonomy does not itself require Kubernetes.

### Observability and governance span the architecture

OpenTelemetry, Azure Monitor, and Application Insights can connect application traces, logs, metrics, dependencies, and alerts. Key Vault, private networking, Defender, Purview, content safety services, and policy controls address different risk layers. None substitutes for a task-specific threat model or evaluation program.

## Evolving or contested findings

- Microsoft Foundry and related agent product names, SDKs, service boundaries, and release states are volatile.
- Semantic Kernel, AutoGen, Microsoft Agent Framework, and Copilot Studio may overlap at some layers while targeting different users and operating models.
- Hosted agent persistence and built-in tools can reduce implementation work while increasing platform coupling and data-governance questions.
- “Memory” may refer to conversation history, retrieval indexes, database state, or learned behavior; product terminology must not replace an explicit data design.
- Current evaluation, tracing, content-safety, and governance integrations vary by service and region.

## Production implications

1. Draw separate model, runtime, tool, data, policy, identity, and control-plane boundaries.
2. Prefer managed identity and workload federation over secrets; scope each tool independently.
3. Preserve user authorization through retrieval and action paths.
4. Use queues and checkpoints for long-running work and make handlers idempotent.
5. Emit OpenTelemetry at provider-independent boundaries before adding platform exporters.
6. Choose Functions, Container Apps, or AKS from measured workload and operational requirements.
7. Keep Microsoft SDKs behind domain interfaces so volatile APIs do not dominate chapter code.
8. Verify service availability, regions, quotas, prices, data handling, and release status before publication and deployment.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| Azure OpenAI is the whole agent platform | It is a model service within a larger application architecture. |
| A framework and a managed agent service are interchangeable | They operate at different abstraction and hosting layers. |
| Managed identity means every call uses the user's permissions | Workload identity and delegated user identity must be designed separately. |
| Vector search is agent memory | It is one retrieval mechanism within a broader state and retention design. |
| Kubernetes is required for production agents | Simpler compute may provide better operations for bounded workloads. |
| Content filtering secures tool use | Tool authorization, isolation, validation, and approvals address different threats. |

## Candidate primary sources

All current product names and documentation paths require J1 and release-time verification.

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R6-01 | Microsoft | Microsoft Foundry documentation | https://learn.microsoft.com/azure/ai-foundry/ | updated continuously | 2026-09-05 | Current platform concepts, projects, models, agents, evaluation, and operations | 28, 36 | volatile |
| R6-02 | Microsoft | Foundry Agent Service overview | https://learn.microsoft.com/azure/ai-foundry/agents/overview | updated continuously | 2026-09-05 | Current hosted agent-service responsibilities and supported capabilities | 8, 28, 36 | volatile |
| R6-03 | Microsoft | Semantic Kernel repository | https://github.com/microsoft/semantic-kernel | updated continuously | 2026-09-05 | Versioned SDK abstractions, Python support, plugins, agents, and telemetry | 7, 8, 14, 17, 30, 36 | volatile |
| R6-04 | Microsoft | AutoGen repository | https://github.com/microsoft/autogen | updated continuously | 2026-09-05 | Versioned multi-agent framework, examples, and current project status | 17, 36 | volatile |
| R6-05 | Microsoft | Microsoft Agent Framework repository | https://github.com/microsoft/agent-framework | updated continuously | 2026-09-05 | Current framework scope, Python APIs, migration, and release status | 8, 14, 17, 36 | volatile |
| R6-06 | Microsoft | Azure AI Search vector search overview | https://learn.microsoft.com/azure/search/vector-search-overview | updated continuously | 2026-09-05 | Vector and hybrid retrieval concepts in Azure AI Search | 10, 11, 36 | volatile |
| R6-07 | Microsoft | Azure Identity client library for Python | https://learn.microsoft.com/python/api/overview/azure/identity-readme | updated continuously | 2026-09-05 | Python credential chain and managed identity integration | 26, 28, 36 | volatile |
| R6-08 | Microsoft | Azure Architecture Center | https://learn.microsoft.com/azure/architecture/ | updated continuously | 2026-09-05 | Cloud design patterns and workload guidance | 28, 29, 31, 34, 36 | evolving |
| R6-09 | Microsoft | Azure Well-Architected Framework | https://learn.microsoft.com/azure/well-architected/ | updated continuously | 2026-09-05 | Reliability, security, cost, operations, and performance review | 27, 29, 30, 33, 36 | evolving |
| R6-10 | Microsoft | Azure Monitor OpenTelemetry | https://learn.microsoft.com/azure/azure-monitor/app/opentelemetry-enable | updated continuously | 2026-09-05 | Current Python telemetry and Application Insights export guidance | 30, 36 | volatile |
| R6-11 | Microsoft | Azure Container Apps documentation | https://learn.microsoft.com/azure/container-apps/ | updated continuously | 2026-09-05 | Managed container hosting and event-driven scaling | 31, 36 | volatile |
| R6-12 | Microsoft | Azure Service Bus messaging documentation | https://learn.microsoft.com/azure/service-bus-messaging/ | updated continuously | 2026-09-05 | Durable queues, topics, delivery, and messaging patterns | 16, 29, 32, 36 | volatile |

## Claims requiring release-time verification

- Official Microsoft Foundry naming, service boundaries, and URL paths
- Agent Service regions, release state, tools, storage, identity, networking, quotas, and pricing
- Semantic Kernel, AutoGen, and Microsoft Agent Framework status, supported Python versions, and migration guidance
- Copilot Studio agent architecture, extensibility, licensing, and integration boundaries
- Azure OpenAI models, APIs, regions, content controls, quotas, and data handling
- Current AI Search, Cosmos DB, identity, telemetry, safety, Defender, and Purview integrations
- Current recommendations for Functions, Container Apps, AKS, API Management, GitHub Actions, Azure DevOps, Bicep, and Terraform

## Recommended chapter placements

- Chapters 6-8: model endpoints, tools, framework boundaries, and runtime choices
- Chapters 10-12: Azure AI Search, Cosmos DB, permission-aware retrieval, and state
- Chapters 16-18: durable messaging, orchestration, and interoperability
- Chapters 24-27: Entra ID, Key Vault, network boundaries, safety, Defender, and Purview
- Chapters 28-32: Azure reference architecture, reliability, telemetry, deployment, and data
- Chapters 33-36: cost, regions, lifecycle, and complete Northstar mapping

## Discrepancies and unresolved questions

1. Current Microsoft naming must be reconciled across Learn, SDK packages, portals, and repositories.
2. Framework overlap should be explained by responsibility and operating model, not by declaring one universal successor.
3. Delegated-user identity patterns through agent tools need explicit end-to-end examples.
4. Hosted persistence needs verified retention, residency, deletion, backup, and export semantics.
5. Service-specific observability must be mapped to one provider-independent trace model.
6. Microsoft service comparisons require current regional, pricing, quota, and support evidence.