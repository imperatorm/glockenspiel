import Script from "next/script";
import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { BtnIcon } from "@/components/v2/BtnIcon";
import { V2Footer } from "@/components/v2/V2Footer";
import { V2HoursPill } from "@/components/v2/V2HoursPill";
import { V2Map } from "@/components/v2/V2Map";
import { V2Topbar } from "@/components/v2/V2Topbar";
import { assets, content, imageAlt, menuFlipbook, siteConfig, withBase } from "@/lib/site";

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

const nights = [
  { name: "Party Saturday", date: "Jeden Samstag", cta: "Ansehen", href: siteConfig.instagram, external: true, image: assets.bar },
  { name: "Dance into May", date: "30. April", cta: "Ansehen", href: siteConfig.instagram, external: true, image: assets.event },
  { name: "Mothers Day Lunch", date: "Mai", cta: "Ansehen", href: siteConfig.instagram, external: true, image: assets.food },
  { name: "Aperitivo Sessions", date: "Do — Sa", cta: "Anfragen", href: `mailto:${siteConfig.email}`, hot: true, image: assets.drink },
  { name: "Winter zu Besuch", date: "Dezember", cta: "Ansehen", href: siteConfig.instagram, external: true, image: assets.facade },
  { name: "Resident DJ Nights", date: "Late Night", cta: "Anfragen", href: `mailto:${siteConfig.email}`, image: assets.interior },
];

const thumbs = [
  { image: assets.bar, alt: imageAlt.bar, label: "Signature Drinks", icon: withBase("/images/icons/cocktails.png") },
  { image: assets.food, alt: imageAlt.food, label: "Tapas", icon: withBase("/images/icons/tapas.png") },
  { image: assets.interior, alt: imageAlt.interior, label: "Klassiker", icon: withBase("/images/icons/wine.png") },
  { image: assets.terrace, alt: imageAlt.terrace, label: "Champagner", icon: withBase("/images/icons/star.png") },
];

function Wordmark() {
  return <h1 className="v2-hero-logo" role="img" aria-label="Das Glockenspiel Kitzbühel" />;
}

export default function Home() {
  return (
    <main id="top" className="page-shell v2-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
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
          Mitten in der Kitzbüheler Hinterstadt: Das Glockenspiel ist der Ort, an dem gute Abende beginnen — und
          gerne etwas länger bleiben.
        </p>
        <a className="v2-button reveal" href="#ueber">
          Unsere Geschichte
        </a>
      </section>

      <section id="drinks" className="v2-dark">
        <div className="v2-dark-grid">
          <div>
            <p className="eyebrow reveal">{content.menu.eyebrow}</p>
            <h2 data-split>Signature Cocktails, Champagner, Weine und Premium Spirits.</h2>
            <p className="reveal">{content.menu.body}</p>
            <a className="v2-button v2-button--cream reveal" href={withBase("/drinks")}>
              Zur Getränkekarte
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
          Ein Ort, an dem jedes Detail Wärme ausstrahlt — durchzogen von einer Energie, die mit der Nacht wächst.
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
          <strong className="reveal">Nächte im Glockenspiel</strong>
          <img className="reveal" src={assets.event} alt={imageAlt.event} loading="lazy" decoding="async" />
          <p className="v2-small reveal">{content.beats.body}</p>
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
                <img src={night.image} alt="" loading="lazy" decoding="async" className="preview-item__visual-img" />
              </div>
            </div>
          ))}
        </div>
        <div data-follower-cursor="" className="preview-follower" aria-hidden="true">
          <div data-follower-cursor-inner="" className="preview-follower__inner">
            <div className="preview-follower__label">
              <div className="preview-follower__label-span">Glockenspiel Nights</div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-host">
        <figure data-mask>
          <img src={assets.hero} alt={imageAlt.hero} loading="lazy" decoding="async" />
          <figcaption>Gastgeber Johannes Lehberger — inspiriert von Bars in London, Paris, Wien und München.</figcaption>
        </figure>
      </section>

      <section className="v2-instagram" aria-label="Glockenspiel Instagram Feed">
        <div className="v2-rule" data-rule />
        <div className="v2-ig-head">
          <p className="v2-eyebrow reveal">Instagram</p>
          <h2 className="v2-serif" data-split>
            Momente aus dem Glockenspiel.
          </h2>
          <a className="v2-button reveal" href={siteConfig.instagram} target="_blank" rel="noreferrer">
            @glockenspielbar
          </a>
        </div>
        <div className="v2-ig-shell">
          <div className="elfsight-app-6437bae5-64a3-4fb0-bda2-56e88b6733dc" data-elfsight-app-lazy="" />
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
          <p className="v2-serif" data-split>
            Gute Musik, gute Drinks und eine Atmosphäre, in der man bleibt. Unsere Abende leben von Klassikern,
            Signature Drinks und kleinen Gerichten zum Teilen.
          </p>
          <p className="v2-small reveal">
            {content.experience.body[0]} {content.experience.body[1]}
          </p>
          <p className="v2-serif" data-split>
            {content.concept.title} {content.concept.island}
          </p>
          <p className="v2-small reveal">{content.concept.body}</p>
          <p className="v2-serif" data-split>
            Vom ersten Aperitivo bis zur letzten Runde — jeder Abend findet hier seinen eigenen Rhythmus.
          </p>
          <p className="v2-small reveal">{content.hero.bodyTwo}</p>
          <p className="v2-small reveal">{content.experience.body[2]}</p>
          <div className="v2-about-links reveal">
            <a className="v2-button" href={withBase("/private-events")}>
              Private Events
            </a>
            <a className="v2-button" href={withBase("/corporate-events")}>
              Corporate Events
            </a>
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
          Komm vorbei — und erlebe, was das Glockenspiel ausmacht.
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
