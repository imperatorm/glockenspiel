import { maps, siteConfig } from "@/lib/site";

export function V2Map() {
  return (
    <section className="v2-map-section" aria-label="Anfahrt">
      <div className="v2-rule" data-rule />
      <div className="v2-map-grid">
        <div className="v2-map-info">
          <p className="v2-eyebrow reveal">Anfahrt</p>
          <h2 className="v2-serif" data-split>
            Hinterstadt 13, mitten in der Altstadt.
          </h2>
          <p className="v2-small reveal">
            Zwei Gehminuten vom Hauptplatz, zwischen Vorderstadt und Pfarrkirche. Parken am besten in der
            Hornbahn- oder Pfarrau-Garage.
          </p>
          <div className="v2-map-meta reveal">
            <span>
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
            </span>
            <a className="v2-button" href={maps.directionsUrl} target="_blank" rel="noreferrer">
              Route planen
            </a>
          </div>
        </div>
        <div className="v2-map-frame reveal">
          <iframe
            src={maps.embedUrl}
            title={`Karte: ${siteConfig.name}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
