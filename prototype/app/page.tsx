import Link from "next/link";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main>
      <section className="shell hero">
        <div>
          <div className="eyebrow">Real projects. Verifiable progress.</div>
          <h1>Invest in real projects. See what happens next.</h1>
          <p className="lead">
            RoinWorld Live combines an investment marketplace with continuous financial and operational visibility after you invest.
          </p>
          <div className="actions" style={{ marginTop: 28 }}>
            <Link href="/marketplace" className="btn btn-primary">Explore investments</Link>
            <Link href="/onboarding" className="btn btn-secondary">Become an investor</Link>
          </div>
        </div>
        <aside className="hero-card">
          <div className="eyebrow">Platform snapshot</div>
          <h2 style={{ margin: "10px 0 22px", fontSize: 28 }}>Visibility before and after investment</h2>
          <div className="stat-grid">
            <div className="stat"><strong>4</strong><span>active opportunities</span></div>
            <div className="stat"><strong>3</strong><span>asset categories</span></div>
            <div className="stat"><strong>Live</strong><span>operational monitoring</span></div>
            <div className="stat"><strong>SAP</strong><span>financial source of truth</span></div>
          </div>
        </aside>
      </section>

      <section className="section shell">
        <div className="section-title">
          <div><div className="eyebrow">Investment marketplace</div><h2>Available opportunities</h2></div>
          <p>Registered and eligible investors see only the opportunities available to their investor profile.</p>
        </div>
        <div className="grid">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="card">
              <div className="card-top">
                <span className="tag">{project.type} · {project.location}</span>
                <span className="status">{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="metrics">
                <div className="metric"><span>Target return</span><strong>{project.targetReturn}</strong></div>
                <div className="metric"><span>Min. investment</span><strong>{project.minimumInvestment}</strong></div>
                <div className="metric"><span>{project.metricLabel}</span><strong>{project.metricValue}</strong></div>
              </div>
              <div className="progress"><div style={{ width: `${project.fundedPercent}%` }} /></div>
              <div className="card-footer"><span>{project.fundedPercent}% allocated</span><span>{project.targetRaise} raise</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section shell">
        <div className="section-title"><div><div className="eyebrow">Investor lifecycle</div><h2>Discover. Invest. Monitor. Verify.</h2></div></div>
        <div className="steps">
          {[
            ["Discover", "Complete onboarding and explore investment opportunities available to your profile."],
            ["Invest", "Apply, receive approval and allocation, sign documents and fund the investment."],
            ["Monitor", "After activation, access financial, operational and project-level reporting."],
            ["Verify", "Drill down from headline status to source data, evidence and audit history."],
          ].map(([title, text], i) => (
            <div className="step" key={title}>
              <div className="step-num">{i + 1}</div>
              <h3>{title}</h3><p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer"><div className="shell">RoinWorld Live</div></footer>
    </main>
  );
}
