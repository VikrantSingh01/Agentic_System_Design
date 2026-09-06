# R9: Regulation and Governance

> Status: candidate evidence for J1 review  
> Prepared: 2026-09-05  
> Owner: R9 research agent  
> Legal notice: this dossier maps public sources to engineering questions and is not legal advice

## Scope and research questions

This dossier covers official laws, regulatory guidance, risk-management standards, privacy principles, accessibility standards, and governance practices relevant to agentic systems.

Questions:

1. Which jurisdictions, sectors, roles, and system classifications apply?
2. Which obligations affect providers, deployers, operators, and users differently?
3. How do risk management, transparency, testing, oversight, privacy, accessibility, records, and incident response become engineering controls?
4. Which dates, thresholds, interpretations, and standards require qualified review?
5. What evidence should a production team retain?

## Durable findings

### Applicability must be established before controls are selected

Legal duties vary by jurisdiction, sector, system purpose, affected people, data, and organizational role. “AI agent” is not itself a universal legal classification. Teams need an inventory of use cases, data flows, decisions, tools, users, providers, and regions before mapping requirements.

### Risk management is a lifecycle activity

NIST and ISO frameworks organize governance, context mapping, measurement, treatment, and monitoring. Durable engineering artifacts include an accountable owner, intended-use statement, risk register, threat model, evaluation evidence, change history, incident process, and retirement plan.

### Human oversight must be meaningful

Human involvement is not effective when reviewers lack time, information, authority, competence, or a real ability to stop an action. Systems should define which actions require approval, what evidence the reviewer sees, how overrides work, and how automation bias and reviewer fatigue are measured.

### Privacy requirements shape architecture

Purpose limitation, data minimization, lawful processing, access control, retention, deletion, security, and rights handling affect prompts, retrieval, memory, traces, evaluation data, and vendor transfers. Logging everything can conflict with minimization and retention obligations.

### Accessibility covers the complete interaction

Accessibility applies to user interfaces, streaming updates, approval controls, generated documents, diagrams, audio, and error recovery. Automated checks help but do not replace keyboard, screen-reader, zoom, cognitive, and user testing.

### Governance requires evidence

Policies without versioned tests, approvals, logs, monitoring, incident records, and ownership do not demonstrate operation. Evidence should be proportionate, access-controlled, privacy-aware, and linked to specific system versions.

## Evolving or contested findings

- EU AI Act obligations phase in by role and category; dates, standards, codes, and guidance require current legal review.
- Requirements for general-purpose AI models and downstream systems continue to develop.
- Automated-decision, employment, consumer, healthcare, finance, and public-sector rules vary significantly.
- “Explainability,” “transparency,” and “meaningful information” are not interchangeable across laws or contexts.
- Fairness has multiple incompatible metrics; appropriate measures depend on harms and legal context.
- AI-specific incident-reporting duties and taxonomies are still developing.
- Standards may be voluntary, contractually required, incorporated into law, or used as evidence of practice depending on context.

## Production implications

1. Maintain a use-case and data inventory tied to jurisdictions, sectors, actors, and decisions.
2. Classify action consequences and require meaningful review for high-impact actions.
3. Preserve versioned evaluation, risk, approval, change, and incident evidence.
4. Minimize and redact prompts, memory, retrieval, traces, and evaluation datasets.
5. Implement access, correction, deletion, retention, and export workflows where applicable.
6. Test accessibility throughout authoring and product delivery, including generated artifacts.
7. Route legal, privacy, accessibility, employment, safety, and sector-specific conclusions to qualified reviewers.
8. Recheck volatile laws, standards, guidance, and enforcement dates before release.

## Beginner misconceptions to address

| Misconception | Correction |
|---|---|
| There is one global AI compliance checklist | Duties depend on jurisdiction, sector, role, data, and use case. |
| A base-model provider owns all downstream risk | Deployers remain responsible for their integration, data, tools, and decisions. |
| Human in the loop means a person clicks approve | Oversight must be informed, timely, empowered, and tested. |
| More logs always improve compliance | Excessive logs can violate minimization, retention, and access principles. |
| Explainability always means exposing model reasoning | Required information depends on context; system evidence and decision factors may be more appropriate. |
| Accessibility is only a frontend concern | Agent outputs, timing, approvals, files, and recovery flows can all create barriers. |
| A voluntary standard is automatically a legal requirement | Legal effect depends on adoption, contracts, regulation, and jurisdiction. |

## Candidate primary sources

Exact applicability and legal interpretation require qualified review. All effective dates and amendments must be refreshed before publication.

| ID | Publisher | Title | URL | Published | Accessed | Supported claim | Chapters | Freshness |
|---|---|---|---|---|---|---|---|---|
| R9-01 | European Union | Regulation (EU) 2024/1689, Artificial Intelligence Act | https://eur-lex.europa.eu/eli/reg/2024/1689/oj | 2024 | 2026-09-05 | Official AI Act text, roles, categories, and obligations | 26, 27 | volatile |
| R9-02 | European Union | Regulation (EU) 2016/679, General Data Protection Regulation | https://eur-lex.europa.eu/eli/reg/2016/679/oj | 2016 | 2026-09-05 | Data-protection principles, rights, security, and transfers | 26, 27, 32 | evolving |
| R9-03 | NIST | Artificial Intelligence Risk Management Framework (AI RMF 1.0) | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf | 2023 | 2026-09-05 | Govern, Map, Measure, and Manage lifecycle functions | 19, 24, 27 | durable |
| R9-04 | NIST | Generative Artificial Intelligence Profile | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | 2024 | 2026-09-05 | Generative AI risk considerations and suggested actions | 24, 27 | evolving |
| R9-05 | ISO | ISO/IEC 42001:2023 | https://www.iso.org/standard/81230.html | 2023 | 2026-09-05 | AI management-system requirements | 27, 35 | evolving |
| R9-06 | ISO | ISO/IEC 23894:2023 | https://www.iso.org/standard/77304.html | 2023 | 2026-09-05 | AI risk-management guidance | 24, 27 | evolving |
| R9-07 | W3C | Web Content Accessibility Guidelines (WCAG) 2.2 | https://www.w3.org/TR/WCAG22/ | 2023 | 2026-09-05 | Testable web accessibility success criteria | 13, 26, 27 | durable |
| R9-08 | U.S. General Services Administration | Section 508 | https://www.section508.gov/ | updated periodically | 2026-09-05 | U.S. federal ICT accessibility requirements and guidance | 26, 27 | evolving |
| R9-09 | OECD | OECD AI Principles | https://oecd.ai/en/ai-principles | updated periodically | 2026-09-05 | International responsible-AI principles | 27 | evolving |
| R9-10 | California Department of Justice | California Consumer Privacy Act | https://oag.ca.gov/privacy/ccpa | updated periodically | 2026-09-05 | Official California privacy guidance and rights | 26, 27 | volatile |

## Claims requiring release-time verification

- EU AI Act applicability, role classification, prohibited practices, phase-in dates, standards, codes, and guidance
- Current GDPR decisions, transfer mechanisms, national guidance, and sector interpretations
- Current U.S. federal and state AI, privacy, employment, consumer, accessibility, and sector rules
- Current NIST and ISO editions, profiles, mappings, and adoption status
- Current WCAG recommendations and jurisdiction-specific accessibility requirements
- Current incident-reporting, record-retention, conformity-assessment, and transparency duties
- Any statement that a product, architecture, or control is legally compliant

## Recommended chapter placements

- Chapters 19-23: evaluation evidence, representativeness, calibration, and change control
- Chapters 24-27: risk, privacy, accessibility, oversight, governance, and incident obligations
- Chapters 28-32: policy control plane, evidence stores, retention, residency, and audit
- Chapters 34-35: regional deployment, lifecycle, migrations, and retirement
- Chapter 36: Microsoft implementation mappings only after jurisdiction and role are established

## Discrepancies and unresolved questions

1. The Northstar case study needs a declared deployment context before legal mappings can be specific.
2. Provider, deployer, importer, distributor, operator, and user roles differ across regimes.
3. The appropriate fairness measures depend on the decision and affected groups.
4. Auditability must be balanced with privacy, security, intellectual property, and model-provider restrictions.
5. Human-oversight effectiveness needs measurable workload and override criteria.
6. This dossier requires specialist legal, privacy, accessibility, and sector review before chapter acceptance.