import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple test endpoint — replace re_xxxxxxxxx with your real API key in .env.local
export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    return NextResponse.json(
      { error: "Replace re_xxxxxxxxx with your real Resend API key in .env.local" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.CONTACT_TO ?? "gremontmatheo22@gmail.com",
    subject: "Hello World",
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
