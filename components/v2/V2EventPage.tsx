import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { BtnIcon } from "@/components/v2/BtnIcon";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2HoursPill } from "@/components/v2/V2HoursPill";
import { V2Map } from "@/components/v2/V2Map";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { eventPages, siteConfig } from "@/lib/site";

type EventPageData = (typeof eventPages)[keyof typeof eventPages];

type V2EventPageProps = {
  page: EventPageData;
};

export function V2EventPage({ page }: V2EventPageProps) {
  const occasion = page.slug === "private-events" ? "Privates Event" : "Corporate Event";
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${page.navLabel} im ${siteConfig.name}`,
    description: page.seoDescription,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [page.heroImage, page.detailImage, page.atmosphereImage],
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        postalCode: siteConfig.address.postalCode,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: `${siteConfig.siteUrl}/${page.slug}` },
    ],
  };

  return (
    <main id="top" className="page-shell v2-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ScrollOrchestrator />
      <V2Topbar variant="sub" ctaLabel="Anfragen" ctaOccasion={occasion} />

      <section className="v2-hero v2-subhero">
        <a className="v2-back reveal" href="/#ueber">
          Zurück zur Startseite
        </a>
        <p className="v2-eyebrow reveal">{page.eyebrow}</p>
        <h1 className="v2-serif v2-subhero-title" data-split>
          {page.title}
        </h1>
        <p className="v2-small v2-subhero-kicker reveal">{page.kicker}</p>
        <div className="v2-about-links reveal">
          <BtnIcon
            label={page.primaryCta}
            href={`mailto:${siteConfig.email}`}
            modalTarget="reserve"
            occasion={occasion}
          />
          <a className="v2-button" href="/drinks">
            {page.secondaryCta}
          </a>
        </div>
      </section>

      <section className="v2-subhero-media" data-mask data-scroll data-scroll-speed="0.05">
        <img src={page.heroImage} alt={`${page.navLabel} im ${siteConfig.name}`} decoding="async" />
        <span className="v2-photo-tag">{page.eyebrow}</span>
      </section>

      <section className="v2-facts" aria-label="Eckdaten">
        <div className="v2-rule" data-rule />
        <div className="v2-facts-grid">
          {page.facts.map(([label, value], index) => (
            <div className="v2-fact" data-scroll data-scroll-speed={index % 2 === 0 ? 0.03 : -0.03} key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="v2-sections">
        {page.sections.map((section, index) => (
          <article className="v2-section-row" key={`${section.eyebrow}-${section.title}`}>
            <div className="v2-rule" data-rule />
            <div className="v2-section-grid">
              <div className="v2-section-meta" data-scroll data-scroll-speed="-0.05">
                <span>0{index + 1}</span>
                <span>{section.eyebrow}</span>
              </div>
              <div className="v2-section-body">
                <h2 className="v2-serif" data-split>
                  {section.title}
                </h2>
                {"items" in section ? (
                  <ul className="v2-feature-list">
                    {section.items.map((item) => (
                      <li className="reveal" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  section.body.map((paragraph) => (
                    <p className="v2-small reveal" key={paragraph}>
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="v2-dark">
        <div className="v2-dark-grid">
          <div>
            <p className="eyebrow reveal">Glockenspiel Kitzbühel</p>
            <h2 data-split>{page.final.title}</h2>
            <p className="reveal">{page.final.body}</p>
            <div className="v2-about-links reveal">
              <button
                className="v2-button v2-button--cream"
                type="button"
                data-modal-target="reserve"
                data-modal-status="not-active"
                data-occasion={occasion}
              >
                {page.final.button}
              </button>
            </div>
            <div className="v2-dark-meta reveal">
              <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>
          <div className="v2-dark-media" data-mask>
            <img src={page.atmosphereImage} alt={`Atmosphäre im ${siteConfig.name}`} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="v2-strip v2-strip--three" aria-label="Impressionen">
        {[page.detailImage, page.heroImage, page.atmosphereImage].map((src, index) => (
          <div data-mask key={`${src}-${index}`}>
            <img src={src} alt={`${page.navLabel} Impression ${index + 1}`} loading="lazy" decoding="async" />
          </div>
        ))}
      </section>

      <V2Map />

      <V2Footer />
      <V2HoursPill />
    </main>
  );
}
