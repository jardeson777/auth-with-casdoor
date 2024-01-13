import { NextRequest, NextResponse } from "next/server";

type Product = {
  name: string;
  price: number;
};

export async function GET(request: NextRequest) {
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

  await fetch("http://localhost:3333/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input }),
  }).then((res) => res.json());

  return NextResponse.json({ status: 200, success: true }, { status: 200 });
}