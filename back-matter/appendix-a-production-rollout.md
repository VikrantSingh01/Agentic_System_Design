# Appendix A: Production Rollout Evidence Plan

A production rollout is a sequence of evidence-based decisions, not a calendar promise. This
appendix gives engineering, testing, security, product, design, program management, operations,
leadership, executive, and governance reviewers one shared record for deciding whether to
start, hold, expand, constrain, roll back, or retire a release.

Every threshold in this plan is workload-specific. Set thresholds from the accepted task
contract, risk classification, user population, baseline, device classes, service objectives,
and regulatory or organizational obligations before production exposure. The examples below
are patterns, not universal targets. A missing measurement, owner, denominator, or decision rule
is missing evidence and must not be treated as a pass.

## Decision rules

1. Evaluate safety, authority, privacy, security, and other hard invariants separately before
   considering quality, latency, cost, or adoption tradeoffs.
2. Compare the candidate with the accepted baseline on the same eligible tasks and declared
   slices. Count retries, fallback, failed attempts, and human correction in the result.
3. Record each requirement as `pass`, `review`, or `fail`, with the measured value, evidence
   location, evaluator version, time window, and approver.
4. Freeze thresholds before each exposure stage. A changed threshold creates a new decision
   record; it does not rewrite earlier evidence.
5. Stop expansion when required telemetry is absent or stale. Roll back only when state and
   data compatibility make rollback safe; otherwise pause or drain work and use the tested
   roll-forward path.

## Shared evidence register

Use one register for the release. Replace each threshold description with a measurable,
workload-specific value and window. Keep evidence immutable or versioned, access controlled,
and linked from the release record.

| Requirement | Metric | Threshold | Owner | Evidence | Decision |
|---|---|---|---|---|---|
| User value | Eligible users completing the intended job; outcome gain against the accepted baseline; abandonment | Declared minimum gain or non-inferiority by priority slice | Product owner | Cohort analysis, baseline comparison, user research record | Pass, review, or fail |
| UX and control | Time to value; correction burden; pause, cancel, resume, approval, recovery, and undo success | Declared targets for each critical journey and risk tier | Product and design | Usability study, interaction telemetry, journey test results | Pass, review, or fail |
| Accessibility | Critical-task completion across the accepted keyboard, screen reader, zoom, contrast, motion, focus, status, error, and recovery matrix | All release-blocking checks pass; exceptions have an approved owner, mitigation, and date | Accessibility and design | Manual audit, automated checks, assistive-technology test record | Pass, review, or fail |
| Quality | Accepted-task rate and task-specific indicators on the frozen evaluation set and production samples | Declared minimum by task and slice; no prohibited regression against baseline | Evaluation and test | Versioned evaluation run, sample review, evaluator and dataset versions | Pass, review, or fail |
| Safety | Hard-invariant breaches; unsafe output or action rate; refusal and escalation behavior | Zero hard-invariant breaches; scenario thresholds set by risk tier | Safety and governance | Adversarial suite, policy tests, sampled production review | Pass, review, or fail |
| Security and privacy | Authorization denials, boundary and tenant-isolation tests, sensitive-data exposure, open findings | All release-blocking controls and negative tests pass; no unaccepted release-blocking finding | Security and privacy | Threat model, test report, scan and review records, exception register | Pass, review, or fail |
| Reliability | Accepted-task completion, availability, retry and fallback rate, duplicate effects, recovery results | Accepted service and recovery objectives by slice; zero unauthorized duplicate effects | SRE and workflow engineering | Service dashboard, fault test, restore and rollback drill | Pass, review, or fail |
| Latency | End-to-end p50, p95, and p99 per accepted task; queue, retrieval, model, and tool contributions | Declared targets by journey, region, network, and device class | Performance engineering | Load test, traces, cohort comparison, saturation report | Pass, review, or fail |
| Cost | Full cost per accepted task, including idle capacity, retries, evaluation, fallback, storage, and operations | Declared unit-cost ceiling and budget envelope at forecast load | Engineering and finance | Cost allocation report, workload forecast, baseline comparison | Pass, review, or fail |
| On-device energy and thermal | Energy per accepted task; memory and power; temperature; sustained latency and quality; fallback rate | Declared limits by supported device class and test duration; no device-policy breach | Device and performance engineering | Cold, warm, burst, sustained, battery, and thermal test record | Pass, review, or fail |
| Observability | Required event coverage, trace correlation, redaction, metric freshness, alert precision, and access control | Required fields and alerts verified; no release-blocking redaction or coverage gap | Observability owner | Schema check, synthetic trace, redaction test, alert exercise | Pass, review, or fail |
| Incident readiness | Detection, triage, containment, communication, rollback or roll-forward, and evidence preservation | Named responders and tested runbooks meet declared response objectives | Incident commander and TPM | Game-day record, contact tree, runbook output, decision log | Pass, review, or fail |
| Model freshness | Model and adapter version, support status, evaluation compatibility, review age, and fallback readiness | Pinned approved version; review and evaluation remain inside the declared freshness window | Model platform owner | Release manifest, evaluation result, dated review, substitution test | Pass, review, or fail |
| Tool freshness | Tool schema, permission scope, endpoint or dependency version, contract-test age, and effect controls | Pinned approved contract; authorization and effect tests remain inside the declared freshness window | Tool owner and security | Tool inventory, schema diff, contract and denial tests, owner attestation | Pass, review, or fail |
| Source freshness | Source provenance, permission check, index lag, content age, and volatile-claim verification age | Each source meets its declared recency, provenance, and access policy | Knowledge and data owner | Source manifest, index report, access test, dated verification record | Pass, review, or fail |

## Rollout stages

`Day N` is measured from first production exposure. For a rollout split by tenant, region,
device class, or risk tier, repeat the stage gate for each newly exposed cohort.

| Stage | Exposure | Required evidence | Decision authority | Default action |
|---|---|---|---|---|
| Before launch | No production users; production-like tests only | Complete register, accepted baseline, release manifest, threat and governance review, UX and accessibility evidence, capacity test, recovery and incident drills | Accountable release owner with named product, engineering, test, security, operations, and governance approvers | Approve a bounded Day 1 cohort, hold, or reject |
| Day 1 | Smallest controlled cohort with an accepted fallback | Hard invariants, telemetry integrity, live user journey, dependency health, incident staffing, and rollback compatibility | Release owner and on-call incident authority | Hold the cohort until the observation window passes; then expand only to the approved Day 7 limit |
| Day 7 | Limited cohort across declared priority slices | Baseline comparison, quality and value slices, UX and accessibility review, reliability, latency, cost, device results where applicable, incidents, and freshness | Product, engineering, SRE, security, and governance review | Expand, hold, constrain a slice, or roll back |
| Day 30 | Broader staged exposure within accepted scope | Sustained value, adoption and abandonment, correction burden, tail behavior, support load, cost forecast, safety and security sampling, recovery evidence, and threshold drift review | Accountable business and technical owners with governance | Continue staged expansion, cap exposure, remediate, or retire the candidate |
| Day 90 | Steady-state scope or renewal review | Long-window trends, rare failures, incident learning, accessibility and user research follow-up, capacity and cost variance, dependency freshness, and retirement readiness | Executive accountable owner with product, technical, operations, and governance sign-off | Renew, revise scope, replace, or retire |
| Stop or rollback | Affected capability, cohort, or all traffic | Trigger, affected scope, compatibility state, last known good manifest, user impact, and preserved telemetry | On-call stop authority; retrospective approval must not delay containment | Halt expansion, disable the affected path, route to the accepted fallback, roll back when compatible, or roll forward safely |

## Before launch

- Freeze the user job, eligible population, risk tier, task contract, evaluation set, priority
  slices, baseline, formulas, denominators, thresholds, observation windows, and owners.
- Identify one release manifest for code, configuration, prompts, policies, evaluators, models,
  tools, source indexes, schemas, infrastructure, and feature flags. Record provenance and the
  last known good manifest.
- Complete threat modeling, privacy and governance review, safety evaluation, tool and source
  authorization tests, UX review, and the accepted accessibility matrix.
- Run representative quality, load, reliability, cost, and, where applicable, on-device cold,
  warm, burst, sustained, battery, energy, memory, and thermal tests.
- Prove observability, redaction, alerting, kill controls, state compatibility, rollback,
  roll-forward, restore, fallback, incident command, and user communication paths.
- Define who may stop exposure at any time. Do not require a meeting to contain an active breach.

## Day 1

- Admit only the bounded cohort and artifact declared in the approval. Keep the accepted
  baseline or degraded mode available.
- Confirm that production events reconcile with requests, accepted outcomes, retries, tool
  effects, user corrections, costs, model and source versions, and cohort assignment.
- Watch hard invariants continuously. Sample complete journeys for misleading status,
  inaccessible controls, stale evidence, unexpected authority, and silent fallback.
- Hold expansion until the minimum evidence window and sample requirements are met. Low traffic
  extends the stage; it does not lower the evidence requirement.

## Day 7

- Compare candidate and baseline by task, user, region, network, device, source, model, tool,
  language, accessibility need, and risk slice that is relevant and permitted to measure.
- Review failures and near misses, not only averages. Reconcile support reports, user research,
  incident records, automated evaluations, and sampled human review.
- Re-run freshness checks and investigate drift in quality, latency, cost, energy, thermal,
  fallback, or correction burden before increasing exposure.
- Record an explicit expand, hold, constrain, or stop decision with dissent and accepted risk.

## Day 30

- Test whether observed user value persists after novelty and whether users can predict system
  boundaries, correct mistakes, recover work, and understand evidence and uncertainty.
- Review p95 and p99 behavior, saturation, recovery, cumulative cost, operational toil, support
  load, device sustainability, and incidents across the full exposed population.
- Revalidate threat assumptions, safety and security samples, accessibility journeys, model and
  tool contracts, source permissions, source recency, and the capacity forecast.
- Confirm that expanded scope still matches the original approval. Treat new users, actions,
  data, tools, regions, and device classes as new rollout decisions.

## Day 90

- Decide whether to renew the workload-specific thresholds and approved scope using long-window
  trends, rare-event evidence, incident learning, user research, and business outcome data.
- Exercise replacement and retirement paths. Verify that adapters, exports, records, durable
  work, user notices, and retention obligations do not trap the organization in the candidate.
- Reforecast value, capacity, cost, and on-device energy and thermal behavior. Review whether a
  deterministic workflow, smaller model, constrained tool set, or no-change option now performs
  better.
- Publish the signed decision and next review date. Unresolved ownership or expired evidence is
  a hold, not implicit renewal.

## Stop and rollback criteria

Stop expansion immediately when any declared hard invariant fails, required telemetry cannot
support a decision, or an authorized stop owner judges that continued exposure may increase
harm. The release plan must translate the following patterns into workload-specific automatic
and manual triggers:

- unauthorized access, action, delegation, data crossing, or duplicate consequential effect;
- safety, privacy, security, legal, governance, or accessibility release-blocking breach;
- quality or user-value regression beyond its declared magnitude and observation window;
- reliability, recovery, latency, saturation, cost, energy, thermal, or capacity threshold breach;
- misleading UX, failed approval binding, unavailable cancel or recovery control, or hidden
  degraded mode on a critical journey;
- missing, delayed, corrupted, unredacted, or uncorrelatable evidence for a required gate;
- expired or unverified model, tool, source, policy, evaluator, or service-mapping evidence; or
- incident volume, severity, or support load beyond the declared operating envelope.

On a trigger, halt traffic growth, preserve the evidence, identify the affected cohort and
effects, and notify incident authority. Disable the affected capability or route to the accepted
fallback. If stored state and in-flight work are compatible, restore the last known good manifest
and verify service recovery. If they are not compatible, pause or drain work and execute the
tested roll-forward or data-recovery procedure. Re-entry requires a new evidence record and
approval; elapsed time alone never clears a stop.

## Northstar example (illustrative only)

The following numbers are illustrative teaching values, not recommendations or reports of
Northstar performance. A Northstar team would replace them with measurements from its advisory
research-report workload and approved source set.

- Exposure: 5 percent of eligible internal tasks on Day 1, up to 20 percent after the Day 7 gate,
  and up to 50 percent after the Day 30 gate. Day 90 is a renewal decision, not automatic full
  exposure.
- User value and UX: at least 75 percent of eligible report tasks reach an accepted draft;
  median time to first useful draft is at most 60 seconds; median user corrections are at most
  two per accepted report.
- Quality: at least 90 percent of sampled reports pass the frozen report rubric and at least
  95 percent of sampled material citations pass the frozen citation check. No safety, source
  permission, exact-approval, or budget hard invariant may fail.
- Reliability and performance: at least 99 percent of admitted tasks reach an accepted outcome
  or an explicit recoverable state; p95 end-to-end latency per accepted report is at most
  180 seconds; full cost is at most USD 0.50 per accepted report.
- On-device path: a 20-minute sustained test on each supported device class has no device-policy
  breach, uses at most 4 Wh per accepted task, and shows no more than 15 percent p95 latency
  degradation from its warm-run baseline.
- Automatic hold: any hard-invariant breach, missing gate telemetry, or two consecutive
  30-minute windows below a soft threshold stops expansion. The incident authority may stop
  sooner.

## Related chapters

- Define indicators, thresholds, hard invariants, and gates in
  [Chapter 19: What Does Good Mean?](../modules/05-evaluation-improvement/chapters/19-what-does-good-mean.md).
- Ground threat and governance gates in
  [Chapter 24: Threat Modeling Agentic Systems](../modules/06-security-safety-governance/chapters/24-threat-modeling-agentic-systems.md)
  and [Chapter 27: Responsible AI Governance](../modules/06-security-safety-governance/chapters/27-responsible-ai-governance.md).
- Define recovery, telemetry, and promotion mechanics in
  [Chapter 29: Reliability Engineering](../modules/07-production-architecture-operations/chapters/29-reliability-engineering.md),
  [Chapter 30: Observability and SRE](../modules/07-production-architecture-operations/chapters/30-observability-and-sre.md),
  and [Chapter 31: Deployment and Delivery](../modules/07-production-architecture-operations/chapters/31-deployment-and-delivery.md).
- Measure full cost and operate the improvement loop with
  [Chapter 33: Performance and Cost Engineering](../modules/08-scale-economics-lifecycle/chapters/33-performance-cost-engineering.md)
  and [Chapter 35: Continuous Improvement](../modules/08-scale-economics-lifecycle/chapters/35-continuous-improvement.md).
- Validate hybrid routing, device behavior, fault tolerance, tools, security, and user experience
  with [Chapter 36: Hybrid AI Model Orchestration](../modules/09-hybrid-ai-systems-engineering/chapters/36-hybrid-ai-model-orchestration.md),
  [Chapter 37: Performance, Energy, and Thermal Engineering](../modules/09-hybrid-ai-systems-engineering/chapters/37-performance-energy-thermal-engineering.md),
  [Chapter 38: AI System Testing and Fault Tolerance](../modules/09-hybrid-ai-systems-engineering/chapters/38-ai-system-testing-fault-tolerance.md),
  [Chapter 39: MCP and Tool Portfolio Engineering](../modules/09-hybrid-ai-systems-engineering/chapters/39-mcp-tool-portfolio-engineering.md),
  [Chapter 40: Secure-by-Design AI Systems](../modules/09-hybrid-ai-systems-engineering/chapters/40-secure-by-design-ai-systems.md),
  and [Chapter 41: Product and UX Design for Agentic Systems](../modules/09-hybrid-ai-systems-engineering/chapters/41-product-ux-design-agentic-systems.md).
- Apply the evidence-first synthesis to the capstone in
  [Chapter 42: Northstar on the Microsoft Stack](../modules/10-microsoft-synthesis-capstone/chapters/42-northstar-on-microsoft-stack.md).

## Copyable checklist

- [ ] Freeze the user job, scope, risk tier, baseline, slices, metrics, denominators, thresholds, and owners.
- [ ] Complete every row in the shared evidence register with versioned evidence and a decision.
- [ ] Verify user value, UX control, accessibility, quality, safety, security, privacy, and governance gates.
- [ ] Verify reliability, latency, cost, capacity, and on-device energy and thermal gates where applicable.
- [ ] Verify observability, redaction, alerts, incident command, user communication, and evidence preservation.
- [ ] Revalidate model, tool, source, policy, evaluator, adapter, and volatile-claim freshness.
- [ ] Identify the release manifest, last known good manifest, fallback, kill controls, and stop authority.
- [ ] Test state compatibility, rollback, roll-forward, restore, drain, replacement, and retirement paths.
- [ ] Approve a bounded cohort and minimum evidence window for the next stage.
- [ ] Record `pass`, `review`, or `fail` for each gate; never average away a hard-invariant failure.
- [ ] Stop on a trigger, contain impact, preserve evidence, and require explicit approval before re-entry.