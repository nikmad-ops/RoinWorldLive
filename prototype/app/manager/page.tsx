"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { countryName } from "@/components/country-fields";

type Investor = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  country_of_residence: string | null;
  phone: string | null;
  investor_type: string;
  jurisdiction: string | null;
  kyc_status: string;
  eligibility_status: string;
  review_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export default function ManagerPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [staff, setStaff] = useState<{ role: string } | null>(null);
  const [bootstrapAllowed, setBootstrapAllowed] = useState(false);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [classification, setClassification] = useState("professional");
  const [status, setStatus] = useState("loading");

  const selected = useMemo(
    () => investors.find((item) => item.id === selectedId) || investors[0] || null,
    [investors, selectedId]
  );

  async function loadSession() {
    const response = await fetch("/api/manager/session");
    if (!response.ok) {
      setStatus(response.status === 401 ? "signed_out" : "forbidden");
      return;
    }
    const data = await response.json();
    setStaff(data.staff);
    setBootstrapAllowed(Boolean(data.bootstrapAllowed));
    if (data.staff) await loadInvestors();
    else setStatus("bootstrap");
  }

  async function loadInvestors() {
    const response = await fetch("/api/manager/investors");
    if (!response.ok) {
      setStatus("forbidden");
      return;
    }
    const data = await response.json();
    setInvestors(data.investors || []);
    setStatus("ready");
  }

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setStatus("signed_out");
      return;
    }
    loadSession();
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (!selected) return;
    setNotes(selected.review_notes || "");
    setClassification(selected.investor_type || "professional");
    setSelectedId(selected.id);
  }, [selected?.id]);

  async function activateManager() {
    setStatus("loading");
    const response = await fetch("/api/manager/session", { method: "POST" });
    if (!response.ok) {
      setStatus("forbidden");
      return;
    }
    const data = await response.json();
    setStaff(data.staff);
    await loadInvestors();
  }

  async function review(action: "approve" | "reject" | "more_info") {
    if (!selected) return;
    setStatus("saving");
    const response = await fetch(`/api/manager/investors/${selected.id}/review`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, investorType: classification, notes }),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    await loadInvestors();
  }

  if (!isLoaded || status === "loading") {
    return <main className="section shell"><p className="lead">Loading manager workspace…</p></main>;
  }

  if (status === "signed_out") {
    return (
      <main className="section shell" style={{ maxWidth: 760 }}>
        <div className="eyebrow">Platform management</div>
        <h1 style={{ fontSize: 48 }}>Manager access</h1>
        <p className="lead">Sign in with an authorized platform account to continue.</p>
        <Link href="/sign-in" className="btn btn-primary">Sign in</Link>
      </main>
    );
  }

  if (!staff && bootstrapAllowed) {
    return (
      <main className="section shell" style={{ maxWidth: 760 }}>
        <div className="eyebrow">Initial administrator setup</div>
        <h1 style={{ fontSize: 48 }}>Activate platform manager</h1>
        <p className="lead">No staff account exists yet. Activate the first platform manager for this environment.</p>
        <button className="btn btn-primary" onClick={activateManager}>Activate platform manager</button>
      </main>
    );
  }

  if (!staff || status === "forbidden") {
    return (
      <main className="section shell" style={{ maxWidth: 760 }}>
        <div className="eyebrow">Platform management</div>
        <h1 style={{ fontSize: 48 }}>Access restricted</h1>
        <p className="lead">Your account is not assigned a platform management role.</p>
      </main>
    );
  }

  return (
    <main className="section shell">
      <div className="section-title">
        <div>
          <div className="eyebrow">Manager / Compliance</div>
          <h2>Investor review</h2>
        </div>
        <p>Review identity data, investor classification and eligibility before granting investment access.</p>
      </div>

      <div className="manager-layout">
        <aside className="manager-list">
          {investors.length === 0 && <div className="card"><p>No investor profiles have been submitted yet.</p></div>}
          {investors.map((investor) => {
            const active = selected?.id === investor.id;
            return (
              <button key={investor.id} className={`manager-row ${active ? "active" : ""}`} onClick={() => setSelectedId(investor.id)}>
                <strong>{[investor.first_name, investor.last_name].filter(Boolean).join(" ") || investor.email || "Investor"}</strong>
                <span>{investor.email}</span>
                <div style={{ marginTop: 8 }}>
                  <span className={`status-pill ${investor.eligibility_status === "eligible" ? "approved" : investor.eligibility_status === "rejected" ? "rejected" : "pending"}`}>
                    {investor.kyc_status.replaceAll("_", " ")}
                  </span>
                </div>
              </button>
            );
          })}
        </aside>

        {selected && (
          <section className="card">
            <div className="card-top">
              <div>
                <div className="eyebrow">Investor profile</div>
                <h3 style={{ marginTop: 8 }}>{[selected.first_name, selected.last_name].filter(Boolean).join(" ")}</h3>
              </div>
              <span className={`status-pill ${selected.eligibility_status === "eligible" ? "approved" : selected.eligibility_status === "rejected" ? "rejected" : "pending"}`}>
                {selected.kyc_status.replaceAll("_", " ")}
              </span>
            </div>

            <div className="detail-grid">
              <div className="detail-item"><span>Email</span><strong>{selected.email || "—"}</strong></div>
              <div className="detail-item"><span>Phone</span><strong>{selected.phone || "—"}</strong></div>
              <div className="detail-item"><span>Date of birth</span><strong>{selected.date_of_birth || "—"}</strong></div>
              <div className="detail-item"><span>Nationality</span><strong>{countryName(selected.nationality) || "—"}</strong></div>
              <div className="detail-item"><span>Country of residence</span><strong>{countryName(selected.country_of_residence) || "—"}</strong></div>
              <div className="detail-item"><span>Investor jurisdiction</span><strong>{selected.jurisdiction || "—"}</strong></div>
            </div>

            <div style={{ marginTop: 22 }}>
              <label className="metric">
                <span>Final investor classification</span>
                <select className="field-control" value={classification} onChange={(e) => setClassification(e.target.value)}>
                  <option value="professional">Professional Investor</option>
                  <option value="retail">Retail Investor</option>
                  <option value="institutional">Institutional Investor</option>
                  <option value="corporate">Corporate Investor</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: 18 }}>
              <label className="metric">
                <span>Review notes</span>
                <textarea className="field-control" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal review notes or information required from the investor" />
              </label>
            </div>

            <div className="review-actions">
              <button className="btn btn-primary" onClick={() => review("approve")}>Approve investor</button>
              <button className="btn btn-warning" onClick={() => review("more_info")}>Request information</button>
              <button className="btn btn-danger" onClick={() => review("reject")}>Reject</button>
            </div>
            {status === "error" && <p style={{ color: "#9b2c2c" }}>The review could not be saved.</p>}
          </section>
        )}
      </div>
    </main>
  );
}
