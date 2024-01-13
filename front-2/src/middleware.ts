import { NextResponse, type NextRequest } from 'next/server';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(params) {
    const token = params.nextauth.token.accessToken;
    const pathname = new URL(params.nextUrl).pathname;

    if (!token && pathname !== "/login") {
      return NextResponse.redirect(new URL('/login', params.nextUrl));
    }

    if (token && pathname === "/login" || token && pathname === "/") {
      return NextResponse.redirect(new URL('/home', params.nextUrl));
    }
  },
  {
    pages: {
      signIn: "/login",
    }
  }
);

export const config = {
  matcher: [
    "/",
    "/api",
    "/login",
    "/home",
  ],
}