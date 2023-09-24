import LoanSummarySchema from "@/types/loanSummary.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const url = new URL(
    `${pathname.replace("/api/", "")}?${searchParams.toString()}`,
    process.env.GL_API
  );

  const res = await fetch(url.href, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: LoanSummarySchema = await res.json();

  return NextResponse.json(data);
};
