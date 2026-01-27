import UserSchema from "@/types/user.type";
import UserSchemaBase from "@/types/userBase.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(
    req.nextUrl.pathname.replace("/api/", ""),
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

  const data = await res.json();
  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const url = new URL(
    req.nextUrl.pathname.replace("/api/", ""),
    process.env.GL_API
  );
  const body: UserSchemaBase = await req.json();
  const res = await fetch(url, {
    cache: "no-store",
    method: "POST",
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

  const data: UserSchema = await res.json();

  return NextResponse.json(data);
};
