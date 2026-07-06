"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CONSENT_CATEGORIES,
  CONSENT_OPEN_EVENT,
  type ConsentState,
  acceptAll,
  openConsentSettings,
  readConsent,
  rejectAll,
  saveConsent,
} from "@/lib/consent";
import { withBase } from "@/lib/site";

type Mode = "hidden" | "banner" | "settings";

export function CookieConsent() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [draft, setDraft] = useState<ConsentState>(rejectAll());
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Decide initial visibility on the client only (avoids SSR/cookie mismatch).
  useEffect(() => {
    if (readConsent() === null) setMode("banner");
  }, []);

  // Allow other UI (footer link, cookie page) to re-open the preferences.
  useEffect(() => {
    const onOpen = () => {
      setDraft(readConsent() ?? rejectAll());
      lastFocused.current = document.activeElement as HTMLElement | null;
      setMode("settings");
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const persist = useCallback((state: ConsentState) => {
    saveConsent(state);
    setMode("hidden");
    lastFocused.current?.focus?.();
  }, []);

  // Focus management + Esc handling for the settings dialog.
  useEffect(() => {
    if (mode !== "settings") return;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        // Returning to the banner (or closing if a choice already exists) never
        // counts as consent — compliant with "no choice = no non-essential cookies".
        setMode(readConsent() === null ? "banner" : "hidden");
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mode]);

  if (mode === "hidden") return null;

  if (mode === "banner") {
    return (
      <div className="cc-banner" role="dialog" aria-modal="false" aria-label="Cookie-Hinweis">
        <div className="cc-banner-text">
          <p className="cc-title">Wir respektieren deine Privatsphäre</p>
          <p className="cc-body">
            Wir verwenden ausschließlich notwendige Cookies, damit die Seite funktioniert — etwa für deine
            Cookie-Auswahl und Theme-Einstellung. Es werden keine Tracking- oder Marketing-Cookies gesetzt.
            Mehr dazu in der <a href={withBase("/cookies")}>Cookie-Richtlinie</a> und im{" "}
            <a href={withBase("/datenschutz")}>Datenschutz</a>.
          </p>
        </div>
        <div className="cc-actions">
          <button
            type="button"
            className="cc-btn cc-btn--primary"
            data-autofocus
            onClick={() => persist(acceptAll())}
          >
            Verstanden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cc-overlay" onMouseDown={(e) => e.target === e.currentTarget && setMode(readConsent() === null ? "banner" : "hidden")}>
      <div
        ref={dialogRef}
        className="cc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-modal-title"
      >
        <p className="cc-eyebrow">Privatsphäre</p>
        <h2 id="cc-modal-title" className="cc-modal-title">
          Cookie-Einstellungen
        </h2>
        <p className="cc-body">
          Diese Website verwendet ausschließlich notwendige Cookies. Es gibt daher nichts zu deaktivieren —
          die Übersicht zeigt dir, was gesetzt wird.
        </p>

        <div className="cc-categories">
          {CONSENT_CATEGORIES.map((category) => (
            <label className="cc-category" key={category.id}>
              <span className="cc-category-head">
                <span className="cc-category-title">{category.title}</span>
                <input
                  type="checkbox"
                  className="cc-switch"
                  checked={category.required ? true : draft[category.id]}
                  disabled={category.required}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, [category.id]: e.target.checked }))
                  }
                />
              </span>
              <span className="cc-category-body">{category.body}</span>
            </label>
          ))}
        </div>

        <div className="cc-actions cc-actions--modal">
          <button type="button" className="cc-btn cc-btn--primary" onClick={() => persist(acceptAll())} data-autofocus>
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}

// Convenience trigger (e.g. footer / cookie policy page) — re-opens preferences.
export function openCookieSettings() {
  openConsentSettings();
}
