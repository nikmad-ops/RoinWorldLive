import Link from "next/link";

export default function WaitlistPage() {
  return (
    <main className="section shell" style={{ maxWidth: 820 }}>
      <div className="eyebrow">Fully allocated project</div>
      <h1 style={{ fontSize: 48 }}>Join the waitlist</h1>
      <p className="lead">Register interest for a future allocation, additional raise or a permitted transfer from an existing investor.</p>
      <div className="card" style={{ marginTop: 28 }}>
        <div className="metrics">
          <div className="metric"><span>Desired amount</span><strong>AED 250,000</strong></div>
          <div className="metric"><span>Minimum allocation</span><strong>AED 100,000</strong></div>
          <div className="metric"><span>Interest validity</span><strong>90 days</strong></div>
        </div>
        <Link href="/marketplace" className="btn btn-primary">Join demo waitlist</Link>
      </div>
    </main>
  );
}
