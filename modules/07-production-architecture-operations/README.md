# Module 07: Production Architecture and Operations

## Outcome

Turn an evaluated prototype into an observable, resilient, deployable, and recoverable distributed system.

## Before you start

Complete Modules 05-06. Begin with accepted evaluation thresholds, a threat model, and
explicit identity, data, tool, and approval boundaries.

## Chapters

28. [**Reference Architecture**](chapters/28-reference-architecture.md): separate control and data planes, runtime services, stores, and trust boundaries.
29. [**Reliability Engineering**](chapters/29-reliability-engineering.md): define failure domains, timeouts, retries, idempotency, and recovery objectives.
30. [**Observability and SRE**](chapters/30-observability-and-sre.md): emit redacted evidence and operate against service-level objectives.
31. [**Deployment and Delivery**](chapters/31-deployment-and-delivery.md): qualify versioned releases and preserve rollback and kill paths.
32. [**Data and State at Scale**](chapters/32-data-and-state-at-scale.md): partition durable state, artifacts, queues, caches, and retention lifecycles.

## Northstar milestone

Deploy Northstar with traces, service-level objectives, retries, idempotency, queues, release gates, and tested backup and recovery paths.

**Continue:** [Previous module: Security, Safety, and Governance](../06-security-safety-governance/README.md) | [Book overview](../../README.md) | [Next module: Scale, Economics, and Lifecycle](../08-scale-economics-lifecycle/README.md)