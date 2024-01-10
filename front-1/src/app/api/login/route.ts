import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { parse } from 'url';
import { redirect } from "next/navigation";
import { sdkBack } from "../../../lib/casdoor-back";

export async function GET(request: NextRequest) {
  const parsedUrl = parse(request.url, true).query;

  if (typeof parsedUrl.code === "string") {
    const tokens = await sdkBack.getAuthToken(parsedUrl.code);

    if (tokens.access_token) {
      cookies().set('accessToken', tokens.access_token, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'lax',
        secure: true,
      });

      return redirect('/home');
    }
  }

  return NextResponse.json({ status: 401, message: "Unauthorized", success: false }, { status: 401 });
}