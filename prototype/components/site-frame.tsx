"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <header className="header">
        <div className="shell nav">
          <Link href="/marketplace" className="brand">
            <span className="mark" />
            <span>RoinWorld Live</span>
          </Link>
          <nav className="navlinks">
            <Link href="/marketplace">Investments</Link>
            <Link href="/onboarding">Investor profile</Link>
          </nav>
          <div className="actions">
            <Link className="btn btn-secondary" href="/sign-in">Sign in</Link>
            <Link className="btn btn-primary" href="/onboarding">Investor profile</Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
