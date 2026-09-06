# Hybrid AI Systems Engineering Critical Review

> Review date: 2026-09-06
> Scope: Module 09, Chapters 36-41
> Decision: accepted after corrections

## Review question

Does the new module add useful depth on hybrid AI, performance, testing, tools, security, and
product experience without duplicating the book's existing evaluation, security, reliability,
observability, and cost chapters?

## Evidence review

The review cross-checked chapter claims against 16 newly approved sources and the existing source
ledger. Evidence is intentionally weighted by maturity:

| Evidence class | Use in the module |
|---|---|
| Durable peer-reviewed work and standards | Foundations for human-AI interaction, accessibility, and established engineering concepts. |
| Official living documentation | Current MCP and ONNX Runtime interfaces. Treat as volatile and reverify before release. |
| Evolving research | Model routing, on-device SLM capability, tool filtering, and human-agent interaction hypotheses. Limit claims to evaluated tasks and populations. |
| Very recent preprints | Energy-sensitive prompts and MCP behavior observations. Use as frontier signals, not settled production rules. |

The thermal model, device measurements, route thresholds, and cost examples are labeled as
synthetic teaching fixtures unless tied to a cited experiment. No chapter claims that one model,
router, tool-selection method, UX pattern, or security control is universally best.

## Critical findings corrected

1. Corrected a route-latency percentile type mismatch and made routing tie-breakers explicit.
2. Labeled hypothetical latency and thermal numbers so they cannot be mistaken for hardware data.
3. Added a real-adapter versus deterministic-double diagram to the testing chapter.
4. Separated MCP protocol behavior from application authorization and made tenant-safe discovery
   cache keys explicit.
5. Added visible ambiguity and abstention behavior for large tool portfolios.
6. Expanded security tests to include hostile tool results, model and tool provenance, excessive
   agency, tenant leakage, cost exhaustion, and thermal exhaustion.
7. Made product release gates block before adoption or retention metrics are considered.
8. Added teacher learning oversight, executive operating decisions, approval-control limits,
   calibrated uncertainty guidance, preference controls, accessible state behavior, and redirect
   tests to the Product and UX chapter.
9. Moved all former Microsoft capstone references and source placements from Chapter 36 to
   Chapter 42.
10. Simplified a crowded Product and UX state diagram and added a mobile-friendly reader guide.

## Diagram audit

| Chapter | Diagrams | Main visual jobs |
|---|---:|---|
| 36. Hybrid AI and Model Orchestration | 3 | route topology, policy gates, fallback state |
| 37. Performance, Energy, and Thermal Engineering | 3 | latency path, sustained thermal behavior, optimization gates |
| 38. AI System Testing and Fault Tolerance | 4 | test layers, fault decisions, release evidence, adapter versus double |
| 39. MCP and Tool Portfolio Engineering | 3 | minimal tool frontier, authorized discovery, workflow-scoped tools |
| 40. Secure by Design AI Systems | 4 | lifecycle, trust boundaries, assurance chain, provenance gate |
| 41. Product and UX Design for Agentic Systems | 5 | value loop, autonomy ladder, interaction states, approval recovery, product gates |

All 22 diagrams have a takeaway and an accepted text equivalent. Browser validation rendered all
133 book diagrams with zero Mermaid errors and no horizontal overflow at 1440 px and 390 px.

## Cross-role coverage

The in-book reader guide now supplies focused paths for students, teachers, engineers, testers,
security professionals, product managers, designers and researchers, TPMs, engineering leaders,
COO or CEO readers, and ethics or governance officers. Chapter 41 gives each role a concrete
review question. The shared decision packet keeps user value, technical evidence, risk, cost,
ownership, and stop conditions in one reviewable artifact.

## Residual limitations

- SRC-108 and SRC-110 are very recent preprints. Recheck revisions and avoid using them as sole
  support for a production decision.
- MCP and ONNX Runtime details are volatile. Reverify versions, schemas, supported hardware, and
  security guidance within 30 days of release.
- Synthetic energy and thermal simulations teach measurement structure; real products require
  representative hardware, ambient conditions, batteries, accelerators, and sustained workloads.
- Automated accessibility checks do not replace keyboard, screen-reader, zoom, reduced-motion,
  cognitive, and affected-user testing.
- Product and UX guidance requires research with the actual population and task. Engagement is
  diagnostic evidence, not proof of value or safety.

## Acceptance evidence

- Repository contract: 10 modules and 42 chapters.
- Unit tests: 13 passing.
- New chapter Python labs: executed with deterministic synthetic fixtures.
- Source ledger: 118 ordered, unique, approved source records.
- Local Markdown links: 262 resolved.
- Publication build: 547 pages, 133 Mermaid diagrams, about 3.9 MiB.
- Responsive web checks: no Mermaid errors or horizontal overflow at desktop and mobile widths.