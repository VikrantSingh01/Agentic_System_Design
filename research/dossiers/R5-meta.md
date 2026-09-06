# R5: Meta

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R5 research agent  
> Approval: no source in this dossier is approved until the Source Editor verifies it

## Scope and research questions

This dossier covers Meta's public open-model research and engineering material relevant to self-hosted inference, model adaptation, retrieval, tool use, safety, and licensing.

Questions:

1. What changes when an organization hosts model weights rather than calling a managed API?
2. How should teams choose among prompting, retrieval, tools, fine-tuning, and distillation?
3. Which inference optimizations matter for interactive agent loops?
4. Which safety and licensing duties remain with the system operator?
5. Which model-specific facts are too volatile for durable chapters?

## Durable findings

### Open-weight deployment exchanges convenience for control

Self-hosting can improve control over placement, networking, data flow, model versions, and inference customization. It also transfers capacity planning, serving reliability, security patching, abuse controls, model evaluation, and hardware economics to the operator. Open weights do not automatically provide open training data, unrestricted licensing, or safe deployment.

### Inference architecture affects agent behavior

Quantization, batching, parallelism, caching, model size, and serving engines trade quality, latency, throughput, memory, and operational complexity. Agent workloads are often bursty and sequential: one slow model or tool step can dominate the complete task. Measurements must use full trajectories and realistic concurrency.

### Adapt the system before adapting model weights

Prompt, schema, tool, retrieval, and workflow changes are cheaper to test and easier to reverse than fine-tuning. Fine-tuning is appropriate when a stable behavior gap, representative data, evaluation set, and deployment path exist. Distillation can move behavior into a smaller model, but quality and safety must be reevaluated rather than assumed to transfer.

### Safety remains a layered system property

Input and output classifiers can contribute to defense in depth. They do not authorize tools, isolate tenants, prevent data exfiltration, or verify factual claims. Operators must evaluate model and safeguard behavior in their domain and keep consequential actions behind policy controls.

### Licenses and use policies are architecture inputs

Each model release can carry specific license, attribution, redistribution, acceptable-use, and scale terms. These terms affect artifact distribution, fine-tuned derivatives, deployment geography, and product obligations. The book should direct readers to qualified review rather than summarize terms as timeless facts.

## Evolving or contested findings

- The best self-hosted model and serving engine depend on current hardware, software, workload, and license terms.
- Quantization quality loss is model- and task-dependent; generic percentage claims are not reliable.
- Sparse and mixture-of-experts models can reduce active computation but introduce routing and serving complexity.
- Tool-use behavior depends on post-training, prompt format, schema, and runtime validation.
- Fine-tuning may improve consistency while reducing generality or changing safety behavior.
- Open and managed models cannot be ranked without a shared workload, budget, and operating model.

## Production implications

1. Benchmark complete agent trajectories on intended hardware and concurrency.
2. Include accelerator availability, serving software, observability, failover, and engineering labor in cost models.
3. Pin model artifacts, tokenizers, prompt formats, licenses, and serving dependencies.
4. Evaluate quantized and adapted variants against the original safety and quality suite.
5. Keep tool schemas and execution policy outside model-specific prompt formats.
6. Treat safety classifiers as fallible models with thresholds, drift, and monitoring.
7. Record provenance and license review for every model and derivative artifact.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| Open weights mean no restrictions | Releases can have licenses and acceptable-use conditions. |
| Self-hosting is automatically cheaper | Hardware, utilization, reliability, and staffing determine total cost. |
| Quantization is a free optimization | Quality and safety effects must be measured on the target workload. |
| Fine-tuning should be the first fix | Prompt, context, retrieval, tool, and workflow defects may be the real cause. |
| A safety classifier secures an agent | It addresses selected content categories, not identity, authority, isolation, or correctness. |
| A larger model always makes a better agent | End-to-end quality also depends on tools, context, latency, and controls. |

## Candidate primary sources

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R5-01 | Meta | Llama models repository | https://github.com/meta-llama/llama-models | updated continuously | 2026-09-05 | Current model cards, prompt formats, licenses, and release artifacts | 6, 7, 27, 31 | volatile |
| R5-02 | Meta | Llama Cookbook | https://github.com/meta-llama/llama-cookbook | updated continuously | 2026-09-05 | Current inference, fine-tuning, RAG, and responsible-use examples | 6, 10, 23, 31, 33 | volatile |
| R5-03 | Meta | Purple Llama | https://github.com/meta-llama/PurpleLlama | updated continuously | 2026-09-05 | Public safety tools, evaluations, and model cards | 24, 26, 27 | volatile |
| R5-04 | Meta AI | Llama model information | https://www.llama.com/ | updated periodically | 2026-09-05 | Current model family and official resource links | 6, 36 | volatile |
| R5-05 | NeurIPS | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://arxiv.org/abs/2005.11401 | 2020 | 2026-09-05 | Retrieval combined with parametric generation | 10, 11 | durable |
| R5-06 | Meta AI | Toolformer: Language Models Can Teach Themselves to Use Tools | https://arxiv.org/abs/2302.04761 | 2023 | 2026-09-05 | Training language models to decide when and how to call tools | 7, 15 | evolving |
| R5-07 | Meta AI | Code Llama: Open Foundation Models for Code | https://arxiv.org/abs/2308.12950 | 2023 | 2026-09-05 | Specialization and evaluation of an open code model | 6, 13, 23 | evolving |

## Claims requiring release-time verification

- Current Llama family, model cards, context limits, prompt formats, and tool-use behavior
- Current licenses, acceptable-use policies, attribution terms, and geographic restrictions
- Current safeguard models, taxonomies, thresholds, and evaluation results
- Current recommended serving, quantization, and fine-tuning tools
- Hardware fit, throughput, latency, memory use, and cost for every example configuration
- Current support status of model artifacts in third-party inference engines

## Recommended chapter placements

- Chapter 6: open-weight versus managed models and model selection
- Chapter 7: model-specific tool formats behind stable runtime contracts
- Chapters 10-11: retrieval foundations and open-model implementations
- Chapter 23: adaptation decision ladder and reevaluation
- Chapters 24-27: safeguards, provenance, licenses, and operator responsibility
- Chapters 28, 31, and 33: self-hosted serving, deployment, capacity, and economics

## Discrepancies and unresolved questions

1. Model cards and repositories document artifacts, not universal production recommendations.
2. Third-party serving guidance may not be maintained or warranted by Meta.
3. Hardware and cost comparisons become stale quickly and need reproducible benchmark scripts.
4. License interpretation requires qualified review for the intended product and jurisdiction.
5. Evidence for agent-specific fine-tuning benefits remains workload-specific.