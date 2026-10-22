import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const waitlist = project.status === "Waitlist Open";
  return (
    <main className="section shell">
      <div className="eyebrow">{project.type} · {project.location}</div>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>{project.name}</h1>
      <p className="lead">{project.summary}</p>

      <div className="grid" style={{ marginTop: 30 }}>
        <section className="card">
          <h3>Investment overview</h3>
          <div className="metrics">
            <div className="metric"><span>Total project value</span><strong>{project.totalValue}</strong></div>
            <div className="metric"><span>Target raise</span><strong>{project.targetRaise}</strong></div>
            <div className="metric"><span>Sponsor investment</span><strong>{project.sponsorInvestment}</strong></div>
            <div className="metric"><span>Target return</span><strong>{project.targetReturn}</strong></div>
            <div className="metric"><span>Duration</span><strong>{project.duration}</strong></div>
            <div className="metric"><span>Risk</span><strong>{project.risk}</strong></div>
          </div>
          <div className="progress"><div style={{ width: `${project.fundedPercent}%` }} /></div>
          <div className="card-footer"><span>{project.fundedPercent}% allocated</span><span>{project.status}</span></div>
        </section>

        <section className="card">
          <h3>Pre-investment access</h3>
          <p>Eligible investors can review the investment thesis, key risks, insurance summary, material contracts and approved due-diligence documents.</p>
          <div className="metrics">
            <div className="metric"><span>Financial review</span><strong>Available</strong></div>
            <div className="metric"><span>Insurance</span><strong>Active</strong></div>
            <div className="metric"><span>Document integrity</span><strong>Verified</strong></div>
          </div>
          <Link href={waitlist ? "/waitlist" : `/apply?project=${project.id}`} className="btn btn-primary" style={{ marginTop: 10 }}>
            {waitlist ? "Join waitlist" : project.status === "Coming Soon" ? "Register interest" : "Apply to invest"}
          </Link>
        </section>
      </div>

      <div className="notice">
        Full SAP-backed financials, live operations, cameras, GPS and transaction-level evidence unlock only after the investment is approved, funded and activated.
      </div>
    </main>
  );
}
