# Module 03: Context, Knowledge, and Memory

## Outcome

Design context, retrieval, memory, and multimodal action as measurable
subsystems rather than treating a larger prompt as a complete solution.

Throughout the module, **Northstar** is one school research helper. Mina first
asks it to prepare a class report from approved material. Each chapter adds only
the capability that the next problem requires:

1. pack a small, labeled context for one model call;
2. retrieve cited evidence from approved sources;
3. improve retrieval without weakening permissions or traceability;
4. retain one user-approved preference only when tests show value; and
5. use uncertain screen, image, or audio observations to save, but never
   autonomously submit, the report in an offline simulation.

## Chapters

9. [**Context Engineering**](chapters/09-context-engineering.md)
10. [**RAG Foundations**](chapters/10-rag-foundations.md)
11. [**Advanced Retrieval**](chapters/11-advanced-retrieval.md)
12. [**Memory Without Mythology**](chapters/12-memory-without-mythology.md)
13. [**Multimodal and Computer-Using Agents**](chapters/13-multimodal-computer-using-agents.md)

## Northstar milestone

Produce cited reports from permission-filtered sources, measure retrieval
quality, add memory only where an evaluation demonstrates value, and turn
multimodal observations into bounded proposals checked by code. Chapter 13
hands this controlled loop to Module 04, where the same steps become explicit
workflows.

## Diagram simplicity audit

Audited 2026-09-06 against the beginner visual contract:

| Chapter | Visuals | Distinct teaching jobs | Main-path size |
|---|---:|---|---|
| 9 | 2 | context parts; packing process | 5 and 8 nodes |
| 10 | 3 | citation chain; RAG process; three separate checks | 6, 8, and 3 nodes |
| 11 | 2 | retrieval-signal comparison; boundary-first process | 5 and 8 nodes |
| 12 | 3 | store comparison; write/read decision; deletion data flow | 3, 7, and 4 nodes |
| 13 | 2 | input/control separation; safe action decision loop | 5 and 8 nodes |

The small three-node comparison chains in Chapters 10 and 12 intentionally use
fewer than the normal four nodes because a fourth would repeat rather than
clarify. Every visual teaches one point, uses short concrete labels, has a
one-sentence takeaway and numbered prose walkthrough, and uses words and shapes
rather than color. Permission gates, denials, abstentions, confirmations, and
safe stops are labeled where they matter. Side inputs and failure branches do
not count toward the main path.