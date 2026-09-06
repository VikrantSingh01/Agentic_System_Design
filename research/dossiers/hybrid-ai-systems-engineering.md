# Hybrid AI systems engineering: critical evidence dossier

> **Research freeze / access date:** 2026-09-06
> **Scope:** Chapters 36-41: cloud/device routing, on-device small language models (SLMs), performance and resource behavior, testing and fault tolerance, MCP tool portfolios, secure-by-design controls, and Product/UX.
> **Reading rule:** A paper supports only its reported setup. A specification defines an interface, not safety or production fitness. A toolkit supplies methods, not proof that a product satisfies them.

## Executive findings

1. Hybrid routing is a constrained systems decision, not a model preference. Privacy, connectivity, capability, authority, deadline, and device state should determine eligibility before a learned router compares quality, latency, energy, and monetary cost.
2. Small models make local execution feasible for selected workloads, but parameter count is not a deployment result. Measure the exact model, quantization, runtime, prompt distribution, device, thermal state, and quality threshold.
3. Average latency hides the user-visible failure modes. Sustained tests need cold and warm starts, prefill and decode, p50/p95/p99 latency, memory, energy per accepted task, thermal throttling, fallback frequency, and recovery time.
4. AI system testing must cover routing policy, adapters, state, tools, safety controls, and fallback behavior. Model-only benchmarks cannot establish end-to-end reliability.
5. More exposed tools can reduce tool-use reliability and increase tokens. Tool retrieval is therefore a safety and Product/UX boundary, not merely a context-window optimization.
6. Product/UX must make capability, uncertainty, delegation, data movement, progress, intervention, and recovery legible. Recent agent-specific frameworks are useful hypotheses, while durable HCI and accessibility guidance remain the stronger baseline.

## Evidence classes

### Durable evidence

| Source | Precise support | Limitations |
|---|---|---|
| [SRC-057] NIST AI RMF 1.0 | Supplies the Govern, Map, Measure, and Manage risk functions used to assign ownership and connect tests to managed risk. | Voluntary and system-level; it does not prescribe a hybrid router, device benchmark, or MCP control set. |
| [SRC-066] WCAG 2.2 | Supplies testable accessibility success criteria for the interfaces around agent state, controls, errors, and alternatives. | Accessibility conformance does not by itself establish agent understandability, trust calibration, or safety. |
| [SRC-113] Guidelines for Human-AI Interaction | Synthesizes and validates 18 interaction guidelines across initial use, interaction, failure, and change over time. | Published in 2019, before current tool-using agents; teams must operationalize each guideline for delegated and asynchronous behavior. |

### Evolving papers

| Source | Precise support | Limitations |
|---|---|---|
| [SRC-103] RouteLLM | Learns routers between a stronger and weaker model from preference data and reports quality/cost tradeoffs and transfer tests on its evaluated model pairs and benchmarks. | Cloud-style model-pair evidence; it does not model device thermals, privacy eligibility, network failure, or side-effect risk. Savings are baseline- and workload-dependent. |
| [SRC-104] Phi-3 Technical Report | Reports a 3.8B-parameter Phi-3-mini trained on 3.3T tokens, benchmark results, and local phone deployment feasibility. | A vendor technical report with model and benchmark revisions; it is not a sustained cross-device latency, energy, or thermal study. |
| [SRC-105] MobileLLM | Evaluates deep-thin sub-billion architectures, embedding sharing, grouped-query attention, and block-wise weight sharing on reported language and API-calling tasks. | Quality gains are tied to the paper's models and tasks. The work does not prove acceptable quality or resource behavior for an arbitrary product workload. |
| [SRC-106] Confident or Seek Stronger | Studies uncertainty-driven SLM-to-LLM routing across more than 1,500 settings and reports that uncertainty-correctness alignment depends on the SLM and uncertainty method. | Preprint evidence. Calibration and generalization results remain dataset-, model-, uncertainty-method-, and threshold-dependent. |
| [SRC-107] CR^2 | Formulates wireless device-edge routing with latency, energy, and accuracy costs; reports a two-stage router with conformal risk calibration and up to 16.9% lower normalized deployment cost at matched accuracy in its experiments. | A May 2026 preprint with simulated or selected deployment assumptions, a full-information utility reference, and workload-specific operating points. It is not broad production evidence. |
| [SRC-109] ToolChoiceConfusion | On 102 tasks, 100 tools, four LLM backends, and 2,448 task-method-model runs, its causal minimal filter exposes one next-step tool and reports about 90% lower token use than all-tools exposure while matching the strongest causal baseline in aggregate success. | June 2026 preprint and one benchmark construction. Precondition-effect contracts require maintenance, and one visible tool can exclude recovery options if state or contracts are wrong. |
| [SRC-115] Google PAIR Guidebook | Provides evolving practitioner methods for human-centered AI product decisions. | Living guidance, not controlled proof; examples and recommendations can change. |
| [SRC-116] Workplace human-AI agent UX principles | Uses a multi-method study to propose eight workplace agent UX principles and associated criteria. | July 2026 preprint. The abstract does not establish broad longitudinal adoption, accessibility, or cross-culture validity. |
| [SRC-117] ADEPTS | Proposes six user-facing capability principles as a shared vocabulary for understandable, controllable, and trustworthy agent experiences. | Framework preprint. The paper presents actionable synthesis, not evidence that the six principles are complete or that compliance improves outcomes. |
| [SRC-118] Users' mental models | Finds four mental-model patterns in 21 semi-structured interviews and reports differences between first- and third-party chatbot ecosystems. | Small qualitative sample, ecosystem-specific perceptions, and self-report. It should generate design hypotheses, not population estimates. |

### Very recent preprints

Treat these as provisional even when the reported experiments are large. Recheck versions, artifacts, and independent replications before publication.

| Source | Precise support | Limitations |
|---|---|---|
| [SRC-108] Prompt variations and on-device energy | Separates prefill and decode energy across tested prompts, datasets, models, and devices; reports cognitive load effects on energy per token and phrasing effects largely through token use. | Published five days before this freeze. Hardware, runtime, battery instrumentation, temperature, prompt taxonomy, and model choice bound the result; no independent replication is available at the freeze. |
| [SRC-110] LLM within MCP Matters | Reports 54,000 trials across 24 client LLMs against one production legal-information MCP server. In its diagnostic condition, 23 of 24 models used embedded data at least 98% of the time without the competing search tool, while nine fell below 15% when that tool was present; combined instruction interventions recovered at least 86% for 20 models. | Published less than a month before the freeze. One server pattern and model snapshot do not establish a universal MCP failure rate. Prompt interventions interacted with model family and can regress. |

### Official volatile documentation

| Source | Precise support | Limitations and recheck rule |
|---|---|---|
| [SRC-111] Microsoft ONNX Runtime GenAI | Official implementation and benchmark documentation for running generative models through the repository's supported APIs and targets. | Repository APIs, support, examples, and benchmark instructions can change. It does not guarantee a model will fit, meet quality, or sustain performance on a target device. Pin and retest the exact commit and runtime. |
| [SRC-112] MCP Tools specification, 2026-07-28 | Normatively defines the versioned tools capability, discovery, and invocation surface used for Chapter 39-40 adapter contracts. | It does not rank tools, minimize portfolios, validate tool truth, authorize side effects, or secure an implementation. Pin the protocol version and run conformance plus adversarial tests. |
| [SRC-114] Microsoft HAX Toolkit | Offers current methods and worksheets for applying human-AI interaction guidance in product work. | A living toolkit rather than outcome evidence. Recheck the current artifacts and validate decisions with representative users. |

Existing volatile tool and evaluation documentation has the same constraint: MCP and tool-use docs [SRC-016] [SRC-017], evaluation guidance [SRC-024], and tracing docs [SRC-025] define current surfaces and practices, not end-to-end guarantees.

## Critical synthesis by chapter

### Chapter 36: Hybrid AI model orchestration

- Use hard eligibility gates before optimization: data may leave the device, required capability is present, authority is sufficient, network and service are available, and the deadline can still be met. Then compare measured expected loss across local, edge, and cloud candidates. This is a design recommendation synthesized from routing evidence [SRC-103] [SRC-106] [SRC-107] and workload architecture guidance [SRC-046] [SRC-052], not a claim that one router generalizes everywhere.
- Keep an explicit single-model baseline and deterministic routing baseline. Calibrate escalation on held-out production-like data; monitor route rate, accepted quality, abstention, fallback, and subgroup effects.
- RouteLLM supports learned strong/weak selection [SRC-103], while uncertainty routing supports confidence-triggered escalation [SRC-106]. Neither licenses routing consequential actions solely from model confidence.
- Device-edge routing must include communication latency and energy, not only token price [SRC-107]. A cloud route also changes privacy, residency, identity, availability, and observability boundaries.
- Phi-3 and MobileLLM establish plausible local candidates [SRC-104] [SRC-105]; they do not establish that local execution is always faster, cheaper, safer, or accurate enough.

### Chapter 37: Performance, energy, and thermal engineering

- Benchmark an end-to-end task matrix: model and quantization, runtime version, device class, battery/power mode, starting temperature, connectivity, prompt/input length, generated length, and quality acceptance rule [SRC-104] [SRC-105] [SRC-111].
- Report cold start, warm start, prefill, time to first token, decode rate, peak memory, energy per accepted task, thermal state, throttling onset, and recovery. Run sustained workloads; a short peak-throughput test can hide thermal collapse.
- Prompt form is a resource variable. The newest study reports different mechanisms for cognitive load and phrasing [SRC-108], so hold output quality and token counts visible rather than attributing all energy change to the model.
- Treat published model scores and repository benchmarks as candidate-selection evidence. Product claims require reproduction on the shipped device/runtime and workload [SRC-104] [SRC-111]. Use Well-Architected and generative-AI workload guidance to record performance, reliability, and cost tradeoffs [SRC-046] [SRC-052].

### Chapter 38: AI system testing and fault tolerance

- Build a contract test matrix for every route and transition: eligible local success, local low confidence, local timeout, thermal throttle, network loss, cloud rate limit, malformed result, safety rejection, cancellation race, and fallback exhaustion.
- Freeze task-specific quality and safety rubrics before comparing routes [SRC-024]. Trace route inputs, policy version, selected target, retries, resource use, and terminal outcome without logging secrets [SRC-025].
- Combine deterministic tests, statistical evaluations, load/soak tests, fault injection, and adversarial tests. Risk frameworks and threat knowledge bases help map coverage [SRC-057] [SRC-058] [SRC-060], but passing their checklists is not evidence that recovery works.
- Fault tolerance must preserve authority and semantics. A fallback may reduce capability or move data across a boundary; it must not silently broaden permissions, drop required provenance, or turn a denied action into an allowed one. Review reliability and operational controls as system properties [SRC-046].

### Chapter 39: MCP tool portfolio engineering

- Treat the tool list as a runtime portfolio. Expose the minimum eligible next-step set based on user authority, tenant, state, side-effect class, and tested task need. `tools/list` availability is not a reason to place every tool in model context [SRC-112].
- ToolChoiceConfusion supplies direct but early evidence that a large relevant menu can still create wrong or premature calls and token cost [SRC-109]. Its one-tool frontier is a candidate pattern, not a default for recovery-heavy workflows.
- The newest MCP study shows that merely presenting a search tool can divert some models from instruction-embedded data [SRC-110]. This supports model-specific portfolio tests, not hard-coded prompt tricks assumed to transfer.
- Toolformer supports the broader proposition that models can learn when and how to call APIs [SRC-038], but it does not validate runtime MCP discovery, authorization, or portfolio minimization.
- Keep closed tool schemas, explicit side-effect annotations, allowlists, and response limits [SRC-016] [SRC-017] [SRC-112]. Treat descriptions and results as untrusted because instruction-bearing content can propagate across model components [SRC-101].

### Chapter 40: Secure-by-design AI systems

- Protocol conformance is not authorization. Bind identity, tenant, audience, purpose, scopes, data policy, and approval outside the model; a tool name or description cannot grant authority [SRC-016] [SRC-112].
- Threat-model the whole route and tool graph using system risk management, generative-AI risk guidance, community risk taxonomies, and adversary knowledge [SRC-057] [SRC-058] [SRC-059] [SRC-060]. These sources organize work but do not prove control effectiveness.
- Test indirect prompt injection, tool-description poisoning, result poisoning, confused deputy, cross-tenant access, egress, replay, recursive calls, unsafe fallback, and audit-data leakage. Prompt Infection demonstrates propagation in tested multi-agent configurations [SRC-101]; it does not quantify all hybrid or MCP deployments.
- Default-deny unavailable or ambiguous routes. Preserve least privilege through fallback, require fresh approval for consequential effects, and log policy decisions separately from model prose.

### Chapter 41: Product/UX design for agentic systems

- Organize the experience around the durable interaction lifecycle: set expectations, show relevant capability and limits, make progress and data movement visible, support correction and interruption, explain recoverable failure, and adapt without surprising the user [SRC-113].
- Make local/edge/cloud transitions understandable when they affect privacy, delay, cost, or availability. Do not expose infrastructure detail that has no user consequence.
- Use HAX and PAIR as design-process aids [SRC-114] [SRC-115]. Use the workplace principles and ADEPTS as candidate agent-specific vocabulary [SRC-116] [SRC-117], then test comprehension, control, calibrated trust, task success, recovery, and accessibility with representative users.
- The 21-participant mental-model study warns that ecosystem role and first- versus third-party boundaries can be misunderstood [SRC-118]. It supports formative research questions, not a universal preference claim.
- Apply WCAG 2.2 to controls, status, errors, timing, focus, alternatives, and assistive-technology behavior [SRC-066]. Human-AI guidance does not replace accessibility conformance, and conformance does not replace usability studies.

## Cross-cutting limitations and unresolved questions

1. No cited study jointly evaluates quality, latency, monetary cost, battery energy, thermals, privacy, security, accessibility, and user outcomes in one production hybrid system.
2. Router studies optimize different objectives and baselines. Report absolute metrics and operating points; do not compare headline percentages across papers.
3. On-device results can change with quantization, kernels, runtime, memory pressure, background load, battery health, ambient temperature, and model update.
4. Confidence is not correctness and may be miscalibrated under shift. Consequential tasks need external checks, authority controls, or human review.
5. MCP tool-pollution results are recent and implementation-specific. Test the exact host, model, server instructions, tool schemas, ordering, and task distribution.
6. Security taxonomies are not test results. Each control needs an owner, executable verification, monitored signal, failure response, and revalidation trigger.
7. Agent Product/UX evidence is younger than general human-AI guidance. Validate longitudinal use, diverse users, accessibility, organizational power, and failure recovery rather than measuring first-use preference alone.
8. Recheck SRC-108, SRC-110, and SRC-116 within 30 days of publication freeze; recheck SRC-016, SRC-017, SRC-024, SRC-025, SRC-111, SRC-112, and SRC-114 against pinned versions before implementation or publication.

## Chapter placement summary

| Chapter | Evidence role | Primary new sources | Existing sources cited |
|---|---|---|---|
| 36 | Hybrid cloud/device eligibility, routing, calibration, and fallback | SRC-103, SRC-104, SRC-105, SRC-106, SRC-107, SRC-111 | SRC-046, SRC-052 |
| 37 | On-device performance, energy, thermal behavior, and benchmark discipline | SRC-104, SRC-105, SRC-107, SRC-108, SRC-111 | SRC-046, SRC-052 |
| 38 | System evaluation, tracing, fault injection, and recovery | SRC-111 | SRC-024, SRC-025, SRC-046, SRC-057, SRC-058, SRC-060 |
| 39 | MCP tool discovery, portfolio minimization, and pollution tests | SRC-109, SRC-110, SRC-112 | SRC-016, SRC-017, SRC-038, SRC-059, SRC-101 |
| 40 | Authorization, threat modeling, adversarial tests, and secure fallback | SRC-112 | SRC-016, SRC-057, SRC-058, SRC-059, SRC-060, SRC-101 |
| 41 | Human-AI interaction, mental models, accessibility, and user evaluation | SRC-113, SRC-114, SRC-115, SRC-116, SRC-117, SRC-118 | SRC-066 |

## Bottom line

Build the hybrid system around explicit contracts and measured operating points. Keep routing policy inspectable, device claims reproducible, faults injectable, tool portfolios minimal, authority outside the model, and user control visible. The 2026 evidence is promising but young; durable risk, HCI, and accessibility evidence should constrain how the newer techniques are adopted.