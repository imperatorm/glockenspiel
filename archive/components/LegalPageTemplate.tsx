import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { SiteFooter } from "@/components/SiteFooter";
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
      <ScrollOrchestrator />
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
        <a className="back-link reveal" href="/#kontakt">
          Zurueck zur Website
        </a>
        <p className="eyebrow reveal">{page.eyebrow}</p>
        <h1 data-split>{page.title}</h1>
        <p className="reveal">{page.description}</p>
        <span className="reveal">{page.updated}</span>
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

      <SiteFooter />

      <nav className="sticky-cta" aria-label="Schnellzugriff">
        <a href="/#kontakt">Kontakt</a>
        <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>Anrufen</a>
      </nav>
    </main>
  );
}
