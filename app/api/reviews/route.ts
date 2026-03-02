import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { supabase } from "@/lib/supabase";

const MAX_PHOTO_SIZE = 2 * 1024 * 1024; // 2 Mo
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function GET() {
  try {
    let data: Array<Record<string, unknown>> | null = null;
    let err: { message?: string } | null = null;

    const res1 = await supabase.from("reviews").select("id, name, text, stars, created_at, photo_url").order("created_at", { ascending: false });
    if (res1.error && (res1.error.message?.includes("photo_url") || res1.error.message?.includes("column"))) {
      const res2 = await supabase.from("reviews").select("id, name, text, stars, created_at").order("created_at", { ascending: false });
      data = res2.data as Array<Record<string, unknown>> | null;
      err = res2.error;
    } else {
      data = res1.data as Array<Record<string, unknown>> | null;
      err = res1.error;
    }

    if (err) {
      console.error("[reviews GET]", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    const reviews = (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      text: r.text,
      stars: r.stars,
      createdAt: r.created_at,
      photoUrl: (r as { photo_url?: string }).photo_url ?? null,
    }));

    return NextResponse.json(reviews);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[reviews GET]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, text, stars, photoBase64, photoMime } = body;

    if (!name || !text || typeof stars !== "number" || stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: "Champs invalides: name, text, stars (1-5) requis." },
        { status: 400 }
      );
    }

    let photoUrl: string | null = null;

    if (photoBase64 && typeof photoBase64 === "string") {
      const mime = photoMime && ALLOWED_TYPES.includes(photoMime) ? photoMime : "image/jpeg";
      const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
      const buffer = Buffer.from(photoBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");

      if (buffer.length > MAX_PHOTO_SIZE) {
        return NextResponse.json({ error: "Photo trop volumineuse (max 2 Mo)." }, { status: 400 });
      }

      const blob = await put(`reviews/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`, buffer, {
        contentType: mime,
        access: "public",
      });
      photoUrl = blob.url;
    }

    const insertData: Record<string, unknown> = { name: String(name).trim(), text: String(text).trim(), stars };
    if (photoUrl) insertData.photo_url = photoUrl;

    const res1 = await supabase.from("reviews").insert(insertData).select("id, name, text, stars, created_at, photo_url").single();

    let data: Record<string, unknown> | null = null;
    if (res1.error && (res1.error.message?.includes("photo_url") || res1.error.message?.includes("column"))) {
      delete insertData.photo_url;
      const res2 = await supabase.from("reviews").insert(insertData).select("id, name, text, stars, created_at").single();
      if (res2.error) {
        console.error("[reviews POST]", res2.error);
        return NextResponse.json({ error: res2.error.message }, { status: 500 });
      }
      data = res2.data as Record<string, unknown>;
    } else if (res1.error) {
      console.error("[reviews POST]", res1.error);
      return NextResponse.json({ error: res1.error.message }, { status: 500 });
    } else {
      data = res1.data as Record<string, unknown>;
    }

    return NextResponse.json({
      id: data!.id,
      name: data!.name,
      text: data!.text,
      stars: data!.stars,
      createdAt: data!.created_at,
      photoUrl: (data as { photo_url?: string }).photo_url ?? null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[reviews POST]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
