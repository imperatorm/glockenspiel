import type { CSSProperties } from "react";
import { AmbientScene } from "@/components/AmbientScene";
import { Marquee } from "@/components/Marquee";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { SiteFooter } from "@/components/SiteFooter";
import { eventPages, menuFlipbook, nav, siteConfig } from "@/lib/site";

type EventPageData = (typeof eventPages)[keyof typeof eventPages];

type EventPageTemplateProps = {
  page: EventPageData;
};

function EventLogo() {
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

function SplitEventTitle({ title }: { title: string }) {
  return (
    <h1 aria-label={title}>
      {title.split(" ").map((word, index) => (
        <span className="hero-line hero-line--inline" key={`${word}-${index}`}>
          <span className="hero-word">{word}</span>
        </span>
      ))}
    </h1>
  );
}

export function EventPageTemplate({ page }: EventPageTemplateProps) {
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.navLabel,
        item: `${siteConfig.siteUrl}/${page.slug}`,
      },
    ],
  };

  return (
    <main id="top" className="page-shell event-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ScrollOrchestrator />
      <header className="site-nav">
        <EventLogo />
        <nav aria-label="Hauptnavigation">
          {nav.map((item) => (
            <a href={`/#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/#kontakt">
          Anfragen
        </a>
      </header>

      <section className="event-hero-detail">
        <AmbientScene />
        <div className="event-hero-detail__image image-lift" data-mask style={{ backgroundImage: `url(${page.heroImage})` }}>
          <span className="event-hero-badge">{page.eyebrow}</span>
        </div>
        <div className="event-hero-detail__copy">
          <a className="back-link reveal" href="/#events">
            Zurück zu Events
          </a>
          <p className="eyebrow reveal">{page.eyebrow}</p>
          <SplitEventTitle title={page.title} />
          <p className="event-kicker reveal">{page.kicker}</p>
          {page.body.map((paragraph) => (
            <p className="event-hero-body reveal" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="action-row event-action-row reveal">
            <a className="button button-primary" href="/#kontakt">
              {page.primaryCta}
            </a>
            <a className="button button-ghost" href={menuFlipbook.pdfUrl} target="_blank" rel="noreferrer">
              {page.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="event-facts" aria-label="Eckdaten">
        {page.facts.map(([label, value]) => (
          <div className="event-fact panel-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <Marquee />

      <section className="event-story-band">
        <figure className="event-story-image image-lift" data-mask>
          <img src={page.detailImage} alt={`${page.navLabel} im ${siteConfig.name}`} loading="lazy" decoding="async" />
          <figcaption className="event-story-caption">Hinterstadt 13 — mitten in der Altstadt</figcaption>
        </figure>
        <div className="event-story-stack">
          {page.sections.map((section, index) => (
            <article
              className="event-detail-card panel-card"
              key={`${section.eyebrow}-${section.title}`}
              style={{ "--index": index } as CSSProperties}
            >
              <span className="event-detail-number">0{index + 1}</span>
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {"items" in section ? (
                <ul className="event-feature-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="event-atmosphere-cta">
        <div className="event-atmosphere-image" style={{ backgroundImage: `url(${page.atmosphereImage})` }} />
        <div className="event-atmosphere-content">
          <p className="eyebrow reveal">Glockenspiel Kitzbühel</p>
          <h2 data-split>{page.final.title}</h2>
          <p className="reveal">{page.final.body}</p>
          <div className="event-contact-row reveal">
            <a className="button button-primary" href="/#kontakt">
              {page.final.button}
            </a>
            <a className="button button-ghost" href={`mailto:${siteConfig.email}`}>
              Direkt schreiben
            </a>
          </div>
          <div className="event-contact-meta">
            <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <nav className="sticky-cta" aria-label="Schnellzugriff">
        <a href="/#kontakt">Anfragen</a>
        <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>Anrufen</a>
      </nav>
    </main>
  );
}
