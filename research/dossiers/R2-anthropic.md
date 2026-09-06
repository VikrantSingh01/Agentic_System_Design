# R2: Anthropic

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R2 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers Anthropic's public guidance on workflow and agent design, tool use, context engineering, evaluation, computer use, MCP, model safety, and interpretability.

Questions:

1. When does Anthropic recommend a fixed workflow rather than a dynamic agent?
2. Which tool and context practices transfer across providers?
3. What does MCP standardize, and what security work remains with the application?
4. Which evaluation and safety practices affect production architecture?
5. Which claims describe durable patterns versus current Claude products?

## Durable findings

### Start with the simplest architecture that works

Anthropic's public guidance distinguishes workflows with predefined control flow from agents whose model dynamically directs tool use. The durable lesson is not a product taxonomy. It is an engineering progression: optimize a direct model call first, introduce a workflow when decomposition is predictable, and add agent autonomy only where flexibility justifies additional latency, cost, and failure modes.

Prompt chaining, routing, parallelization, orchestrator-worker, and evaluator-optimizer are reusable workflow patterns. They can be implemented without granting a model unrestricted control over a process.

### Tool design is interface design

Tool names, descriptions, schemas, examples, response shapes, and error messages influence whether a model selects and uses a capability correctly. Good tools expose meaningful domain operations instead of thin wrappers around low-level APIs. Tool results should provide enough information to continue while avoiding noisy or redundant context.

Tool definitions do not provide authorization. The runtime must validate arguments, enforce least privilege, classify side effects, request approval where needed, and verify outcomes.

### Context is a finite working set

Agent quality depends on what enters the context, not just maximum context length. Instructions, tool definitions, retrieved evidence, prior actions, and tool results compete for attention and tokens. Compaction, structured notes, retrieval, subagent isolation, and selective tool loading are context-management techniques, not substitutes for evaluation.

### MCP separates interoperability from trust

MCP defines protocol roles and messages for connecting AI applications to external context and capabilities. It can reduce one-off integration work, but it does not make a server, tool, prompt, or resource trustworthy. Authentication, authorization, consent, network policy, sandboxing, output validation, and audit remain deployment responsibilities.

### Evaluation must represent complete behavior

Agent evaluation should begin with realistic tasks and observable outcomes, then inspect traces to locate failure causes. Useful dimensions include final correctness, tool selection, argument validity, citation support, policy compliance, latency, and cost. Model-based graders require clear rubrics, calibration, and human checks.

### Safety controls belong around model autonomy

Constitutional AI and interpretability research concern model behavior and understanding, but application safety still requires system controls. Production agents need bounded tools, human oversight for consequential actions, adversarial testing, rollback, and monitoring. Model-level safety does not eliminate prompt injection or confused-deputy risks in connected systems.

## Evolving or contested findings

- The optimal boundary between a workflow and an agent depends on current model reliability and task variability.
- Context compaction can extend long-running work but may remove facts or constraints. Its value must be measured on task-specific evaluations.
- Computer-use interfaces and model capabilities are volatile. Screenshots and actions require independent state verification.
- MCP transport, authorization guidance, extensions, and SDK APIs continue to evolve.
- Mechanistic interpretability is an active research field and should not be described as a complete production control.
- Model-specific claims about context length, extended thinking, pricing, caching, safety levels, and benchmark results need release-time verification.

## Production implications

1. Begin with a direct call or fixed workflow and require measured evidence before increasing autonomy.
2. Design a small, coherent tool surface with typed inputs and useful, bounded outputs.
3. Separate read-only, reversible, consequential, and irreversible tools into different policy classes.
4. Treat all retrieved text, web content, and remote tool output as untrusted data.
5. Reserve context space for tool results and recovery; compact only with fidelity tests.
6. Record outcome and trajectory signals while redacting sensitive content.
7. Place approval and authorization enforcement outside model instructions.
8. Threat-model each MCP trust boundary and pin protocol and SDK versions.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| An agent is always more capable than a workflow | Dynamic control adds flexibility and also cost, latency, and uncertainty. |
| A detailed tool description makes a tool safe | Description helps selection; policy and code enforce authority. |
| A large context window is memory | Context is a bounded request input, while durable memory needs storage and retrieval policies. |
| MCP makes tools safe to install | MCP supports interoperability, not trust or least privilege. |
| Self-critique proves an answer is correct | A model can repeat or reinforce its own error. External checks remain necessary. |
| Model safety training secures the whole application | Connected systems need identity, authorization, isolation, monitoring, and approval controls. |

## Candidate primary sources

Every row requires J1 verification, especially page titles, update dates, and current product statements.

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R2-01 | Anthropic | Building effective agents | https://www.anthropic.com/research/building-effective-agents | 2024 | 2026-09-05 | Workflow patterns, agent distinction, simplicity-first guidance | 1, 8, 14, 17 | evolving |
| R2-02 | Anthropic | Writing effective tools for agents | https://www.anthropic.com/engineering/writing-tools-for-agents | NEEDS VERIFICATION | 2026-09-05 | Tool descriptions, boundaries, responses, and evaluation | 7, 22, 25 | evolving |
| R2-03 | Anthropic | Effective context engineering for AI agents | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | NEEDS VERIFICATION | 2026-09-05 | Context selection, compaction, memory, and subagent context | 9, 12, 17 | evolving |
| R2-04 | Anthropic | Constitutional AI: Harmlessness from AI Feedback | https://arxiv.org/abs/2212.08073 | 2022 | 2026-09-05 | Constitutional AI training method and model feedback | 27 | durable |
| R2-05 | Anthropic | Responsible Scaling Policy | https://www.anthropic.com/responsible-scaling-policy | updated periodically | 2026-09-05 | Capability thresholds and risk-management commitments | 27 | volatile |
| R2-06 | Model Context Protocol | Specification | https://modelcontextprotocol.io/specification/ | updated periodically | 2026-09-05 | Protocol roles, lifecycle, capabilities, and messages | 18, 25 | volatile |
| R2-07 | Model Context Protocol | Model Context Protocol specification repository | https://github.com/modelcontextprotocol/modelcontextprotocol | updated continuously | 2026-09-05 | Versioned specification and public change history | 18 | volatile |
| R2-08 | Anthropic | Tool use with Claude | https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview | updated periodically | 2026-09-05 | Current tool schema and request-response behavior | 7, 8 | volatile |
| R2-09 | Anthropic | Computer use tool | https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/computer-use-tool | updated periodically | 2026-09-05 | Current computer-use integration and safety limitations | 13, 25 | volatile |
| R2-10 | Anthropic | Claude system cards | https://www.anthropic.com/system-cards | updated periodically | 2026-09-05 | Model-specific capability and safety evaluations | 6, 13, 27 | volatile |

## Claims requiring release-time verification

- Current Claude model names, context limits, regions, pricing, and rate limits
- Current tool-use, prompt-caching, computer-use, and extended-thinking APIs
- Current MCP specification version, transports, authorization guidance, and SDK status
- Latest Responsible Scaling Policy revision and model safety classifications
- Any model-specific benchmark or jailbreak-resistance result
- Exact status and wording of context-engineering and tool-design publications

## Recommended chapter placements

- Chapters 1, 8, and 14: workflow versus agent distinction and simplicity-first progression
- Chapters 7 and 25: tool usability, permissions, errors, and side-effect controls
- Chapters 9, 12, and 17: context selection, compaction, retrieval, and isolation
- Chapter 13: computer-use state verification and risk
- Chapter 18: MCP roles, lifecycle, interoperability, and trust boundaries
- Chapters 19-23: realistic tasks, traces, graders, and multidimensional evaluation
- Chapters 24-27: prompt injection, oversight, model safety, and application controls

## Discrepancies and unresolved questions

1. Public examples cannot establish that a pattern is used in Anthropic's private production architecture.
2. MCP adoption does not yet establish interoperability quality across all clients and servers.
3. Context-management recommendations need controlled comparisons across tasks and models.
4. Public agent-evaluation guidance does not provide universal thresholds for production readiness.
5. The relationship between model-level safety evaluations and application-level residual risk remains system-specific.