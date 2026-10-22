import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoinWorld Live",
  description: "Discover. Invest. Monitor. Verify.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="shell nav">
            <Link href="/" className="brand">
              <span className="mark" />
              <span>RoinWorld Live</span>
            </Link>
            <nav className="navlinks">
              <Link href="/marketplace">Investments</Link>
              <a href="#how-it-works">How it works</a>
              <a href="#transparency">Transparency</a>
            </nav>
            <div className="actions">
              <Link className="btn btn-secondary" href="/sign-in">Sign in</Link>
              <Link className="btn btn-primary" href="/onboarding">Get started</Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
