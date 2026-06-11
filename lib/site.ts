export const assets = {
  hero: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132f24203b28e29d5965d_Glockenspiel_6.25-3%20(Custom).jpg",
  interior: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132ec3bbbf16ea23b7d31_Glockenspiel_6.25-20%20(Large).jpg",
  bar: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132f16ec79f5da6caa44c_Glockenspiel_6.25-12%20(Large).jpg",
  event: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132ed384f2785c92b8757_Glockenspiel_6.25-26%20(Large).jpg",
  food: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132ef604f34166804e4b5_Glockenspiel_6.25-10%20(Large).jpg",
  terrace: "https://cdn.prod.website-files.com/675fdd2b6490b82fd61f8719/685132ee0f1d73890b591bb4_Glockenspiel_6.25-4%20(Large).jpg",
};

export const menuFlipbook = {
  pdfUrl: "/menu/glockenspiel-karte.pdf",
  pageCount: 6,
};

export const imageAlt = {
  hero: "Terrasse und Eingang vom Das Glockenspiel in der Kitzb\u00fcheler Altstadt",
  interior: "Cocktails und Bar-Atmosph\u00e4re im Das Glockenspiel Kitzb\u00fchel",
  bar: "Signature Drinks an der Bar im Das Glockenspiel Kitzb\u00fchel",
  event: "Eingangsbereich und Event-Atmosph\u00e4re im Das Glockenspiel Kitzb\u00fchel",
  food: "Tapas und kleine Gerichte zum Teilen im Das Glockenspiel Kitzb\u00fchel",
  terrace: "Au\u00dfenbereich vom Das Glockenspiel in Kitzb\u00fchel",
};

export const siteConfig = {
  name: "Das Glockenspiel Kitzb\u00fchel",
  shortName: "Glockenspiel",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dasglockenspiel.at",
  title: "Bar Glockenspiel Kitzb\u00fchel - Tapas, Drinks & Live-Musik",
  description:
    "Das Glockenspiel in Kitzb\u00fchel: Bar, Tapas, Signature Drinks, Musik und Events mitten in der Altstadt. Jetzt Tisch reservieren oder Event anfragen.",
  phone: "+43 664 46 80 742",
  email: "info@dasglockenspiel.at",
  instagram: "https://www.instagram.com/glockenspielbar/",
  address: {
    street: "Hinterstadt 13",
    postalCode: "6370",
    city: "Kitzb\u00fchel",
    country: "AT",
  },
};

export const nav = ["Home", "Drinks", "Events", "Musik", "Kontakt"];

export const content = {
  hero: {
    eyebrow: "Das Glockenspiel",
    title: "Drinks. Bites. Beats.",
    kicker: "Der Ort fuer gute Abende in Kitzbuehel.",
    body:
      "Ein schneller Drink nach dem Skitag. Ein langer Abend mit Freunden. Ein Tisch, der spontan zum Mittelpunkt wird.",
    bodyTwo:
      "Signature Cocktails, kleine Gerichte zum Teilen, Champagner, Weine und Premium Spirits. Fuer Abende, die genau so verlaufen, wie sie sollen.",
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
      title: "Cafe",
      text:
        "Der Ort, an dem der Nachmittag langsam in den Abend kippt. Ein Espresso, ein Glas, ein Tisch mitten in Kitzbuehel.",
      image: assets.terrace,
    },
  ],
  experience: {
    eyebrow: "Das Erlebnis",
    title: "Komm vorbei. Bleib laenger.",
    body: [
      "Nach einem Tag am Berg. Nach dem Dinner. Oder einfach, weil du weisst, dass hier etwas los ist.",
      "Im Glockenspiel trifft man sich auf einen Drink, auf zwei oder auf einen Abend, der nicht geplant war.",
      "Die Musik passt. Die Stimmung auch. Alles wirkt leicht. Und genau das ist kein Zufall.",
    ],
  },
  concept: {
    eyebrow: "Die Idee dahinter",
    title: "Inspiriert von Bars in London, Paris, Wien und Muenchen.",
    island: "Gemacht fuer Kitzbuehel.",
    body:
      "Hier ist nichts zufaellig. Gastgeber Johannes Lehberger verbindet internationale Einfluesse mit einer Form von Gastlichkeit, die man hier schaetzt: unaufgeregt, aufmerksam und auf den Punkt.",
  },
  menu: {
    eyebrow: "Unsere Menues",
    title: "Drinks & Winter Menu",
    body:
      "Klassische Cocktails, Signature Drinks, Champagner, Weine und Premium Spirits. Dazu kleine Gerichte zum Teilen und Zero Proof Drinks auf gleichem Niveau.",
    button: "Getraenkekarte ansehen",
  },
  beats: {
    eyebrow: "Beats",
    title: "Wenn der Abend Fahrt aufnimmt.",
    body:
      "Musik ist im Glockenspiel kein Hintergrund. Sie ist Teil der Energie im Raum. Von Aperitivo bis Late Night entwickelt sich auch der Sound mit dem Abend.",
    cards: ["Aperitivo bis Late Night", "Resident DJs mit Gespuer fuer den Raum", "Leichtigkeit, Dynamik und Stimmung"],
  },
  events: {
    eyebrow: "Events",
    title: "Anlaesse mit der richtigen Energie.",
    cards: [
      {
        type: "Private Events",
        title: "Fuer Anlaesse, die mehr verdienen als einen grossen Tisch.",
        body:
          "Geburtstag. After Wedding Drinks. Ein Wochenende mit Freunden in Kitzbuehel. Oder einfach der richtige Moment.",
        cta: "Privates Event anfragen",
        href: "/private-events",
      },
      {
        type: "Corporate Events",
        title: "Business trifft Atmosphaere.",
        body:
          "Teamabend, Kundenevent, Incentive, Networking Format oder exklusiver Abend mit Gaesten, die mehr erwarten als Standard.",
        cta: "Corporate Event anfragen",
        href: "/corporate-events",
      },
    ],
  },
  final: {
    eyebrow: "Glockenspiel Kitzbuehel",
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
    title: "F\u00fcr Anl\u00e4sse, die mehr verdienen als einen gro\u00dfen Tisch.",
    kicker: "Geburtstag. After Wedding Drinks. Ein Wochenende mit Freunden in Kitzb\u00fchel.",
    body: [
      "Oder einfach der richtige Moment.",
      "Von entspanntem Aperitivo bis zu l\u00e4ngeren N\u00e4chten entwickeln wir den passenden Rahmen f\u00fcr Anlass, Gruppengr\u00f6\u00dfe und Stimmung.",
    ],
    primaryCta: "Privates Event anfragen",
    secondaryCta: "Getr\u00e4nkekarte ansehen",
    heroImage: assets.food,
    detailImage: assets.interior,
    atmosphereImage: assets.terrace,
    seoTitle: "Private Events im Glockenspiel Kitzb\u00fchel",
    seoDescription:
      "Private Events, Geburtstage, After Wedding Drinks und Abende mit Freunden im Das Glockenspiel Kitzb\u00fchel. Jetzt privates Event anfragen.",
    sections: [
      {
        eyebrow: "Der Rahmen",
        title: "Entspannt geplant. Pers\u00f6nlich gefeiert.",
        body: [
          "Ein privater Abend soll sich leicht anf\u00fchlen, auch wenn im Hintergrund vieles zusammenspielt.",
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
          "Flexible Setups f\u00fcr Gruppen",
          "Ein Ablauf, der leicht wirkt",
        ],
      },
      {
        eyebrow: "Food & Drinks",
        title: "Teilen, probieren, bleiben.",
        body: [
          "Kleine Gerichte, die perfekt zum Abend passen. Dazu Klassiker, Signature Drinks, ausgew\u00e4hlte Weine und Premium Spirits.",
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
    title: "Der richtige Rahmen f\u00fcr starke Abende.",
    kicker: "Firmenfeier. Kundenevent. Incentive.",
    body: [
      "Ein Abend mit G\u00e4sten, die mehr erwarten als Standard.",
      "Ein Empfang, der funktioniert. Ein Setting, das Gespr\u00e4che entstehen l\u00e4sst. Und ein Abend, der in Erinnerung bleibt.",
    ],
    primaryCta: "Corporate Event anfragen",
    secondaryCta: "Getr\u00e4nkekarte ansehen",
    heroImage: assets.event,
    detailImage: assets.interior,
    atmosphereImage: assets.bar,
    seoTitle: "Corporate Events im Glockenspiel Kitzb\u00fchel",
    seoDescription:
      "Corporate Events, Firmenfeiern, Kundenevents und Incentives im Das Glockenspiel Kitzb\u00fchel. Planbar, verl\u00e4sslich und auf den Punkt.",
    sections: [
      {
        eyebrow: "Positionierung",
        title: "Planbar. Verl\u00e4sslich. Auf den Punkt.",
        body: [
          "Ein guter Event wirkt m\u00fchelos, weil er gut vorbereitet ist.",
          "Im Glockenspiel ist nichts dem Zufall \u00fcberlassen, auch wenn es sich genau so anf\u00fchlt.",
        ],
      },
      {
        eyebrow: "Was euch erwartet",
        title: "Ein klarer Rahmen ohne starres Konzept",
        items: [
          "Empfang mit Champagner",
          "Signature Cocktails, Klassiker und Zero Proof Drinks",
          "Ausgew\u00e4hlte Weine und Premium Spirits",
          "Kleine Gerichte zum Teilen",
          "Musik und DJ auf Wunsch",
          "Ein Ablauf, der unaufdringlich ineinandergreift",
        ],
      },
      {
        eyebrow: "Der Ablauf",
        title: "Einfach in der Abstimmung. Pr\u00e4zise in der Umsetzung.",
        body: [
          "Kurze Abstimmung im Vorfeld. Schnelle R\u00fcckmeldung. Klare Struktur am Abend.",
          "Damit ihr euch auf eure G\u00e4ste konzentrieren k\u00f6nnt.",
        ],
      },
      {
        eyebrow: "Food & Drinks",
        title: "Qualit\u00e4t, die auff\u00e4llt, ohne laut zu sein",
        body: [
          "Eine kuratierte Auswahl an Champagner, Weinen mit Charakter, Premium Spirits und Zero Proof Drinks auf gleichem Niveau.",
          "F\u00fcr Abende, bei denen jeder Gast das passende Glas in der Hand hat.",
        ],
      },
      {
        eyebrow: "Atmosph\u00e4re",
        title: "Der Unterschied liegt im Gef\u00fchl.",
        body: [
          "Nicht zu laut. Nicht zu steif. Genau die richtige Mischung aus Gespr\u00e4ch, Bewegung und Stimmung.",
          "Ein Rahmen, der Eindruck hinterl\u00e4sst.",
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
