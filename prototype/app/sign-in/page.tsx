import Link from "next/link";

export default function SignInPlaceholder() {
  return (
    <main className="section shell" style={{ maxWidth: 720 }}>
      <div className="eyebrow">Authentication</div>
      <h1 style={{ fontSize: 48 }}>Clerk integration ready</h1>
      <p className="lead">The existing Clerk application will replace this placeholder as soon as its publishable and secret keys are configured in the deployment environment.</p>
      <div className="notice">No Clerk secrets are stored in GitHub.</div>
      <div style={{ marginTop: 22 }}><Link href="/onboarding" className="btn btn-primary">Continue with demo flow</Link></div>
    </main>
  );
}
