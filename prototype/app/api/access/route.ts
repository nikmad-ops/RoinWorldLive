const encoder = new TextEncoder();
const PASSWORD_HASH = "bacba03a67fe7ee8435f1d293f8d4b90c872f82b5b198de73ebbae002022bcb0";
const ACCESS_TOKEN = "012728da171d38789dcb029355795c953620476d350bbc02895a67a9b644291b";

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  const supplied = body.password || "";

  if (await sha256(supplied) !== PASSWORD_HASH) {
    return Response.json({ error: "invalid_password" }, { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": `rwl_access=${ACCESS_TOKEN}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
      "cache-control": "no-store",
    },
  });
}
