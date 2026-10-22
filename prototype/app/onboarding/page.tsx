"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useEffect, useState } from "react";
import { CountrySelect, PhoneField, fullPhone, type CountryCode } from "@/components/country-fields";

type Profile = {
  investor_type: string;
  jurisdiction: string | null;
  kyc_status: string;
  eligibility_status: string;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  nationality?: string | null;
  country_of_residence?: string | null;
  phone?: string | null;
  phone_country?: string | null;
};

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        const p = data.profile as Profile;
        setProfile(p);
        setFirstName(p?.first_name || data.user?.firstName || "");
        setLastName(p?.last_name || data.user?.lastName || "");
        setDateOfBirth(p?.date_of_birth || "");
        setNationality(p?.nationality || "");
        setCountryOfResidence(p?.country_of_residence || "");
        setPhoneCountry((p?.phone_country || "") as CountryCode | "");
        setPhoneNumber(p?.phone?.replace(/^\+\d+\s*/, "") || "");
        if (p?.investor_type && p.investor_type !== "unclassified") setInvestorType(p.investor_type);
        if (p?.jurisdiction) setJurisdiction(p.jurisdiction);
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
      body: JSON.stringify({
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        countryOfResidence,
        phone: fullPhone(phoneCountry, phoneNumber),
        phoneCountry,
        investorType,
        jurisdiction,
      }),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    const data = await response.json();
    setProfile(data.profile);
    setStatus("done");
  }

  if (!isLoaded) return <main className="section shell"><p className="lead">Loading investor profile…</p></main>;

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
  const pending = profile?.kyc_status === "pending_review";
  const moreInfo = profile?.kyc_status === "more_info_required";
  const rejected = profile?.eligibility_status === "rejected";

  return (
    <main className="section shell" style={{ maxWidth: 960 }}>
      <div className="eyebrow">Investor onboarding</div>
      <h1 style={{ fontSize: 48 }}>{eligible ? "Investor profile" : "Complete your investor profile"}</h1>
      <p className="lead">Provide the information required to establish your investor profile and begin eligibility review.</p>

      {pending && <div className="notice" style={{ marginBottom: 24 }}>Profile submitted · Verification status: Pending review · Investment access will be enabled after approval.</div>}
      {moreInfo && <div className="notice" style={{ marginBottom: 24 }}>Additional information is required before your eligibility review can be completed.</div>}
      {rejected && <div className="notice" style={{ marginBottom: 24 }}>Your investor profile is currently not eligible for investment access.</div>}
      {eligible && <div className="notice" style={{ marginBottom: 24 }}>KYC Status: Approved · Classification: {profile?.investor_type} · Jurisdiction: {profile?.jurisdiction} · Eligibility: Eligible</div>}

      <form className="card" onSubmit={completeOnboarding} style={{ marginTop: 28 }}>
        <div className="eyebrow">Personal information</div>
        <div className="metrics" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 14 }}>
          <label className="metric"><span>First name</span><input required className="field-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
          <label className="metric"><span>Last name</span><input required className="field-control" value={lastName} onChange={(e) => setLastName(e.target.value)} /></label>
          <label className="metric"><span>Date of birth</span><input required className="field-control" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /></label>
          <label className="metric">
            <span>Phone</span>
            <PhoneField country={phoneCountry} onCountryChange={setPhoneCountry} number={phoneNumber} onNumberChange={setPhoneNumber} />
          </label>
          <label className="metric">
            <span>Nationality</span>
            <CountrySelect value={nationality} onChange={setNationality} placeholder="Select country of citizenship" />
          </label>
          <label className="metric">
            <span>Country of residence</span>
            <CountrySelect value={countryOfResidence} onChange={setCountryOfResidence} placeholder="Select country of residence" />
          </label>
        </div>

        <div className="eyebrow" style={{ marginTop: 28 }}>Investor profile</div>
        <div className="metrics" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 14 }}>
          <label className="metric">
            <span>Requested investor classification</span>
            <select required className="field-control" value={investorType} onChange={(e) => setInvestorType(e.target.value)}>
              <option value="professional">Professional Investor</option>
              <option value="retail">Retail Investor</option>
              <option value="institutional">Institutional Investor</option>
              <option value="corporate">Corporate Investor</option>
            </select>
          </label>
          <label className="metric">
            <span>Investor jurisdiction</span>
            <select required className="field-control" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
              <option value="UAE">United Arab Emirates</option>
              <option value="EU">European Union</option>
              <option value="UK">United Kingdom</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="steps" style={{ margin: "28px 0" }}>
          {[
            ["Identity", "Personal and contact information"],
            ["Compliance", "KYC/KYB, sanctions and source-of-funds review"],
            ["Classification", "Investor category assessment"],
            ["Eligibility", "Access approval for applicable opportunities"],
          ].map(([title, text], i) => (
            <div className="step" key={title}><div className="step-num">{i + 1}</div><h3>{title}</h3><p>{text}</p></div>
          ))}
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Submitting…" : pending ? "Update profile" : "Submit for verification"}
          </button>
          {eligible && <Link href="/marketplace" className="btn btn-secondary">Explore investments</Link>}
        </div>

        {status === "done" && !eligible && <p style={{ marginTop: 16 }}>Your profile has been submitted for verification.</p>}
        {status === "error" && <p style={{ color: "#9b2c2c", marginTop: 16 }}>We could not update your investor profile. Please try again.</p>}
      </form>
    </main>
  );
}
