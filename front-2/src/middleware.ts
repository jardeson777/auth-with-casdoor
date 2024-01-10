import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  const pathname = new URL(request.nextUrl).pathname;

  console.log('aaaaaaaaaaaaaa', pathname);

  if (!accessToken && pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (accessToken && pathname === "/login" || accessToken && pathname === "/") {
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  return;
}

export const config = {
  matcher: [
    "/",
    "/api",
    "/login",
    "/home",
  ],
}