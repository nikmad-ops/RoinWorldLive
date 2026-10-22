import { auth, currentUser } from "@clerk/nextjs/server";
import { env } from "cloudflare:workers";

export async function getManagerContext() {
  const { userId } = await auth();
  if (!userId) return { authenticated: false as const };

  const staffCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM staff_users").first<{ count: number }>();
  const staff = await env.DB.prepare(
    "SELECT id, clerk_user_id, email, role FROM staff_users WHERE clerk_user_id = ?"
  ).bind(userId).first<{ id: string; clerk_user_id: string; email: string | null; role: string }>();

  return {
    authenticated: true as const,
    userId,
    staff,
    bootstrapAllowed: Number(staffCount?.count || 0) === 0,
  };
}

export async function bootstrapManager() {
  const ctx = await getManagerContext();
  if (!ctx.authenticated) return { error: "unauthorized" as const };
  if (ctx.staff) return { staff: ctx.staff };
  if (!ctx.bootstrapAllowed) return { error: "forbidden" as const };

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;
  const staff = {
    id: crypto.randomUUID(),
    clerk_user_id: ctx.userId,
    email,
    role: "platform_manager",
  };

  await env.DB.prepare(
    "INSERT INTO staff_users (id, clerk_user_id, email, role) VALUES (?, ?, ?, ?)"
  ).bind(staff.id, staff.clerk_user_id, staff.email, staff.role).run();

  return { staff };
}
