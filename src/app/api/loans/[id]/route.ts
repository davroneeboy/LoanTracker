import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import { PartiallyOptional } from "@/types/utility.type";
import { NextRequest, NextResponse } from "next/server";

type LoanSchemaBaseWithUserIdRequired = PartiallyOptional<
  LoanSchemaBase,
  "owner_id"
>;

export const GET = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const [, api, loans, loanId] = pathname.split("/");

  if (!(api === "api" && loans === "loans")) {
    console.error("Invalid pathname:", req.nextUrl);
    return NextResponse.json([]);
  }

  const url = `${
    process.env.GL_API
  }/loans/${loanId}?${searchParams.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: LoanScheduleSchema = await res.json();

  return NextResponse.json(data);
};

export const PUT = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const userId = searchParams.get("user_id");
  const [, api, loans, loanId] = pathname.split("/");
  const body: LoanSchemaBaseWithUserIdRequired = await req.json();

  if (!(api === "api" && loans === "loans")) {
    console.error("Invalid pathname:", req.nextUrl);
    return NextResponse.json([]);
  }

  if (userId !== body.owner_id?.toString()) {
    console.error("UserId and OwnerId mismatched:", searchParams);
    return NextResponse.json([]);
  }

  const url = `${
    process.env.GL_API
  }/loans/${loanId}?${searchParams.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: LoanSchema = await res.json();

  return NextResponse.json(data);
};
