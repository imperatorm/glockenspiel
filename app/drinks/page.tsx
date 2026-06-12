import type { Metadata } from "next";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { BtnIcon } from "@/components/v2/BtnIcon";
import { V2Flipbook } from "@/components/v2/V2Flipbook";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2HoursPill } from "@/components/v2/V2HoursPill";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { assets, content, imageAlt, menuFlipbook, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Getränkekarte — Drinks & Winter Menu",
  description:
    "Die Getränkekarte vom Das Glockenspiel Kitzbühel: Signature Cocktails, Klassiker, Champagner, Weine, Premium Spirits und Zero Proof Drinks.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/drinks`,
  },
};

const menuStructuredData = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Drinks & Winter Menu",
  description: content.menu.body,
  url: `${siteConfig.siteUrl}/drinks`,
  inLanguage: "de-AT",
  provider: {
    "@type": "BarOrPub",
    name: siteConfig.name,
    "@id": `${siteConfig.siteUrl}/#business`,
  },
};

const thumbs = [
  { image: assets.bar, alt: imageAlt.bar, label: "Signature Drinks" },
  { image: assets.food, alt: imageAlt.food, label: "Tapas" },
  { image: assets.interior, alt: imageAlt.interior, label: "Klassiker" },
  { image: assets.terrace, alt: imageAlt.terrace, label: "Champagner" },
];

export default function DrinksPage() {
  return (
    <main id="top" className="page-shell v2-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }}
      />
      <ScrollOrchestrator />
      <V2Topbar variant="sub" ctaLabel="Reservieren" />

      <section className="v2-hero v2-subhero">
        <a className="v2-back reveal" href="/">
          Zurück zur Startseite
        </a>
        <p className="v2-eyebrow reveal">{content.menu.eyebrow}</p>
        <h1 className="v2-serif v2-subhero-title" data-split>
          Drinks & Winter Menu.
        </h1>
        <p className="v2-small reveal">{content.menu.body}</p>
        <div className="v2-about-links reveal">
          <BtnIcon
            label="Tisch reservieren"
            href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
            modalTarget="reserve"
            occasion="Reservierung"
          />
          <a className="v2-button" href={menuFlipbook.pdfUrl} download>
            PDF herunterladen
          </a>
        </div>
      </section>

      <section className="v2-flip-section">
        <V2Flipbook pdfUrl={menuFlipbook.pdfUrl} pageCount={menuFlipbook.pageCount} />
      </section>

      <section className="v2-dark">
        <div className="v2-thumbs">
          {thumbs.map((thumb, index) => (
            <figure data-scroll data-scroll-speed={index % 2 === 0 ? 0.04 : -0.04} key={thumb.label}>
              <img src={thumb.image} alt={thumb.alt} loading="lazy" decoding="async" />
              <figcaption>{thumb.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="v2-invite">
        <span className="v2-mark reveal" aria-hidden="true" />
        <p className="v2-serif" data-split>
          Lieber direkt am Tresen entscheiden?
        </p>
        <div className="reveal">
          <BtnIcon
            label="Tisch reservieren"
            href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
            modalTarget="reserve"
            occasion="Reservierung"
          />
        </div>
        <div className="v2-invite-meta reveal">
          <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </section>

      <V2Footer />
      <V2HoursPill />
    </main>
  );
}
