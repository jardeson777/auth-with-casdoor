import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

type Product = {
  name: string;
  price: number;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);

  console.log(session?.user.accessToken);

  const data: Array<Product> = await fetch("http://localhost:3333/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache"
  }).then((res) => res.json());

  return NextResponse.json({ status: 200, success: true, data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const token = cookies().get("accessToken");

  if (!token) redirect("/login");

  await fetch("http://localhost:3333/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input }),
  }).then((res) => res.json());

  return NextResponse.json({ status: 200, success: true }, { status: 200 });
}