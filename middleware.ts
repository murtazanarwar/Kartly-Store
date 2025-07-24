import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  if (path === "/cart" && !token) {
    return NextResponse.redirect(new URL("/log-in", request.nextUrl));
  }

  // Optional: if logged-in user tries to go to login/signup, redirect to profile
  const isPublicPath = ["/log-in", "/sign-up", "/change-password"].includes(path);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/cart", "/log-in", "/sign-up", "/verify-email", "/change-password"],
};
