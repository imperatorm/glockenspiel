// First-party, self-contained cookie-consent state (no external SDK/key).
// Stored in a first-party cookie so the choice persists and is readable
// everywhere on the site. Bump CONSENT_VERSION when the categories or policy
// change to re-prompt visitors.

export type ConsentCategory = "necessary" | "marketing";

export type ConsentState = Record<ConsentCategory, boolean>;

type StoredConsent = ConsentState & { v: number; ts: number };

export const CONSENT_COOKIE = "glocken-consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

// Fired (on window) whenever the visitor saves a choice — consumers re-read state.
export const CONSENT_CHANGE_EVENT = "consent:change";
// Fired (on window) to re-open the preferences dialog (footer link, cookie page…).
export const CONSENT_OPEN_EVENT = "consent:open";

export type ConsentCategoryInfo = {
  id: ConsentCategory;
  required: boolean;
  title: string;
  body: string;
};

// Only list categories that correspond to cookies/services we actually use.
export const CONSENT_CATEGORIES: ConsentCategoryInfo[] = [
  {
    id: "necessary",
    required: true,
    title: "Notwendig",
    body:
      "Für den Betrieb der Website erforderlich — etwa das Speichern dieser Cookie-Auswahl und deiner Theme-Einstellung. Diese Cookies setzen keine Tracking-Daten und sind immer aktiv.",
  },
  {
    id: "marketing",
    required: false,
    title: "Marketing & Social Media",
    body:
      "Lädt eingebettete Inhalte von Drittanbietern wie dem Instagram-Feed. Dabei können Cookies gesetzt und Daten an die jeweiligen Anbieter übertragen werden.",
  },
];

export function acceptAll(): ConsentState {
  return { necessary: true, marketing: true };
}

export function rejectAll(): ConsentState {
  return { necessary: true, marketing: false };
}

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const raw = decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1));
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== CONSENT_VERSION) return null;
    return { necessary: true, marketing: Boolean(parsed.marketing) };
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const payload: StoredConsent = {
    ...state,
    necessary: true, // always granted
    v: CONSENT_VERSION,
    ts: Date.now(),
  };
  const value = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, {
      detail: { ...state, necessary: true },
    }),
  );
}

export function hasConsent(category: ConsentCategory): boolean {
  const state = readConsent();
  if (!state) return category === "necessary";
  return Boolean(state[category]);
}

export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
