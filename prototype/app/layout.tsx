import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoinWorld Live",
  description: "Discover. Invest. Monitor. Verify.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthShell>
          <header className="header">
            <div className="shell nav">
              <Link href="/" className="brand">
                <span className="mark" />
                <span>RoinWorld Live</span>
              </Link>
              <nav className="navlinks">
                <Link href="/marketplace">Investments</Link>
                <a href="/#how-it-works">How it works</a>
                <a href="/#transparency">Transparency</a>
              </nav>
              <div className="actions">
                <Link className="btn btn-secondary" href="/sign-in">Sign in</Link>
                <Link className="btn btn-primary" href="/onboarding">Investor profile</Link>
              </div>
            </div>
          </header>
          {children}
        </AuthShell>
      </body>
    </html>
  );
}
