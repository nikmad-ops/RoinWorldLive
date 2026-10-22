import { env } from "cloudflare:workers";
import { getManagerContext } from "@/lib/manager";

export async function GET() {
  const ctx = await getManagerContext();
  if (!ctx.authenticated) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!ctx.staff) return Response.json({ error: "forbidden" }, { status: 403 });

  const result = await env.DB.prepare(
    `SELECT
      p.id,
      p.first_name,
      p.last_name,
      u.email,
      p.date_of_birth,
      p.nationality,
      p.country_of_residence,
      p.phone,
      p.investor_type,
      p.jurisdiction,
      p.kyc_status,
      p.eligibility_status,
      p.review_notes,
      p.reviewed_at,
      p.created_at
    FROM investor_profiles p
    JOIN users u ON u.id = p.user_id
    ORDER BY
      CASE p.kyc_status WHEN 'pending_review' THEN 0 WHEN 'more_info_required' THEN 1 ELSE 2 END,
      p.created_at DESC`
  ).all();

  return Response.json({ investors: result.results });
}
