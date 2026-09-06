# Publication Structure Review

Date: 2026-09-06
Scope: Front matter, contents, navigation, glossary, references, appendices, and remaining publisher inputs
Decision: Core project structure complete; professional publication finishing still required

## What is now complete

| Publication element | Current implementation | Validation |
|---|---|---|
| Cover | Responsive web cover, first PDF page, and 1588 x 2246 portrait PNG | Desktop, mobile, print, contrast, dimensions, and clipping checks |
| Reader guide | Role-based paths for 11 audiences | Included in PDF and web editions |
| Contents | Modules, chapters, appendices, glossary, and references | 57 clickable entries with dot leaders and verified PDF page numbers |
| PDF navigation | Expandable module and chapter bookmarks plus back matter | 60 valid destinations; outline pane requested by default |
| Chapters | 42 chapters across 10 modules | Repository contract and 13 unit tests |
| Glossary and term index | Generated from 676 vocabulary rows and merged to 520 terms | First occurrence is canonical; all chapter uses linked |
| References | Generated from the approved source ledger | 118 ordered, approved, complete source records |
| Appendices | Production rollout, evaluation/test planning, and security review | Authored templates with valid chapter links |
| Web edition | Responsive book with local fonts and rendered diagrams | 133 diagrams, zero Mermaid errors, no desktop or mobile overflow |

## Why these additions matter

The contents now answers, "Where does this topic begin?" The glossary answers, "What does this
term mean, and where is it taught?" The references answer, "What evidence supports the book, how
fresh is it, and where is it used?" The appendices answer, "How do I apply the chapters as one
reviewable engineering process?"

These are different reader jobs. Combining them into one large index would make each job harder.

## Deliberate limitations

### The term index is not a professional subject index

The generated glossary covers explicit vocabulary and chapter links. It does not replace a
human-curated subject index that recognizes implied concepts, synonyms, contrasts, names,
subtopics, and the most useful exact print pages. A professional indexer should create the final
subject index after trim size and pagination are frozen.

### The references are complete but not locked to one publisher style

The bibliography preserves source ID, publisher, title, URL, publication or update date, access
date, freshness class, chapter usage, and supported claim. This is more operational evidence than
many citation styles retain. A publisher should select Chicago, APA, IEEE, or a house style during
copyedit and decide which operational fields remain in print.

### Appendices are templates, not certifications

Completing an appendix does not prove that a system is safe, secure, accessible, reliable, or
compliant. Each row requires workload-specific thresholds, evidence, owners, qualified review,
and an explicit decision.

## Inputs that must not be fabricated

| Missing item | Required owner or input |
|---|---|
| Copyright and rights page | Author, Microsoft intellectual-property review, publisher, and legal counsel |
| ISBN and cataloging metadata | Publisher or publication platform |
| Acknowledgments | Author-confirmed contributors and permissions to name them |
| Author biography and photograph | Author-approved facts, voice, image, and usage rights |
| Preface or foreword | Author or invited contributor; must reflect genuine motivation and endorsement |
| Legal and professional disclaimer | Qualified legal and publisher review for intended markets |
| Permissions register | Publisher review of quotations, trademarks, screenshots, and third-party assets |

## Professional production work still required

1. Independent developmental, technical, security, and copy editing.
2. Classroom and professional reader pilots across the intended audiences.
3. Human proofing of every final page break, table split, code block, formula, and diagram at the
   selected trim size.
4. Professional tagged-PDF and screen-reader remediation. Existing automated checks do not prove
   PDF accessibility.
5. A manually curated subject index after pagination is frozen.
6. Figure and table numbering, captions, and lists when the publisher's typesetting system is
   selected.
7. Reflowable EPUB production and device testing.
8. Instructor materials, lab solution guidance, and assessment rubrics as a separate teaching
   supplement rather than answers embedded beside exercises.
9. An author-approved errata and edition-history policy.
10. Final verification of every volatile product, model, API, price, regulation, and protocol
    claim within the release window.

## Release position

The project edition now has the structural elements needed for serious acquisition review and
self-published technical reading. It should not be represented as a publisher-final print edition
until the author, publisher, legal, accessibility, indexing, and proofing inputs above are complete.
