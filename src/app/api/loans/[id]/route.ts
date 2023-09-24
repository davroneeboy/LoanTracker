import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { PartiallyOptional } from "@/types/utility.type";
import { NextRequest, NextResponse } from "next/server";

type LoanSchemaBaseWithUserIdRequired = PartiallyOptional<
  LoanSchemaBase,
  "owner_id"
>;

export const PUT = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const [, api, loans, loanId] = pathname.split("/");

  if (!(api === "api" && loans === "loans")) {
    console.error("Invalid pathname:", req.nextUrl);
    return NextResponse.json([]);
  }

  const url = `${
    process.env.GL_API
  }/loans/${loanId}?${searchParams.toString()}`;
  const body: LoanSchemaBaseWithUserIdRequired = await req.json();

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: LoanSchema = await res.json();

  return NextResponse.json(data);
};
