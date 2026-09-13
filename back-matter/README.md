# Back Matter

This directory contains authored, reusable appendices included after the 42 chapters:

- `appendix-a-production-rollout.md`: staged rollout evidence and stop criteria;
- `appendix-b-evaluation-test-plan.md`: layered AI-system evaluation and testing template;
- `appendix-c-security-review.md`: shift-left agentic AI security review template;
- `appendix-d-agentic-system-design-interviews.md`: eleven student-friendly interview designs,
  detailed diagrams, tradeoffs, and evaluation prompts.

`npm run build:interview-guide` converts Appendix D into the responsive, offline
`docs/agentic-system-design-interviews.html` reading experience. The HTML defaults to a concise
student view and lets readers reveal interview-depth tradeoffs or expand any diagram.

The build also generates a global glossary from every chapter's `## Vocabulary` table and a
global references section from `research/source-ledger.csv`. Do not maintain duplicate glossary
or bibliography files here. `npm run build:book` validates and renders all six back-matter
sections into the PDF and web editions.