import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="section shell">
      <div className="eyebrow">Investor onboarding</div>
      <h1 style={{ fontSize: 48 }}>Become an eligible investor</h1>
      <p className="lead">Complete identity verification, KYC/KYB and investor classification to access eligible investment opportunities.</p>
      <div className="steps" style={{ marginTop: 30 }}>
        {[
          ["Create account", "Create your secure RoinWorld Live account."],
          ["Verify identity", "Confirm your identity or company details."],
          ["Complete KYC", "Complete compliance, sanctions and source-of-funds checks."],
          ["Investor classification", "Confirm your investor category and eligibility profile."],
        ].map(([title, text], i) => (
          <div className="step" key={title}><div className="step-num">{i+1}</div><h3>{title}</h3><p>{text}</p></div>
        ))}
      </div>
      <div style={{ marginTop: 26 }}><Link href="/marketplace" className="btn btn-primary">Continue to investments</Link></div>
    </main>
  );
}
