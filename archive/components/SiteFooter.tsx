import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-wordmark" aria-hidden="true">
        Glockenspiel
      </p>
      <div className="footer-grid">
        <div className="footer-col">
          <strong>Besuch uns</strong>
          <span>Hinterstadt 13</span>
          <span>6370 Kitzbühel, Österreich</span>
        </div>
        <div className="footer-col">
          <strong>Kontakt</strong>
          <a href="tel:+436644680742">{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <div className="footer-col">
          <strong>Events</strong>
          <a href="/private-events">Private Events</a>
          <a href="/corporate-events">Corporate Events</a>
        </div>
        <div className="footer-col">
          <strong>Folge uns</strong>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="#top">Nach oben</a>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Das Glockenspiel</span>
        <div className="footer-links">
          <a href="/cookies">Cookies</a>
          <a href="/datenschutz">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
