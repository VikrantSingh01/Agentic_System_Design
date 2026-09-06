# Multi-agent invocation: evidence and protocol dossier

> **Research freeze / access date:** 2026-09-06  
> **Scope:** multi-agent invocation, delegation, handoffs, debate, lifecycle, interoperability, and security.  
> **Reading rule:** “Multi-agent” is an architectural option to evaluate, not a maturity level. A protocol enables communication; it does not confer trust, authority, correctness, or production fitness.

## Executive findings

1. Classical multi-agent systems (MAS) research supplies durable concepts—autonomy, social ability, commitments, coordination, contracts, and organizational roles—but does **not** show that adding LLM agents generally improves outcomes.
2. Modern LLM systems such as CAMEL, AutoGen, MetaGPT, ChatDev, AgentVerse, and Generative Agents demonstrate useful patterns and research environments. Their results are task-, model-, prompt-, and benchmark-dependent; most do not isolate every gain from extra inference compute, role prompting, or workflow scaffolding.
3. Multi-agent debate can improve some reasoning and factuality benchmarks, but agreement is not verification. Correlated model errors, judge bias, extra tokens, longer latency, and adversarial persuasion limit the result.
4. A handoff should transfer a typed task, minimum context, delegated authority, budget, deadline, and result contract. OpenAI Swarm is a clear historical implementation example, but its repository says it is experimental/educational and replaced by the OpenAI Agents SDK; it is not a standard.
5. A2A 1.0.0 is an agent-to-independent-agent interoperability specification. MCP 2025-11-25 primarily connects hosts/clients to tools, resources, and prompts. MCP Tasks is a separately versioned extension for asynchronous work. Skills over MCP remains experimental work around SEP-2640 and explicitly is not yet an official MCP specification.
6. The durable caller must own routing policy, authority attenuation, fan-out/depth limits, task mappings, cancellation, joins, validation, audit, and fallback. Remote cards, messages, artifacts, tool results, and skill instructions remain untrusted data.

## What “invocation” means

An invocation is more than a model call. It is a lifecycle:

1. **Admit:** authenticate the requester; validate tenant, purpose, and budget.
2. **Discover:** find a capability from a pinned registry or allowlisted endpoint. Discovery advertises; it does not authorize.
3. **Select:** choose the simplest eligible executor using policy and measured evidence.
4. **Delegate:** create a typed task and attenuate authority to the intersection of requester permission, coordinator permission, and worker maximum.
5. **Execute:** enforce deadline, token/tool/cost budget, depth, fan-out, egress, and idempotency.
6. **Observe:** receive bounded progress while keeping local and remote task IDs distinct.
7. **Cancel or recover:** authenticate and authorize cancellation; treat it as a race, not rollback; retry only classified transient failures.
8. **Validate:** check schema, provenance, citations, policy, malware/content limits, and conflicts. Never use a vote as the sole truth test.
9. **Commit:** require approval for consequential effects and use an idempotency key.
10. **Terminate:** record a named terminal state, release resources, apply retention, and invoke a same-interface fallback when needed.

## Evidence base

### Classical foundations

| Claim supported | Source metadata and official URL | Evidence strength | Limitations, freshness, confidence |
|---|---|---|---|
| Agents are commonly characterized by autonomy, social ability, reactivity, and pro-activeness; “social ability” is not evidence that more agents are better. | Michael Wooldridge and Nicholas R. Jennings, **“Intelligent Agents: Theory and Practice,”** *The Knowledge Engineering Review* 10(2), Cambridge University Press, 1995. DOI: [10.1017/S0269888900008122](https://doi.org/10.1017/S0269888900008122). | Strong conceptual, peer-reviewed survey. | Predates LLMs and modern cloud threat models. Foundational rather than empirical for LLM orchestration. Freshness: historical. Confidence: high. |
| Distributed work can be allocated through announcement, bidding, award, and reporting—a precursor to supervisor/worker task contracts. | Reid G. Smith, **“The Contract Net Protocol: High-Level Communication and Control in a Distributed Problem Solver,”** *IEEE Transactions on Computers* C-29(12), IEEE, 1980. DOI: [10.1109/TC.1980.1675516](https://doi.org/10.1109/TC.1980.1675516). | Strong historical, peer-reviewed systems contribution. | Assumes symbolic distributed problem solvers, not probabilistic text agents or untrusted prompt content. Freshness: historical. Confidence: high. |
| Rational-agent coordination benefits from explicit beliefs, desires/goals, intentions, and commitment strategies. | Anand S. Rao and Michael P. Georgeff, **“BDI Agents: From Theory to Practice,”** Proceedings of ICMAS, 1995. Official PDF: [AAAI](https://cdn.aaai.org/ICMAS/1995/ICMAS95-042.pdf). No DOI verified for this proceedings paper. | Strong foundational formal/architectural evidence. | Does not validate current LLM implementations. Freshness: historical. Confidence: high. |
| Agent communication benefits from explicit performatives and interaction protocols. | Foundation for Intelligent Physical Agents, **FIPA ACL Message Structure Specification** and interaction specifications, FIPA/IEEE Computer Society, 2002. Official specification index: [FIPA specifications](http://www.fipa.org/repository/standardspecs.html). | Normative historical specification. | Older semantics and transport assumptions; not a current authorization or LLM-safety standard. HTTP-only access may be blocked in some environments. Freshness: historical/frozen. Confidence: high on scope. |
| Complex behavior can emerge from interacting specialized processes. | Marvin Minsky, **The Society of Mind**, Simon & Schuster, 1986. Official publisher page: [Simon & Schuster](https://www.simonandschuster.com/books/The-Society-of-Mind/Marvin-Minsky/9780671657130). | Influential conceptual foundation. | A theory/metaphor, not controlled evidence for multi-LLM accuracy or economics. Freshness: historical. Confidence: high on bibliographic claim, low as operational evidence. |

### Verified modern LLM multi-agent work

| Claim supported | Source metadata and official URL | Evidence strength | Limitations, freshness, confidence |
|---|---|---|---|
| Role-playing prompts can sustain cooperation between two communicative agents on generated tasks. | Guohao Li et al., **“CAMEL: Communicative Agents for ‘Mind’ Exploration of Large Scale Language Model Society,”** NeurIPS 2023; arXiv: [2303.17760](https://arxiv.org/abs/2303.17760). | Peer-reviewed conference paper plus released methodology. | Primarily demonstrates a framework and role-playing behavior; synthetic tasks and self-inception do not establish production superiority. Freshness: 2023. Confidence: high. |
| A conversation-centric framework can compose customizable agents, tools, humans, and execution into multi-agent applications. | Qingyun Wu et al., **“AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation,”** Microsoft Research, 2023; arXiv: [2308.08155](https://arxiv.org/abs/2308.08155). Official project: [Microsoft AutoGen](https://www.microsoft.com/en-us/research/project/autogen/). | Strong framework paper with case studies and open implementation. | Case studies are not a universal causal comparison against equally budgeted single-agent workflows; APIs and project architecture evolve. Freshness: 2023 paper, live project. Confidence: high on framework claims; medium on general advantage. |
| Software-process roles and structured intermediate artifacts can organize LLM-based software generation. | Sirui Hong et al., **“MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework,”** ICLR 2024; arXiv: [2308.00352](https://arxiv.org/abs/2308.00352). | Peer-reviewed conference evidence with benchmark evaluation. | Gains combine role prompts, workflow/SOP scaffolding, artifacts, and additional calls; generated-repository benchmarks do not cover secure maintenance. Freshness: 2024. Confidence: high on reported experiments, medium on transfer. |
| A staged “software company” conversation can generate software through specialized roles. | Chen Qian et al., **“ChatDev: Communicative Agents for Software Development,”** ACL 2024; ACL Anthology: [2024.acl-long.810](https://aclanthology.org/2024.acl-long.810/); arXiv: [2307.07924](https://arxiv.org/abs/2307.07924). DOI: [10.18653/v1/2024.acl-long.810](https://doi.org/10.18653/v1/2024.acl-long.810). | Peer-reviewed full paper and reproducible framework. | Small generated applications and evaluator choices limit conclusions about production correctness, security, maintainability, and cost. Freshness: 2024. Confidence: high on paper results, medium on external validity. |
| Dynamic recruitment and multi-stage collaboration can be studied in a configurable multi-agent framework. | Weize Chen et al., **“AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors,”** ICLR 2024; arXiv: [2308.10848](https://arxiv.org/abs/2308.10848). | Peer-reviewed framework and experiments. | “Emergent” behavior is scenario-dependent; comparisons can confound topology, prompt, model, and inference budget. Freshness: 2024. Confidence: high on reported setup, medium on broad conclusions. |
| Memory, reflection, and planning can produce believable social simulations among many generative agents. | Joon Sung Park et al., **“Generative Agents: Interactive Simulacra of Human Behavior,”** UIST 2023; arXiv: [2304.03442](https://arxiv.org/abs/2304.03442); DOI: [10.1145/3586183.3606763](https://doi.org/10.1145/3586183.3606763). | Peer-reviewed HCI study with ablations and human evaluation. | Believability in a sandbox is not task correctness, secure delegation, or business value. Freshness: 2023. Confidence: high on study, low for invocation-performance claims. |

**Synthesis:** these papers verify that multiple role-conditioned model instances can be orchestrated and can be useful in selected evaluations. They do not establish “more agents ⇒ better.” Any adoption claim must compare the same task, inputs, output contract, model access, evaluation rubric, and preferably equalized inference budget against a deterministic workflow and one bounded agent.

## Multi-agent debate: evidence and limits

### Evidence

- Yilun Du et al., **“Improving Factuality and Reasoning in Language Models through Multiagent Debate,”** 2023, arXiv: [2305.14325](https://arxiv.org/abs/2305.14325), reports improvements on selected arithmetic and factuality tasks when multiple model instances propose and critique answers. Evidence strength: direct controlled benchmark experiments. Limitations: preprint, selected models/tasks, additional inference compute, and no guarantee that consensus is correct. Freshness: 2023. Confidence: high on reported results, medium on generalization.
- Chi-Min Chan et al., **“ChatEval: Towards Better LLM-based Evaluators through Multi-Agent Debate,”** ICLR 2024, arXiv: [2308.07201](https://arxiv.org/abs/2308.07201), studies debate among role-diverse LLM evaluators. Evidence strength: peer-reviewed benchmark evidence. Limitations: an LLM-evaluation setting can inherit reference, judge, order, and model-family biases; agreement remains a proxy. Freshness: 2024. Confidence: high on study, medium on transfer to arbitrary verification.

### What the evidence does not license

1. **Consensus is not ground truth.** Agents sharing a base model, training corpus, retrieval source, or prompt can make correlated errors.
2. **Debate spends more.** More turns and contexts increase tokens, latency, failure opportunities, and exposure to malicious content.
3. **Persuasion can beat evidence.** A fluent wrong participant can anchor peers or an LLM judge.
4. **Ablation matters.** Compare debate with self-consistency, one-agent critique/revision, deterministic checking, retrieval, and the same or lower compute budget.
5. **External checks decide factual claims.** Use executable tests, authoritative sources, formal constraints, or independent human review; use disagreement to trigger checking, not majority vote to bypass it.
6. **Stop conditions must be mechanical.** Bound rounds, participants, tokens, tool calls, and elapsed time. Stop on convergence only if the answer also satisfies the external acceptance rule.

**Decision rule:** use debate only where independent proposals expose meaningful alternatives and an external verifier can adjudicate. Do not use it for irreversible actions, access-control decisions, or factual publication without separate evidence.

## Handoffs and the Swarm source

OpenAI’s **Swarm (experimental, educational)** repository describes two primitives: agents and handoffs. A function can return another agent, transferring the active conversation. The repository now states that Swarm has been replaced by the production-oriented OpenAI Agents SDK and recommends migration. Source: OpenAI, **Swarm**, 2024, official repository [github.com/openai/swarm](https://github.com/openai/swarm). Evidence strength: primary implementation source. Limitations: vendor-specific, stateless between calls, explicitly educational, replaced, and not a protocol specification. Freshness checked: 2026-09-06. Confidence: high.

Use the source to illustrate ergonomics, **not** to define the system boundary. A production handoff envelope should include:

```text
task_id, correlation_id, parent_task_id
task_type, goal, prohibited_actions
input_references (not an unrestricted transcript)
requester_principal, tenant, purpose
delegated_scopes = requester ∩ coordinator ∩ worker_maximum
result_schema_version, evidence_requirements
deadline, retry_policy, idempotency_key
token/tool/cost budgets, depth, fan_out
approval_policy, cancellation_handle, retention_class
```

The worker returns a typed status (`completed`, `failed`, `cancelled`, `rejected`, or an explicitly allowed `partial`), artifacts, provenance, resource use, uncertainty, and policy-relevant events. It never returns new authority.

## A2A and MCP: specifications at the freeze

### A2A

The A2A Project under the Linux Foundation, **Agent2Agent (A2A) Protocol Specification 1.0.0**, latest released version shown at access, defines interoperability between independent and potentially opaque agents: discovery, messages, stateful tasks, artifacts, streaming, and asynchronous interaction. Official specification: [a2a-protocol.org/latest/specification](https://a2a-protocol.org/latest/specification/); releases: [github.com/a2aproject/A2A/releases](https://github.com/a2aproject/A2A/releases). Evidence strength: normative primary specification. Limitations: conformance does not prove peer identity, authorization, correctness, durability of a receiver’s storage, side-effect rollback, or production safety. Freshness: accessed 2026-09-06; latest page reported 1.0.0. Confidence: high on specified surface.

Treat an Agent Card as an untrusted menu. Pin issuer/directory provenance, destination, accepted protocol version, capability, and authentication policy before routing. Keep the remote task ID mapped to a local durable task. Remote reasoning, memory, subdelegation, and tool calls remain opaque unless a separate evidence contract exposes results.

### MCP core

The Model Context Protocol contributors, **Model Context Protocol Specification 2025-11-25**, defines JSON-RPC communication among hosts, clients, and servers and the core server primitives tools, resources, and prompts. Official specification: [modelcontextprotocol.io/specification/2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25); authoritative schema: [schema/2025-11-25/schema.ts](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-11-25/schema.ts). Evidence strength: normative primary specification. Limitations: MCP standardizes a connection and message contract, not the truth or safety of tool output and not general peer-agent governance. Freshness: accessed 2026-09-06. Confidence: high.

### MCP Tasks extension

**MCP Tasks** provides durable handles for long-running operations, including polling/reconnection, progress/status, input-required flows, result retrieval, and terminal states. Official extension overview: [modelcontextprotocol.io/extensions/tasks/overview.md](https://modelcontextprotocol.io/extensions/tasks/overview.md); source specification: [modelcontextprotocol/ext-tasks](https://github.com/modelcontextprotocol/ext-tasks). Evidence strength: primary extension specification/documentation. Limitations: it is a negotiated, separately versioned extension, not permission to invoke a task; cancellation can race with completion and does not imply rollback. Freshness: accessed 2026-09-06. Confidence: high.

### Skills over MCP

The **Skills Over MCP Working Group** describes skills as structured “how-to” context for orchestrating tools. Its repository explicitly says it is experimental incubation and **does not represent official MCP specifications or recommendations**; SEP-2640 is identified as the source of truth for the proposed v1 text. Official working repository: [modelcontextprotocol/ext-skills](https://github.com/modelcontextprotocol/ext-skills); proposal: [SEP-2640](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640); charter: [Skills Over MCP WG charter](https://modelcontextprotocol.io/community/skills-over-mcp/charter). Evidence strength: primary proposal/incubation material. Limitations: unratified and changing; skill text is untrusted instruction-bearing content and creates supply-chain, versioning, composition, and privilege risks. Freshness: accessed 2026-09-06. Confidence: high on experimental status, low on final semantics.

### Boundary decision table

| Need | Default boundary | Reason |
|---|---|---|
| Read context or invoke a bounded operation | MCP tool/resource/prompt | The provider exposes primitives; the caller owns orchestration. |
| Resume a long-running MCP operation | MCP Tasks, if negotiated and supported | Adds a durable asynchronous handle without pretending the server is an autonomous peer. |
| Obtain reusable workflow instructions | Local pinned instructions first; experimental Skills only after review | Skill distribution is useful but proposed and instruction-bearing. |
| Delegate an outcome to an independent opaque specialist | A2A | The peer owns its internal execution and returns messages/status/artifacts. |
| Transfer control inside one application | Typed in-process handoff/workflow | A network protocol adds no value unless an actual interoperability boundary exists. |
| Known stable sequence | Deterministic workflow | Cheapest, most testable, and easiest to audit. |
| One context and tool set suffice | Single bounded agent | Avoid coordination and cross-agent attack surface. |

MCP and A2A can coexist: an orchestrator delegates a task through A2A; either agent may privately use MCP tools. Optional task/skill features overlap in mechanics, but do not erase ownership and trust boundaries.

## Security evidence and control mapping

| Risk / claim | Primary source | Required control | Evidence quality and caveat |
|---|---|---|---|
| Retrieved or remote content can inject instructions that cause tool misuse or data exfiltration. | Kai Greshake et al., **“More than You’ve Asked For: A Comprehensive Analysis of Novel Prompt Injection Threats to Application-Integrated Large Language Models,”** 2023, arXiv: [2302.12173](https://arxiv.org/abs/2302.12173). | Treat every message/artifact/skill/tool result as data; separate instructions from content; least-authority tools; egress controls; approval. | Strong early empirical attack evidence; attacks and defenses evolve. Confidence: high on risk, medium on completeness of mitigations. |
| MCP implementations face confused-deputy, token-passthrough, SSRF, session, and consent risks. | MCP contributors, **Security Best Practices**, 2025-11-25: [official guidance](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices); authorization specification: [MCP Authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization). | Audience-bound tokens; per-client consent; never accept tokens not issued for the server; validate redirect/issuer; protect metadata endpoints; least privilege. | Primary protocol guidance, not a certification. Freshness: accessed 2026-09-06. Confidence: high. |
| OAuth deployments need current redirect, sender-constrained-token, mix-up, and client guidance. | IETF, **OAuth 2.0 Security Best Current Practice**, RFC 9700, January 2025: [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html), DOI: [10.17487/RFC9700](https://doi.org/10.17487/RFC9700). | Follow BCP; use exact redirect matching, PKCE where applicable, issuer validation, and audience restriction. | Normative Internet BCP; application authorization still required. Confidence: high. |
| AI risk management needs governance, mapping, measurement, and ongoing management rather than a one-time model test. | NIST, **Artificial Intelligence Risk Management Framework (AI RMF 1.0)**, NIST AI 100-1, 2023: [official publication](https://doi.org/10.6028/NIST.AI.100-1). | Assign ownership; threat-model; measure; monitor; incident response; periodic reassessment. | Authoritative voluntary framework, not agent-protocol-specific. Freshness: 2023 baseline. Confidence: high. |
| Agentic systems have authorization, tool, memory, identity, supply-chain, and cascading-failure risks. | OWASP Foundation, **OWASP Top 10 for Agentic Applications**, living project: [official project](https://genai.owasp.org/initiative/agentic-security-initiative/). | Threat-model the whole invocation graph; isolate agents; validate tools/plugins; constrain memory; monitor cascading failures. | Practitioner consensus/living guidance, not controlled proof or a complete checklist. Freshness: accessed 2026-09-06. Confidence: medium-high. |

### Lifecycle-to-security map

| Lifecycle point | Threat | Mandatory invariant |
|---|---|---|
| Registration/discovery | forged card, stale capability, downgrade | Registry membership grants no authority; pin provenance, endpoint, version, and expiry. |
| Routing | attacker-selected destination, tenant crossover | Policy chooses from an allowlist under tenant/region constraints; log the reason. |
| Context assembly | secret oversharing, cross-task contamination | Reference only minimum authorized slices; redact; isolate tenant and task state. |
| Delegation | confused deputy, privilege amplification | Downstream scope can only stay equal or shrink; bind credential audience and purpose. |
| Execution | recursive explosion, tool misuse, SSRF | Enforce depth/fan-out/call/cost/time/egress limits outside the model. |
| Progress/retry | replay, duplicate effects, retry storm | Nonces and idempotency keys; bounded classified retries; progress cannot mutate authority. |
| Cancellation | unauthorized cancellation, false rollback belief | Authenticate owner/scope; validate state transition; record race; compensate explicitly. |
| Join | injection, correlated falsehood, malicious artifact | Closed schema, size/type scan, provenance, external evidence, conflict policy. |
| Commit | irreversible unsafe action | Fresh authorization and human approval where consequential; idempotent effect. |
| Logging/retention | secret leakage, task-ID confusion | Redacted audit; local/remote IDs distinct; explicit retention and deletion policy. |

## Exact recommendations for Chapters 17 and 18

### Chapter 17 — Multi-Agent Systems

1. **Keep the “experiment, not maturity level” thesis exactly.** Require the same contract across deterministic workflow, one bounded agent, and multi-agent candidate.
2. **Add the classical-to-modern evidence distinction.** Classical MAS supports coordination vocabulary; modern papers demonstrate patterns, not a universal scaling law.
3. **Cite CAMEL, AutoGen, MetaGPT, ChatDev, AgentVerse, and Generative Agents only for their demonstrated pattern or evaluation.** Attach the limitations above; do not write that multi-agent systems are generally more accurate.
4. **Add a debate evidence box.** Cite Du et al. and ChatEval, then state: disagreement is a trigger for external checking; majority agreement is not verification.
5. **Use Swarm only as a historical handoff example.** State that its own repository labels it experimental/educational and replaced by the Agents SDK. Keep the chapter’s handoff contract vendor-neutral.
6. **Make invocation ownership explicit.** The durable parent owns admission, registry policy, route, authority attenuation, task IDs, budgets, depth/fan-out, cancellation, join, approval, audit, fallback, and terminal state.
7. **Expand hostile-worker tests.** Include cross-agent prompt injection, confused deputy, overbroad registration, recursive delegation, forged results, replay, circular handoff, cancellation race, correlated error, and budget multiplication.
8. **Retain only on preregistered gates.** Measure correctness, citation correctness, safety, p50/p95 latency, total tokens/calls, communication bytes, cost, failure/recovery, and containment. Preserve a disable switch.

### Chapter 18 — Interoperability Protocols

1. **State the frozen versions/statuses precisely:** A2A latest released version 1.0.0; MCP core 2025-11-25; MCP Tasks is separately versioned/negotiated; Skills over MCP is experimental incubation around SEP-2640, not an official MCP specification.
2. **Keep a protocol-neutral domain contract.** Put A2A, MCP, Tasks, and any Skills proposal behind versioned adapters; never use a protocol schema as the domain model.
3. **Use the primary-boundary heuristic, not an intelligence test:** MCP for tools/context, A2A for an independent opaque agent, MCP Tasks for asynchronous MCP operations, and an in-process handoff for same-runtime control transfer.
4. **Separate discovery, authentication, authorization, and execution.** Agent Cards, server capabilities, and skill metadata advertise; none grants permission.
5. **Specify the full task lifecycle.** Negotiate, discover, authorize, create, progress/input-required, cancel, complete/fail, retrieve artifact, expire. Refuse incompatible versions and unsafe downgrade.
6. **Describe cancellation as an authorized race, not rollback.** Authenticate task ownership and audience, reject replay, preserve terminal-state monotonicity, and define compensation separately.
7. **Treat remote artifacts and skills as untrusted.** Validate schema, size, media, provenance, and policy; skill prose cannot silently become higher-priority instruction or acquire tools.
8. **Add adapter contract/security tests.** Cover unknown fields, oversized payloads, forged cards, audience mismatch, token passthrough, tenant crossover, replay, SSRF, task-ID collision, stale progress, hostile artifact, and unsupported cancellation.
9. **Add a revalidation note.** Recheck living specifications and proposal status within 30 days of publication or implementation; record the exact version/commit tested.

## Vendor-neutral reference architecture

```text
[User / workload]
       |
       v
[Admission: identity, tenant, purpose, budget]
       |
       v
[Durable coordinator]---->[Pinned capability registry]
   |       |   |
   |       |   +--------->[Policy / approval / audit]
   |       |
   |       +------------->[MCP adapter]---->[bounded tool/context server]
   |
   +--------------------->[A2A adapter]---->[independent specialist]
   |                                              |
   |                                      [its private MCP tools]
   v
[Join + schema/provenance/evidence validation]
       |
       +---- invalid/timeout/denied ---->[same-contract fallback]
       |
       v
[Approval + idempotent commit]---->[terminal result + retention]
```

**Architecture rules**

- Domain `Task`, `Handoff`, `Authority`, `Budget`, `Progress`, `Artifact`, and `Result` types are independent of vendors and transports.
- Adapters translate versioned external messages into closed internal types.
- Identity and authority are capabilities of the caller/policy system, never text fields trusted because an agent emitted them.
- The coordinator persists state before dispatch and before acknowledging consequential completion.
- A child cannot mint scope, budget, siblings, or descendants.
- Every terminal path returns the same public result envelope, including fallback and partial failure.

### Selection algorithm

Choose the first option that can satisfy the contract:

1. deterministic code/workflow;
2. one bounded agent;
3. one specialist handoff;
4. bounded parallel workers;
5. bounded debate only with an external verifier.

Reject delegation when the task is small, tightly coupled, sequential, not independently verifiable, latency-sensitive, authority-heavy, or cheaper in one context. Parallelize only independent work. Add an evaluator only when its rubric has demonstrated predictive value. Never add agents merely to simulate an organization chart.

## Child-friendly explanations and simple diagram specifications

### Analogies

- **Handoff:** A teacher gives one pupil a sealed assignment card. The card says what to do, which books may be opened, how long to spend, and what answer form to return. The pupil cannot rewrite the permission slip.
- **MCP versus A2A:** MCP is asking the school library desk for a book or calculator. A2A is asking another class to complete a small project and return its poster.
- **Debate:** Three pupils may compare answers, but three copies of the same wrong textbook still agree. The teacher checks the answer key or experiment.
- **Cancellation:** Telling a pupil “stop painting” may arrive after paint reached the paper. Stopping future work is not the same as undoing past work.
- **Agent Card / skill:** A menu says what a shop offers; it does not prove the shop is safe, pay the bill, or give permission to order.

### Diagram specs for an illustrator

1. **“Sealed assignment card” (ages 8–12):** left-to-right, teacher → sealed card → one pupil → answer card → teacher’s checklist. Put tiny icons on the sealed card for book, clock, coin, and stop sign. Red crossed-out arrow from pupil to a locked “extra permissions” box.
2. **“Two kinds of connection”:** center child coordinator; blue cable to a toolbox labeled “MCP: use a tool”; green phone line to a specialist child labeled “A2A: delegate an outcome.” Show the specialist’s own toolbox behind a privacy screen.
3. **“Agreement is not proof”:** three speech bubbles with the same answer flow into a question mark; a separate ruler/test tube/source book flows into a checkmark. Caption: “Check evidence, not just votes.”
4. **“Safe task lifecycle”:** eight rounded boxes—admit, discover, choose, delegate, work, validate, approve, finish—with side exits from choose/work/validate to one gray “safe fallback” box. Use no vendor logos.

## Gaps and uncertainties

- Multi-agent papers use heterogeneous tasks, models, prompts, judges, and budgets. There is no accepted universal benchmark proving a general multi-agent advantage.
- Cost-normalized evidence remains thin. Many reported gains may partly reflect more sampled tokens or stronger workflow scaffolding.
- Debate robustness under colluding, compromised, or systematically correlated agents needs stronger independent evaluation.
- A2A and MCP extension ecosystems are living. Conformance suites, interoperability profiles, operational security evidence, and long-term compatibility practices may change after the freeze.
- MCP Tasks durability depends on an implementation’s persistence and retention guarantees; a protocol handle alone does not prove durable storage.
- Skills over MCP is explicitly experimental at the freeze. Final method names, lifecycle, trust model, packaging, and version semantics remain uncertain.
- Neither A2A nor MCP supplies application authorization, tenant isolation, evidence quality, model safety, or rollback automatically.
- HTTP/TLS secures transport, not the intent, provenance, or truth of a payload.
- Vendor SDK feature names and production status were intentionally excluded from normative recommendations. Revalidate any chosen SDK separately.

## Bottom line

Adopt multi-agent invocation only when isolation, specialist capability, independent verification, or real parallelism beats simpler baselines under frozen quality, safety, latency, reliability, and cost gates. Keep the parent durable and authoritative; keep children bounded; keep protocols behind adapters; and keep every remote message, artifact, and skill untrusted until validated.
