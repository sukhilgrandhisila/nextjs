// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;
  const pathname = request.nextUrl.pathname.toLowerCase();
  const publicRoutes = ["/login"];
  const protectedRoutes = [
    "/home",
    "/trending-movies",
    "/top-rated-movies",
    "/originals",
    "/popular-movies",
  ];

  // Redirect logged-in user away from public pages
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect not logged-in user from protected pages
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Let everything else go through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
