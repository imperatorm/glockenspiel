import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

// Sends the reservation/event request via Resend's REST API using plain fetch.
// (The Resend Node SDK can fail on the Cloudflare Workers runtime that Webflow
// Cloud uses — a direct fetch is Workers-safe.)
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
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  // Resend's shared sandbox sender is always verified, so it's the fallback when the
  // configured custom domain hasn't been verified yet (Resend rejects those with 403).
  const SANDBOX_FROM = "Glockenspiel Website <onboarding@resend.dev>";
  const configuredFrom = process.env.RESEND_FROM || SANDBOX_FROM;

  const to = Array.from(
    new Set([
      process.env.RESERVATION_TO || siteConfig.email,
      "johannes.lehberger@gmail.com",
      "info@dasglockenspiel.at",
      "lieferschein@dasglockenspiel.at",
    ]),
  );

  const send = (from: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        ...(isEmail ? { reply_to: contact } : {}),
        subject: `${occasion}: ${name}`,
        text: lines.join("\n"),
      }),
    });

  try {
    let response = await send(configuredFrom);

    // 403 = sender domain not verified. Retry from the sandbox sender so the form
    // still works before the domain's DNS records are verified in Resend.
    if (response.status === 403 && configuredFrom !== SANDBOX_FROM) {
      const detail = await response.text().catch(() => "");
      console.error(`[reserve] Resend 403 for "${configuredFrom}", retrying via sandbox: ${detail}`);
      response = await send(SANDBOX_FROM);
    }

    if (!response.ok) {
      // Surface the real reason (e.g. unverified domain, recipient restriction) in logs.
      const detail = await response.text().catch(() => "");
      console.error(`[reserve] Resend ${response.status}: ${detail}`);
      return NextResponse.json({ error: "Die Anfrage konnte nicht gesendet werden." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[reserve] send failed", error);
    return NextResponse.json({ error: "Die Anfrage konnte nicht gesendet werden." }, { status: 502 });
  }
}
