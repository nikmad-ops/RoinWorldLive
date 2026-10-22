"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (clerkConfigured) {
    return (
      <main className="section shell" style={{ display: "grid", placeItems: "center" }}>
        <SignIn
          routing="hash"
          withSignUp
          signUpUrl="/sign-up"
          forceRedirectUrl="/onboarding"
          signUpForceRedirectUrl="/onboarding"
          fallbackRedirectUrl="/onboarding"
          signUpFallbackRedirectUrl="/onboarding"
        />
      </main>
    );
  }

  return (
    <main className="section shell" style={{ maxWidth: 720 }}>
      <div className="eyebrow">Authentication</div>
      <h1 style={{ fontSize: 48 }}>Sign in to RoinWorld Live</h1>
      <p className="lead">Access your investment opportunities, applications and project reporting.</p>
      <div style={{ marginTop: 22 }}>
        <Link href="/sign-up" className="btn btn-primary">Create investor account</Link>
      </div>
    </main>
  );
}
