# Appendix C: Agentic AI Security Review

Use this template from idea formation through production operation. It is a review record, not
a claim that an agentic system is secure. Replace every bracketed field, attach reproducible
evidence, and record an owner for every open risk. Keep tests harmless, offline, deterministic,
and based on synthetic data. Do not use live attack targets, real credentials, personal data,
malware, or unapproved external services.

## Review record

| Field | Entry |
|---|---|
| System or change | [Name and short description] |
| Review ID | [Stable identifier] |
| Review stage | [Idea / Design / Code / Pre-release / Production] |
| Version, commit, or build | [Immutable identifier] |
| Environments | [Local / test / staging / production] |
| Tenants and regions | [Scope] |
| Review date | [YYYY-MM-DD] |
| Security reviewer | [Name and role] |
| Engineering owner | [Name and role] |
| Product owner | [Name and role] |
| Incident owner | [Name and role] |
| Decision | [Pass / Conditional pass / Block] |
| Revisit date or trigger | [Date, release, architecture change, or incident] |

## Related chapters

- [Chapter 24: Threat Modeling Agentic Systems](../modules/06-security-safety-governance/chapters/24-threat-modeling-agentic-systems.md)
- [Chapter 25: Secure Tools and Sandboxes](../modules/06-security-safety-governance/chapters/25-secure-tools-and-sandboxes.md)
- [Chapter 26: Identity, Privacy, and Content Safety](../modules/06-security-safety-governance/chapters/26-identity-privacy-content-safety.md)
- [Chapter 27: Responsible AI and Governance](../modules/06-security-safety-governance/chapters/27-responsible-ai-governance.md)
- [Chapter 29: Reliability Engineering](../modules/07-production-architecture-operations/chapters/29-reliability-engineering.md)
- [Chapter 30: Observability and Site Reliability Engineering](../modules/07-production-architecture-operations/chapters/30-observability-and-sre.md)
- [Chapter 31: Deployment and Delivery](../modules/07-production-architecture-operations/chapters/31-deployment-and-delivery.md)
- [Chapter 38: AI System Testing and Fault Tolerance](../modules/09-hybrid-ai-systems-engineering/chapters/38-ai-system-testing-fault-tolerance.md)
- [Chapter 39: MCP and Tool Portfolio Engineering](../modules/09-hybrid-ai-systems-engineering/chapters/39-mcp-tool-portfolio-engineering.md)
- [Chapter 40: Secure by Design AI Systems](../modules/09-hybrid-ai-systems-engineering/chapters/40-secure-by-design-ai-systems.md)
- [Chapter 41: Product and UX Design for Agentic Systems](../modules/09-hybrid-ai-systems-engineering/chapters/41-product-ux-design-agentic-systems.md)
- [Chapter 42: Northstar on the Microsoft Stack](../modules/10-microsoft-synthesis-capstone/chapters/42-northstar-on-microsoft-stack.md)

## 1. Scope and security objectives

### In scope

- User journeys: [List]
- Models, agents, workflows, evaluators, and memory: [List]
- Model Context Protocol (MCP) servers and tools: [List]
- Local components and cloud services: [List]
- Data stores, indexes, queues, logs, and caches: [List]
- Identities, tenants, subscriptions, projects, and networks: [List]
- Build, deployment, update, and rollback paths: [List]

### Out of scope

- [Excluded component, reason, accountable owner, and follow-up date]

### Security objectives

- [ ] Untrusted data cannot grant authority or change policy.
- [ ] Every consequential action is authorized for the exact principal, tenant, purpose, tool,
      arguments, destination, and time window.
- [ ] Sensitive data stays within its approved route and retention boundary.
- [ ] Models, MCP servers, tools, evaluators, and dependencies have verified provenance.
- [ ] Failures stop safely, remain observable, and support tested containment and recovery.
- [ ] Resource use stays within latency, cost, energy, and thermal budgets.
- [ ] Residual risk has a named owner and an explicit decision.

### Assumptions and constraints

| ID | Assumption or constraint | How verified | Failure consequence | Owner |
|---|---|---|---|---|
| A-01 | [Example: local model host has no direct internet egress] | [Test or configuration evidence] | [Impact if false] | [Owner] |
| A-02 | [Add row] | [Evidence] | [Impact] | [Owner] |

## 2. Assets and actors

### Asset inventory

| Asset | Sensitivity or criticality | Location | Allowed use and destination | Retention | Integrity or availability need | Owner |
|---|---|---|---|---|---|---|
| User request and attachments | [Class] | [Store or transient path] | [Purpose and route] | [Period] | [Need] | [Owner] |
| System prompts and policy | [Class] | [Location] | [Authorized runtime only] | [Period] | [Need] | [Owner] |
| Model weights and adapters | [Class] | [Local or cloud] | [Approved runtime] | [Period] | [Need] | [Owner] |
| Tool credentials and tokens | [Class] | [Secret store] | [Bound identity and tool] | [Period] | [Need] | [Owner] |
| Memory and retrieval index | [Class] | [Location] | [Tenant and purpose] | [Period] | [Need] | [Owner] |
| Evaluator data and scores | [Class] | [Location] | [Release decision] | [Period] | [Need] | [Owner] |
| Audit and incident evidence | [Class] | [Location] | [Authorized reviewers] | [Period] | [Need] | [Owner] |

### Actor inventory

| Actor | Intent | Authenticated identity | Permitted authority | Explicitly forbidden | Owner |
|---|---|---|---|---|---|
| End user | [Benign or potentially abusive] | [Identity source] | [Capabilities] | [Boundaries] | [Owner] |
| Operator or administrator | [Intent] | [Identity source] | [Capabilities] | [Boundaries] | [Owner] |
| Agent runtime | Complete bounded task | [Workload identity] | [Capabilities] | Grant itself authority | [Owner] |
| Model provider or local model | Produce proposals | [Service or artifact identity] | Return output only | Authorize tools or policy | [Owner] |
| MCP server or tool | Perform typed operation | [Workload identity] | [Least privilege] | Expand scope or destination | [Owner] |
| External data source | Supply data | [Source identity] | Return authorized data | Issue runtime instructions | [Owner] |
| Evaluator | Measure behavior | [Workload identity] | Read bounded evidence | Change production policy directly | [Owner] |
| Adversary or compromised dependency | Abuse trust or access | [Unknown or stolen] | None | All protected actions | [Owner] |

## 3. Data flow

Create a data-flow diagram and number every crossing. Include user input, system instructions,
retrieval, model calls, memory, MCP discovery, tool calls, approvals, outputs, telemetry, and
updates. Mark data classification, tenant, purpose, encryption, retention, and egress policy.

| Flow ID | From -> To | Data and classification | Purpose | Validation or transformation | Storage or retention | Egress rule | Evidence |
|---|---|---|---|---|---|---|---|
| D-01 | [Source -> destination] | [Data and class] | [Purpose] | [Checks and redaction] | [Location and period] | [Allow or deny rule] | [Link or artifact] |
| D-02 | [Add row] | [Data] | [Purpose] | [Checks] | [Retention] | [Rule] | [Evidence] |

Review questions:

- [ ] Does every flow preserve principal, tenant, purpose, classification, and correlation ID?
- [ ] Can retrieved content, tool output, or memory be mistaken for system instructions?
- [ ] Is cloud fallback denied for data marked local-only, restricted, or tenant-bound?
- [ ] Are telemetry and evaluator inputs minimized and redacted before storage or export?
- [ ] Are deletion, retention, backup, and legal-hold behaviors explicit and testable?

## 4. Authority flow and approvals

Draw authority separately from data. Model output is a proposal, not permission. Record who may
request, approve, execute, cancel, and audit each consequential action.

| Action | Requester | Authorizer | Executing identity | Scope and expiry | Exact approval binding | Revocation or cancellation | Evidence |
|---|---|---|---|---|---|---|---|
| [Action] | [Principal] | [Policy or human] | [Identity] | [Tenant, resource, time] | [Tool, arguments, target, digest] | [Mechanism] | [Artifact] |

Approval checks:

- [ ] Approval is required at the last responsible moment for consequential side effects.
- [ ] The approval view shows the exact action, arguments, target, data disclosure, cost, and risk.
- [ ] Approval is bound to an immutable action digest and expires after a short interval.
- [ ] Changed arguments, target, tenant, route, or policy require a new approval.
- [ ] Batch, delegated, standing, and emergency approvals have explicit limits and owners.
- [ ] Denial, timeout, cancellation, replay, and duplicate delivery stop safely.
- [ ] Idempotency prevents repeated side effects after retries or recovery.

Northstar example: publishing a report is proposed by the model, authorized by policy and a
named reviewer, bound to the report digest and destination, then executed once by a narrowly
scoped publishing identity. Text found in a document cannot satisfy that approval.

## 5. Trust boundaries

| Boundary | Trusted side | Untrusted or less-trusted side | Crossing controls | Fail-closed behavior | Test and evidence | Owner |
|---|---|---|---|---|---|---|
| User -> application | [Side] | [Side] | Authentication, input limits, tenant binding | [Behavior] | [Test] | [Owner] |
| Runtime -> model | [Side] | Model input and output | Data minimization, route policy, output validation | [Behavior] | [Test] | [Owner] |
| Retrieval -> runtime | Runtime policy | Retrieved content | Source authorization, labels, quoting, instruction isolation | [Behavior] | [Test] | [Owner] |
| Runtime -> MCP or tool | Policy gate | Tool metadata and execution | Registry, schema, least privilege, sandbox, egress | [Behavior] | [Test] | [Owner] |
| Tenant -> tenant | Current tenant | Other tenants | Partitioning, authorization, scoped keys and caches | [Behavior] | [Test] | [Owner] |
| Local -> cloud | Local policy | External processing | Classification gate, consent, minimization, allowlist | [Behavior] | [Test] | [Owner] |
| Build -> runtime | Signed release | Dependencies and artifacts | Provenance verification and admission policy | [Behavior] | [Test] | [Owner] |
| Evaluator -> release gate | Release policy | Scores and evidence | Independent validation, immutable records, quorum | [Behavior] | [Test] | [Owner] |

## 6. Abuse and misuse cases

Write cases as bounded system behaviors, not attack instructions. Include malicious actors,
ordinary mistakes, compromised components, and control-plane failures.

| Case ID | Actor or failure | Goal or accident | Entry point | Asset and impact | Expected prevention or containment | Test ID | Owner |
|---|---|---|---|---|---|---|---|
| AM-01 | Synthetic document contains an instruction-like sentence | Redirect Northstar from research to disclosure | Retrieval | Restricted report | Treat content as data; deny unapproved destination | T-01 | [Owner] |
| AM-02 | Tool metadata requests unnecessary context | Collect more data than the operation needs | MCP discovery | User and tenant data | Registry policy and context minimization reject metadata | T-02 | [Owner] |
| AM-03 | Cloud route becomes unavailable | Unsafe fallback or repeated calls | Router | Private input, budget, availability | Stay local or stop within retry budget | T-03 | [Owner] |
| AM-04 | Evaluator fixture carries a forged success label | Influence release decision | Evaluation pipeline | Assurance result | Recompute score and verify immutable fixture manifest | T-04 | [Owner] |
| AM-05 | [Add system-specific case] | [Goal] | [Entry] | [Impact] | [Expected behavior] | [Test] | [Owner] |

## 7. Local and cloud hybrid routing

| Data class or task | Local route | Cloud route | Fallback | User notice or consent | Budget | Evidence |
|---|---|---|---|---|---|---|
| Public, approved content | [Model and version] | [Approved endpoint] | [Rule] | [Requirement] | [Limit] | [Test] |
| Local-only or restricted content | [Model and version] | Denied | Safe stop or local queue | [Requirement] | [Limit] | [Test] |
| Consequential action planning | [Route] | [Route] | No silent route change | [Requirement] | [Limit] | [Test] |

- [ ] Routing is deterministic for security-relevant classifications.
- [ ] The router evaluates data class, tenant, region, purpose, model capability, and policy version.
- [ ] A local failure cannot silently send data to a cloud model.
- [ ] Cloud requests contain only the minimum approved context.
- [ ] Route decisions and denials are observable without logging sensitive content.
- [ ] Local and cloud paths enforce equivalent identity, approval, output, and retention controls.
- [ ] Offline, metered, degraded, and thermal-limited states have explicit safe behavior.

Northstar example: a restricted attachment stays on the verified local model path. If that model
cannot complete the task, Northstar reports the limitation instead of invoking cloud fallback.

## 8. Model provenance and update control

For every local or hosted model, adapter, tokenizer, runtime, and safety component, record:

| Component | Source and publisher | Version and digest | Signature or attestation | License and use approval | Evaluation baseline | Update and rollback owner |
|---|---|---|---|---|---|---|
| [Model or component] | [Approved source] | [Immutable ID] | [Verification] | [Decision] | [Evidence] | [Owner] |

- [ ] Artifact identity is verified before admission and again at load time.
- [ ] Mutable tags are resolved to immutable versions.
- [ ] Storage, download, cache, and update paths are integrity protected.
- [ ] Model cards and provider claims are treated as inputs to review, not proof of system safety.
- [ ] A model or adapter change triggers compatibility, security, privacy, quality, and cost tests.
- [ ] The previous approved artifact and configuration can be restored without external lookup.

## 9. MCP server and tool supply chain

| Server, tool, or dependency | Publisher and source | Version or digest | Requested permissions | Network destinations | Data classes | Admission and update decision | Owner |
|---|---|---|---|---|---|---|---|
| [Component] | [Source] | [Immutable ID] | [Permissions] | [Allowlist] | [Classes] | [Decision] | [Owner] |

- [ ] MCP servers and tools come from an approved registry with verified provenance.
- [ ] Tool names, descriptions, schemas, defaults, and examples are reviewed as untrusted input.
- [ ] Runtime discovery cannot add an unreviewed server, tool, prompt, resource, or capability.
- [ ] Dependency locks, artifact attestations, vulnerability review, and update ownership are current.
- [ ] Startup and periodic checks detect unexpected tool-set, schema, permission, or digest changes.
- [ ] Revocation disables a compromised component without requiring a full application release.
- [ ] Tool output is size limited, typed when possible, labeled by origin, and treated as untrusted.

## 10. Tool pollution and overprivilege

Tool pollution occurs when too many, ambiguous, deceptive, or unnecessary tools influence model
selection or expand the attack surface. Overprivilege occurs when a tool or its identity can do
more than the reviewed task requires.

- [ ] Each workflow receives only the tools needed for its current state.
- [ ] Similar tool names and descriptions cannot cause ambiguous selection.
- [ ] High-impact tools are separated from read-only tools and require stronger authorization.
- [ ] Tool identities are scoped by tenant, resource, operation, destination, and lifetime.
- [ ] Policy validates typed arguments after model generation and before execution.
- [ ] Server-side authorization is repeated at the protected resource.
- [ ] Tool concurrency, recursion, retries, response size, and total calls are bounded.
- [ ] Unused and deprecated tools are removed from discovery and access policy.

Northstar example: the research workflow can search an approved synthetic corpus but cannot see
the publishing tool until the report reaches the reviewed publication state.

## 11. Prompt and tool-result injection

- [ ] System instructions, user requests, retrieved content, memory, and tool results stay in
      distinct labeled channels or typed fields.
- [ ] Retrieved and tool-returned instructions never grant identity, authority, approval, or egress.
- [ ] Policy enforcement occurs outside the model and does not depend on refusal text.
- [ ] Encoded, fragmented, quoted, multilingual, and nested synthetic instruction patterns are tested.
- [ ] Tool-result rendering prevents active content or instruction-like text from changing control flow.
- [ ] The system safely handles model disagreement with policy and explains blocked actions to users.
- [ ] Benign documents with similar wording remain usable, measuring false-denial behavior.

## 12. Data exfiltration and secrets

- [ ] Every outbound path is inventoried, including models, tools, links, logs, traces, errors,
      notifications, clipboard, files, and caches.
- [ ] Destination allowlists and data-class rules are enforced outside the model.
- [ ] Outputs are minimized and scanned for disallowed sensitive data before release.
- [ ] Real secrets never enter prompts, fixtures, evaluator data, source control, or general logs.
- [ ] Workload identities use a managed secret store, short-lived tokens, and rotation.
- [ ] Secret values are redacted while stable non-secret event identifiers remain observable.
- [ ] Error handling cannot echo prompts, tokens, connection strings, or restricted tool results.
- [ ] Backups, exports, support bundles, and incident evidence follow the same controls.

Northstar example: a synthetic marker shaped like `SYNTHETIC_SECRET_DO_NOT_EXPORT` is blocked from
an unapproved report destination, and the evidence records only the marker category and event ID.

## 13. Identity and tenant isolation

- [ ] Human and workload identities are authenticated independently.
- [ ] Authorization is evaluated at request entry, retrieval, memory, tool, data source, and output.
- [ ] Tenant context is immutable across a run and included in cache, queue, index, and log keys.
- [ ] Cross-tenant access is denied even when a model proposes a valid-looking resource ID.
- [ ] Administrative, support, and emergency access is time bound, approved, and audited.
- [ ] Delegation preserves the initiating principal, intended audience, purpose, and expiry.
- [ ] Shared models and infrastructure do not create shared memory or telemetry visibility.
- [ ] Tenant deletion and key revocation remove or render tenant data inaccessible as designed.

## 14. Insecure output handling

Treat model and tool output as untrusted until the consuming context validates it.

| Output sink | Required validation or encoding | Forbidden content or behavior | Failure behavior | Test |
|---|---|---|---|---|
| Web or rich text | [Context-aware sanitization] | Active script, unsafe links, hidden instructions | Render inert text or block | [Test] |
| Command or tool argument | Typed schema and allowlist | Unparsed free-form execution | Reject | [Test] |
| Query or filter | Parameterization and bounds | Structure-changing input | Reject | [Test] |
| File path or name | Canonicalization and approved root | Traversal or executable output | Reject | [Test] |
| Report or notification | Classification and destination check | Restricted disclosure | Hold for review | [Test] |

## 15. Evaluator attack and assurance integrity

- [ ] Evaluation fixtures, expected results, scoring code, and thresholds are versioned and reviewed.
- [ ] Untrusted model output cannot edit its evaluator, expected answer, policy, or release threshold.
- [ ] Hidden and rotating synthetic cases reduce direct optimization to a public test set.
- [ ] Security-critical decisions use deterministic checks where possible.
- [ ] Evaluator inputs and outputs are size, time, data-class, and tenant bounded.
- [ ] At least one independent check verifies evaluator calculations and evidence completeness.
- [ ] Missing, malformed, timed-out, or conflicting evaluation results block the relevant gate.
- [ ] False allows, false denies, score drift, and escaped defects are monitored over time.

## 16. Memory poisoning

- [ ] Memory writes require an authenticated principal, tenant, purpose, source, and policy decision.
- [ ] Untrusted content is labeled and cannot become a system instruction or durable approval.
- [ ] Candidate memories are validated, deduplicated, size limited, and assigned expiry.
- [ ] Retrieval enforces current authorization rather than trusting authority stored with old content.
- [ ] Sensitive and tenant-bound memory has deletion, correction, quarantine, and provenance controls.
- [ ] Suspicious write patterns and sudden retrieval shifts are detectable.
- [ ] Recovery can rebuild memory from a known-good snapshot and verified source set.

Northstar example: a synthetic document can contribute a cited fact to a report, but its sentence
requesting future publication is never promoted into Northstar's durable instruction memory.

## 17. Resource, cost, and thermal exhaustion

| Resource | Per-step limit | Per-run limit | Per-principal or tenant limit | System limit | Degraded behavior | Alert and owner |
|---|---|---|---|---|---|---|
| Model tokens or calls | [Limit] | [Limit] | [Limit] | [Limit] | [Stop or reduce] | [Alert and owner] |
| Tool calls and retries | [Limit] | [Limit] | [Limit] | [Limit] | [Stop safely] | [Alert and owner] |
| Wall time and concurrency | [Limit] | [Limit] | [Limit] | [Limit] | [Queue or cancel] | [Alert and owner] |
| Cloud spend | [Limit] | [Limit] | [Limit] | [Limit] | [Deny or cheaper route] | [Alert and owner] |
| Local CPU, memory, disk, energy, temperature | [Limit] | [Limit] | [Limit] | [Limit] | [Throttle or stop] | [Alert and owner] |

- [ ] Limits are enforced outside the model and cannot be raised by retrieved content or tool output.
- [ ] Recursive delegation, retry storms, oversized context, output flooding, and queue growth are bounded.
- [ ] Reservation and fairness controls prevent one principal or tenant from starving others.
- [ ] Thermal throttling and battery state cannot trigger unsafe cloud fallback.
- [ ] Cancellation propagates to models, tools, subprocesses, queues, and pending approvals.

## 18. Sandbox and egress

- [ ] Untrusted code or file processing runs in an isolated, disposable environment.
- [ ] The sandbox has a read-only base, bounded writable storage, and no inherited credentials.
- [ ] Process, file, device, interprocess, network, time, memory, and compute access are minimized.
- [ ] Network egress is denied by default and allowed only through an audited gateway.
- [ ] Domain, protocol, port, method, tenant, data class, and payload size are enforced as applicable.
- [ ] Private network and metadata-service access are explicitly denied unless reviewed.
- [ ] Sandbox escape indicators trigger containment, evidence capture, and component revocation.
- [ ] Cleanup is deterministic and verified after success, denial, timeout, and crash.

## 19. Monitoring and detection

| Signal | Security question | Data minimization | Threshold or detection | Response | Retention | Owner |
|---|---|---|---|---|---|---|
| Policy denials | Are injection or overreach attempts increasing? | [Fields, no sensitive body] | [Rule] | [Action] | [Period] | [Owner] |
| Route changes | Did data cross an unexpected local or cloud boundary? | [Fields] | [Rule] | [Action] | [Period] | [Owner] |
| Tool-set drift | Did an MCP server, schema, or permission change? | [Fields] | [Rule] | [Action] | [Period] | [Owner] |
| Resource use | Is a run approaching cost or thermal limits? | [Fields] | [Rule] | [Action] | [Period] | [Owner] |
| Isolation failure | Is there possible tenant or sandbox boundary failure? | [Fields] | [Rule] | [Action] | [Period] | [Owner] |

- [ ] Events include time, run ID, principal, tenant, component version, route, policy version, and outcome.
- [ ] Logs exclude raw secrets and minimize prompts, retrieved text, tool results, and personal data.
- [ ] Detection covers allowed actions as well as denied actions.
- [ ] Clock, correlation, integrity, access control, retention, and deletion are tested.
- [ ] Alerts have severity, paging route, runbook, owner, and measurable response objective.
- [ ] Monitoring failure is visible and blocks security-critical operation where required.

## 20. Incident response and rollback

| Scenario | Detection | Immediate containment | Investigation evidence | Recovery | Communication | Owner |
|---|---|---|---|---|---|---|
| Suspected model or adapter compromise | [Signal] | Pin known-good model; disable update | [Evidence] | Restore and re-evaluate | [Plan] | [Owner] |
| Compromised MCP server or tool | [Signal] | Revoke server, identity, token, and egress | [Evidence] | Replace from verified artifact | [Plan] | [Owner] |
| Cross-tenant exposure | [Signal] | Stop affected routes and isolate tenant data | [Evidence] | Correct partitions and validate deletion | [Plan] | [Owner] |
| Memory poisoning | [Signal] | Quarantine writes and affected memories | [Evidence] | Rebuild from known-good sources | [Plan] | [Owner] |
| Cost or thermal exhaustion | [Signal] | Cancel work, throttle, and prevent fallback | [Evidence] | Restore budgets and capacity | [Plan] | [Owner] |

- [ ] The incident commander, security, privacy, engineering, product, and communication roles are named.
- [ ] Kill switches can disable a model, route, tenant, MCP server, tool, memory write, or output sink.
- [ ] Credential revocation and rotation do not require the suspected component to cooperate.
- [ ] Rollback covers artifacts, prompts, policy, tool registry, schemas, evaluators, memory, and routing.
- [ ] Rollback compatibility, data migration, and forward recovery are rehearsed.
- [ ] Post-incident actions update abuse cases, controls, tests, monitoring, and residual risk.

## 21. Assurance case

Each material threat needs one end-to-end row. Split a row when different assets, tenants,
routes, or owners require different controls. Evidence must be reproducible and tied to the
reviewed version.

| Threat | Prevent | Detect | Contain | Recover | Test | Evidence | Owner | Residual decision |
|---|---|---|---|---|---|---|---|---|
| Retrieved content proposes disclosure to an unapproved destination | Label content as data; enforce destination and authority policy outside the model | Record denied destination category and policy rule | Block tool call and keep report in review state | Resume with approved sources and route | T-01 synthetic indirect-instruction case | [Test result, policy version, trace ID] | [Owner] | [Accept / Mitigate / Transfer / Avoid, rationale, approver, date] |
| Local-only content reaches cloud fallback | Deterministic classification and route gate | Alert on denied or mismatched route | Cancel request before egress | Retry locally or stop with user-visible limitation | T-03 simulated local model outage | [Router decision and zero-egress evidence] | [Owner] | [Decision] |
| MCP tool metadata requests excess context | Approved registry, reviewed schema, minimum context projection | Detect registry or metadata drift | Hide and revoke the tool | Restore verified server and registry snapshot | T-02 synthetic metadata case | [Manifest, diff, denial event] | [Owner] | [Decision] |
| Memory entry attempts to persist authority | Validate writes; forbid authority-bearing memory | Detect suspicious durable writes and provenance gaps | Quarantine entry and dependent outputs | Rebuild from known-good snapshot | T-05 synthetic memory-poison case | [Write denial and clean retrieval result] | [Owner] | [Decision] |
| Evaluator input attempts to force a passing result | Immutable fixtures and independent deterministic gate | Verify fixture digest and score recomputation | Block release on mismatch | Restore approved evaluator bundle | T-04 synthetic forged-label case | [Digest check and blocked gate] | [Owner] | [Decision] |
| Run exceeds cost or thermal budget | Enforced call, spend, time, energy, and temperature limits | Budget and host telemetry alerts | Cancel run and deny unsafe fallback | Cool down or resume under a new approved budget | T-06 bounded exhaustion simulation | [Limit event and cleanup proof] | [Owner] | [Decision] |
| [System-specific threat] | [Control] | [Signal] | [Boundary] | [Procedure] | [Test ID] | [Artifact] | [Named owner] | [Decision, rationale, approver, date] |

### Residual risk decision record

| Risk ID | Remaining exposure | Likelihood and impact | Compensating control | Decision | Accountable owner | Approver | Expiry or trigger |
|---|---|---|---|---|---|---|---|
| [ID] | [Exposure] | [Rating and basis] | [Control] | [Accept / Mitigate / Transfer / Avoid] | [One named owner] | [Authorized approver] | [Date or trigger] |

No risk is accepted by silence. Conditional acceptance needs an expiry, tracked action, and
named approver with authority over the affected asset and tenant.

## 22. Stage gates

### Idea gate

- [ ] Intended users, prohibited uses, consequential actions, and human responsibilities are named.
- [ ] Initial assets, actors, data classes, tenants, local or cloud routes, and harms are identified.
- [ ] A simpler non-agent or bounded-workflow alternative has been considered.
- [ ] Security, privacy, safety, operational, cost, and thermal feasibility have owners.
- [ ] Unacceptable risks and stop conditions are documented before design begins.

Gate evidence: [Concept review, initial abuse cases, decision, approver, date]

### Design gate

- [ ] Data-flow, authority-flow, and trust-boundary diagrams are complete.
- [ ] Abuse and misuse cases cover every material asset and crossing.
- [ ] Model, MCP, tool, identity, approval, sandbox, egress, memory, evaluator, and routing
      controls are allocated to enforceable components.
- [ ] Assurance-case rows include prevention, detection, containment, recovery, tests, evidence,
      owners, and residual decisions.
- [ ] Incident, rollback, monitoring, retention, and deletion designs are reviewable.

Gate evidence: [Architecture decision records, diagrams, assurance case, decision, approver, date]

### Code gate

- [ ] Security controls are implemented outside model prompts where deterministic enforcement is required.
- [ ] Typed interfaces, validation, least privilege, exact approval, idempotency, and limits are tested.
- [ ] Dependency, model, MCP server, tool, and evaluator provenance is verified in the build.
- [ ] Static, dependency, secret, configuration, and policy checks meet defined thresholds.
- [ ] Harmless offline adversarial tests pass, including false-denial checks for benign behavior.

Gate evidence: [Build ID, test report, manifests, findings, exceptions, decision, approver, date]

### Pre-release gate

- [ ] The exact release candidate passes the complete assurance case in a production-like environment.
- [ ] Tenant isolation, egress, sandbox, monitoring, alerting, incident, and rollback exercises pass.
- [ ] Data handling, user notices, approval experience, accessibility, and support procedures are reviewed.
- [ ] Open findings have owners, due dates, residual decisions, and authorized approvers.
- [ ] Progressive rollout, kill switches, health thresholds, and automatic rollback criteria are ready.

Gate evidence: [Release candidate ID, signed evidence bundle, rehearsal results, decision, approver, date]

### Production gate

- [ ] Deployment provenance and policy match the approved release candidate.
- [ ] Canary health, security signals, quality, latency, cost, and thermal budgets remain within limits.
- [ ] No tenant, route, tool-set, permission, model, evaluator, or monitoring drift is unexplained.
- [ ] Incident and rollback owners are available for the rollout window.
- [ ] New evidence and incidents feed back into requirements, abuse cases, tests, and risk decisions.

Gate evidence: [Deployment ID, live configuration digest, dashboards, decision, owner, review date]

## 23. Harmless offline adversarial test checklist

Use deterministic model, tool, identity, clock, network, and telemetry doubles. Use only synthetic
identities, tenants, documents, markers, destinations, and budgets. Tests must not connect to a
live provider, public target, production tenant, or real secret store.

- [ ] T-01: Put an instruction-like sentence in a synthetic retrieved document. Confirm it remains
      labeled as data, cannot grant approval, and cannot change the allowlisted destination.
- [ ] T-02: Present a synthetic MCP tool description that asks for unnecessary context. Confirm the
      registry or context projector rejects it and records a metadata-policy event.
- [ ] T-03: Simulate local-model unavailability for local-only data. Confirm zero cloud egress and a
      bounded, user-visible safe stop.
- [ ] T-04: Change a synthetic evaluator label or fixture manifest. Confirm digest verification or
      independent scoring blocks the release gate.
- [ ] T-05: Ask a memory double to persist instruction-like content or cross-tenant data. Confirm the
      write is denied or quarantined and later retrieval stays clean.
- [ ] T-06: Simulate repeated calls, high token use, low battery, or a thermal threshold. Confirm
      cancellation, cleanup, bounded spend, and no unsafe route change.
- [ ] T-07: Return instruction-like text and an oversized payload from a tool double. Confirm output
      is truncated or rejected and never treated as authority.
- [ ] T-08: Replay an expired approval or change one approved argument. Confirm execution is denied
      and no side effect occurs.
- [ ] T-09: Use two synthetic tenants with similar resource names. Confirm retrieval, memory, caches,
      telemetry views, and tool calls remain isolated.
- [ ] T-10: Place a synthetic secret marker in model output, tool output, and an error path. Confirm
      outbound release and logs redact or block it according to policy.
- [ ] T-11: Supply inert markup, a path-like string, and query-like text as synthetic output. Confirm
      each sink encodes, parameterizes, canonicalizes, or rejects it for its context.
- [ ] T-12: Simulate a changed model, tool schema, server digest, or dependency manifest. Confirm
      admission blocks the unapproved artifact and rollback restores the approved set.
- [ ] T-13: Disable the monitoring double. Confirm security-critical operation fails closed where
      required and the loss of monitoring becomes visible.
- [ ] T-14: Trigger the synthetic incident runbook. Confirm kill switches, revocation, evidence
      capture, known-good restore, and communication assignments complete within objectives.
- [ ] T-15: Run matched benign cases. Confirm controls preserve approved research, retrieval, memory,
      routing, tool use, and publication without unacceptable false denials.

For every test, retain: fixture manifest, seed, component and policy versions, expected result,
actual result, relevant minimized events, cleanup proof, reviewer, date, and linked assurance row.

## 24. Review decision

| Decision area | Result | Evidence | Open action | Owner and due date |
|---|---|---|---|---|
| Scope and architecture | [Pass / Conditional / Block] | [Evidence] | [Action] | [Owner, date] |
| Identity, data, and tenant isolation | [Result] | [Evidence] | [Action] | [Owner, date] |
| Models, MCP servers, tools, and supply chain | [Result] | [Evidence] | [Action] | [Owner, date] |
| Injection, output, memory, and evaluator controls | [Result] | [Evidence] | [Action] | [Owner, date] |
| Sandbox, egress, resource, cost, and thermal controls | [Result] | [Evidence] | [Action] | [Owner, date] |
| Monitoring, incident response, and rollback | [Result] | [Evidence] | [Action] | [Owner, date] |
| Residual risk | [Result] | [Decision record] | [Action] | [Owner, date] |

Decision statement: [Pass, conditional pass, or block, with scope, version, rationale, approver,
date, expiry, and conditions.]

## Launch-blocking conditions

Launch is blocked when any applicable condition below is true:

- A consequential action can execute without external authorization, exact approval binding,
  least privilege, idempotency, or a tested cancellation path.
- Untrusted prompt, retrieved, memory, evaluator, MCP metadata, or tool-result content can grant
  authority, alter policy, cross tenants, or select an unapproved destination.
- Local-only, restricted, secret, personal, or tenant-bound data can reach an unapproved cloud,
  tool, log, evaluator, output, or egress path.
- Model, adapter, MCP server, tool, dependency, evaluator, policy, or release provenance is missing,
  mutable, unverifiable, or different from the reviewed candidate.
- Required sandbox, egress, identity, tenant isolation, output validation, secret handling, or
  resource limits are absent, bypassable, or fail open.
- Security-critical offline tests fail, are flaky, lack cleanup proof, or do not exercise the exact
  release candidate and policy.
- Detection, incident ownership, kill switches, credential revocation, known-good rollback, or
  evidence capture is missing or has not been rehearsed.
- A critical or high finding lacks remediation, or any material residual risk lacks an authorized
  decision, one accountable owner, and an expiry or review trigger.
- Monitoring is blind for a security-critical boundary, or production health exceeds approved
  quality, latency, cost, energy, or thermal limits.

## Launch checklist

- [ ] Review scope and release identifiers match what will be deployed.
- [ ] Assets, actors, data flows, authority flows, and trust boundaries are current.
- [ ] All material abuse and misuse cases map to complete assurance-case rows.
- [ ] Hybrid routing, provenance, MCP and tool supply chain, injection, exfiltration, secrets,
      identity, tenant, output, evaluator, memory, and resource controls pass review.
- [ ] Approvals, sandbox, egress, monitoring, incident response, and rollback evidence is attached.
- [ ] Harmless offline adversarial and matched benign tests pass on the release candidate.
- [ ] Every open action and residual risk has one owner, due date, decision, approver, and expiry.
- [ ] No launch-blocking condition remains true.
- [ ] Final decision is recorded as [Pass / Conditional pass / Block].
- [ ] Accountable launch owner: [Name, role, date, signature or approval record].