import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.GL_API}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}
