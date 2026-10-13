import type { Metadata } from "next";
import { FirmeneventsSchema, V2Faq, V2QuickFacts } from "@/components/v2/V2EventFacts";
import { V2EventPage } from "@/components/v2/V2EventPage";
import { weihnachtsfeierHref } from "@/lib/firmenevents";
import { eventPages, siteConfig } from "@/lib/site";

const page = eventPages.corporate;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: {
    canonical: `${siteConfig.siteUrl}/${page.slug}`,
  },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: `${siteConfig.siteUrl}/${page.slug}`,
    type: "website",
    images: [{ url: page.heroImage, alt: page.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.seoTitle,
    description: page.seoDescription,
    images: [page.heroImage],
  },
};

export default function CorporateEventsPage() {
  return (
    <V2EventPage page={page} structuredData={<FirmeneventsSchema />} heroPosition="center 20%">
      <V2QuickFacts />
      <V2Faq />
      <section className="v2-qf v2-crosslink">
        <div className="v2-rule" data-rule />
        <div className="v2-qf-grid">
          <div className="v2-section-meta">
            <span>Saison</span>
          </div>
          <div className="v2-section-body">
            <h2 className="v2-serif">Weihnachtsfeier in Kitzbühel</h2>
            <p className="v2-small">
              Pakete, Preise und freie Termine für Ihre Firmen-Weihnachtsfeier mit 20 bis 80 Gästen.
            </p>
            <a className="v2-button" href={weihnachtsfeierHref}>
              Zur Weihnachtsfeier
            </a>
          </div>
        </div>
      </section>
    </V2EventPage>
  );
}
