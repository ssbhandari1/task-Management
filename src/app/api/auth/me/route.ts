
import { NextResponse } from "next/server";
import { getCookie } from "@/utils/cookies";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const token = getCookie(req);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
