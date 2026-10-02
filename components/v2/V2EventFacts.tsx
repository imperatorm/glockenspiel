import { faq, faqSchema, quickFacts, venueSchema } from "@/lib/firmenevents";

// Plain server-rendered HTML so Google and AI assistants can read every fact.
export function V2QuickFacts({ title = "Quick Facts" }: { title?: string }) {
  return (
    <section className="v2-qf" aria-labelledby="quick-facts-title">
      <div className="v2-rule" data-rule />
      <div className="v2-qf-grid">
        <div className="v2-section-meta">
          <span>Fakten</span>
        </div>
        <div>
          <h2 id="quick-facts-title" className="v2-serif">
            {title}
          </h2>
          <dl className="v2-qf-list">
            {quickFacts.map(([label, value]) => (
              <div className="v2-qf-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// <details> keeps the answers in the HTML source (not loaded via JS) while still collapsible.
export function V2Faq() {
  return (
    <section className="v2-qf" aria-labelledby="faq-title">
      <div className="v2-rule" data-rule />
      <div className="v2-qf-grid">
        <div className="v2-section-meta">
          <span>FAQ</span>
        </div>
        <div>
          <h2 id="faq-title" className="v2-serif">
            Häufige Fragen
          </h2>
          <div className="v2-faq">
            {faq.map(({ question, answer }) => (
              <details className="v2-faq-item" key={question}>
                <summary>
                  <h3>{question}</h3>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FirmeneventsSchema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
