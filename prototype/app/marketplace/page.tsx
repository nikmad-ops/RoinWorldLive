import Link from "next/link";
import { projects } from "@/lib/projects";

export default function MarketplacePage() {
  return (
    <main className="section shell">
      <div className="section-title">
        <div><div className="eyebrow">Eligible investor view</div><h2>Explore investments</h2></div>
        <p>Demo view after successful KYC and investor classification.</p>
      </div>
      <div className="notice" style={{ marginBottom: 24 }}>
        KYC Status: Approved · Classification: Professional Investor · Jurisdiction: UAE
      </div>
      <div className="grid">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="card">
            <div className="card-top"><span className="tag">{project.type}</span><span className="status">{project.status}</span></div>
            <h3>{project.name}</h3><p>{project.summary}</p>
            <div className="metrics">
              <div className="metric"><span>Project value</span><strong>{project.totalValue}</strong></div>
              <div className="metric"><span>Target return</span><strong>{project.targetReturn}</strong></div>
              <div className="metric"><span>Risk</span><strong>{project.risk}</strong></div>
            </div>
            <div className="progress"><div style={{ width: `${project.fundedPercent}%` }} /></div>
            <div className="card-footer"><span>{project.fundedPercent}% allocated</span><span>{project.minimumInvestment} minimum</span></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
