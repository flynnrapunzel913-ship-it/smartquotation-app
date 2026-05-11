import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Google OAuth is disabled" }, { status: 404 });
}
