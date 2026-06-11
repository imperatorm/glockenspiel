import { siteConfig } from "@/lib/site";

type LegalSection = {
  id: string;
  title: string;
  body: string[];
  items?: string[];
};

export type LegalPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const contact = `${siteConfig.name}, ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, Telefon: ${siteConfig.phone}, E-Mail: ${siteConfig.email}`;

export const privacyPolicy: LegalPageContent = {
  slug: "datenschutz",
  eyebrow: "Rechtliches",
  title: "Datenschutzerkl\u00e4rung",
  description:
    "Informationen zum Umgang mit personenbezogenen Daten, Hosting, Kontaktanfragen, Cookies und eingesetzten Diensten.",
  updated: "Stand: Juni 2026",
  sections: [
    {
      id: "overview",
      title: "1. Datenschutz auf einen Blick",
      body: [
        "Die folgenden Hinweise geben einen einfachen \u00dcberblick dar\u00fcber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie pers\u00f6nlich identifiziert werden k\u00f6nnen.",
        "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich zum Beispiel um Daten handeln, die Sie in ein Kontaktformular eingeben oder uns per E-Mail senden.",
        "Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten wie Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs.",
      ],
    },
    {
      id: "controller",
      title: "2. Verantwortliche Stelle",
      body: [
        `Die verantwortliche Stelle f\u00fcr die Datenverarbeitung auf dieser Website ist: ${contact}.`,
        "Verantwortliche Stelle ist die nat\u00fcrliche oder juristische Person, die allein oder gemeinsam mit anderen \u00fcber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.",
      ],
    },
    {
      id: "rights",
      title: "3. Ihre Rechte",
      body: [
        "Sie haben jederzeit das Recht, unentgeltlich Auskunft \u00fcber Herkunft, Empf\u00e4nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.",
        "Sie haben au\u00dferdem ein Recht auf Berichtigung, L\u00f6schung, Einschr\u00e4nkung der Verarbeitung, Daten\u00fcbertragbarkeit und Widerruf einer erteilten Einwilligung. Des Weiteren steht Ihnen ein Beschwerderecht bei der zust\u00e4ndigen Aufsichtsbeh\u00f6rde zu.",
        "Viele Datenverarbeitungsvorg\u00e4nge sind nur mit Ihrer ausdr\u00fccklichen Einwilligung m\u00f6glich. Sie k\u00f6nnen eine bereits erteilte Einwilligung jederzeit f\u00fcr die Zukunft widerrufen.",
      ],
    },
    {
      id: "hosting",
      title: "4. Hosting",
      body: [
        "Die bisherige Webflow-Website wurde bei Webflow, Inc., 398 11th Street, 2nd Floor, San Francisco, CA 94103, USA gehostet. Webflow kann beim Besuch der Website verschiedene Logfiles inklusive IP-Adressen erfassen.",
        "Webflow speichert Cookies oder sonstige Wiedererkennungstechnologien, die f\u00fcr die Darstellung der Seite, zur Bereitstellung bestimmter Webseitenfunktionen und zur Gew\u00e4hrleistung der Sicherheit erforderlich sind.",
        "Details entnehmen Sie der Datenschutzerkl\u00e4rung von Webflow: https://webflow.com/legal/eu-privacy-policy.",
      ],
    },
    {
      id: "contact",
      title: "5. Anfrage per E-Mail, Telefon oder Formular",
      body: [
        "Wenn Sie uns per E-Mail, Telefon oder Formular kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zweck der Bearbeitung Ihres Anliegens gespeichert und verarbeitet.",
        "Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt je nach Art der Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1 lit. f DSGVO oder Ihrer Einwilligung.",
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies",
      body: [
        "Unsere Internetseiten verwenden sogenannte Cookies. Cookies sind kleine Datenpakete und richten auf Ihrem Endger\u00e4t keinen Schaden an.",
        "Sie k\u00f6nnen vor\u00fcbergehend f\u00fcr die Dauer einer Sitzung oder dauerhaft auf Ihrem Endger\u00e4t gespeichert werden. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.",
        "Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wird, erfolgt die Verarbeitung ausschlie\u00dflich auf Grundlage dieser Einwilligung. Die Einwilligung ist jederzeit widerrufbar.",
      ],
    },
    {
      id: "consent",
      title: "7. Einwilligung mit Usercentrics",
      body: [
        "Die bisherige Website nutzt die Consent-Technologie von Usercentrics, um Einwilligungen zur Speicherung bestimmter Cookies oder zum Einsatz bestimmter Technologien einzuholen und datenschutzkonform zu dokumentieren.",
        "Anbieter ist die Usercentrics GmbH, Sendlinger Stra\u00dfe 7, 80331 M\u00fcnchen. Beim Einsatz k\u00f6nnen unter anderem Einwilligungsstatus, IP-Adresse, Browserinformationen, Ger\u00e4teinformationen, Zeitpunkt des Besuchs und Geolocation verarbeitet werden.",
      ],
    },
    {
      id: "instagram-feed",
      title: "8. Elfsight Instagram Feed",
      body: [
        "Auf dieser Website ist ein Instagram Feed \u00fcber Elfsight eingebunden. Anbieter ist Elfsight, LLC. Beim Laden des Feeds kann eine Verbindung zu Servern von Elfsight und Instagram beziehungsweise Meta hergestellt werden.",
        "Dabei k\u00f6nnen technische Daten wie IP-Adresse, Browserinformationen, Ger\u00e4teinformationen, Referrer und Nutzungsdaten verarbeitet werden. Der Feed wird eingesetzt, um aktuelle Inhalte unseres Instagram-Profils direkt auf der Website anzuzeigen.",
        "Sofern f\u00fcr die Einbindung eine Einwilligung erforderlich ist, erfolgt die Verarbeitung auf Grundlage dieser Einwilligung. Weitere Informationen finden Sie in den Datenschutzhinweisen von Elfsight und Instagram.",
      ],
    },
    {
      id: "fonts",
      title: "9. Google Fonts",
      body: [
        "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Google Fonts. Soweit die Fonts lokal eingebunden sind, findet keine Verbindung zu Servern von Google statt.",
        "Weitere Informationen zu Google Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerkl\u00e4rung von Google: https://policies.google.com/privacy.",
      ],
    },
  ],
};

export const cookiePolicy: LegalPageContent = {
  slug: "cookies",
  eyebrow: "Rechtliches",
  title: "Cookie-Richtlinie",
  description:
    "Informationen dazu, welche Cookie-Arten auf der Website verwendet werden k\u00f6nnen und wie Sie Ihre Einstellungen verwalten.",
  updated: "Stand: Juni 2026",
  sections: [
    {
      id: "what-are-cookies",
      title: "Was sind Cookies?",
      body: [
        "Cookies sind kleine Datenpakete, die auf Ihrem Endger\u00e4t gespeichert werden. Sie k\u00f6nnen dazu dienen, eine Website technisch bereitzustellen, Einstellungen zu speichern oder bestimmte Funktionen zu erm\u00f6glichen.",
        "Session-Cookies werden nach Ende Ihres Besuchs automatisch gel\u00f6scht. Permanente Cookies bleiben gespeichert, bis Sie diese selbst l\u00f6schen oder eine automatische L\u00f6schung durch Ihren Browser erfolgt.",
      ],
    },
    {
      id: "necessary",
      title: "Technisch notwendige Cookies",
      body: [
        "Technisch notwendige Cookies sind erforderlich, damit zentrale Funktionen der Website stabil und sicher bereitgestellt werden k\u00f6nnen.",
        "Diese Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.",
      ],
    },
    {
      id: "optional",
      title: "Optionale Cookies und Dienste",
      body: [
        "Optionale Cookies, Analyse-Technologien, eingebettete Inhalte oder Marketing-Dienste werden nur eingesetzt, wenn eine entsprechende Einwilligung abgefragt und erteilt wurde.",
        "Eine erteilte Einwilligung kann jederzeit mit Wirkung f\u00fcr die Zukunft widerrufen werden.",
      ],
    },
    {
      id: "usercentrics",
      title: "Consent Management",
      body: [
        "Die bisherige Webflow-Seite nutzt Usercentrics zur Verwaltung von Einwilligungen. Usercentrics kann ein Cookie speichern, um erteilte Einwilligungen oder Widerrufe zuordnen zu k\u00f6nnen.",
        "Dabei k\u00f6nnen unter anderem Einwilligungsstatus, IP-Adresse, Browserinformationen, Ger\u00e4teinformationen und Zeitpunkt des Besuchs verarbeitet werden.",
      ],
    },
    {
      id: "browser",
      title: "Cookies im Browser verwalten",
      body: [
        "Sie k\u00f6nnen Ihren Browser so einstellen, dass Sie \u00fcber das Setzen von Cookies informiert werden, Cookies nur im Einzelfall erlauben oder Cookies generell ausschlie\u00dfen.",
        "Bei der Deaktivierung von Cookies kann die Funktionalit\u00e4t dieser Website eingeschr\u00e4nkt sein.",
      ],
    },
    {
      id: "elfsight-instagram",
      title: "Elfsight Instagram Feed",
      body: [
        "Der eingebundene Instagram Feed von Elfsight kann beim Laden externe Ressourcen abrufen und Cookies oder vergleichbare Technologien nutzen.",
        "Wenn eine Einwilligung abgefragt wird, wird der Feed erst nach Ihrer Zustimmung geladen. Ohne Zustimmung kann die Darstellung des Instagram Feeds eingeschr\u00e4nkt sein.",
      ],
    },
  ],
};
