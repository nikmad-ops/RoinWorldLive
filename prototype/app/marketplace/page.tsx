"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";

type Profile = {
  investor_type: string;
  jurisdiction: string | null;
  kyc_status: string;
  eligibility_status: string;
};

export default function MarketplacePage() {
  const { isLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    fetch("/api/profile")
      .then(async (response) => {
        if (!response.ok) throw new Error("profile");
        return response.json();
      })
      .then((data) => setProfile(data.profile))
      .finally(() => setLoading(false));
  }, [isSignedIn]);

  if (!isLoaded || loading) {
    return <main className="section shell"><p className="lead">Loading investment opportunities…</p></main>;
  }

  if (!isSignedIn) {
    return (
      <main className="section shell" style={{ maxWidth: 820 }}>
        <div className="eyebrow">Investment marketplace</div>
        <h1 style={{ fontSize: 48 }}>Investor access required</h1>
        <p className="lead">Sign in and complete your investor profile to view opportunities available to you.</p>
        <Link href="/sign-in" className="btn btn-primary">Sign in</Link>
      </main>
    );
  }

  if (profile?.eligibility_status !== "eligible") {
    const pending = profile?.kyc_status === "pending_review";
    const moreInfo = profile?.kyc_status === "more_info_required";
    const rejected = profile?.eligibility_status === "rejected";

    return (
      <main className="section shell" style={{ maxWidth: 820 }}>
        <div className="eyebrow">Investment marketplace</div>
        <h1 style={{ fontSize: 48 }}>
          {pending ? "Investor profile under review" : moreInfo ? "Additional information required" : rejected ? "Investment access unavailable" : "Complete investor onboarding"}
        </h1>
        <p className="lead">
          {pending
            ? "Your profile has been submitted. Investment opportunities will become available after compliance and eligibility approval."
            : moreInfo
              ? "The platform team requires additional information before your eligibility review can be completed."
              : rejected
                ? "Your current investor profile is not eligible for investment access."
                : "Your investor profile must be completed before investment opportunities can be displayed."}
        </p>
        <Link href="/onboarding" className="btn btn-primary">
          {pending ? "View investor profile" : moreInfo ? "Update investor profile" : rejected ? "View decision" : "Complete onboarding"}
        </Link>
      </main>
    );
  }

  return (
    <main className="section shell">
      <div className="section-title">
        <div><div className="eyebrow">Eligible investor view</div><h2>Explore investments</h2></div>
        <p>Opportunities are filtered according to your investor classification, jurisdiction and eligibility profile.</p>
      </div>
      <div className="notice" style={{ marginBottom: 24 }}>
        KYC Status: Approved · Classification: {profile.investor_type} · Jurisdiction: {profile.jurisdiction} · Eligibility: Eligible
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
