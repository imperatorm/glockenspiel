// Webflow Cloud mounts the app at a path ("/app"). Static files and routes are
// served under that prefix, so every hand-authored absolute URL (img src, CSS
// url(), internal <a href>, client fetch) must include it. Next only auto-prefixes
// next/link|image|script. Default to "/app"; local dev overrides to "" via .env.development.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

export const withBase = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;

export const assets = {
  hero: withBase("/images/hero.webp"),
  interior: withBase("/images/interior.webp"),
  bar: withBase("/images/bar.webp"),
  event: withBase("/images/event.webp"),
  food: withBase("/images/food.webp"),
  terrace: withBase("/images/terrace.webp"),
  facade: withBase("/images/facade.webp"),
  foodTwo: withBase("/images/food-two.webp"),
  drink: withBase("/images/drink.webp"),
};

export const menuFlipbook = {
  pdfUrl: withBase("/menu/glockenspiel-karte.pdf"),
  pageCount: 6,
};

export const imageAlt = {
  hero: "Abendstimmung vor dem Das Glockenspiel in der Kitzbüheler Altstadt",
  interior: "Eingang vom Das Glockenspiel mit Außenbar und Vespa",
  bar: "Gäste an der Bar im Das Glockenspiel bei Nacht",
  event: "Live-Event mit DJ vor dem Das Glockenspiel in Kitzbühel",
  food: "Tapas und Wein im Das Glockenspiel Kitzbühel",
  terrace: "Volle Terrasse vom Das Glockenspiel in der Hinterstadt",
  facade: "Das Glockenspiel Haus in der Hinterstadt 13, Kitzbühel",
  foodTwo: "Flammkuchen und kleine Gerichte zum Teilen im Das Glockenspiel",
  drink: "Aperitif und Snack auf der Terrasse vom Das Glockenspiel",
};

export const siteConfig = {
  name: "Das Glockenspiel Kitzbühel",
  shortName: "Glockenspiel",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dasglockenspiel.at",
  title: "Bar Glockenspiel Kitzbühel - Tapas, Drinks & Live-Musik",
  description:
    "Das Glockenspiel in Kitzbühel: Bar, Tapas, Signature Drinks, Musik und Events mitten in der Altstadt. Jetzt Tisch reservieren oder Event anfragen.",
  phone: "+43 664 46 80 742",
  email: "info@dasglockenspiel.at",
  instagram: "https://www.instagram.com/glockenspielbar/",
  address: {
    street: "Hinterstadt 13",
    postalCode: "6370",
    city: "Kitzbühel",
    country: "AT",
  },
};

const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "AIzaSyBojwSQsCc_NyzwTzgCope7gU-je08K4X8";

export const maps = {
  embedUrl: `https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=Das+Glockenspiel,+Hinterstadt+13,+6370+Kitzb%C3%BChel&zoom=17`,
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Das+Glockenspiel,+Hinterstadt+13,+6370+Kitzb%C3%BChel",
};

export const nav = ["Home", "Drinks", "Events", "Musik", "Kontakt"];

export const marqueeItems = ["Drinks", "Bites", "Beats", "Kitzbühel", "Aperitivo", "Late Night"];

export const content = {
  hero: {
    eyebrow: "Bar · Tapas · Café — Hinterstadt 13, Kitzbühel",
    title: "Drinks. Bites. Beats.",
    kicker: "Der Ort für gute Abende in Kitzbühel.",
    body:
      "Ein schneller Drink nach dem Skitag. Ein langer Abend mit Freunden. Ein Tisch, der spontan zum Mittelpunkt wird.",
    bodyTwo:
      "Signature Cocktails, kleine Gerichte zum Teilen, Champagner, Weine und Premium Spirits. Für Abende, die genau so verlaufen, wie sie sollen.",
    primary: "Tisch reservieren",
    secondary: "Events entdecken",
  },
  pillars: [
    {
      title: "Bar",
      text:
        "Unsere Barkarte ist voll von Klassikern und Signature Drinks, die sauber gemixt, klar serviert und bewusst kuratiert sind.",
      image: assets.bar,
    },
    {
      title: "Tapas",
      text:
        "Kleine Gerichte, die perfekt zum Abend passen. International, alpin akzentuiert und immer zum Teilen gedacht.",
      image: assets.food,
    },
    {
      title: "Café",
      text:
        "Der Ort, an dem der Nachmittag langsam in den Abend kippt. Ein Espresso, ein Glas, ein Tisch mitten in Kitzbühel.",
      image: assets.terrace,
    },
  ],
  experience: {
    eyebrow: "Das Erlebnis",
    title: "Komm vorbei. Bleib länger.",
    body: [
      "Nach einem Tag am Berg. Nach dem Dinner. Oder einfach, weil du weißt, dass hier etwas los ist.",
      "Im Glockenspiel trifft man sich auf einen Drink, auf zwei oder auf einen Abend, der nicht geplant war.",
      "Die Musik passt. Die Stimmung auch. Alles wirkt leicht. Und genau das ist kein Zufall.",
    ],
  },
  concept: {
    eyebrow: "Die Idee dahinter",
    title: "Inspiriert von Bars in London, Paris, Wien und München.",
    island: "Gemacht für Kitzbühel.",
    body:
      "Hier ist nichts zufällig. Gastgeber Johannes Lehberger verbindet internationale Einflüsse mit einer Form von Gastlichkeit, die man hier schätzt: unaufgeregt, aufmerksam und auf den Punkt.",
  },
  menu: {
    eyebrow: "Unsere Menüs",
    title: "Drinks & Winter Menu",
    body:
      "Klassische Cocktails, Signature Drinks, Champagner, Weine und Premium Spirits. Dazu kleine Gerichte zum Teilen und Zero Proof Drinks auf gleichem Niveau.",
    button: "Getränkekarte ansehen",
  },
  beats: {
    eyebrow: "Beats",
    title: "Wenn der Abend Fahrt aufnimmt.",
    body:
      "Musik ist im Glockenspiel kein Hintergrund. Sie ist Teil der Energie im Raum. Von Aperitivo bis Late Night entwickelt sich auch der Sound mit dem Abend.",
    cards: ["Aperitivo bis Late Night", "Resident DJs mit Gespür für den Raum", "Leichtigkeit, Dynamik und Stimmung"],
  },
  events: {
    eyebrow: "Events",
    title: "Anlässe mit der richtigen Energie.",
    cards: [
      {
        type: "Private Events",
        title: "Für Anlässe, die mehr verdienen als einen großen Tisch.",
        body:
          "Geburtstag. After Wedding Drinks. Ein Wochenende mit Freunden in Kitzbühel. Oder einfach der richtige Moment.",
        cta: "Privates Event anfragen",
        href: "/private-events",
      },
      {
        type: "Corporate Events",
        title: "Business trifft Atmosphäre.",
        body:
          "Teamabend, Kundenevent, Incentive, Networking Format oder exklusiver Abend mit Gästen, die mehr erwarten als Standard.",
        cta: "Corporate Event anfragen",
        href: "/corporate-events",
      },
    ],
  },
  final: {
    eyebrow: "Glockenspiel Kitzbühel",
    title: "Heute Abend im Glockenspiel?",
    body:
      "Komm vorbei, reserviere deinen Tisch oder frage dein Event direkt an. Gerade am Wochenende wird es schnell voll.",
  },
  hours: [
    ["Montag", "16:00 - 00:00"],
    ["Dienstag", "14:00 - 00:00"],
    ["Mittwoch", "14:00 - 00:00"],
    ["Donnerstag", "14:00 - 02:00"],
    ["Freitag", "14:00 - 02:00"],
    ["Samstag", "14:00 - 02:00"],
    ["Sonntag", "16:00 - 00:00"],
  ],
};

export const eventPages = {
  private: {
    slug: "private-events",
    eyebrow: "Private Events",
    navLabel: "Private Events",
    title: "Für Anlässe, die mehr verdienen als einen großen Tisch.",
    kicker: "Geburtstag. After Wedding Drinks. Ein Wochenende mit Freunden in Kitzbühel.",
    body: [
      "Oder einfach der richtige Moment.",
      "Von entspanntem Aperitivo bis zu längeren Nächten entwickeln wir den passenden Rahmen für Anlass, Gruppengröße und Stimmung.",
    ],
    primaryCta: "Privates Event anfragen",
    secondaryCta: "Getränkekarte ansehen",
    heroImage: assets.food,
    detailImage: assets.interior,
    atmosphereImage: assets.terrace,
    seoTitle: "Private Events im Glockenspiel Kitzbühel",
    seoDescription:
      "Private Events, Geburtstage, After Wedding Drinks und Abende mit Freunden im Das Glockenspiel Kitzbühel. Jetzt privates Event anfragen.",
    facts: [
      ["Lage", "Hinterstadt 13, Altstadt"],
      ["Format", "Aperitivo bis Late Night"],
      ["Gruppen", "Flexibel, klein bis exklusiv"],
      ["Antwort", "Rückmeldung innerhalb 24h"],
    ],
    sections: [
      {
        eyebrow: "Der Rahmen",
        title: "Entspannt geplant. Persönlich gefeiert.",
        body: [
          "Ein privater Abend soll sich leicht anfühlen, auch wenn im Hintergrund vieles zusammenspielt.",
          "Wir stimmen Drinks, kleine Gerichte, Musik und Ablauf so ab, dass aus einem Anlass ein Abend mit eigener Energie wird.",
        ],
      },
      {
        eyebrow: "Was euch erwartet",
        title: "Alles, was ein guter Abend braucht.",
        items: [
          "Aperitivo zum Ankommen",
          "Signature Cocktails, Champagner und Zero Proof Drinks",
          "Kleine Gerichte zum Teilen",
          "Musik und Stimmung passend zum Abend",
          "Flexible Setups für Gruppen",
          "Ein Ablauf, der leicht wirkt",
        ],
      },
      {
        eyebrow: "Food & Drinks",
        title: "Teilen, probieren, bleiben.",
        body: [
          "Kleine Gerichte, die perfekt zum Abend passen. Dazu Klassiker, Signature Drinks, ausgewählte Weine und Premium Spirits.",
          "Alles ist darauf ausgelegt, dass der Abend in Bewegung bleibt.",
        ],
      },
      {
        eyebrow: "Stimmung",
        title: "Wenn der Abend Fahrt aufnimmt.",
        body: [
          "Musik ist im Glockenspiel kein Hintergrund. Sie ist Teil der Energie im Raum.",
          "Von Aperitivo bis Late Night entwickelt sich auch der Sound mit dem Abend.",
        ],
      },
    ],
    final: {
      title: "Plant euren privaten Abend im Glockenspiel",
      body:
        "Schickt uns Datum, Personenanzahl und Anlass. Wir melden uns zeitnah mit einem Vorschlag, der zu eurem Abend passt.",
      button: "Privates Event anfragen",
    },
  },
  corporate: {
    slug: "corporate-events",
    eyebrow: "Corporate Events",
    navLabel: "Corporate Events",
    title: "Der richtige Rahmen für starke Abende.",
    kicker: "Firmenfeier. Kundenevent. Incentive.",
    body: [
      "Ein Abend mit Gästen, die mehr erwarten als Standard.",
      "Ein Empfang, der funktioniert. Ein Setting, das Gespräche entstehen lässt. Und ein Abend, der in Erinnerung bleibt.",
    ],
    primaryCta: "Corporate Event anfragen",
    secondaryCta: "Getränkekarte ansehen",
    heroImage: assets.event,
    detailImage: assets.interior,
    atmosphereImage: assets.bar,
    seoTitle: "Corporate Events im Glockenspiel Kitzbühel",
    seoDescription:
      "Corporate Events, Firmenfeiern, Kundenevents und Incentives im Das Glockenspiel Kitzbühel. Planbar, verlässlich und auf den Punkt.",
    facts: [
      ["Lage", "Hinterstadt 13, Altstadt"],
      ["Format", "Empfang bis Networking"],
      ["Planung", "Kurze, klare Abstimmung"],
      ["Antwort", "Rückmeldung innerhalb 24h"],
    ],
    sections: [
      {
        eyebrow: "Positionierung",
        title: "Planbar. Verlässlich. Auf den Punkt.",
        body: [
          "Ein guter Event wirkt mühelos, weil er gut vorbereitet ist.",
          "Im Glockenspiel ist nichts dem Zufall überlassen, auch wenn es sich genau so anfühlt.",
        ],
      },
      {
        eyebrow: "Was euch erwartet",
        title: "Ein klarer Rahmen ohne starres Konzept",
        items: [
          "Empfang mit Champagner",
          "Signature Cocktails, Klassiker und Zero Proof Drinks",
          "Ausgewählte Weine und Premium Spirits",
          "Kleine Gerichte zum Teilen",
          "Musik und DJ auf Wunsch",
          "Ein Ablauf, der unaufdringlich ineinandergreift",
        ],
      },
      {
        eyebrow: "Der Ablauf",
        title: "Einfach in der Abstimmung. Präzise in der Umsetzung.",
        body: [
          "Kurze Abstimmung im Vorfeld. Schnelle Rückmeldung. Klare Struktur am Abend.",
          "Damit ihr euch auf eure Gäste konzentrieren könnt.",
        ],
      },
      {
        eyebrow: "Food & Drinks",
        title: "Qualität, die auffällt, ohne laut zu sein",
        body: [
          "Eine kuratierte Auswahl an Champagner, Weinen mit Charakter, Premium Spirits und Zero Proof Drinks auf gleichem Niveau.",
          "Für Abende, bei denen jeder Gast das passende Glas in der Hand hat.",
        ],
      },
      {
        eyebrow: "Atmosphäre",
        title: "Der Unterschied liegt im Gefühl.",
        body: [
          "Nicht zu laut. Nicht zu steif. Genau die richtige Mischung aus Gespräch, Bewegung und Stimmung.",
          "Ein Rahmen, der Eindruck hinterlässt.",
        ],
      },
    ],
    final: {
      title: "Plant euren Event im Glockenspiel",
      body:
        "Schickt uns Datum, Personenanzahl, Anlass und Budget oder Vorstellungen. Wir melden uns zeitnah mit einem konkreten Vorschlag.",
      button: "Jetzt Corporate Event anfragen",
    },
  },
} as const;
