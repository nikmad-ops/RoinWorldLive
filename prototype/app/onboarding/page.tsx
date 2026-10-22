import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="section shell">
      <div className="eyebrow">Investor onboarding</div>
      <h1 style={{ fontSize: 48 }}>Become an eligible investor</h1>
      <p className="lead">The MVP simulates identity verification, KYC/KYB and investor classification. Clerk will handle real authentication.</p>
      <div className="steps" style={{ marginTop: 30 }}>
        {["Create account","Verify identity","Complete KYC","Investor classification"].map((title, i) => (
          <div className="step" key={title}><div className="step-num">{i+1}</div><h3>{title}</h3><p>{i < 3 ? "Demo step prepared for the MVP workflow." : "Demo result: Professional Investor."}</p></div>
        ))}
      </div>
      <div style={{ marginTop: 26 }}><Link href="/marketplace" className="btn btn-primary">Simulate approval and continue</Link></div>
    </main>
  );
}
