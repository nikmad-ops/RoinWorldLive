"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AccessPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!password) return;
    setStatus("loading");

    const response = await fetch("/api/access", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    window.location.href = "/marketplace";
  }

  return (
    <main className="access-gate">
      <div className="access-card">
        <div className="access-mark" aria-hidden="true" />
        <h1>RoinWorld Live</h1>

        <form onSubmit={submit} className="access-form">
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Access password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-label="Access password"
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Checking…" : "Enter"}
          </button>
        </form>

        {status === "error" && <p className="access-error">Incorrect password</p>}

        <div className="access-separator"><span>or</span></div>

        <Link href="/sign-in" className="access-auth">
          Sign in or create account
        </Link>
      </div>
    </main>
  );
}
