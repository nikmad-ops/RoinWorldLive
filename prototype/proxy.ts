import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";

const encoder = new TextEncoder();

async function expectedAccessToken() {
  if (!env.ACCESS_GATE_SECRET) return "";
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

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;

  const publicPath =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname === "/api/access" ||
    pathname.startsWith("/__clerk");

  if (publicPath) return NextResponse.next();

  const { userId } = await auth();
  if (userId) return NextResponse.next();

  const cookie = request.cookies.get("rwl_access")?.value;
  if (cookie && cookie === await expectedAccessToken()) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return Response.json({ error: "access_required" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
