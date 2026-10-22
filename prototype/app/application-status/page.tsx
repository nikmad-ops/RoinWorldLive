import Link from "next/link";

export default function ApplicationStatusPage() {
  return (
    <main className="section shell" style={{ maxWidth: 820 }}>
      <div className="eyebrow">Application status</div>
      <h1 style={{ fontSize: 48 }}>Under review</h1>
      <p className="lead">Your project-specific eligibility, compliance checks and requested allocation are being reviewed.</p>
      <div className="card" style={{ marginTop: 30 }}>
        <div className="metrics">
          <div className="metric"><span>KYC</span><strong>Approved</strong></div>
          <div className="metric"><span>Eligibility</span><strong>Approved</strong></div>
          <div className="metric"><span>Allocation</span><strong>Pending</strong></div>
        </div>
        <Link href="/marketplace" className="btn btn-secondary">Back to marketplace</Link>
      </div>
    </main>
  );
}
