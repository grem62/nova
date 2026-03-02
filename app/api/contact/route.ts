import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY manquant. Ajoute-le dans .env.local" }, { status: 500 });
    }

    const { nom, email, objectif, disponibilites, message } = await req.json();

    if (!nom || !email || !objectif) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO ?? "gremontmatheo22@gmail.com";
    const resend = new Resend(apiKey);

    const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const safeMessage = message ? esc(message) : "";
    const safe = { nom: esc(nom), email: esc(email), objectif: esc(objectif), disponibilites: esc(disponibilites ?? "—") };

    const { error } = await resend.emails.send({
      from: "Nova Coaching <contact@novacoaching.eu>",
      replyTo: email,
      to,
      subject: `Nouvelle demande de séance — ${nom}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#020818;color:#e8f0ff;padding:32px;border-radius:16px;">
          <h2 style="color:#EEFF00;margin-bottom:24px;">Nouvelle demande de séance 🏋️</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b87b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Nom</td><td style="padding:8px 0;font-weight:600;">${safe.nom}</td></tr>
            <tr><td style="padding:8px 0;color:#6b87b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe.email}" style="color:#EEFF00;">${safe.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b87b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Objectif / Niveau</td><td style="padding:8px 0;">${safe.objectif}</td></tr>
            <tr><td style="padding:8px 0;color:#6b87b0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Disponibilités</td><td style="padding:8px 0;">${safe.disponibilites}</td></tr>
          </table>
          ${safeMessage ? `<div style="margin-top:20px;padding:16px;background:#061224;border-radius:10px;border:1px solid rgba(238,255,0,0.12);"><p style="color:#6b87b0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Message</p><p style="margin:0;line-height:1.6;">${safeMessage}</p></div>` : ""}
          <p style="margin-top:24px;font-size:11px;color:#2d4060;">Nova Coaching — réponse recommandée sous 24–48h</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact API] Resend error:", JSON.stringify(error, null, 2));
      return NextResponse.json({ error: "Erreur Resend: " + (error?.message ?? "inconnue") }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact API] Exception:", msg, err);
    return NextResponse.json({ error: "Erreur: " + msg }, { status: 500 });
  }
}
