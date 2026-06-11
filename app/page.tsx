import Script from "next/script";
import { AmbientScene } from "@/components/AmbientScene";
import { MenuFlipbook } from "@/components/MenuFlipbook";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { assets, content, imageAlt, menuFlipbook, nav, siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["BarOrPub", "Restaurant"],
  "@id": `${siteConfig.siteUrl}/#business`,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  image: [assets.hero, assets.interior, assets.bar, assets.food, assets.terrace],
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: "€€",
  servesCuisine: ["Tapas", "Bar food", "Cocktails"],
  acceptsReservations: true,
  hasMenu: `${siteConfig.siteUrl}${menuFlipbook.pdfUrl}`,
  sameAs: [siteConfig.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "16:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "14:00", closes: "00:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "14:00", closes: "02:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "14:00", closes: "02:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "14:00", closes: "02:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "16:00", closes: "00:00" },
  ],
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
  ],
};

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Das Glockenspiel">
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

function SplitHeroTitle() {
  return (
    <h1 aria-label={content.hero.title}>
      {content.hero.title.split(" ").map((word) => (
        <span className="hero-line" key={word}>
          <span className="hero-word">{word}</span>
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  return (
    <main id="top" className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <ScrollOrchestrator />
      <header className="site-nav">
        <Logo />
        <nav aria-label="Hauptnavigation">
          {nav.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#kontakt">
          Reservieren
        </a>
      </header>

      <section id="home" className="hero-section">
        <AmbientScene />
        <div className="hero-bg image-lift" style={{ backgroundImage: `url(${assets.hero})` }} />
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow reveal">{content.hero.eyebrow}</p>
          <SplitHeroTitle />
          <p className="hero-kicker reveal">{content.hero.kicker}</p>
          <p className="hero-copy reveal">{content.hero.body}</p>
          <div className="action-row reveal">
            <a className="button button-primary" href="#kontakt">
              {content.hero.primary}
            </a>
            <a className="button button-ghost" href="#events">
              {content.hero.secondary}
            </a>
          </div>
        </div>
        <aside className="hours-card reveal" aria-label="Oeffnungszeiten">
          <div>
            <span className="status-dot" />
            Heute offen
          </div>
          <strong>14:00 - 02:00</strong>
          <span>Hinterstadt 13, Kitzbuehel</span>
        </aside>
      </section>

      <section className="pillar-section">
        {content.pillars.map((pillar) => (
          <article className="pillar-card panel-card" key={pillar.title}>
            <img src={pillar.image} alt={`${pillar.title} im ${siteConfig.name}`} loading="lazy" decoding="async" />
            <div>
              <span>{pillar.title}</span>
              <p>{pillar.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="statement-section">
        <p className="tiny">From first sip to last track:</p>
        <h2>
          welcome
          <br />
          home.
        </h2>
      </section>

      <section className="instagram-feed-section" aria-label="Glockenspiel Instagram Feed">
        <div className="instagram-feed-heading">
          <p className="eyebrow">Instagram</p>
          <h2>Momente aus dem Glockenspiel.</h2>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            @glockenspielbar
          </a>
        </div>
        <div className="instagram-feed-shell">
          <div className="elfsight-app-6437bae5-64a3-4fb0-bda2-56e88b6733dc" data-elfsight-app-lazy="" />
        </div>
      </section>

      <section id="drinks" className="split-section">
        <div className="split-media image-lift">
          <img src={assets.interior} alt={imageAlt.interior} loading="lazy" decoding="async" />
        </div>
        <div className="split-copy">
          <p className="eyebrow">{content.experience.eyebrow}</p>
          <h2>{content.experience.title}</h2>
          {content.experience.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="concept-section">
        <div>
          <p className="eyebrow">{content.concept.eyebrow}</p>
          <h2>{content.concept.title}</h2>
          <strong>{content.concept.island}</strong>
          <p>{content.concept.body}</p>
        </div>
        <img className="image-lift" src={assets.event} alt={imageAlt.event} loading="lazy" decoding="async" />
      </section>

      <section className="menu-section">
        <div className="menu-orb" aria-hidden="true" />
        <div className="menu-copy">
          <p className="eyebrow">{content.menu.eyebrow}</p>
          <h2>{content.menu.title}</h2>
          <p>{content.menu.body}</p>
          <a className="button button-primary" href={menuFlipbook.pdfUrl} target="_blank" rel="noreferrer">
            {content.menu.button}
          </a>
        </div>
        <MenuFlipbook pdfUrl={menuFlipbook.pdfUrl} pageCount={menuFlipbook.pageCount} />
      </section>

      <section id="musik" className="beats-section">
        <div>
          <p className="eyebrow">{content.beats.eyebrow}</p>
          <h2>{content.beats.title}</h2>
          <p>{content.beats.body}</p>
        </div>
        <div className="beats-grid">
          {content.beats.cards.map((card, index) => (
            <article className="beat-card panel-card" key={card}>
              <img
                src={[assets.bar, assets.terrace, assets.food][index]}
                alt={[imageAlt.bar, imageAlt.terrace, imageAlt.food][index]}
                loading="lazy"
                decoding="async"
              />
              <span>0{index + 1}</span>
              <p>{card}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="events-section">
        <p className="eyebrow">{content.events.eyebrow}</p>
        <h2>{content.events.title}</h2>
        <div className="event-grid">
          {content.events.cards.map((event) => (
            <article className="event-card panel-card" key={event.type}>
              <span>{event.type}</span>
              <h3>{event.title}</h3>
              <p>{event.body}</p>
              <a href={event.href}>{event.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="poster-river" aria-label="Glockenspiel Impressionen">
        <div className="poster-track">
          {[assets.hero, assets.food, assets.event, assets.bar, assets.terrace, assets.interior, assets.food].map((src, index) => (
            <figure key={`${src}-${index}`}>
              <img src={src} alt={`Glockenspiel Kitzbühel Impression ${index + 1}`} loading="lazy" decoding="async" />
              <figcaption>{["Winter zu Besuch", "Mothers Day", "Dance into May", "Party Saturday"][index % 4]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="kontakt" className="contact-section">
        <div>
          <p className="eyebrow">{content.final.eyebrow}</p>
          <h2>{content.final.title}</h2>
          <p>{content.final.body}</p>
          <div className="contact-meta">
            <a href="tel:+436644680742">{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="hours-list">
            {content.hours.map(([day, time]) => (
              <div key={day}>
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
        </div>
        <form className="reservation-form">
          <label>
            Name
            <input name="name" placeholder="Dein Name" autoComplete="name" />
          </label>
          <label>
            Telefon oder E-Mail
            <input name="contact" placeholder="Wie erreichen wir dich?" autoComplete="email" />
          </label>
          <label>
            Anlass
            <input name="occasion" placeholder="Reservierung, Event, Abend mit Freunden" />
          </label>
          <label>
            Nachricht
            <textarea name="message" placeholder="Datum, Uhrzeit, Personenanzahl..." />
          </label>
          <button type="submit">Anfrage senden</button>
        </form>
      </section>

      <footer className="site-footer">
        <Logo />
        <span>2026 Das Glockenspiel</span>
        <div className="footer-links">
          <a href="/cookies">Cookies</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="#top">Nach oben</a>
        </div>
      </footer>

      <nav className="sticky-cta" aria-label="Schnellzugriff">
        <a href="#kontakt">Reservieren</a>
        <a href="tel:+436644680742">Anrufen</a>
      </nav>
    </main>
  );
}
