import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Topbar } from "@/components/v2/V2Topbar";
import type { LegalPageContent } from "@/lib/legal";

type V2LegalPageProps = {
  page: LegalPageContent;
};

export function V2LegalPage({ page }: V2LegalPageProps) {
  return (
    <main id="top" className="page-shell v2-shell">
      <ScrollOrchestrator />
      <V2Topbar variant="sub" ctaLabel="Reservieren" />

      <section className="v2-hero v2-subhero">
        <a className="v2-back reveal" href="/">
          Zurück zur Startseite
        </a>
        <p className="v2-eyebrow reveal">{page.eyebrow}</p>
        <h1 className="v2-serif v2-subhero-title" data-split>
          {page.title}
        </h1>
        <p className="v2-small reveal">{page.description}</p>
        <span className="v2-legal-stamp reveal">{page.updated}</span>
      </section>

      <section className="v2-legal-layout">
        <aside className="v2-legal-toc" aria-label="Inhaltsverzeichnis" data-scroll data-scroll-speed="-0.03">
          <strong>Inhalt</strong>
          {page.sections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <i>0{index + 1}</i> {section.title}
            </a>
          ))}
        </aside>
        <div className="v2-legal-body">
          {page.sections.map((section, index) => (
            <article id={section.id} className="v2-section-row v2-legal-section" key={section.id}>
              <div className="v2-rule" data-rule />
              <div className="v2-section-grid">
                <div className="v2-section-meta">
                  <span>0{index + 1}</span>
                  <span>{page.eyebrow}</span>
                </div>
                <div className="v2-section-body">
                  <h2 className="v2-serif" data-split>
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p className="v2-small reveal" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? (
                    <ul className="v2-feature-list">
                      {section.items.map((item) => (
                        <li className="reveal" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <V2Footer />
    </main>
  );
}
