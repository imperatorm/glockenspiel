import { ThemeSwitch } from "@/components/v2/ThemeSwitch";
import { withBase } from "@/lib/site";

type V2TopbarProps = {
  variant?: "home" | "sub";
  ctaLabel?: string;
  ctaOccasion?: string;
};

export function V2Topbar({ variant = "home", ctaLabel, ctaOccasion }: V2TopbarProps) {
  const links: Array<[string, string]> =
    variant === "home"
      ? [
          ["Food & Drinks", "/drinks"],
          ["Musik", "#musik"],
          ["Über uns", "#ueber"],
        ]
      : [
          ["Home", "/"],
          ["Food & Drinks", "/drinks"],
          ["Musik", "/#musik"],
        ];
  const label = ctaLabel ?? (variant === "home" ? "Reservieren" : "Anfragen");

  return (
    <header className="v2-topbar">
      <nav aria-label="Hauptnavigation">
        {links.map(([text, url]) => (
          <a href={withBase(url)} key={text}>
            {text}
          </a>
        ))}
      </nav>
      <span className="v2-topbar-center">Bar · Tapas · Café — Kitzbühel</span>
      <div className="v2-topbar-actions">
        <ThemeSwitch />
        <button
          className="v2-cta"
          type="button"
          data-modal-target="reserve"
          data-modal-status="not-active"
          data-occasion={ctaOccasion ?? "Reservierung"}
        >
          {label}
        </button>
      </div>
    </header>
  );
}
