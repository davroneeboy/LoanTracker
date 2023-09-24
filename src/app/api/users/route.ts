import UserSchema from "@/types/user.type";
import UserSchemaBase from "@/types/userBase.type";
import { NextRequest, NextResponse } from "next/server";

const url = `${process.env.GL_API}/users`;

export const GET = async () => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const body: UserSchemaBase = await req.json();
  const res = await fetch(url, {
    cache: 'no-store',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: UserSchema = await res.json();

  return NextResponse.json(data);
};
