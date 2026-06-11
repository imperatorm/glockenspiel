import { nav, siteConfig } from "@/lib/site";
import type { LegalPageContent } from "@/lib/legal";

type LegalPageTemplateProps = {
  page: LegalPageContent;
};

function LegalLogo() {
  return (
    <a className="logo" href="/#top" aria-label="Das Glockenspiel">
      <span className="logo-mark" />
      <span>
        Das
        <br />
        Glocken
        <br />
        Spiel
      </span>
    </a>
  );
}

export function LegalPageTemplate({ page }: LegalPageTemplateProps) {
  return (
    <main id="top" className="page-shell legal-page-shell">
      <header className="site-nav">
        <LegalLogo />
        <nav aria-label="Hauptnavigation">
          {nav.map((item) => (
            <a href={`/#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/#kontakt">
          Kontakt
        </a>
      </header>

      <section className="legal-hero">
        <a className="back-link" href="/#kontakt">
          Zurueck zur Website
        </a>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <span>{page.updated}</span>
      </section>

      <section className="legal-layout">
        <aside className="legal-toc" aria-label="Inhaltsverzeichnis">
          <strong>Inhalt</strong>
          {page.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.title}
            </a>
          ))}
        </aside>

        <div className="legal-card">
          {page.sections.map((section) => (
            <section id={section.id} className="legal-section" key={section.id}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <LegalLogo />
        <span>2026 Das Glockenspiel</span>
        <div className="footer-links">
          <a href="/cookies">Cookies</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="/#kontakt">Kontakt</a>
        </div>
      </footer>

      <nav className="sticky-cta" aria-label="Schnellzugriff">
        <a href="/#kontakt">Kontakt</a>
        <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>Anrufen</a>
      </nav>
    </main>
  );
}
