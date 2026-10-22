"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="section shell" style={{ display: "grid", placeItems: "center" }}>
      <SignUp
        routing="hash"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
        fallbackRedirectUrl="/onboarding"
      />
    </main>
  );
}
