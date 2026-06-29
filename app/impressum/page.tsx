import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { siteConfig, withBase } from "@/lib/site";

const eyebrow = "Rechtliches";
const title = "Impressum";
const description = "Offenlegung gemäß § 5 ECG, § 25 MedienG und § 27a UStG.";

type Section = { id: string; title: string; body: string[] };

const sections: Section[] = [
  {
    id: "medieninhaber",
    title: "1. Medieninhaber & Diensteanbieter",
    body: [
      "Johannes Lehberger",
      "Bar - Das Glockenspiel",
      `${siteConfig.address.street}`,
      `${siteConfig.address.postalCode} ${siteConfig.address.city}`,
    ],
  },
  {
    id: "kontakt",
    title: "2. Kontakt",
    body: [`Telefon: ${siteConfig.phone}`, `E-Mail: ${siteConfig.email}`],
  },
  {
    id: "umsatzsteuer-id",
    title: "3. Umsatzsteuer-ID",
    body: [
      "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:",
      "ATU81416512",
    ],
  },
  {
    id: "aufsichtsbehoerde",
    title: "4. Aufsichtsbehörde",
    body: [
      "Bezirkshauptmannschaft Kitzbühel",
      "Josef-Herold-Straße 10",
      "6370 Kitzbühel",
      "https://www.tirol.gv.at/kitzbuehel/",
    ],
  },
  {
    id: "eu-streitschlichtung",
    title: "5. EU-Streitschlichtung",
    body: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/",
      "Unsere E-Mail-Adresse finden Sie oben im Impressum.",
    ],
  },
  {
    id: "verbraucherstreitbeilegung",
    title: "6. Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    body: [
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
];

// Render a paragraph, turning any bare http(s) URL into a real link.
const linkify = (text: string): ReactNode => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.siteUrl}/impressum` },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main id="top" className="page-shell v2-shell">
      <ScrollOrchestrator />
      <V2Topbar variant="sub" ctaLabel="Reservieren" />

      <section className="v2-hero v2-subhero">
        <a className="v2-back reveal" href={withBase("/")}>
          Zurück zur Startseite
        </a>
        <p className="v2-eyebrow reveal">{eyebrow}</p>
        <h1 className="v2-serif v2-subhero-title" data-split>
          {title}
        </h1>
        <p className="v2-small reveal">{description}</p>
      </section>

      <section className="v2-legal-layout">
        <aside className="v2-legal-toc" aria-label="Inhaltsverzeichnis" data-scroll data-scroll-speed="-0.03">
          <strong>Inhalt</strong>
          {sections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <i>0{index + 1}</i> {section.title}
            </a>
          ))}
        </aside>
        <div className="v2-legal-body">
          {sections.map((section, index) => (
            <article id={section.id} className="v2-section-row v2-legal-section" key={section.id}>
              <div className="v2-rule" data-rule />
              <div className="v2-section-grid">
                <div className="v2-section-meta">
                  <span>0{index + 1}</span>
                  <span>{eyebrow}</span>
                </div>
                <div className="v2-section-body">
                  <h2 className="v2-serif" data-split>
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p className="v2-small reveal" key={paragraph}>
                      {linkify(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <article id="gestaltung" className="v2-section-row v2-legal-section">
            <div className="v2-rule" data-rule />
            <div className="v2-section-grid">
              <div className="v2-section-meta">
                <span>0{sections.length + 1}</span>
                <span>{eyebrow}</span>
              </div>
              <div className="v2-section-body">
                <h2 className="v2-serif" data-split>
                  {sections.length + 1}. Gestaltung & Umsetzung
                </h2>
                <p className="v2-small reveal">
                  Designed by{" "}
                  <a href="https://wesimply.at" target="_blank" rel="noreferrer">
                    wesimply GmbH
                  </a>{" "}
                  <span aria-hidden="true">♥</span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <V2Footer />
    </main>
  );
}
