// Firmenevents & Weihnachtsfeier — facts, FAQ and packages from the
// "Briefing Web: Firmenevents & Weihnachtsfeier" (J. Lehberger, Sep 2026).
//
// Kept in code (not Sanity) on purpose: the visible FAQ text and the FAQPage
// JSON-LD must match word for word, so both are rendered from this one source.
import { siteConfig, withBase } from "@/lib/site";

export const WEIHNACHTSFEIER_SLUG = "weihnachtsfeier-kitzbuehel";

export const quickFacts: [string, string][] = [
  ["Kapazität", "Bis zu 80 Personen stehend (Flying Food / Bites) · bis zu 30 Personen sitzend"],
  ["Buchungsoptionen", "Teilbereich ab 20 Personen oder exklusive Miete der ganzen Bar (50–80 Gäste)"],
  [
    "Preise",
    "Verzehr ab 50 € pro Person · Exklusivmiete ab 3.000 € Mindestumsatz (halbe Nacht, So–Do) bzw. 6.000 € So–Do / 10.000 € Fr–Sa (ganze Nacht, 5 Stunden) · alle Termine auf Anfrage",
  ],
  ["Öffnungszeiten Winter", "Täglich ab 16 Uhr"],
  ["Konzept", "Signature Cocktails, Champagner und Weine, alpines Sharing Food, Soundsystem für DJ oder Playlist"],
  ["Antwortzeit", "Individuelles Angebot innerhalb von 24 Stunden"],
  ["Adresse", "Hinterstadt 13, 6370 Kitzbühel"],
];

export const faq: { question: string; answer: string }[] = [
  {
    question: "Kann man Das Glockenspiel exklusiv mieten?",
    answer:
      "Ja. Die ganze Bar kann für Firmenabende, Kundenevents und Feiern mit 50 bis 80 Gästen exklusiv gemietet werden. Die Miete ist an einen Mindestumsatz gekoppelt: Sonntag bis Donnerstag 3.000 € für die erste Hälfte des Abends und 4.000 € für die zweite Hälfte (am Wochenende auf Anfrage), 6.000 € (Sonntag bis Donnerstag) bzw. 10.000 € (Freitag und Samstag) für die ganze Nacht (5 Stunden zwischen 18 und 24 Uhr). Jede weitere Stunde kostet 400 € zuzüglich Konsumation.",
  },
  {
    question: "Für wie viele Personen eignet sich die Location?",
    answer:
      "Für Firmenabende mit Drinks und Flying Food bis zu 80 Personen, sitzend bis zu 30 Personen. Kleinere Teams ab 20 Personen reservieren einen eigenen Bereich.",
  },
  {
    question: "Was kostet ein Firmenevent im Glockenspiel?",
    answer: "Firmenevents beginnen ab 50 € Verzehr pro Person. Sie erhalten innerhalb von 24 Stunden ein individuelles Angebot.",
  },
  {
    question: "Welches Essen gibt es bei Events?",
    answer:
      "Statt eines gesetzten Menüs servieren wir Sharing Food und Bar-Bites – im Winter unter anderem Brettljause, Vitello Tonnato und Käsefondue. Ideal für Abende, an denen sich das Team bewegt und ins Gespräch kommt.",
  },
  {
    question: "Gibt es Technik für Musik oder DJs?",
    answer: "Ja, ein professionelles Soundsystem ist vorhanden. Wir vermitteln gerne DJs oder spielen Ihre eigene Playlist.",
  },
  {
    question: "Wann ist das Glockenspiel geöffnet?",
    answer:
      "In der Wintersaison täglich ab 16 Uhr. Exklusive Events sind nach Verfügbarkeit an jedem Wochentag möglich, ausgenommen Weihnachtszeit und Hahnenkamm-Rennwoche.",
  },
];

export const weihnachtsfeier = {
  seoTitle: "Weihnachtsfeier in Kitzbühel | Das Glockenspiel",
  seoDescription:
    "Firmen-Weihnachtsfeier in Kitzbühel für 20 bis 80 Gäste: Signature Drinks, alpines Sharing Food und exklusive Barmiete. Angebot in 24 Stunden.",
  eyebrow: "Weihnachtsfeier",
  title: "Weihnachtsfeier in Kitzbühel: Drinks, Bites & Beats im Glockenspiel",
  intro:
    "Eine Weihnachtsfeier mit Barkultur statt Bankettsaal. Im Glockenspiel in der Kitzbüheler Hinterstadt feiern Teams von 20 bis 80 Personen bei Signature Cocktails, Champagner und alpinem Sharing Food. Den Abend gestalten wir mit Ihnen – vom Aperitif bis zur Late-Night-Bar.",
  cta: "Angebot anfragen",
  packages: [
    {
      name: "Aperitivo & Bites",
      description: "Empfangsdrink mit Bar-Bites",
      price: "45 € p. P.",
    },
    {
      name: "Markt & Bar",
      description:
        "Glühwein und Punsch an unserem Stand am Kitzbüheler Adventmarkt (ab 19. November), für Gruppen bis 50 Personen, danach Weiterziehen ins Glockenspiel",
      price: "ca. 25 € p. P.",
    },
    {
      name: "The Half Night",
      tag: "exklusiv",
      description:
        "Die ganze Bar für Ihr Unternehmen, erste oder zweite Hälfte des Abends, Sonntag bis Donnerstag (Wochenende auf Anfrage)",
      price: "3.000 € (erste Hälfte) / 4.000 € (zweite Hälfte) Mindestumsatz",
    },
    {
      name: "The Full Night",
      tag: "exklusiv",
      description:
        "Die ganze Bar für Ihr Unternehmen, 5 Stunden zwischen 18 und 24 Uhr, 50–80 Gäste, Sharing Food mit Brettljause, Vitello Tonnato und Käsefondue, Late-Night-Bar",
      price: "6.000 € (So–Do) / 10.000 € (Fr–Sa) Mindestumsatz, jede weitere Stunde 400 € zzgl. Konsumation",
    },
  ],
  dateNote: [
    "Alle Termine auf Anfrage und nach Verfügbarkeit, ausgenommen Weihnachtszeit und Hahnenkamm-Rennwoche.",
    "Die Termine im November und Dezember, vor allem Donnerstage und Freitage, sind begrenzt. Wir empfehlen eine frühzeitige Anfrage.",
  ],
};

export const inquirySources = ["Empfehlung", "Google", "ChatGPT/KI", "Social Media", "Sonstiges"];

export const inquirySuccess = "Danke – Sie hören innerhalb von 24 Stunden von uns.";

// Schema.org — BarOrPub (not EventVenue: only a LocalBusiness type supports priceRange).
export const venueSchema = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: "Das Glockenspiel",
  url: siteConfig.siteUrl,
  telephone: "+43 664 4680742",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  maximumAttendeeCapacity: 80,
  priceRange: "ab 50 € pro Person für Firmenevents",
  servesCuisine: "Sharing Food, Bar-Bites",
  keywords: "Firmenevent Kitzbühel, Weihnachtsfeier Kitzbühel, Exklusivmiete Bar Kitzbühel",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export const weihnachtsfeierHref = withBase(`/${WEIHNACHTSFEIER_SLUG}`);
