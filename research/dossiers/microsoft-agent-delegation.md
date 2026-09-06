# Candidate Research Dossier: Microsoft Agent-to-Agent Delegation Architecture

**Scope:** How a central Microsoft Copilot-style orchestrator can discover, select, call, delegate to, and receive results from specialist agents, plus defensive testing of that delegation surface.
**Freeze date:** 2026-09-05
**Last verified:** 2026-09-06
**Maintenance:** This is a living dossier. Every statement about a Microsoft product, API, SDK, release status, region, quota, price, license, service boundary, data behavior, or supported feature is a **VOLATILE PRODUCT CLAIM**. Re-verify it against the cited primary source within 30 days before using it in chapter prose.

> **Approval boundary:** The `C-01` through `C-20` markers are local candidate references, not
> approved source-ledger IDs. This dossier is research input for Chapters 17, 18, and 36. It
> must not expand Chapter 36's approved Microsoft source scope without a separate source-editor
> review and an update to `research/source-ledger.csv`.

## 0. Explain it to a child

Think of the central agent as a school receptionist. It does not solve every problem itself: it sends a math question to the math teacher and a computer problem to the IT teacher. It should show each teacher only the part of your permission slip they need. This dossier explains which Microsoft "phone lines" connect the receptionist to specialists, how everyone proves who they are, and how testers make sure no specialist sees secrets or does something the child was not allowed to request.

## 1. Dated status matrix

| Component | Child-friendly meaning | Status at freeze date | Source | Source date / update | Freshness | Confidence |
|---|---|---|---|---|---|---|
| Microsoft Foundry (formerly Azure AI Foundry) | A factory for code-first AI apps and agents | Current brand | [C-01] | 2026-08-19 / 2026-08-27 | volatile | high |
| Foundry Agent Service | Managed hosting and runtime for agents | Core hosted agent runtime documented as GA; verify each subfeature separately | [C-01] | 2026-08-19 / 2026-08-27 | volatile | high |
| Foundry Toolboxes | A governed shared toolbox exposed through one managed MCP endpoint | Documented Agent Service component; exact release status unresolved | [C-01] | 2026-08-19 / 2026-08-27 | volatile | medium |
| Foundry agent identity | An Entra ID badge created for each agent | GA | [C-02] | 2026-08-21 / 2026-08-25 | volatile | high |
| Copilot Studio Connected agents | One low-code agent hands a turn to another | Documented as GA only for Copilot Studio-to-Copilot Studio delegation; cross-vendor A2A is unresolved | [C-03] | 2026-06-23 / 2026-08-27 | volatile | high |
| Copilot Studio A2A/Foundry/Fabric integration | Bridges to agents outside Copilot Studio | UNRESOLVED; do not use as a chapter fact | [C-04] | accessed 2026-09-06 | volatile | low |
| Semantic Kernel | Microsoft's earlier open-source orchestration SDK | Educational reference only; current production positioning is unresolved | [C-05] | 2023-07-11 / 2024-06-24 | durable-but-stale | low |
| Microsoft Agent Framework | Current agents and graph-workflow SDK | .NET and Python documented as GA; Go status unresolved in the cited source | [C-06] | 2026-07-29 / 2026-08-25 | volatile | medium-high |
| MCP | Open standard connecting agents to tools and data | GA/evolving industry standard; not Microsoft-owned | [C-07] | snapshot 2026-07-28 | evolving | high |
| A2A | Open standard connecting independent agents | Published specification; Linux Foundation governed; Microsoft is a TSC member | [C-08] | accessed 2026-09-06 | evolving | high |
| Microsoft Agent 365 | Tenant-wide registry and control plane for agents | GA | [C-09], [C-10] | 2026-08-19 / 2026-08-20 | volatile | high |
| Entra Agent ID | A special Entra identity for an AI agent | GA; every new Copilot Studio agent gets one automatically since July 2026 | [C-11] | 2026-08-18 / 2026-08-20 | volatile | high |
| Entra ID Protection for agents | Detects risky agent identities | Capability documented; release status and licensing are unresolved for chapter use | [C-12] | 2026-06-17 | volatile | medium |
| Conditional Access for agents | Rules controlling which agent tokens may be issued | Capability documented; release status, prerequisites, and licensing are unresolved for chapter use | [C-13] | 2026-06-19 / 2026-07-01 | volatile | medium |
| Purview for Agent 365 | Audit, DLP, labels, and AI observability | Auditing GA; coverage varies by capability | [C-14] | 2026-05-01 / 2026-06-25 | volatile | high |
| Foundry network isolation | Private endpoints and network allow/deny controls | GA | [C-15] | 2026-08-14 / 2026-08-26 | volatile | high |
| Power Platform data policies | Rules classifying or blocking connectors | GA, long-standing | [C-16] | 2026-04-07 / 2026-08-14 | evolving | high |
| Prompt Shields | Detects direct prompt attacks and indirect document attacks | GA | [C-17] | 2025-11-21 / 2026-06-05 | evolving | high |
| PyRIT | Microsoft's open-source generative-AI red-team framework | Available open source | [C-18] | continuously updated | volatile | medium |

## 2. Agents/A2A are not tools/MCP/connectors

> "MCP is for agent-to-tool communication"; "A2A is for agent-to-agent communication." A2A also does not define how an agent talks to its own subagents or invokes tools. Use framework-native primitives or MCP for those jobs. [C-08]

**Explain it to a child:** MCP plugs the receptionist into a calculator, filing cabinet, or search box. A2A lets the receptionist ask another receptionist-like specialist to think, plan, and return a result.

- **Agent/A2A:** The callee has its own reasoning loop, instructions, opaque state, and possibly its own delegates. The caller gives it a task rather than prescribing each operation.
- **Tool/MCP:** The callee performs a bounded operation or returns data. A rich tool may look clever, but it is governed as a capability rather than as an independent reasoning peer.
- **Connectors:** Power Platform connectors and Foundry tools sit mainly on the tool/data side. They expose APIs and resources; they do not become peer agents merely because an agent calls them.
- **Connected agents:** **VOLATILE PRODUCT CLAIM:** Copilot Studio's feature is agent-to-agent in spirit, but the cited native feature connects only Copilot Studio-built agents [C-03]. It is not evidence of a general cross-vendor A2A bridge.

| Diagnostic question | Tool/MCP-shaped | Agent/A2A-shaped |
|---|---|---|
| Does the callee execute a fixed capability or run its own reasoning? | Fixed capability | Own reasoning |
| Is its internal state intentionally opaque? | Usually simple or exposed | Yes |
| Can it independently delegate again? | Unusual | Expected possibility |

## 3. Reference architectures

### 3.1 Low-code: Copilot Studio Connected agents

**Explain it to a child:** The front-desk agent reads the question, chooses the right specialist, passes along only the useful conversation, and relays the answer.

```mermaid
flowchart LR
    U[User] --> P[Primary Copilot Studio agent]
    P --> R{Specialist domain match?}
    R -->|No| P
    R -->|Yes| S[Connected Copilot Studio agent]
    S -->|Result| P
    P --> U
```

**VOLATILE PRODUCT CLAIMS:** The following mechanics require fresh verification against [C-03]
and [C-19] before chapter use:

1. The primary agent's orchestration runtime compares each message with connected agents' declared domains.
2. The specialist runs in its own orchestration context with its own instructions, knowledge, and tools.
3. The primary sends the user message and relevant conversation history. History forwarding is therefore a data-minimization control point and should default off unless needed.
4. The verified native feature connects only Copilot Studio agents. Foundry, Fabric, or external agents need another bridge, such as the relevant connect tool or A2A integration, whose current status must be checked.

### 3.2 Code-first: Foundry Agent Service + Agent Framework

**Explain it to a child:** Developers build the receptionist and specialists in code. Entra checks every badge at every doorway; MCP opens toolboxes, while A2A calls independent specialists.

```mermaid
flowchart TB
    U[User] --> O[Orchestrator<br/>Agent Framework]
    O -->|MCP / tool call| T[Foundry Toolbox]
    O -->|A2A task| S1[Foundry specialist]
    O -->|A2A task| S2[External A2A specialist]
    S1 --> O
    S2 --> O
    O --> U
    E[Entra: identity, CA, risk] -.governs.-> O
    P[Purview: audit, DLP] -.observes.-> O
```

- **VOLATILE PRODUCT CLAIM:** Foundry documents an identity blueprint, per-agent Entra identities, and a four-stage OAuth 2.0 token exchange for tool calls [C-02].
- **VOLATILE PRODUCT CLAIM:** Agent Service presents runtime, toolboxes, models, observability, optimization, identity/security, and publishing as product pillars [C-01].
- **VOLATILE PRODUCT CLAIM:** Agent Framework documents Agents, Harness Agent, Workflows, and Integrations for .NET and Python. The cited source does not establish Go release status [C-06].
- Use A2A only for independent peers. Use native framework primitives for tightly coupled subagents and MCP for tools.

## 4. Identity, governance, and defensive testing

### 4.1 Identity and authorization

- **On-Behalf-Of (OBO):** A middle tier exchanges a user token for a downstream token. OBO uses delegated scopes, not application roles, preventing the user from inheriting the middle tier's broader privileges [C-20].
- **Agent identity:** Give each agent a distinct Entra identity rather than sharing a generic service principal. This supports inventory, policy, and tool authentication [C-02].
- **Conditional Access:** Evaluate both token **subject** and **audience** across delegated, application-only, and agent-account scenarios [C-13].
- **Shared vs individual authentication:** Shared credentials are convenient but create confused-deputy risk. Prefer individual/OAuth-passthrough authentication when user permissions must survive a hop; re-verify exact Foundry A2A product wording before publication.
- **Risk attribution nuance:** Entra attributes risky OBO activity to the user rather than disabling the agent for everyone [C-12]. This helps remediation but is not itself a preventive control.

### 4.2 Governance and audit

- **VOLATILE PRODUCT CLAIM:** Purview documentation describes capture of prompts, responses, referenced files, and sensitivity labels; documented coverage varies by capability [C-14].
- **VOLATILE PRODUCT CLAIM:** Agent 365 documentation describes registry, Entra identity, Purview, and Defender as parts of a cross-product control plane [C-09], [C-10].
- Licensing requirements for ID Protection, Conditional Access, Agent 365, and related network controls are unresolved. Do not state them in chapter prose without current official licensing sources.
- **VOLATILE PRODUCT CLAIM:** Foundry Toolboxes and Power Platform data policies are candidate controls for tool credentials, policy, and connector classification [C-01], [C-16].

### 4.3 Security test matrix

**Explain it to a child:** Do not merely check that locks exist. Try the wrong keys, duplicate permission slips, hidden instructions, and secret notes, then prove every lock and alarm responds correctly.

Every Microsoft control named in this matrix is a **VOLATILE PRODUCT CLAIM** and requires fresh
verification. The adversarial test ideas remain useful even when a product mapping changes.

| Test area | Platform control to verify | Required adversarial test |
|---|---|---|
| Identity/OBO boundary | Delegated-scope-only OBO [C-20]; Entra agent exchange [C-02] | A Resource X token must fail against Resource Y even if the delegate app has broader permissions; reject wrong audiences |
| Cross-agent authorization | Individual/OAuth passthrough where supported | Direct and delegated specialist access must enforce identical rights; inventory every shared-auth exception |
| Confused deputy | CA subject/audience model [C-13] and OBO scope restrictions [C-20] | Ask the orchestrator to misuse a specialist's broader identity for an unauthorized user; expect denial |
| Delegated prompt injection | Prompt Shields distinguishes user-prompt and document attacks [C-17] | Pass a canary instruction through a hostile specialist; sanitize every specialist response/tool result before trust |
| Data minimization/exfiltration | History control [C-19], Purview DLP/audit [C-14] | Plant a canary secret; prove it never reaches unnecessary agents or blocked connectors |
| Tenant isolation | Foundry private endpoint, public-network flag, and IP allow-list [C-15] | Attempt cross-environment and cross-tenant calls; require network-layer rejection |
| Tool permissions | Governed Toolbox [C-01] and connector classification [C-16] | Enumerate reachable tools per agent; test least privilege and shared-credential revocation |
| Replay/idempotency | No native Microsoft guarantee found | Replay captured tasks, race duplicate requests, and require application-layer idempotency for consequential actions |
| Approval bypass | Framework/workflow human-in-the-loop patterns | Call the underlying API directly; authorization, not only UI workflow, must enforce approval |
| Audit evidence | Purview audit [C-14] and Entra risk/sign-in logs [C-12] | Correlate one transaction across 3+ agents/tools and verify record integrity/retention |
| Synthetic red team | PyRIT [C-18] | Build a hostile-specialist test double for injection, replay, exfiltration, and approval-bypass cases |
| Regression | No product replaces a regression process | Re-run on auth, shared-tool, protocol, or preview-to-GA changes; keep confused-deputy and replay tests permanently |

## 5. Decision matrix

| Need | Recommended path | Why | Main caveat |
|---|---|---|---|
| Business-authored specialists, all in Copilot Studio | Copilot Studio Connected agents | Lowest code; native routing and history control [C-19] | Verified native scope is Copilot Studio agents only [C-03] |
| Developer-owned specialists with per-user authorization | Foundry Agent Service + Agent Framework; individual/OAuth-passthrough A2A | Candidate path for identity, RBAC, and token-exchange control [C-02] | Re-check each integration's release and auth status |
| Cross-vendor independent agents | Linux Foundation A2A | Vendor-neutral agent delegation [C-08] | Build replay/idempotency and consequential-action safeguards |
| External data or fixed capability, no peer reasoning | MCP or connector, not A2A | Correct tool/data abstraction [C-07], [C-08] | Governance differs from peer-agent delegation |
| Tenant-wide discovery, risk, and compliance | Agent 365 + Entra Agent ID + Purview | Candidate cross-product registry, identity, and audit path [C-09], [C-10] | Availability and prerequisites require fresh verification |

## 6. Explicit unknowns

Do not silently convert these into facts:

1. The exact current retirement date/status of Foundry Workflows. A prior pass reported 2026-12-01; the current overview omits Workflows but does not prove retirement [C-01].
2. Whether classic Foundry "Connected Agents," distinct from Copilot Studio Connected agents, is removed or renamed.
3. Whether Copilot Studio A2A/Foundry/Fabric connect tools inherit reported text-only or no-streaming limitations.
4. No documented Microsoft replay window or idempotency-key mechanism was found for A2A tasks or Copilot Studio connected-agent calls.
5. The exact GA/preview split for tracing prompt, hosted, workflow, and external A2A agents.
6. Cross-agent cost and latency attribution.
7. Current Foundry RBAC role names; the guessed page returned 404, so fetch the role page linked from [C-02] before naming roles.
8. Exact current wording and defaults for shared versus individual/OAuth-passthrough Foundry A2A authentication.
9. Current licensing and service-plan prerequisites for ID Protection, Conditional Access,
   Agent 365, Purview, and related network controls.

## 7. Phased PoC-to-production plan

1. **Scope:** Choose one low-risk delegation and write its inputs, outputs, timeout, retry, and prohibited actions in plain language.
2. **Low-code PoC:** Build one primary and one specialist in Copilot Studio. Disable history forwarding by default.
3. **Identity hardening:** Confirm Entra Agent IDs and evaluate Conditional Access after verifying current availability, prerequisites, and licensing [C-11], [C-13].
4. **Code-first comparison:** Rebuild the flow with Foundry and Agent Framework; compare individual and shared authentication empirically.
5. **Security pass:** Run every row in Section 4.3, fixing supported-but-misconfigured controls first.
6. **Governance:** Register all agents and enable Purview auditing/DLP [C-09], [C-14].
7. **Custom controls:** Add idempotency, delegated-content inspection, end-to-end correlation, and authorization-layer approvals.
8. **Red team:** Exercise the hostile-specialist test double with PyRIT or equivalent [C-18]; fix and repeat.
9. **Staged rollout:** Start with a small group and actively monitor Entra and Purview signals.
10. **Production:** Automate regressions and trigger them for every relevant Copilot Studio, Foundry, Agent Framework, Entra, tool, or auth change.

## 8. Recommended chapter placement

- **Chapter 17: Multi-Agent Systems:** Put task contracts, capability discovery, routing, retries, human approval, the generalized reference architectures, and the agent/tool boundary here.
- **Chapter 18: Interoperability Protocols:** Put MCP, A2A, Linux Foundation governance, discovery/task/result mechanics, and "what A2A is not" here [C-08].
- **Chapter 36: Northstar on the Microsoft Stack:** Treat the dated matrix and Microsoft mappings only as candidate research. Apply the chapter's approved-source scope and 30-day re-verification gate before using any claim.
- Cross-reference Section 4.3 from the security/governance module when drafted.

## 9. Candidate primary-source register

Every local claim marker above resolves to a candidate primary source. These entries are not part
of `research/source-ledger.csv`. Dates are `ms.date / updated_at` where both were available.

| ID | Publisher | Primary source | Source date / update | Accessed | Freshness | Confidence |
|---|---|---|---|---|---|---|
| C-01 | Microsoft Learn | [What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) | 2026-08-19 / 2026-08-27 | 2026-09-06 | volatile | high |
| C-02 | Microsoft Learn | [Agent identity concepts in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity) | 2026-08-21 / 2026-08-25 | 2026-09-06 | volatile | high |
| C-03 | Microsoft Learn | [Add other agents to an agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents) | 2026-06-23 / 2026-08-27 | 2026-09-06 | volatile | high |
| C-04 | Microsoft Learn | [Copilot Studio documentation table of contents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/toc.json) | structural document | 2026-09-06 | volatile | medium |
| C-05 | Microsoft Learn | [Introduction to Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/) | 2023-07-11 / 2024-06-24 | 2026-09-06 | durable-but-stale | medium |
| C-06 | Microsoft Learn | [Microsoft Agent Framework overview](https://learn.microsoft.com/en-us/agent-framework/overview/) | 2026-07-29 / 2026-08-25 | 2026-09-06 | volatile | high |
| C-07 | MCP project | [What is the Model Context Protocol?](https://modelcontextprotocol.io/docs/getting-started/intro) | snapshot 2026-07-28 | 2026-09-06 | evolving | high |
| C-08 | A2A project / Linux Foundation | [A2A Protocol documentation](https://a2a-protocol.org/latest/) | living site | 2026-09-06 | evolving | high |
| C-09 | Microsoft Learn | [Microsoft Agents documentation hub](https://learn.microsoft.com/en-us/agents/) | 2026-08-19 / 2026-08-19 | 2026-09-06 | volatile | high |
| C-10 | Microsoft Learn | [Microsoft Agent 365 overview](https://learn.microsoft.com/en-us/microsoft-agent-365/overview) | 2026-08-19 / 2026-08-20 | 2026-09-06 | volatile | high |
| C-11 | Microsoft Learn | [What's new in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new) | 2026-08-18 / 2026-08-20 | 2026-09-06 | volatile | high |
| C-12 | Microsoft Learn | [ID Protection for agents](https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents) | 2026-06-17 | 2026-09-06 | volatile | high |
| C-13 | Microsoft Learn | [Conditional Access for agents](https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id) | 2026-06-19 / 2026-07-01 | 2026-09-06 | volatile | high |
| C-14 | Microsoft Learn | [Use Purview to manage Agent 365 data security and compliance](https://learn.microsoft.com/en-us/purview/ai-agent-365) | 2026-05-01 / 2026-06-25 | 2026-09-06 | volatile | high |
| C-15 | Microsoft Learn | [Configure network isolation for Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/configure-private-link) | 2026-08-14 / 2026-08-26 | 2026-09-06 | volatile | high |
| C-16 | Microsoft Learn | [Power Platform data policies](https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention) | 2026-04-07 / 2026-08-14 | 2026-09-06 | evolving | high |
| C-17 | Microsoft Learn | [Prompt Shields](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection) | 2025-11-21 / 2026-06-05 | 2026-09-06 | evolving | high |
| C-18 | Microsoft / GitHub | [PyRIT](https://github.com/Azure/PyRIT) | continuously updated | 2026-09-06 | volatile | medium |
| C-19 | Microsoft Learn | [Connected-agent mechanics](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents) | 2026-06-23 / 2026-08-27 | 2026-09-06 | volatile | high |
| C-20 | Microsoft Learn | [OAuth 2.0 On-Behalf-Of flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow) | 2025-01-04 / 2026-06-15 | 2026-09-06 | evolving | high |

### Research gaps recorded during validation

- Foundry Workflows retirement, classic Foundry Connected Agents removal, current RBAC role names, and exact A2A authentication-mode wording remain deliberately unverified claims.
- No primary Microsoft documentation for A2A/Connected-agent replay or idempotency semantics was found.
- A guessed Defender runtime-protection page and guessed Foundry RBAC page returned 404; neither is cited as evidence.
