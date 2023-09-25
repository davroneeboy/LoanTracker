import LoanSchema from "@/types/loan.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(
    `${req.nextUrl.pathname.replace("/api/", "")}`,
    process.env.GL_API
  );

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: LoanSchema[] = await res.json();

  return NextResponse.json(data);
};
