import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export async function GET(req: NextRequest) {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const token = createHash("sha256").update(pwd + "nova").digest("hex");
  const cookie = req.cookies.get("admin_session")?.value;
  return NextResponse.json({ ok: cookie === token });
}
