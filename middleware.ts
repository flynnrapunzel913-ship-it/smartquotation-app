import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "./lib/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login";

  // Check if it's a static file or api route (which we can leave alone for now, but API is not fully protected by this middleware yet, though we only have UI routes to worry about mainly)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/dev")
  ) {
    return NextResponse.next();
  }

  // Protect all routes except /login
  if (!session.isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in users away from login page
  if (session.isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/quotation-types", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/quotation-types",
    "/quotation-types/:path*",
    "/quotations/:path*",
    "/dashboard/:path*",
    "/history",
    "/history/:path*",
    "/activity",
    "/activity/:path*",
  ],
};
