# Module 06 Contract: Security, Safety, and Governance

> Status: proposed for J2
> Owner: J2 module-contract author
> Chapters: 24-27
> Last verified: 2026-09-06

## Purpose

This contract turns the evaluated Northstar Research Assistant from Chapters 1-23 into a
system with explicit threat boundaries, least-authority tools, delegated identity, privacy
controls, accessible interactions, meaningful human oversight, and reviewable evidence. It
constrains later chapter briefs, prose, diagrams, exercises, and labs. It does not claim that
Northstar complies with any law, regulation, standard, or policy.

The first pass must begin with familiar examples such as lending a key, checking a visitor's
badge, or asking a person before sending a package. It must explain where each analogy stops
matching software. The engineering pass may then introduce security, identity, privacy,
safety, accessibility, and governance mechanisms. Vendor-neutral Python comes before any
framework or product mapping.

## Entry Contract

Readers may rely on these completed capabilities:

- Chapter 7: typed tools, argument validation, authority classes, and idempotency.
- Chapters 10-12: cited retrieval, permission filtering, and governed memory lifecycle.
- Chapter 13: constrained multimodal interaction and an accessibility check.
- Chapters 16 and 18: durable execution and protocol-bounded capabilities.
- Chapters 19-23: measurable outcomes, representative cases, calibrated evaluation,
  trajectory checks, failure diagnosis, and regression gates.

No cloud account, live model, legal background, or security specialization is assumed. Labs
use Python 3.11, local fixtures, deterministic model and tool doubles, fake identities, and
temporary directories. Live providers and real personal, tenant, secret, or regulated data
are outside the required path.

## Exit Contract

On completion, the reader can:

1. Produce a system-specific threat model with assets, actors, trust boundaries, abuse paths,
   controls, owners, and tests.
2. Enforce least authority through scoped capabilities, secret isolation, egress policy,
   sandboxing where required, transaction limits, approval, revocation, and durable evidence.
3. Trace delegated user identity separately from workload identity and prove authorization,
   tenant isolation, minimization, retention, deletion, encryption assumptions, content
   safety, and accessible interaction behavior.
4. Create a governance record linking intended use, risk ownership, meaningful oversight,
   incident and stop paths, vendor review, change evidence, and qualified legal-review flags.
5. Hand a tested security and governance evidence package to Module 07 without presenting a
   checklist, product, or framework as proof of compliance.

## Module Vocabulary

| Term | Plain-language meaning |
|---|---|
| Asset | Something worth protecting, such as source content, identity, authority, or evidence. |
| Threat actor | A person, system, or process that may deliberately or accidentally cause harm. |
| Trust boundary | A place where data, identity, or control crosses between parties with different guarantees. |
| Threat model | A structured account of what can go wrong, why it matters, and how the design will prevent, detect, or contain it. |
| Prompt injection | Untrusted text that attempts to make a model treat data as instructions. |
| Confused deputy | A system with authority that is tricked into using it for the wrong requester or purpose. |
| Least authority | Giving a component only the permissions, destinations, data, time, and budget needed for one task. |
| Capability | A narrow, explicit permission to perform a typed operation. |
| Delegated identity | Proof that a workload is acting for a particular user within a limited scope and time. |
| Workload identity | The application's own identity, kept separate from the user whose request it serves. |
| Data minimization | Collecting, using, and retaining only data needed for a declared purpose. |
| Content safety | Controls and evaluations for harmful, disallowed, or inappropriate input and output behavior. |
| Meaningful oversight | A person's practical ability to understand, question, change, reject, stop, and recover from a system action. |
| Evidence | A minimized, access-controlled record showing what was tested, decided, approved, changed, or observed. |
| Kill authority | A named role with the ability and procedure to pause or stop the system. |
| Qualified review | Review by people with relevant legal, privacy, security, accessibility, domain, or governance expertise and authority. |

## Required Module Artifacts

- A versioned Northstar threat model and risk register.
- A least-authority capability matrix and tool-policy fixture set.
- A delegated-identity and data-lifecycle trace with negative tenant-isolation tests.
- An accessibility and content-safety evaluation record.
- A governance record with owners, evidence links, oversight measures, incident routing,
  vendor review, kill authority, and qualified legal-review flags.
- A cumulative Module 06 evidence index mapping every control to its threat, test, result,
  owner, review date, and unresolved limitation.

Evidence must not contain credentials, unrestricted source bodies, unnecessary personal data,
or private chain-of-thought. Observable requests, policy decisions, approvals, state changes,
tool results, and outcomes are sufficient.

## Chapter 24: Threat Modeling Agentic Systems

### Purpose

Teach the reader to model both conventional software threats and agent-specific abuse before
choosing controls. Correct the misconception that a system prompt is a security boundary.

### Reader Question

What could an attacker, a bad document, or a mistaken agent make the system do?

### Prerequisites

Chapters 7, 10, 12, and 19.

### Measurable Outcome

Produce a threat model naming assets, actors, trust boundaries, abuse paths, and mitigations,
then test one indirect prompt-injection path.

### Vocabulary

Asset, threat actor, trust boundary, abuse path, attack surface, prompt injection, data
exfiltration, confused deputy, supply-chain risk, memory poisoning, mitigation, and residual
risk.

### Concepts and Scope

- Start from Northstar's intended use, non-agent baseline, data classes, identities, tools,
  actions, model boundary, retrieval path, memory, evidence, and deployment assumptions.
- Identify deliberate attackers, compromised dependencies, malicious or stale sources,
  over-authorized operators, mistaken users, faulty components, and the model as a fallible
  decision component rather than a principal.
- Cover direct and indirect prompt injection, exfiltration, cross-tenant access, confused
  deputy behavior, memory or index poisoning, approval replay, insecure tool input or output,
  evaluator manipulation, denial of service, sensitive telemetry, and supply-chain compromise.
- Separate prevention, detection, containment, recovery, and accepted residual risk. A taxonomy
  is a prompt for analysis, not proof that the threat model is complete.

### Required Artifacts

- A data-flow and trust-boundary model for one complete Northstar request.
- A risk-register row format with asset, actor, precondition, abuse path, consequence, existing
  control, proposed control, test, owner, status, and residual-risk decision.
- A prioritized misuse-case set including indirect injection, exfiltration, confused deputy,
  memory poisoning, supply-chain risk, and one non-malicious failure.
- A deterministic adversarial source fixture and expected policy trace.

### Northstar Increment

Draw trust boundaries and add tests for injection, exfiltration, confused deputy behavior,
supply-chain risk, and memory poisoning. Complete the asset, actor, boundary, misuse-case, and
risk-register threat model. Security review must map prioritized threats to tests and owners.

### Diagram Intents

1. Trust-boundary map: show user, API, runtime, model, retrieval, source, memory, tools,
   approval, evidence store, and external destination. Mark every crossing and label untrusted
   content as data. The equivalent text must enumerate crossings in request order.
2. Indirect prompt-injection path: trace a malicious document from retrieval through model
   output to a denied tool request, showing deterministic policy checks outside the model. The
   equivalent text must identify the control that breaks each possible path.
3. Risk-treatment loop: connect identify, prioritize, prevent, detect, contain, recover, test,
   and reassess. The equivalent text must explain that residual risk remains a decision.

### Safe Activity and Lab

Use paper cards first to label trusted instructions, untrusted documents, permitted actions,
and blocked destinations. Then implement an offline Python test in which a retrieved fixture
contains an instruction to reveal another document and send it to an unapproved destination.
A deterministic model double proposes the action; typed validation, permission checks, and an
egress allowlist must deny it and emit minimized evidence. Use synthetic content only.

### Failure and Evaluation Focus

Reproduce the failure where the model follows the document because the prompt says only
"ignore malicious instructions." Evaluate whether the fixed system denies the action for the
right policy reason, leaks no protected fixture text, stops safely, records the responsible
control, and preserves legitimate retrieval. Include regression cases for encoded injection,
tool-result injection, poisoned memory, and an unavailable policy service that fails closed.

### Approved Sources

SRC-026, SRC-035, SRC-057, SRC-058, and SRC-060. Treat current taxonomies and guidance as
evolving or volatile according to the ledger and reverify them before release.

### Handoff

Chapter 25 receives prioritized abuse paths, trust boundaries, and test fixtures so it can
replace broad tool access with controls tied to named threats. Chapter 27 receives residual
risks, owners, and evidence gaps for governance decisions.

## Chapter 25: Secure Tools and Sandboxes

### Purpose

Show how useful tools can operate without granting the model broad ambient authority. Make
least authority, identity separation, and revocation enforceable runtime properties rather
than prompt instructions.

### Reader Question

How do we let tools do useful work while limiting damage?

### Prerequisites

Chapters 7, 16, 18, and 24.

### Measurable Outcome

Enforce least privilege, secret isolation, egress controls, approval, transaction limits, and
audit evidence in a sandbox escape or misuse test.

### Vocabulary

Least authority, capability, allowlist, deny by default, sandbox, isolation boundary, egress,
secret isolation, transaction limit, approval binding, revocation, protocol peer, and audit
evidence.

### Concepts and Scope

- Compute effective authority as the intersection of task policy, tenant policy, user
  delegation, workload identity, tool policy, destination policy, approval, and budget.
- Use narrow typed capabilities with bounded inputs, outputs, destinations, duration, bytes,
  calls, and consequence class. Authority cannot increase through model output, retrieved
  content, a protocol message, delegation, or retry.
- Keep credentials out of prompts and tool arguments. A gateway obtains short-lived
  credentials only after policy allows the typed request.
- Require sandboxing for any future code execution or computer use. Northstar's required lab
  does not execute arbitrary code or attempt a real sandbox escape.
- Treat authenticated protocol peers and tool results as untrusted. Validate schema, size,
  content, lifecycle state, and authorization locally.
- Bind consequential approval to the exact principal, tool, destination, payload digest,
  policy version, expiry, and idempotency key. Support cancellation and revocation.

### Required Artifacts

- A capability matrix for every Northstar tool, authority class, identity, scope, destination,
  limit, approval rule, revocation path, and evidence event.
- A vendor-neutral policy function and deterministic policy fixtures.
- A secret-flow diagram proving that generated text never receives a credential.
- Negative tests for malformed requests, excess scope, disallowed egress, stale approval,
  replay, duplicate delivery, protocol mismatch, and unavailable policy.

### Northstar Increment

Replace broad tool access with scoped capabilities, sandboxing requirements, allowlists,
approval gates, and revocation. Add least-authority tool gateways, egress control, and
protocol-peer distrust. Injection, exfiltration, schema, destination, and escalation tests
must fail safely.

### Diagram Intents

1. Authority intersection: show task, tenant, user, workload, tool, destination, approval,
   and budget constraints converging on a deny-or-allow decision. The equivalent text must
   explain that the most restrictive result wins.
2. Secretless tool call: show a model proposing a typed request, the runtime validating it,
   the gateway obtaining a short-lived credential, and the tool returning a bounded result.
   The equivalent text must identify where secrets may and may not exist.
3. Consequential action state flow: show requested, policy-checked, awaiting approval,
   approved, executing, reconciled, revoked, denied, and expired states. The equivalent text
   must cover replay and cancellation.

### Safe Activity and Lab

Start with a paper exercise comparing a master key with a one-room key that expires. Build an
offline Python capability gateway around fake `search_sources`, `store_draft`, and
`publish_report` tools. Attempt excess-result reads, cross-scope reads, unapproved egress,
stale approval, payload substitution, and duplicate publication. The fake publisher writes
only to a temporary directory and must deduplicate by idempotency key.

### Failure and Evaluation Focus

Seed an over-broad `execute(tool_name, arguments)` dispatcher whose shared secret and wildcard
destination let an injected request escape policy. The corrected design passes when every
unauthorized variant is denied, allowed tasks still complete, no credential enters a trace,
revocation takes effect before execution, repeated delivery has one outcome, and each policy
decision has a minimized evidence record. Measure false denials as well as blocked misuse.

### Approved Sources

SRC-016, SRC-020, SRC-026, SRC-053, and SRC-059. Protocol, product, and current security
guidance claims are volatile or evolving and require release-time verification.

### Handoff

Chapter 26 receives the capability matrix and policy inputs needed to bind each request to the
right user and tenant. Module 07 receives the gateway, sandbox, egress, approval, revocation,
and evidence boundaries as mandatory production responsibilities.

## Chapter 26: Identity, Privacy, and Content Safety

### Purpose

Connect a request to the right user without confusing user authority with application
authority, then protect data and people throughout collection, use, output, retention,
deletion, and accessible interaction.

### Reader Question

How do we act for the right person while protecting identity, privacy, and access?

### Prerequisites

Chapters 11, 12, 13, 24, and 25.

### Measurable Outcome

Trace delegated identity through one request and prove tenant isolation, data minimization,
retention, deletion, encryption, and content-safety behavior.

### Vocabulary

Principal, delegated identity, workload identity, authentication, authorization, tenant,
tenant isolation, purpose limitation, data minimization, retention, deletion, encryption,
content safety, accessible interaction, and data subject request.

### Concepts and Scope

- Carry tenant, subject, delegated scopes, workload identity, policy version, authentication
  context, purpose, and expiry through API, runtime, retrieval, cache, queue, tool, state,
  evidence, and administrative boundaries. Reauthorize at the source and destination.
- Keep user and workload identities distinct. Never infer authorization from prompt text,
  email-like strings, model output, or a protocol peer's assertion alone.
- Apply purpose limitation and minimization before model input, logs, traces, memory,
  evaluation sets, and approvals. Cross-run memory remains off unless separately justified.
- Define retention and deletion across primary stores, indexes, caches, derived memory,
  evaluation copies, and backup expiry. Do not promise immediate backup deletion.
- State encryption assumptions for transit and storage without treating encryption as a
  substitute for authorization, minimization, or key isolation.
- Evaluate harmful-content handling with declared categories, expected actions, uncertainty,
  appeal or escalation, and false-positive and false-negative measures.
- Test keyboard operation, focus order, labels, status announcements, error recovery, text
  alternatives, and approval comprehension. Accessibility is part of safety and oversight.
- Treat jurisdiction, legal role, lawful basis, rights handling, records, transfer,
  accessibility duties, and sector rules as deployment questions for qualified legal,
  privacy, accessibility, and domain review.

### Required Artifacts

- An end-to-end principal and tenant context trace for one Northstar request.
- A data inventory and lifecycle table covering purpose, class, collection, use, access,
  model exposure, evidence, retention assumption, deletion path, and owner.
- Tenant-isolation, delegated-scope, deletion, export, redaction, and identity-expiry tests.
- A content-safety evaluation matrix with error costs and a human escalation path.
- An accessibility review record for task entry, progress, approval, cancellation, errors,
  and report delivery.

### Northstar Increment

Add user-scoped authorization, tenant filters, privacy controls, content-safety checks, and
accessible user interactions. Propagate delegated identity, isolate workload identity,
classify data, and enforce privacy lifecycle controls. Review end-to-end authorization,
deletion, export, redaction, and accessibility evidence.

### Diagram Intents

1. Delegated-identity sequence: trace user authentication, task admission, workload call,
   source reauthorization, tool policy, and evidence emission while showing the separate user
   and workload identities. The equivalent text must list every reauthorization point.
2. Data-lifecycle map: show collect, classify, minimize, use, store, derive, export, delete,
   and backup expiry for request, source extract, draft, memory, and evidence data. The
   equivalent text must name owners and exceptions.
3. Accessible safety decision flow: show allowed output, blocked output, uncertain result,
   human escalation, explanation, correction, and appeal. The equivalent text must describe
   keyboard and nonvisual status behavior.

### Safe Activity and Lab

Use colored paper tokens to distinguish a user badge from a service badge, then implement an
offline Python request pipeline with two fake tenants, short-lived delegated scopes, a fake
workload identity, local encrypted-at-rest assumptions recorded as metadata, and synthetic
documents. Tests must reject a cross-tenant cache hit, expired identity, excess scope, and
unauthorized export; delete all primary and derived temporary copies; redact evidence; and
exercise a deterministic content-safety classifier. Add an automated semantic check for
labels and status text plus a manual keyboard and screen-reader-oriented checklist. Do not use
real personal data or claim that the exercise proves legal compliance.

### Failure and Evaluation Focus

Reproduce a cache keyed only by document ID and a worker that silently substitutes its own
authority for the user's. Evaluate zero unauthorized fixture disclosures, complete tenant-key
propagation, correct source reauthorization, deletion coverage, minimized traces, identity
expiry behavior, classifier confusion cases, and accessibility task completion. Report
content-safety false positives and false negatives separately. Record unresolved legal or
policy questions for qualified review rather than turning them into code assumptions.

### Approved Sources

SRC-037, SRC-044, SRC-053, SRC-063, and SRC-066. Mark current product, library, safety-tool,
and regulatory interpretations volatile or evolving as the ledger requires. Qualified legal
review must determine applicability and obligations.

### Handoff

Chapter 27 receives the data inventory, accessibility evidence, content-safety results,
identity trace, and unresolved qualified-review flags. Modules 07 and 08 receive tenant-key,
authorization, retention, deletion, redaction, and accessible-operation requirements that
production architecture and scale work may not weaken.

## Chapter 27: Responsible AI and Governance

### Purpose

Make accountability an operating system of named decisions, evidence, oversight, incident
response, change control, and stop authority. Correct the misconception that governance is a
final compliance document owned by someone else.

### Reader Question

Who is accountable for the system, its risks, and decisions to change or stop it?

### Prerequisites

Chapters 19, 21, 23, 24, and 26.

### Measurable Outcome

Create a governance record with risk classification, owners, evidence, human oversight,
incident path, accessibility review, and qualified legal-review flags.

### Vocabulary

Intended use, foreseeable misuse, risk owner, control owner, evidence owner, risk acceptance,
meaningful oversight, incident, red team, vendor review, change control, kill authority,
retirement, and qualified legal review.

### Concepts and Scope

- Maintain an intended-use inventory with users, affected people, excluded decisions, data,
  models, tools, vendors, deployment context, benefits, harms, and foreseeable misuse.
- Assign accountable risk, control, evidence, incident, accessibility, privacy, security,
  product, and kill-authority owners. A committee name without decision rights is insufficient.
- Link each material risk to a control, test, threshold, result, limitation, owner, review date,
  and decision. Evidence quality and freshness matter more than document volume.
- Make oversight meaningful by measuring comprehension, time and information available,
  ability to edit or reject, independence, workload, accessibility, override behavior,
  escalation, recovery, and automation-bias indicators.
- Define incident intake, containment, evidence preservation, internal escalation, affected
  party communication inputs, correction, learning, and restart authority. Disclosure duties
  and timelines require qualified legal and policy review.
- Review vendor capabilities, limitations, data handling, model or policy changes,
  dependencies, exit paths, and evidence. A vendor attestation does not transfer accountability.
- Gate changes with Module 05 evaluation evidence, security regression results, approval,
  rollback, and retirement criteria. Red-team findings remain tracked until disposition.
- Use laws, standards, and principles as review inputs. Do not state certification,
  conformity, legal applicability, or compliance without qualified determination and evidence.

### Required Artifacts

- A governance record covering intended use, risk classification, owners, decisions, evidence
  links, limitations, review cadence, and unresolved questions.
- A meaningful-oversight plan with task, authority, information, accessibility, workload,
  escalation, and effectiveness measures.
- An incident and kill-authority runbook with named decision rights and restart criteria.
- A red-team findings register and vendor-review record.
- A qualified-review register for legal applicability, privacy, records, transfers,
  accessibility duties, sector rules, notices, and incident disclosure.

### Northstar Increment

Add risk ownership, approval evidence, red-team findings, incident disclosure routing, vendor
review, and a kill authority. Add intended-use inventory, risk acceptance, meaningful
oversight measures, incident handling, change evidence, and retirement criteria. Governance
review must link policy to operating evidence while leaving legal conclusions to qualified
reviewers.

### Diagram Intents

1. Accountability map: connect product, system, risk, control, evidence, review, incident,
   and kill-authority owners to their decisions and escalation paths. The equivalent text must
   distinguish accountability from consultation.
2. Evidence-to-decision flow: show risk, control, test, result, limitation, reviewer,
   acceptance or remediation, expiry, and reassessment. The equivalent text must explain why
   stale or missing evidence blocks acceptance.
3. Meaningful-oversight loop: show proposed action, understandable context, accessible review,
   edit or reject, execution, outcome feedback, appeal, and stop. The equivalent text must
   identify measures for rubber-stamping and automation bias.

### Safe Activity and Lab

Run a tabletop exercise with fictional roles and synthetic Northstar evidence. A seeded
evaluation regression and an indirect-injection finding arrive before a proposed release.
Participants must decide whether to block, narrow, remediate, or accept residual risk; name
who may stop and restart the system; and record evidence and dissent. A small offline Python
validator checks that every material risk has an owner, evidence link, review date, disposition,
kill path, accessibility status, and qualified-review flag where applicable. It must reject a
record that merely says "compliant" or "human reviewed."

### Failure and Evaluation Focus

Reproduce paper governance: broad principles, no owner, an inaccessible approval screen,
unmeasured reviewer workload, stale evidence, unresolved red-team findings, and no stop
authority. Evaluate completeness, traceability, evidence freshness, owner decision rights,
oversight comprehension and rejection ability, incident drill time, accessibility findings,
and whether release gates block missing or failed evidence. Do not score legal compliance;
record the status and owner of qualified legal review.

### Approved Sources

SRC-015, SRC-057, SRC-062, SRC-064, and SRC-068. Regulatory and standards claims require
current primary-source verification and qualified legal interpretation. Principles and
management-system sources guide questions and evidence design; they do not establish
compliance.

### Handoff

Module 07 receives accepted threat boundaries, policy and identity requirements, evidence
schemas, risk and control owners, incident routing, oversight requirements, kill authority,
and unresolved review conditions. Module 08 must preserve these thresholds during scaling,
cost optimization, regional expansion, and lifecycle changes. Module 09 extends them to
hybrid route, device, protocol, tool-portfolio, assurance, and user-experience boundaries
without weakening them. Module 10 Chapter 42 may map them to Microsoft services only through
replaceable adapters and freshly verified product evidence.

## Cross-Module Handoff Contract

### Inputs Preserved from Modules 01-05

- The non-agent baseline and bounded runtime remain available; a security control cannot
  require more autonomy to function.
- Typed tool, retrieval, memory, durable-workflow, and protocol contracts remain vendor-neutral.
- Chapter 19 thresholds and Chapters 20-23 datasets, evaluators, trajectories, traces,
  ablations, and regression gates are the measurement foundation.
- Consequential actions retain authorization, exact-payload approval, idempotency,
  cancellation, recovery, and durable evidence.

### Outputs Required by Modules 07-10

- Module 07 must assign every accepted threat boundary, authority check, identity flow, data
  control, oversight action, evidence event, incident path, and kill switch to a production
  component and owner.
- Module 08 may optimize or distribute only designs that continue to pass Module 06 isolation,
  authority, privacy, safety, accessibility, oversight, and evidence gates.
- Module 09 must carry stable requirements into hybrid route, hardware, fault, protocol, tool,
  assurance, and experience decisions without weakening them.
- Module 10 Chapter 42 must map stable requirements and the accepted Module 09 packet to
  Microsoft candidates without weakening them. Product names, availability, SDK behavior,
  regions, data handling, and security features are volatile claims that require current
  approved evidence.
- Any unresolved legal, regulatory, privacy, accessibility, records, transfer, sector, or
  incident-disclosure question remains visibly blocked or conditionally owned until qualified
  review. No downstream module may convert it into a compliance claim.

## Acceptance Criteria

- [ ] Chapters 24-27 preserve the curriculum map's reader questions, direct prerequisites,
  measurable outcomes, Northstar increments, and approved source sets.
- [ ] Every chapter includes purpose, vocabulary, concepts, required artifacts, at least two
  diagram intents with equivalent text, a safe activity, an offline Python lab, failure and
  evaluation focus, approved sources, and a handoff.
- [ ] The threat model covers assets, actors, trust boundaries, abuse paths, injection,
  exfiltration, confused deputy behavior, memory poisoning, supply chain, tenants, telemetry,
  evaluators, mitigations, owners, tests, and residual risk.
- [ ] Least authority is enforced outside prompts through typed capabilities, separate
  identities, secret isolation, allowlists, egress limits, transaction limits, approval,
  revocation, idempotency, sandbox requirements, and evidence.
- [ ] Delegated user identity and workload identity remain distinct and tenant context is
  checked across runtime, data, cache, queue, tool, telemetry, and administration boundaries.
- [ ] Privacy work covers purpose limitation, minimization, access, retention assumptions,
  deletion, export, redaction, encryption assumptions, derived copies, evaluation data, and
  backup expiry.
- [ ] Content-safety evaluation reports declared categories, expected actions, uncertainty,
  escalation, false positives, and false negatives.
- [ ] Accessibility is evaluated for task entry, status, errors, approval, rejection,
  cancellation, escalation, and report delivery, including keyboard and nonvisual use.
- [ ] Human oversight is informed, authorized, accessible, independent where required,
  revocable, measurable, and able to edit, reject, stop, escalate, and recover.
- [ ] Governance links intended use, risks, controls, tests, results, limitations, owners,
  review dates, incidents, vendor findings, changes, kill authority, and retirement criteria.
- [ ] Evidence is minimized, access controlled, freshness dated, linked to decisions, and free
  of secrets, unnecessary personal data, unrestricted content, and private chain-of-thought.
- [ ] Labs run on Python 3.11 offline with deterministic doubles, synthetic fixtures, zero
  provider spend, no cloud account, no arbitrary code execution, and cleanup instructions.
- [ ] Legal and regulatory sources are framed as engineering and review inputs. Applicability,
  obligations, conformity, certification, and compliance require qualified legal review.
- [ ] Volatile and evolving claims are marked for release-time reverification against the
  approved source ledger.
- [ ] The cumulative evidence package is sufficient for Module 07 ownership and architecture
  assignment, and unresolved conditions remain explicit blockers or owned follow-ups.

## Contract Handoff

The chapter author must return the chapter brief, diagram descriptions, lab contract, fixture
plan, evaluation matrix, and source list to the Module 06 lead. The Module 06 lead must publish
one cumulative evidence index and discrepancy list to the Module 07 lead. Any proposed change
to a frozen question, prerequisite, outcome, Northstar increment, source set, or cross-module
requirement requires a coordinated contract change before drafting proceeds.