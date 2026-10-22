import Link from "next/link";

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const { project } = await searchParams;
  return (
    <main className="section shell" style={{ maxWidth: 820 }}>
      <div className="eyebrow">Investment application</div>
      <h1 style={{ fontSize: 46 }}>Apply to invest</h1>
      <p className="lead">Project: {project ?? "Selected project"}. Submit your investment request for project-specific approval and allocation.</p>
      <div className="card" style={{ marginTop: 28 }}>
        <div className="metrics">
          <div className="metric"><span>Desired investment</span><strong>AED 250,000</strong></div>
          <div className="metric"><span>Minimum allocation</span><strong>AED 100,000</strong></div>
          <div className="metric"><span>Funding method</span><strong>Bank transfer</strong></div>
        </div>
        <p>Review your declarations, source-of-funds information and project-specific acknowledgements before submission.</p>
        <Link href="/application-status" className="btn btn-primary">Submit application</Link>
      </div>
    </main>
  );
}
