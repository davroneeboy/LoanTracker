import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const url = `${process.env.GL_API}/loans`;
  const body: LoanSchemaBase = await req.json();
  const res = await fetch(url, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: LoanSchema = await res.json();

  return NextResponse.json(data);
};
