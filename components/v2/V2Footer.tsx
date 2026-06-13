import { CookieSettingsButton } from "@/components/v2/CookieSettingsButton";
import { V2Logo } from "@/components/v2/V2Logo";
import { siteConfig, withBase } from "@/lib/site";

export function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-rule" data-rule />
      <V2Logo className="v2-footer-wordmark" />
      <div className="v2-footer-row">
        <span>
          {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
        </span>
        <span>© 2026 Das Glockenspiel</span>
        <div className="v2-footer-links">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={withBase("/datenschutz")}>Datenschutz</a>
          <a href={withBase("/cookies")}>Cookies</a>
          <CookieSettingsButton className="v2-footer-cookie-btn" />
        </div>
      </div>
    </footer>
  );
}
