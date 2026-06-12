import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const contact = typeof data?.contact === "string" ? data.contact.trim() : "";
  if (!name || !contact) {
    return NextResponse.json({ error: "Name und Kontakt sind erforderlich." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Der Mail-Versand ist noch nicht konfiguriert (RESEND_API_KEY fehlt)." },
      { status: 503 },
    );
  }

  const occasion = typeof data?.occasion === "string" ? data.occasion : "Reservierung";
  const lines = [
    `Name: ${name}`,
    `Kontakt: ${contact}`,
    `Anlass: ${occasion}`,
    `Datum: ${data?.date || "-"}`,
    `Uhrzeit: ${data?.time || "-"}`,
    `Personen: ${data?.guests || "-"}`,
    "",
    `Nachricht:`,
    `${data?.message || "-"}`,
  ];

  const resend = new Resend(apiKey);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "Glockenspiel Website <onboarding@resend.dev>",
    to: process.env.RESERVATION_TO || siteConfig.email,
    ...(isEmail ? { replyTo: contact } : {}),
    subject: `${occasion}: ${name}`,
    text: lines.join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Die Anfrage konnte nicht gesendet werden." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
