import { ThemeSwitch } from "@/components/v2/ThemeSwitch";
import { labels, withBase } from "@/lib/site";

type V2TopbarProps = {
  variant?: "home" | "sub";
  ctaLabel?: string;
  ctaOccasion?: string;
  /** Plain link CTA (e.g. "#anfrage") instead of opening the reservation modal. */
  ctaHref?: string;
};

export function V2Topbar({ variant = "home", ctaLabel, ctaOccasion, ctaHref }: V2TopbarProps) {
  const links: Array<[string, string]> =
    variant === "home"
      ? [
          ["Essen und Trinken", "/drinks"],
          ["Weihnachtsfeier", "/weihnachtsfeier-kitzbuehel"],
          ["Über uns", "#ueber"],
        ]
      : [
          ["Home", "/"],
          ["Essen und Trinken", "/drinks"],
          ["Weihnachtsfeier", "/weihnachtsfeier-kitzbuehel"],
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
      <span className="v2-topbar-center">{labels.tagline}</span>
      <div className="v2-topbar-actions">
        <ThemeSwitch />
        {ctaHref ? (
          <a className="v2-cta" href={ctaHref}>
            {label}
          </a>
        ) : (
          <button
            className="v2-cta"
            type="button"
            data-modal-target="reserve"
            data-modal-status="not-active"
            data-occasion={ctaOccasion ?? "Reservierung"}
          >
            {label}
          </button>
        )}
      </div>
    </header>
  );
}
