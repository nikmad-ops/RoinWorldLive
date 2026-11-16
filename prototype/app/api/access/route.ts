import { env } from "cloudflare:workers";

const encoder = new TextEncoder();

function constantTimeEqual(a: string, b: string) {
  const aa = encoder.encode(a);
  const bb = encoder.encode(b);
  if (aa.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}

async function accessToken() {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(env.ACCESS_GATE_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("rwl-access"));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  const supplied = body.password || "";

  if (!env.ACCESS_GATE_PASSWORD || !constantTimeEqual(supplied, env.ACCESS_GATE_PASSWORD)) {
    return Response.json({ error: "invalid_password" }, { status: 401 });
  }

  const token = await accessToken();
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": `rwl_access=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
      "cache-control": "no-store",
    },
  });
}
