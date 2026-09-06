# Back Matter

This directory contains authored, reusable appendices included after the 42 chapters:

- `appendix-a-production-rollout.md`: staged rollout evidence and stop criteria;
- `appendix-b-evaluation-test-plan.md`: layered AI-system evaluation and testing template;
- `appendix-c-security-review.md`: shift-left agentic AI security review template.

The build also generates a global glossary from every chapter's `## Vocabulary` table and a
global references section from `research/source-ledger.csv`. Do not maintain duplicate glossary
or bibliography files here. `npm run build:book` validates and renders all five back-matter
sections into the PDF and web editions.