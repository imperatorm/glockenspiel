import { AmbientScene } from "@/components/AmbientScene";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
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
        <div className="event-hero-detail__image image-lift" style={{ backgroundImage: `url(${page.heroImage})` }} />
        <div className="event-hero-detail__copy">
          <a className="back-link reveal" href="/#events">
            Zurueck zu Events
          </a>
          <p className="eyebrow reveal">{page.eyebrow}</p>
          <h1>{page.title}</h1>
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

      <section className="event-story-band">
        <div className="event-story-image image-lift">
          <img src={page.detailImage} alt={`${page.navLabel} im ${siteConfig.name}`} loading="lazy" decoding="async" />
        </div>
        <div className="event-story-stack">
          {page.sections.map((section, index) => (
            <article className="event-detail-card panel-card" key={`${section.eyebrow}-${section.title}`}>
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
          <p className="eyebrow">Glockenspiel Kitzbuehel</p>
          <h2>{page.final.title}</h2>
          <p>{page.final.body}</p>
          <div className="event-contact-row">
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

      <footer className="site-footer">
        <EventLogo />
        <span>2026 Das Glockenspiel</span>
        <div className="footer-links">
          <a href="/cookies">Cookies</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="/#kontakt">Kontakt</a>
        </div>
      </footer>

      <nav className="sticky-cta" aria-label="Schnellzugriff">
        <a href="/#kontakt">Anfragen</a>
        <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>Anrufen</a>
      </nav>
    </main>
  );
}
