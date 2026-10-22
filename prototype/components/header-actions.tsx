"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function HeaderActions() {
  return (
    <div className="actions">
      <SignedOut>
        <Link className="btn btn-secondary" href="/sign-in">Sign in</Link>
        <Link className="btn btn-primary" href="/onboarding">Get started</Link>
      </SignedOut>
      <SignedIn>
        <Link className="btn btn-secondary" href="/marketplace">Investments</Link>
        <Link className="btn btn-primary" href="/onboarding">Investor profile</Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
