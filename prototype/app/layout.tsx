import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoinWorld Live",
  description: "RoinWorld Live",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthShell>
          <SiteFrame>{children}</SiteFrame>
        </AuthShell>
      </body>
    </html>
  );
}
