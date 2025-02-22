// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("Middleware running for:", request.nextUrl.pathname);
  // Check for an auth token (adjust based on how you're storing auth state)
  const token = request.cookies.get("token")?.value;

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Configure middleware to run on both "/" and "/onboarding" pages (and any sub-paths)
export const config = {
  matcher: ["/", "/onboarding/:path*"],
};
