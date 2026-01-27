import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import { PartiallyOptional } from "@/types/utility.type";
import { NextRequest, NextResponse } from "next/server";

type LoanSchemaBaseWithUserIdRequired = PartiallyOptional<
  LoanSchemaBase,
  "owner_id"
>;

const getApiUrl = (pathname: string, searchParams: URLSearchParams): string => {
  const baseUrl = process.env.GL_API;
  
  if (!baseUrl || baseUrl.trim() === "") {
    throw new Error("GL_API environment variable is not set");
  }

  const path = pathname.replace("/api/", "");
  const queryString = searchParams.toString();
  const fullPath = queryString 
    ? `${path}?${queryString}`
    : path;
  
  return `${baseUrl.replace(/\/$/, "")}/${fullPath.replace(/^\//, "")}`;
};

export const GET = async (req: NextRequest) => {
  try {
    const { pathname, searchParams } = req.nextUrl;
    const url = getApiUrl(pathname, searchParams);

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));

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
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          detail: error instanceof Error ? error.message : "Internal server error",
        },
        statusCode: 500,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { pathname, searchParams } = req.nextUrl;
    const body: LoanSchemaBaseWithUserIdRequired = await req.json();
    const url = getApiUrl(pathname, searchParams);

    const res = await fetch(url, {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));

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
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          detail: error instanceof Error ? error.message : "Internal server error",
        },
        statusCode: 500,
      },
      { status: 500 }
    );
  }
};
