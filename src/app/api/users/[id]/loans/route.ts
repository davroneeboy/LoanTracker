import LoanSchema from "@/types/loan.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const [, api, users, userId, loans] = pathname.split("/");

  if (!(api === "api" && users === "users" && loans === "loans")) {
    console.error("Invalid pathname:", req.nextUrl);
    return NextResponse.json([]);
  }

  const url = `${process.env.GL_API}/users/${userId}/loans`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: LoanSchema[] = await res.json();

  return NextResponse.json(data);
};
