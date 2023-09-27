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

  const url = new URL(
    `${pathname.replace("/api/", "")}?${searchParams.toString()}`,
    process.env.GL_API
  );

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();

    return NextResponse.json(
      {
        error: errorData,
        statusCode: res.status,
      },
      { status: res.status }
    );
  }

  const data: LoanScheduleSchema = await res.json();

  return NextResponse.json(data);
};

export const PUT = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const body: LoanSchemaBaseWithUserIdRequired = await req.json();

  const url = new URL(
    `${pathname.replace("/api/", "")}?${searchParams.toString()}`,
    process.env.GL_API
  );

  const res = await fetch(url, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();

    return NextResponse.json(
      {
        error: errorData,
        statusCode: res.status,
      },
      { status: res.status }
    );
  }

  const data: LoanSchema = await res.json();

  return NextResponse.json(data);
};
