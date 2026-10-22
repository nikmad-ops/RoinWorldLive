import { bootstrapManager, getManagerContext } from "@/lib/manager";

export async function GET() {
  const ctx = await getManagerContext();
  if (!ctx.authenticated) return Response.json({ authenticated: false }, { status: 401 });
  return Response.json({
    authenticated: true,
    staff: ctx.staff ?? null,
    bootstrapAllowed: ctx.bootstrapAllowed,
  });
}

export async function POST() {
  const result = await bootstrapManager();
  if ("error" in result) {
    return Response.json({ error: result.error }, { status: result.error === "unauthorized" ? 401 : 403 });
  }
  return Response.json({ staff: result.staff });
}
