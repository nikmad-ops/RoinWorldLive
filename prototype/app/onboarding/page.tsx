"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useEffect, useState } from "react";

type Profile = {
  investor_type: string;
  jurisdiction: string | null;
  kyc_status: string;
  eligibility_status: string;
};

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [investorType, setInvestorType] = useState("professional");
  const [jurisdiction, setJurisdiction] = useState("UAE");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "done" | "error">("idle");

  useEffect(() => {
    if (!isSignedIn) return;
    setStatus("loading");
    fetch("/api/profile")
      .then(async (response) => {
        if (!response.ok) throw new Error("profile");
        return response.json();
      })
      .then((data) => {
        setProfile(data.profile);
        if (data.profile?.investor_type && data.profile.investor_type !== "unclassified") {
          setInvestorType(data.profile.investor_type);
        }
        if (data.profile?.jurisdiction) setJurisdiction(data.profile.jurisdiction);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, [isSignedIn]);

  async function completeOnboarding(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    const response = await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ investorType, jurisdiction }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = await response.json();
    setProfile(data.profile);
    setStatus("done");
  }

  if (!isLoaded) {
    return <main className="section shell"><p className="lead">Loading investor profile…</p></main>;
  }

  if (!isSignedIn) {
    return (
      <main className="section shell" style={{ maxWidth: 820 }}>
        <div className="eyebrow">Investor onboarding</div>
        <h1 style={{ fontSize: 48 }}>Create your investor account</h1>
        <p className="lead">Sign in or create an account before completing investor onboarding.</p>
        <Link href="/sign-in" className="btn btn-primary">Continue to sign in</Link>
      </main>
    );
  }

  const eligible = profile?.eligibility_status === "eligible";

  return (
    <main className="section shell" style={{ maxWidth: 920 }}>
      <div className="eyebrow">Investor onboarding</div>
      <h1 style={{ fontSize: 48 }}>{eligible ? "Investor profile" : "Become an eligible investor"}</h1>
      <p className="lead">
        Complete your investor profile to access investment opportunities available for your classification and jurisdiction.
      </p>

      {eligible && (
        <div className="notice" style={{ marginBottom: 24 }}>
          KYC Status: Approved · Classification: {profile?.investor_type} · Jurisdiction: {profile?.jurisdiction} · Eligibility: Eligible
        </div>
      )}

      <form className="card" onSubmit={completeOnboarding} style={{ marginTop: 28 }}>
        <div className="metrics" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <label className="metric">
            <span>Investor classification</span>
            <select value={investorType} onChange={(e) => setInvestorType(e.target.value)} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 10, border: "1px solid var(--line)", background: "white" }}>
              <option value="professional">Professional Investor</option>
              <option value="retail">Retail Investor</option>
              <option value="institutional">Institutional Investor</option>
              <option value="corporate">Corporate Investor</option>
            </select>
          </label>
          <label className="metric">
            <span>Jurisdiction</span>
            <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 10, border: "1px solid var(--line)", background: "white" }}>
              <option value="UAE">United Arab Emirates</option>
              <option value="EU">European Union</option>
              <option value="UK">United Kingdom</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="steps" style={{ margin: "26px 0" }}>
          {[
            ["Identity", "Identity and account details"],
            ["Compliance", "KYC/KYB and sanctions screening"],
            ["Classification", "Investor category and jurisdiction"],
            ["Eligibility", "Access to eligible opportunities"],
          ].map(([title, text], i) => (
            <div className="step" key={title}>
              <div className="step-num">{i + 1}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : eligible ? "Update investor profile" : "Complete onboarding"}
          </button>
          {eligible && <Link href="/marketplace" className="btn btn-secondary">Explore investments</Link>}
        </div>
        {status === "error" && <p style={{ color: "#9b2c2c" }}>We could not update your investor profile. Please try again.</p>}
      </form>
    </main>
  );
}
