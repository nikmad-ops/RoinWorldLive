# Architecture Principles

## 1. Product before technology

RoinWorld Live is not positioned as a blockchain, crypto, SAP, GPS or AI product. These are enabling technologies.

The user-facing value is:
- visibility;
- transparency;
- evidence;
- accountability;
- controlled access.

## 2. Two product modes

### Pre-investment
RWL behaves as an **Investment Marketplace**.

### Post-investment
RWL becomes an **Investment Control Platform**.

Full operational and financial project access is unlocked only after the investment is approved, documented, funded, reconciled and activated.

## 3. Separation of regulated roles

The architecture must support clear separation between:
- Sponsor / Project Originator;
- Licensed Platform Operator;
- Bank / Payment Provider;
- Auditor / Independent Reviewer;
- Technical / Project Inspector;
- Investor.

The exact legal entity structure remains subject to EY confirmation.

## 4. Configurable regulatory layer

The following must remain configurable:
- investor categories;
- eligibility rules;
- investment instrument;
- investment limits;
- project-specific restrictions;
- transfer / exit mechanics;
- DFSA permissions;
- payment methods;
- crypto availability.

## 5. Data provenance

Every material metric should expose:
- source system;
- last update;
- verification status.

Examples:
- SAP for financial data;
- Primavera / Project Control for schedule and progress;
- Bank / PSP for cash;
- GPS / Fleet Management for transport operations.

## 6. Drill-down hierarchy

1. **Answer** — current status.
2. **Explanation** — why.
3. **Evidence** — underlying source data.
4. **Audit** — provenance, approvals and change history.

## 7. Integration layers

- Experience Layer
- Investment & Project Layer
- Operational Transparency Layer
- Document Trust Layer
- Payment Orchestration Layer
- Compliance Layer
- Integration / API Layer

## 8. Blockchain

Blockchain is an infrastructure component for document integrity, timestamping, signatures and audit evidence.

The UI should normally show human-readable states such as **Verified Document**, not blockchain terminology.

## 9. Payments

RWL must remain payment-provider agnostic.

Target pattern:

`RWL -> Payment Orchestrator -> Bank / PSP / PaySaxas / Regulated Digital Asset Provider`

## 10. Prototype first

The prototype may use simulated data and placeholder integrations, but flows, permissions and information architecture should reflect the target product.
