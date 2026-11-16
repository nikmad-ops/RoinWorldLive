import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ACCESS_TOKEN = "012728da171d38789dcb029355795c953620476d350bbc02895a67a9b644291b";

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
  if (cookie === ACCESS_TOKEN) return NextResponse.next();

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
