import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  // Define public paths
  const isPublicPath =
    path === "/signin" || path === "/signup";

 const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is on a public path and has a token, redirect to homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is on a protected path and has no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Configuration for which paths the middleware should run on
export const config = {
  matcher: ["/", "/signin", "/signup", "/profile"],
};