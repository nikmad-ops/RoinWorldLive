import { auth, currentUser } from "@clerk/nextjs/server";
import { env } from "cloudflare:workers";

async function ensureProfile() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;
  const firstName = clerkUser?.firstName ?? null;
  const lastName = clerkUser?.lastName ?? null;
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || email || "Investor";

  let user = await env.DB.prepare(
    "SELECT id, clerk_user_id, email, display_name FROM users WHERE clerk_user_id = ?"
  ).bind(userId).first<{ id: string; clerk_user_id: string; email: string | null; display_name: string | null }>();

  if (!user) {
    const userDbId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO users (id, clerk_user_id, email, display_name) VALUES (?, ?, ?, ?)"
    ).bind(userDbId, userId, email, displayName).run();

    user = { id: userDbId, clerk_user_id: userId, email, display_name: displayName };
  } else {
    await env.DB.prepare(
      "UPDATE users SET email = ?, display_name = ? WHERE id = ?"
    ).bind(email, displayName, user.id).run();
  }

  let profile = await env.DB.prepare(
    "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, first_name, last_name, date_of_birth, nationality, country_of_residence, phone, created_at FROM investor_profiles WHERE user_id = ?"
  ).bind(user.id).first();

  if (!profile) {
    const profileId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO investor_profiles (id, user_id, investor_type, jurisdiction, kyc_status, eligibility_status, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(profileId, user.id, "unclassified", null, "not_started", "pending", firstName, lastName).run();

    profile = await env.DB.prepare(
      "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, first_name, last_name, date_of_birth, nationality, country_of_residence, phone, created_at FROM investor_profiles WHERE user_id = ?"
    ).bind(user.id).first();
  }

  return {
    user: {
      id: user.id,
      email,
      displayName,
      firstName,
      lastName,
    },
    profile,
  };
}

export async function GET() {
  const result = await ensureProfile();
  if (!result) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json(result);
}
