import { auth } from "@clerk/nextjs/server";
import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    investorType?: string;
    jurisdiction?: string;
  };

  const investorType = body.investorType?.trim();
  const jurisdiction = body.jurisdiction?.trim();

  if (!investorType || !jurisdiction) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const user = await env.DB.prepare(
    "SELECT id FROM users WHERE clerk_user_id = ?"
  ).bind(userId).first();

  if (!user) {
    return Response.json({ error: "profile_not_initialized" }, { status: 409 });
  }

  await env.DB.prepare(
    "UPDATE investor_profiles SET investor_type = ?, jurisdiction = ?, kyc_status = ?, eligibility_status = ? WHERE user_id = ?"
  ).bind(investorType, jurisdiction, "approved", "eligible", user.id).run();

  const profile = await env.DB.prepare(
    "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, created_at FROM investor_profiles WHERE user_id = ?"
  ).bind(user.id).first();

  return Response.json({ profile });
}
