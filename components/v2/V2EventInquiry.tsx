"use client";

import { useState } from "react";
import { inquirySources, inquirySuccess } from "@/lib/firmenevents";
import { siteConfig, withBase } from "@/lib/site";

type SendState = "idle" | "sending" | "success" | "error";

// Embedded (not modal) event inquiry form. Posts to the same /api/reserve
// endpoint as the reservation modal, flagged as kind "event".
export function V2EventInquiry({ occasion }: { occasion: string }) {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const tel = `tel:${siteConfig.phone.replaceAll(" ", "")}`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), kind: "event", occasion };
    setSendState("sending");
    setErrorMessage("");
    try {
      const response = await fetch(withBase("/api/reserve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Senden fehlgeschlagen.");
      setSendState("success");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Senden fehlgeschlagen.");
      setSendState("error");
    }
  };

  return (
    <div className="v2-inquiry-body">
      {sendState === "success" ? (
        <p className="v2-inquiry-success v2-serif" role="status">
          {inquirySuccess}
        </p>
      ) : (
        <form className="modal__form v2-inquiry-form" onSubmit={onSubmit}>
          <label>
            Name *
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Firma *
            <input name="firma" required autoComplete="organization" />
          </label>
          <label>
            E-Mail *
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Telefon
            <input name="telefon" type="tel" autoComplete="tel" />
          </label>
          <label>
            Wunschdatum *
            <input name="date" type="date" required />
          </label>
          <label>
            Personenanzahl *
            <input name="guests" type="number" min={1} max={120} required />
          </label>
          <label>
            Budgetrahmen
            <input name="budget" placeholder="z. B. 3.000 €" />
          </label>
          <label>
            Wie haben Sie von uns erfahren?
            <select name="source" defaultValue="">
              <option value="">Bitte wählen</option>
              {inquirySources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
          <label className="modal__field--full">
            Nachricht
            <textarea name="message" />
          </label>
          {sendState === "error" ? (
            <p className="modal__error modal__field--full" role="alert">
              {errorMessage} Bitte rufen Sie uns an: <a href={tel}>{siteConfig.phone}</a>
            </p>
          ) : null}
          <button
            className="v2-button v2-button--terracotta modal__field--full"
            type="submit"
            disabled={sendState === "sending"}
          >
            {sendState === "sending" ? "Wird gesendet …" : "Angebot anfragen"}
          </button>
        </form>
      )}
      <p className="v2-inquiry-phone">
        Lieber direkt? <a href={tel}>{siteConfig.phone}</a>
      </p>
    </div>
  );
}
