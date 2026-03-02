import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabase } from "@/lib/supabase";

function getAdminToken(): string {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return "";
  return createHash("sha256").update(pwd + "nova").digest("hex");
}

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  return !!token && token === getAdminToken();
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      console.error("[reviews DELETE]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[reviews DELETE]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
