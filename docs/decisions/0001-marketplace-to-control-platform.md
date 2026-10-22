# ADR-0001: Marketplace-to-Control-Platform lifecycle

- **Status:** Accepted
- **Date:** 2026-10-22

## Context

RoinWorld Live serves two fundamentally different user needs:

1. A verified potential investor must be able to discover and evaluate projects available to them.
2. An actual investor must receive deep access to financial, operational and project-control information only after their participation becomes active.

Treating both stages as one unrestricted project portal would create poor UX and weak access control.

## Decision

RWL will use a staged investor lifecycle:

`Visitor -> Registered -> Verified -> Eligible Investor -> Applicant -> Approved -> Allocated -> Funded -> Active Project Investor`

### Before activation
The user receives access to:
- personalised investment marketplace;
- pre-investment project information;
- approved due-diligence documents;
- application and waitlist workflows.

### After activation
The user additionally receives access to:
- investor-specific position;
- full financial reporting;
- SAP-backed drill-down;
- operations;
- cameras / GPS / telemetry;
- risks;
- contracts;
- insurance;
- Project Journal;
- reporting and evidence.

## Consequences

- Access control becomes a core platform capability.
- Marketplace and Project Investor Room are separate experiences.
- Project data must support multiple disclosure levels.
- Regulatory rules can be introduced without redesigning the entire UX.
