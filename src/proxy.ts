import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define public and protected routes
  const isPublicRoute =
    pathname === "/login" || pathname === "/signup" || pathname === "/";
  const isProtectedRoute =
    pathname.startsWith("/home") || pathname.startsWith("/profile");

  // If authenticated and trying to access public auth routes, redirect to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If not authenticated and trying to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
