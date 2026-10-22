# RoinWorld Live
## Product Concept & Prototype Specification v0.5

## 1. Purpose

RoinWorld Live is a digital investment platform for real projects.

The platform must support the complete investor lifecycle:

**Discover -> Qualify -> Evaluate -> Apply -> Approve -> Fund -> Monitor -> Verify -> Exit / Receive Returns**

Core capabilities:
- investment marketplace;
- registration and investor onboarding;
- KYC/KYB and investor classification;
- eligibility controls;
- project-specific applications;
- approval and allocation management;
- investment documents and signing;
- payments;
- portfolio management;
- SAP-backed financial transparency;
- operational project monitoring;
- Project Journal;
- cameras, GPS and telemetry;
- contracts and insurance;
- independent assurance;
- document integrity and audit trail;
- bank, auditor and regulator access.

### Core product principle

Before investing, RWL acts as an **Investment Marketplace**.

After investment activation, RWL becomes an **Investment Control Platform**.

Full financial and operational project access is provided only after investor approval, document completion, payment, reconciliation and activation.

## 2. Prototype projects

| Project | Type | Main prototype data |
|---|---|---|
| Dubai Logistics Company | Operating business | Fleet, GPS, routes, utilisation, revenue, costs, maintenance |
| Residential Development | Construction | Budget, progress, contractors, procurement, sales, cameras, drone |
| Hospital Development | Construction + operations | Construction, equipment, licensing, commissioning, operations |
| Data Center | Infrastructure + operations | Construction, power, equipment, capacity, utilisation, revenue |

## 3. User access model

| Status | Meaning |
|---|---|
| Public Visitor | Not registered |
| Registered User | Account created |
| Verified User | Identity verified |
| Eligible Investor | KYC/KYB, classification and eligibility complete |
| Applicant | Applied to a project |
| Approved Investor | Approved to participate |
| Allocated Investor | Allocation reserved |
| Funded Investor | Payment completed |
| Active Project Investor | Full project access enabled |

## 4. Public website

Available without registration:
- Homepage;
- public project catalogue;
- high-level project information;
- selected Project Journal posts;
- How It Works;
- Transparency Principles;
- company information.

Not public:
- detailed financials;
- investment terms;
- full documents;
- operational monitoring;
- detailed contracts;
- investor information;
- audit evidence.

## 5. Registration and onboarding

Flow:

`Account -> Identity -> KYC/KYB -> Investor Classification -> Eligibility`

Identity and compliance data must support individuals and corporate investors.

KYC/KYB must support:
- identity / corporate verification;
- sanctions screening;
- PEP checks;
- source of funds;
- source of wealth where required;
- ongoing monitoring.

Working investor categories:
- Retail Investor;
- Professional / Qualified Investor;
- Institutional Investor.

Exact categories remain configurable pending final regulatory architecture.

## 6. Eligibility engine

The system determines which opportunities a user may see and apply for based on:
- investor classification;
- residency / jurisdiction;
- regulatory restrictions;
- project requirements;
- minimum investment;
- investment limits;
- investment instrument;
- available allocation.

## 7. Investment Marketplace

After onboarding, the user enters **Explore Investments**.

Each project card should include:
- Project Name;
- Asset Class;
- Location;
- Status;
- Total Project Value;
- Target Raise;
- Funding Progress;
- Minimum Investment;
- Expected Duration;
- Target Return;
- Risk Level;
- Sponsor Investment.

Project statuses:
- Coming Soon;
- Open for Investment;
- Almost Fully Allocated;
- Fully Allocated;
- Waitlist Open;
- Investment Closed;
- Active / Operating;
- Completed / Exited.

Filters:
- asset class;
- geography;
- stage;
- minimum investment;
- duration;
- return;
- risk;
- availability;
- status.

## 8. Pre-Investment Project Room

An Eligible Investor can review the project before applying.

Visible information includes:
- project description;
- location;
- asset class;
- stage;
- sponsor;
- management team;
- total project value;
- target raise;
- sponsor contribution;
- external financing;
- minimum investment;
- horizon;
- target return;
- funding progress;
- investment thesis;
- key risks;
- sponsor commitment;
- external assurance;
- insurance summary;
- key contracts summary;
- approved pre-investment documents.

Full operational and transaction-level information remains restricted.

## 9. Investment application

CTA: **Apply to Invest**

Application fields include:
- Desired Investment Amount;
- Minimum Acceptable Allocation;
- Preferred Currency;
- Funding Method;
- Source of Funds information;
- declarations;
- risk acknowledgements;
- project-specific confirmations.

Statuses:
- Submitted;
- Under Review;
- Additional Information Required;
- Approved;
- Partially Approved;
- Waitlisted;
- Declined;
- Withdrawn.

## 10. Project-specific approval

Checks may include:
- KYC status;
- investor classification;
- jurisdiction eligibility;
- sanctions;
- source of funds;
- suitability / appropriateness where required;
- project limits;
- allocation availability;
- concentration limits;
- project-specific restrictions.

## 11. Allocation

After approval, allocation is reserved.

Allocation data:
- requested amount;
- approved amount;
- reservation date;
- expiry date;
- payment deadline.

Expired allocations return to the available pool or waitlist.

## 12. Documents and signing

Possible documents:
- Subscription Agreement;
- Investment Terms;
- Risk Disclosure;
- Investor Representations;
- SPV / Fund documentation;
- Payment Instructions.

Signing flow:

`Generated -> Reviewed -> Signed -> Counter-signed -> Verified -> Final`

Blockchain may support integrity, timestamping and signature evidence under the hood.

## 13. Payment

Possible payment rails:
- Bank Transfer;
- SWIFT;
- Account-to-Account;
- PaySaxas;
- Approved Digital Asset Provider.

Payment flow:

`Initiated -> Compliance Review -> Funds Received -> Reconciled -> Allocated -> Completed`

RWL remains provider-agnostic.

## 14. Investment activation

An investment becomes Active only after:
- final approval;
- signing;
- receipt of funds;
- reconciliation;
- allocation confirmation.

Activation upgrades access to the Full Project Investor Room.

## 15. Investor Portfolio Dashboard

Primary KPIs:
- Portfolio Value;
- Total Invested;
- Capital Deployed;
- Capital Returned;
- Distributions Received;
- Expected Return;
- Active Projects;
- Pending Commitments.

Portfolio Health may summarise:
- Financial Performance;
- Project Delivery;
- Funding;
- Compliance;
- Insurance;
- Major Risks.

**Since Your Last Visit** should surface only material changes.

## 16. Full Project Investor Room

Sections:
- Overview;
- My Investment;
- Performance;
- Financials;
- Operations;
- Risks;
- Contracts;
- Insurance;
- Project Journal;
- Live;
- Documents;
- Q&A.

## 17. UX hierarchy

1. **Answer** — How is my investment doing?
2. **Explanation** — Why?
3. **Evidence** — Show underlying data.
4. **Audit** — Show source, verification and history.

## 18. Financial reporting

Top-level metrics:
- Approved Budget;
- Committed;
- Actual Spend;
- Remaining;
- Forecast at Completion;
- Revenue;
- Margin / EBITDA;
- Cash;
- Forecast Profit;
- Expected Return.

Drill-down:
- Level 1: summary KPI;
- Level 2: categories;
- Level 3: supplier / PO / invoice / payment / SAP reference / evidence.

## 19. SAP integration

SAP is the financial source of truth.

Pattern:

`SAP -> Integration Layer -> RWL Data Model -> Reporting / Dashboards / Audit`

Material metrics should expose:
- Source;
- Last Updated;
- Verification Status.

## 20. Project Intelligence

RWL should explain project condition, not merely display raw data.

Example Project Health:
- Budget — On Plan;
- Schedule — Slightly Behind;
- Revenue — Ahead;
- Funding — Fully Funded;
- Compliance — Clear;
- Insurance — Active;
- Contracts — No Critical Issues.

Any calculated status must be explainable and linked to source evidence.

## 21. Risk Dashboard

Risk categories:
- Financial;
- Schedule;
- Operational;
- Contractual;
- Insurance;
- Compliance;
- Counterparty;
- Market.

Each risk includes:
- severity;
- trend;
- owner;
- mitigation;
- last update.

## 22. Project Journal

Structured social-style project feed.

Post types:
- Update;
- Milestone;
- Financial Update;
- Operational Update;
- Contract Update;
- Insurance Update;
- Management Note;
- Independent Report;
- Live;
- Q&A.

Material posts include:
- author;
- date/time;
- source;
- evidence;
- attachments.

Investor interaction:
- Follow;
- Save;
- Comment;
- Ask Question;
- Subscribe.

## 23. Live monitoring

Construction projects may expose:
- cameras;
- timelapse;
- drone footage;
- site reports;
- milestone evidence.

Full access is permission-controlled.

## 24. Logistics Control Room

For Dubai Logistics:
- fleet map;
- Truck ID;
- GPS position;
- route;
- status;
- ETA;
- driver;
- last signal.

Fleet KPIs:
- Total Trucks;
- Active;
- Idle;
- Maintenance;
- Fleet Utilisation;
- On-Time Delivery;
- Revenue per Truck;
- Cost per Truck;
- Fuel Consumption;
- Distance;
- Maintenance Cost.

## 25. Contracts

Project dashboard shows:
- Active Contracts;
- Pending;
- Expiring;
- Critical Issues.

Material contract detail:
- counterparty;
- category;
- value;
- start / expiry;
- milestones;
- status;
- project impact;
- risks.

## 26. Insurance

Project dashboard shows:
- Fully Covered;
- Partial;
- Attention Required.

Detail:
- insurer;
- policy type;
- coverage;
- expiry;
- insured risks;
- major exclusions;
- claims.

## 27. External assurance

Possible reviewers:
- Auditor;
- Legal Advisor;
- Financial Advisor;
- Technical Engineer;
- Valuation Provider.

Show:
- organisation;
- scope;
- date;
- status;
- supporting report.

## 28. Documents and integrity

Document Centre:
- Investment;
- Project;
- Financial;
- Contracts;
- Insurance;
- Corporate;
- Audit.

Blockchain can support:
- hashes;
- timestamps;
- signature evidence;
- version control;
- immutable audit records.

The default UI uses human-readable statuses such as **Verified Document**.

## 29. Waiting List

If a project is fully allocated, an Eligible Investor can join a waitlist.

Inputs:
- Desired Investment;
- Minimum Acceptable Allocation;
- Interest in Additional Raise;
- Interest in Existing Investor Exit;
- Validity Period.

If an allocation becomes available, the standard flow restarts:

`Application -> Approval -> Allocation -> Documents -> Payment -> Active Investment`

Waitlist membership never automatically creates an investment.

## 30. Exit interest

The prototype does not implement a full secondary market.

Controlled workflows:
- Existing Investor: **Request to Exit**
- Potential Investor: **Interest in Existing Position**

Any actual transfer remains subject to the selected investment instrument and regulatory rules.

## 31. Platform management roles

Potential internal roles:
- Platform Administrator;
- Investor Onboarding / Compliance;
- Investment Manager;
- Project Manager;
- Finance Manager;
- Project Control Manager;
- Contract Manager;
- Insurance / Risk Manager;
- Investor Relations;
- Content Manager.

Roles may be combined in the MVP.

## 32. Management dashboard

Core work areas:
- Investors;
- Projects;
- Payments;
- Compliance;
- Operations;
- Communications.

Application queue should include:
- investor;
- project;
- requested amount;
- investor classification;
- KYC;
- eligibility;
- source of funds;
- allocation availability;
- status.

Allocation view should include:
- Target Raise;
- Approved Applications;
- Reserved Allocation;
- Paid Allocation;
- Remaining Allocation;
- Waitlist Demand.

## 33. Oversight access

### Regulator
Controlled read-only access to relevant:
- projects;
- investors;
- classifications;
- applications;
- allocations;
- funding;
- transactions;
- compliance;
- complaints;
- documents;
- audit trail.

### Auditor
Access to relevant:
- SAP data;
- financial reports;
- transaction detail;
- reconciliations;
- historical snapshots;
- contracts;
- insurance;
- evidence;
- integrity records.

### Bank / Payment Provider
Access to relevant:
- investor status;
- payment request;
- project;
- amount;
- reconciliation;
- settlement status.

## 34. Historical snapshots

Investors can view and compare project state by date:
- completion;
- spend;
- revenue;
- cash;
- forecast;
- risk;
- expected return.

## 35. Notifications

Categories:
- New Project;
- Application;
- Approval;
- Allocation;
- Payment;
- Project Update;
- Risk;
- Contract;
- Insurance;
- Document;
- Distribution;
- Waitlist;
- Exit.

Priority:
- Critical;
- Important;
- Update.

## 36. Core data model

`User -> Investor -> Classification -> Eligibility -> Project -> Application -> Approval -> Allocation -> Investment -> Payment -> Investment Vehicle -> Financial Transactions -> Operational Data -> Contracts -> Insurance -> Documents -> Reporting -> Audit Trail`

## 37. Investor lifecycle

| Stage | Main action |
|---|---|
| Discover | Find investment opportunities |
| Qualify | KYC, classification, eligibility |
| Evaluate | Review project |
| Apply | Submit investment application |
| Approve | Compliance and project approval |
| Allocate | Reserve allocation |
| Document | Sign documents |
| Fund | Pay investment |
| Activate | Become Active Investor |
| Monitor | Financial and operational control |
| Verify | Evidence and reporting |
| Return / Exit | Distributions, capital return or exit |

## 38. Access matrix

| User stage | Marketplace | Investment info | Apply | Payment | Full financials | Operations / Live | Detailed contracts | Investor reporting |
|---|---|---|---|---|---|---|---|---|
| Visitor | Limited | No | No | No | No | No | No | No |
| Registered | Limited | Limited | No | No | No | No | No | No |
| Eligible Investor | Yes | Yes | Yes | No | No | Limited | Summary | No |
| Applicant | Yes | Yes | Yes | No | No | Limited | Summary | No |
| Approved / Allocated | Yes | Yes | Yes | Yes | Limited | Limited | Summary | Limited |
| Active Investor | Yes | Yes | Yes | Yes | Full | Full | As permitted | Full |
| Auditor / Regulator | Controlled | Controlled | Controlled | Controlled | Relevant Full | Relevant Full | Relevant Full | Relevant Full |

## 39. Prototype scope

### Public
1. Homepage
2. Public Project Catalogue

### Onboarding
3. Registration
4. KYC / Investor Classification

### Marketplace
5. Eligible Investor Marketplace
6. Pre-Investment Project Room
7. Investment Application
8. Application Status
9. Approval / Allocation

### Investment execution
10. Document Signing
11. Payment Selection
12. Payment Status

### Investor area
13. Portfolio Dashboard
14. Full Project Dashboard
15. Financial Drill-Down
16. Project Health / Risk
17. Project Journal
18. Live Monitoring
19. Logistics Control Room
20. Contracts / Insurance
21. Document Centre

### Additional opportunities
22. Waitlist
23. Exit Interest

### Platform management
24. Management Dashboard
25. Investor Application Review
26. Allocation Management
27. Compliance Dashboard

### Oversight
28. Auditor / Regulator Portal

## 40. Product positioning

RWL is not positioned through SAP, blockchain, GPS, cameras, crypto or AI. Those are infrastructure.

Investor value:
- **Discover** — find real investment opportunities;
- **Invest** — complete a controlled investment process;
- **Monitor** — see financial and physical project condition;
- **Verify** — inspect evidence and provenance.

> **Discover. Invest. Monitor. Verify.**

The key differentiator is that the platform does not stop at **Investment Completed**. That is where the second half of RoinWorld Live begins.
