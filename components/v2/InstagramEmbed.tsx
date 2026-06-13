"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  hasConsent,
  openConsentSettings,
  readConsent,
  saveConsent,
} from "@/lib/consent";

// Loads the Instagram (Elfsight) embed only after marketing consent is given.
// Until then it shows a first-party placeholder with a one-click opt-in.
export function InstagramEmbed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const update = () => setAllowed(hasConsent("marketing"));
    update();
    window.addEventListener(CONSENT_CHANGE_EVENT, update);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, update);
  }, []);

  if (!allowed) {
    return (
      <div className="v2-consent-embed" role="group" aria-label="Instagram-Feed">
        <p className="v2-consent-embed-title">Instagram-Feed</p>
        <p className="v2-consent-embed-body">
          Um den Instagram-Feed zu sehen, müssen Marketing-Cookies geladen werden. Dabei werden Daten an
          Instagram übertragen.
        </p>
        <div className="v2-consent-embed-actions">
          <button
            type="button"
            className="v2-button"
            onClick={() => saveConsent({ ...(readConsent() ?? {}), necessary: true, marketing: true })}
          >
            Instagram-Inhalte laden
          </button>
          <button type="button" className="v2-consent-embed-link" onClick={() => openConsentSettings()}>
            Einstellungen
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className="elfsight-app-6437bae5-64a3-4fb0-bda2-56e88b6733dc" data-elfsight-app-lazy="" />
    </>
  );
}
