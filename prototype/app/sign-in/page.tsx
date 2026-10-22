"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (clerkConfigured) {
    return (
      <main className="section shell" style={{ display: "grid", placeItems: "center" }}>
        <SignIn routing="hash" />
      </main>
    );
  }

  return (
    <main className="section shell" style={{ maxWidth: 720 }}>
      <div className="eyebrow">Authentication</div>
      <h1 style={{ fontSize: 48 }}>Clerk integration ready</h1>
      <p className="lead">
        The existing RoinWorld Live Clerk application will become active when its deployment keys are configured.
      </p>
      <div className="notice">No Clerk secrets are stored in GitHub.</div>
      <div style={{ marginTop: 22 }}>
        <Link href="/onboarding" className="btn btn-primary">Continue with demo flow</Link>
      </div>
    </main>
  );
}
