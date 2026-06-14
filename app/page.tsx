import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { InstagramEmbed } from "@/components/v2/InstagramEmbed";
import { BtnIcon } from "@/components/v2/BtnIcon";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2HoursPill } from "@/components/v2/V2HoursPill";
import { V2Map } from "@/components/v2/V2Map";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { assets, home, imageAlt, siteConfig, withBase } from "@/lib/site";

const assetFor = (key: string) => assets[key as keyof typeof assets];
const altFor = (key: string) => imageAlt[key as keyof typeof imageAlt];

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
  hasMenu: `${siteConfig.siteUrl}${withBase("/drinks")}`,
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

const nights = home.nights.map((night) => ({
  name: night.name,
  date: night.date,
  cta: night.cta,
  href: night.link === "email" ? `mailto:${siteConfig.email}` : siteConfig.instagram,
  external: night.link !== "email",
  hot: Boolean(night.hot),
  image: assetFor(night.imageKey),
}));

const thumbs = home.thumbs.map((thumb) => ({
  image: assetFor(thumb.imageKey),
  alt: altFor(thumb.imageKey),
  label: thumb.label,
  icon: withBase(thumb.icon),
}));

function Wordmark() {
  return (
    <h1 className="v2-hero-logo">
      <span className="sr-only">Das Glockenspiel — Bar, Tapas &amp; Café in der Kitzbüheler Altstadt</span>
    </h1>
  );
}

export default function Home() {
  return (
    <main id="top" className="page-shell v2-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollOrchestrator />
      <V2Topbar variant="home" />

      <section className="v2-hero">
        <div className="v2-hero-strip">
          <img src={assets.bar} alt={imageAlt.bar} decoding="async" />
          <div className="v2-hero-labels" aria-label="Bar, Tapas, Café">
            <div>
              <span>Bar</span>
              <i />
            </div>
            <div>
              <i className="is-amber" />
              <span>Tapas</span>
              <i />
            </div>
            <div>
              <i />
              <span>Café</span>
            </div>
          </div>
          <img src={assets.terrace} alt={imageAlt.terrace} decoding="async" />
        </div>
        <Wordmark />
      </section>

      <section className="v2-intro">
        <div className="v2-intro-slides reveal">
          <img src={assets.facade} alt={imageAlt.facade} loading="lazy" decoding="async" />
          <img className="v2-slide" src={assets.drink} alt="" loading="lazy" decoding="async" />
          <img className="v2-slide" src={assets.foodTwo} alt="" loading="lazy" decoding="async" />
        </div>
        <p className="v2-serif" data-split>
          {home.intro.text}
        </p>
        <a className="v2-button reveal" href="#ueber">
          {home.intro.button}
        </a>
      </section>

      <section id="drinks" className="v2-dark">
        <div className="v2-dark-grid">
          <div>
            <p className="eyebrow reveal">{home.menu.eyebrow}</p>
            <h2 data-split>{home.menu.heading}</h2>
            <p className="reveal">{home.menu.body}</p>
            <a className="v2-button v2-button--cream reveal" href={withBase("/drinks")}>
              {home.menu.button}
            </a>
          </div>
          <div className="v2-dark-media" data-mask>
            <img src={assets.bar} alt={imageAlt.bar} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="v2-thumbs">
          {thumbs.map((thumb) => (
            <figure key={thumb.label}>
              <img src={thumb.image} alt={thumb.alt} loading="lazy" decoding="async" />
              <figcaption>
                <img className="v2-thumb-icon" src={thumb.icon} alt="" loading="lazy" decoding="async" />
                {thumb.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="v2-statement">
        <p className="v2-serif" data-split>
          {home.statement}
        </p>
      </section>

      <section className="v2-strip" aria-label="Impressionen">
        {[assets.hero, assets.food, assets.interior, assets.event, assets.terrace].map((src, index) => (
          <div data-mask key={`${src}-${index}`}>
            <img src={src} alt={`Glockenspiel Kitzbühel Impression ${index + 1}`} loading="lazy" decoding="async" />
          </div>
        ))}
      </section>

      <section id="musik" className="v2-sets" data-follower-wrap="">
        <div className="v2-sets-side">
          <span className="v2-mark" aria-hidden="true" />
          <strong className="reveal">{home.sets.heading}</strong>
          <img className="reveal" src={assets.event} alt={imageAlt.event} loading="lazy" decoding="async" />
          <p className="v2-small reveal">{home.sets.body}</p>
        </div>
        <div className="v2-sets-table" data-follower-collection="">
          <div className="v2-set-tile" aria-hidden="true" />
          {nights.map((night) => (
            <div
              className={`v2-set-row${night.hot ? " v2-set-row--hot" : ""}`}
              data-follower-item=""
              key={night.name}
            >
              <strong>{night.name}</strong>
              <span>{night.date}</span>
              <a
                className="v2-button"
                href={night.href}
                {...(night.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {night.cta}
              </a>
              <div data-follower-visual="" className="preview-item__visual" aria-hidden="true">
                <img src={night.image} alt="" decoding="async" className="preview-item__visual-img" />
              </div>
            </div>
          ))}
        </div>
        <div data-follower-cursor="" className="preview-follower" aria-hidden="true">
          <div data-follower-cursor-inner="" className="preview-follower__inner">
            <div className="preview-follower__label">
              <div className="preview-follower__label-span">{home.sets.followerLabel}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-host">
        <figure data-mask>
          <img src={assetFor(home.host.imageKey)} alt={altFor(home.host.imageKey)} loading="lazy" decoding="async" />
          <figcaption>{home.host.caption}</figcaption>
        </figure>
      </section>

      <section className="v2-instagram" aria-label="Glockenspiel Instagram Feed">
        <div className="v2-rule" data-rule />
        <div className="v2-ig-head">
          <p className="v2-eyebrow reveal">{home.instagram.eyebrow}</p>
          <h2 className="v2-serif" data-split>
            {home.instagram.heading}
          </h2>
          <a className="v2-button reveal" href={siteConfig.instagram} target="_blank" rel="noreferrer">
            {home.instagram.button}
          </a>
        </div>
        <div className="v2-ig-shell">
          <InstagramEmbed />
        </div>
      </section>

      <section id="ueber" className="v2-about">
        <div className="v2-polaroids reveal" aria-hidden="true">
          {[
            { image: assets.food, start: -6, end: -4 },
            { image: assets.interior, start: 5, end: 3 },
            { image: assets.bar, start: -4, end: -2 },
            { image: assets.drink, start: 6, end: 4 },
            { image: assets.foodTwo, start: -5, end: -3 },
            { image: assets.event, start: 4, end: 6 },
            { image: assets.facade, start: -6, end: -4 },
            { image: assets.terrace, start: 5, end: 3 },
            { image: assets.hero, start: -4, end: -6 },
            { image: assets.drink, start: 6, end: 4 },
          ].map((polaroid, index) => (
            <div
              className="v2-polaroid"
              data-rotate-start={polaroid.start}
              data-rotate-end={polaroid.end}
              key={`${polaroid.image}-${index}`}
            >
              <img src={polaroid.image} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="v2-about-copy">
          <p className="v2-eyebrow reveal">{home.about.eyebrow}</p>
          {home.about.blocks.map((block, index) => (
            <div className="v2-about-block" key={index}>
              <p className="v2-serif" data-split>
                {block.heading}
              </p>
              <div className="v2-about-block-body">
                {block.body.map((paragraph, paragraphIndex) => (
                  <p className="v2-small reveal" key={paragraphIndex}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div className="v2-about-links reveal">
            {home.about.cards.map((card) => (
              <a className="v2-event-card" href={withBase(card.href)} key={card.href}>
                <span className="v2-event-card-media">
                  <img src={assetFor(card.imageKey)} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="v2-event-card-body">
                  <span className="v2-event-card-eyebrow">{card.eyebrow}</span>
                  <span className="v2-event-card-title">{card.title}</span>
                  <span className="v2-event-card-text">{card.text}</span>
                  <span className="v2-event-card-cta">Mehr erfahren</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="v2-meta-row" aria-hidden="true">
        <span>Drinks</span>
        <span>Tapas</span>
        <span>Late Night</span>
      </div>

      <section id="besuch" className="v2-invite">
        <span className="v2-mark reveal" aria-hidden="true" />
        <p className="v2-serif" data-split>
          {home.invite.text}
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

      <V2Map />

      <V2Footer />
      <V2HoursPill />
    </main>
  );
}
