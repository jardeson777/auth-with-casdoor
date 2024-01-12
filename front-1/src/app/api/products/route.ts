import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sdkBack } from "../../../lib/casdoor-back";
import { redirect } from "next/navigation";

type Product = {
  name: string;
  price: number;
};

export async function GET(request: NextRequest) {
  const token = cookies().get("accessToken");

  // if (!token) redirect("/login");

  // let jwtParsed = null;

  // try {
  //   jwtParsed = sdkBack.parseJwtToken(token.value);
  // } catch (error) {
  //   cookies().delete("accessToken");

  //   return redirect("/login");
  // }

  // const { id } = jwtParsed;

  // const teste = await fetch("http://localhost:8000/api/enforce?permissionId=Documentall/example-permission", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Basic 2aff09046f21a5545ee4 198d48fb9bb3692100905e86b140f755f8bc2116`
  //   },
  //   body: JSON.stringify([`Documentall/${id}`, "product", "list"]),
  // }).then((res) => res.json());

  // console.log("aaaaaaaaaaaaaaaaa", teste);

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

  let jwtParsed = null;

  try {
    jwtParsed = sdkBack.parseJwtToken(token.value);
  } catch (error) {
    cookies().delete("accessToken");

    return redirect("/login");
  }

  const { id, name } = jwtParsed;

  console.log('user', name, id);

  const responseCasbin = await fetch("http://localhost:8000/api/enforce?permissionId=Documentall/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic 25fa3767a0df1bf46fbc 198d48fb9bb3692100905e86b140f755f8bc2116`
    },
    body: JSON.stringify([`Documentall/${name}`, "product", "Escrever"]),
  }).then((res) => res.json());

  console.log("responseCasbin", responseCasbin);

  await fetch("http://localhost:3333/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input }),
  }).then((res) => res.json());

  return NextResponse.json({ status: 200, success: true }, { status: 200 });
}