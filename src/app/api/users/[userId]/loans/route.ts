import LoanSchema from "@/types/loan.type";
import { NextRequest, NextResponse } from "next/server";

const getApiUrl = (pathname: string): string => {
  const baseUrl = process.env.GL_API;
  
  if (!baseUrl || baseUrl.trim() === "") {
    throw new Error("GL_API environment variable is not set");
  }

  const path = pathname.replace("/api/", "");
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const GET = async (req: NextRequest) => {
  try {
    const url = getApiUrl(req.nextUrl.pathname);

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

    const data: LoanSchema[] = await res.json();

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
