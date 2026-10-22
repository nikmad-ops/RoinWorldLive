import { env } from "cloudflare:workers";
import { getManagerContext } from "@/lib/manager";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const ctx = await getManagerContext();
  if (!ctx.authenticated) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!ctx.staff) return Response.json({ error: "forbidden" }, { status: 403 });

  const { id } = await context.params;
  const body = await request.json() as {
    action?: "approve" | "reject" | "more_info";
    investorType?: string;
    notes?: string;
  };

  const action = body.action;
  if (!action) return Response.json({ error: "missing_action" }, { status: 400 });

  let kycStatus = "pending_review";
  let eligibilityStatus = "pending";

  if (action === "approve") {
    kycStatus = "approved";
    eligibilityStatus = "eligible";
  } else if (action === "reject") {
    kycStatus = "rejected";
    eligibilityStatus = "rejected";
  } else if (action === "more_info") {
    kycStatus = "more_info_required";
    eligibilityStatus = "pending";
  }

  const investorType = body.investorType?.trim();
  const notes = body.notes?.trim() || null;

  if (investorType) {
    await env.DB.prepare(
      "UPDATE investor_profiles SET investor_type = ?, kyc_status = ?, eligibility_status = ?, review_notes = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ? WHERE id = ?"
    ).bind(investorType, kycStatus, eligibilityStatus, notes, ctx.staff.clerk_user_id, id).run();
  } else {
    await env.DB.prepare(
      "UPDATE investor_profiles SET kyc_status = ?, eligibility_status = ?, review_notes = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ? WHERE id = ?"
    ).bind(kycStatus, eligibilityStatus, notes, ctx.staff.clerk_user_id, id).run();
  }

  const profile = await env.DB.prepare(
    "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, review_notes, reviewed_at FROM investor_profiles WHERE id = ?"
  ).bind(id).first();

  return Response.json({ profile });
}
