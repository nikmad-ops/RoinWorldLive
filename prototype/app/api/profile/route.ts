import { auth, currentUser } from "@clerk/nextjs/server";
import { env } from "cloudflare:workers";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;
  const displayName = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") || email || "Investor";

  let user = await env.DB.prepare(
    "SELECT id, clerk_user_id, email, display_name FROM users WHERE clerk_user_id = ?"
  ).bind(userId).first();

  if (!user) {
    const userDbId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO users (id, clerk_user_id, email, display_name) VALUES (?, ?, ?, ?)"
    ).bind(userDbId, userId, email, displayName).run();

    const profileId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO investor_profiles (id, user_id, investor_type, jurisdiction, kyc_status, eligibility_status) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(profileId, userDbId, "unclassified", null, "not_started", "pending").run();

    user = { id: userDbId, clerk_user_id: userId, email, display_name: displayName };
  } else {
    await env.DB.prepare(
      "UPDATE users SET email = ?, display_name = ? WHERE id = ?"
    ).bind(email, displayName, user.id).run();
  }

  const profile = await env.DB.prepare(
    "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, created_at FROM investor_profiles WHERE user_id = ?"
  ).bind(user.id).first();

  return Response.json({
    user: {
      id: user.id,
      email,
      displayName,
    },
    profile,
  });
}
