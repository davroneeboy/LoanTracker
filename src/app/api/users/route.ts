import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch(`${process.env.GL_API}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const res = await fetch(`${process.env.GL_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data);
};
