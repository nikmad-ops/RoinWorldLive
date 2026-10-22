import { auth, currentUser } from "@clerk/nextjs/server";
import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    nationality?: string;
    countryOfResidence?: string;
    phone?: string;
    investorType?: string;
    jurisdiction?: string;
  };

  const required = {
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    dateOfBirth: body.dateOfBirth?.trim(),
    nationality: body.nationality?.trim(),
    countryOfResidence: body.countryOfResidence?.trim(),
    phone: body.phone?.trim(),
    investorType: body.investorType?.trim(),
    jurisdiction: body.jurisdiction?.trim(),
  };

  if (Object.values(required).some((value) => !value)) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;
  const displayName = `${required.firstName} ${required.lastName}`;

  let user = await env.DB.prepare(
    "SELECT id FROM users WHERE clerk_user_id = ?"
  ).bind(userId).first<{ id: string }>();

  if (!user) {
    const userDbId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO users (id, clerk_user_id, email, display_name) VALUES (?, ?, ?, ?)"
    ).bind(userDbId, userId, email, displayName).run();
    user = { id: userDbId };
  } else {
    await env.DB.prepare(
      "UPDATE users SET email = ?, display_name = ? WHERE id = ?"
    ).bind(email, displayName, user.id).run();
  }

  const existing = await env.DB.prepare(
    "SELECT id FROM investor_profiles WHERE user_id = ?"
  ).bind(user.id).first<{ id: string }>();

  if (!existing) {
    await env.DB.prepare(
      "INSERT INTO investor_profiles (id, user_id, investor_type, jurisdiction, kyc_status, eligibility_status, first_name, last_name, date_of_birth, nationality, country_of_residence, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      crypto.randomUUID(),
      user.id,
      required.investorType,
      required.jurisdiction,
      "pending_review",
      "pending",
      required.firstName,
      required.lastName,
      required.dateOfBirth,
      required.nationality,
      required.countryOfResidence,
      required.phone
    ).run();
  } else {
    await env.DB.prepare(
      "UPDATE investor_profiles SET investor_type = ?, jurisdiction = ?, kyc_status = ?, eligibility_status = ?, first_name = ?, last_name = ?, date_of_birth = ?, nationality = ?, country_of_residence = ?, phone = ? WHERE user_id = ?"
    ).bind(
      required.investorType,
      required.jurisdiction,
      "pending_review",
      "pending",
      required.firstName,
      required.lastName,
      required.dateOfBirth,
      required.nationality,
      required.countryOfResidence,
      required.phone,
      user.id
    ).run();
  }

  const profile = await env.DB.prepare(
    "SELECT id, investor_type, jurisdiction, kyc_status, eligibility_status, first_name, last_name, date_of_birth, nationality, country_of_residence, phone, created_at FROM investor_profiles WHERE user_id = ?"
  ).bind(user.id).first();

  return Response.json({ profile });
}
