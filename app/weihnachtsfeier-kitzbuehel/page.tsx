import type { Metadata } from "next";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { FirmeneventsSchema, V2Faq, V2QuickFacts } from "@/components/v2/V2EventFacts";
import { V2EventInquiry } from "@/components/v2/V2EventInquiry";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2HoursPill } from "@/components/v2/V2HoursPill";
import { V2Map } from "@/components/v2/V2Map";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { WEIHNACHTSFEIER_SLUG, weihnachtsfeier as page } from "@/lib/firmenevents";
import { eventPages, siteConfig, withBase } from "@/lib/site";

const url = `${siteConfig.siteUrl}/${WEIHNACHTSFEIER_SLUG}`;
const heroImage = withBase("/images/weihnachtsfeier-kitzbuehel-glockenspiel.webp");
const heroAlt = "Abendstimmung vor dem Glockenspiel in der Kitzbüheler Hinterstadt mit Gästen und Live-Musik";

export const metadata: Metadata = {
  // Absolute: the briefing's title tag must not get the layout's "| Das Glockenspiel Kitzbühel" suffix.
  title: { absolute: page.seoTitle },
  description: page.seoDescription,
  alternates: { canonical: url },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url,
    type: "website",
    images: [{ url: heroImage, alt: heroAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.seoTitle,
    description: page.seoDescription,
    images: [heroImage],
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Weihnachtsfeier", item: url },
  ],
};

const OCCASION = "Weihnachtsfeier";

export default function WeihnachtsfeierPage() {
  return (
    <main id="top" className="page-shell v2-shell">
      <FirmeneventsSchema />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <ScrollOrchestrator />
      <V2Topbar variant="sub" ctaLabel={page.cta} ctaHref="#anfrage" />

      <section className="v2-hero v2-subhero">
        <a className="v2-back reveal" href={withBase(`/${eventPages.corporate.slug}`)}>
          Corporate Events
        </a>
        <p className="v2-eyebrow reveal">{page.eyebrow}</p>
        <h1 className="v2-serif v2-subhero-title" data-split>
          {page.title}
        </h1>
        <p className="v2-small v2-subhero-kicker reveal">{page.intro}</p>
        <div className="v2-xmas-hero-cta reveal">
          <a className="v2-button v2-button--terracotta" href="#anfrage">
            {page.cta}
          </a>
        </div>
      </section>

      <section className="v2-subhero-media" data-mask data-scroll data-scroll-speed="0.05">
        <img src={heroImage} alt={heroAlt} decoding="async" style={{ objectPosition: "center 40%" }} />
        <span className="v2-photo-tag">{page.eyebrow}</span>
      </section>

      <V2QuickFacts />

      <section className="v2-qf" aria-labelledby="pakete-title">
        <div className="v2-rule" data-rule />
        <div className="v2-qf-grid">
          <div className="v2-section-meta">
            <span>Pakete</span>
          </div>
          <div>
            <h2 id="pakete-title" className="v2-serif">
              Pakete für Ihre Weihnachtsfeier
            </h2>
          </div>
        </div>
        <ul className="v2-packages">
          {page.packages.map((pkg) => (
            <li className="v2-package" key={pkg.name}>
              <h3>
                {pkg.name}
                {pkg.tag ? <span className="v2-package-tag">{pkg.tag}</span> : null}
              </h3>
              <p className="v2-package-desc">{pkg.description}</p>
              <p className="v2-package-price">{pkg.price}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="v2-qf" aria-labelledby="termine-title">
        <div className="v2-rule" data-rule />
        <div className="v2-qf-grid">
          <div className="v2-section-meta">
            <span>Termine</span>
          </div>
          <div className="v2-section-body">
            <h2 id="termine-title" className="v2-serif">
              Termine im November und Dezember sind begrenzt.
            </h2>
            {page.dateNote.map((line) => (
              <p className="v2-small" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <V2Faq />

      <section id="anfrage" className="v2-qf v2-inquiry" aria-labelledby="anfrage-title">
        <div className="v2-rule" data-rule />
        <div className="v2-qf-grid">
          <div className="v2-section-meta">
            <span>Anfrage</span>
          </div>
          <div className="v2-section-body">
            <h2 id="anfrage-title" className="v2-serif">
              Angebot für Ihre Weihnachtsfeier anfragen
            </h2>
            <p className="v2-small">Sie erhalten innerhalb von 24 Stunden ein individuelles Angebot.</p>
            <V2EventInquiry occasion={OCCASION} />
          </div>
        </div>
      </section>

      <V2Map />
      <V2Footer />
      <V2HoursPill />
    </main>
  );
}
