// Webflow Cloud mounts the app at a path ("/app"). Static files and routes are
// served under that prefix, so every hand-authored absolute URL (img src, CSS
// url(), internal <a href>, client fetch) must include it. Next only auto-prefixes
// next/link|image|script. Default to "/app"; local dev overrides to "" via .env.development.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

export const withBase = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;

// Content edited via Keystatic (/keystatic in `npm run dev`) lives in
// content/settings/index.json and is imported here so the existing export
// shapes stay identical for every consumer (client, server, metadata, SSG).
import eventsData from "../content/events.json";
import homeData from "../content/home.json";
import settings from "../content/settings.json";

const cmsImages = settings.images;

export const assets = {
  hero: withBase(cmsImages.hero.image),
  interior: withBase(cmsImages.interior.image),
  bar: withBase(cmsImages.bar.image),
  event: withBase(cmsImages.event.image),
  food: withBase(cmsImages.food.image),
  terrace: withBase(cmsImages.terrace.image),
  facade: withBase(cmsImages.facade.image),
  foodTwo: withBase(cmsImages.foodTwo.image),
  drink: withBase(cmsImages.drink.image),
};

export const menuFlipbook = {
  pdfUrl: withBase(settings.menu.pdf),
  pageCount: settings.menu.pageCount,
};

export const imageAlt = {
  hero: cmsImages.hero.alt,
  interior: cmsImages.interior.alt,
  bar: cmsImages.bar.alt,
  event: cmsImages.event.alt,
  food: cmsImages.food.alt,
  terrace: cmsImages.terrace.alt,
  facade: cmsImages.facade.alt,
  foodTwo: cmsImages.foodTwo.alt,
  drink: cmsImages.drink.alt,
};

export const siteConfig = {
  name: settings.siteName,
  shortName: settings.shortName,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dasglockenspiel.at",
  title: settings.title,
  description: settings.description,
  phone: settings.phone,
  email: settings.email,
  instagram: settings.instagram,
  address: {
    street: settings.address.street,
    postalCode: settings.address.postalCode,
    city: settings.address.city,
    country: settings.address.country,
  },
};

const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "AIzaSyBojwSQsCc_NyzwTzgCope7gU-je08K4X8";

export const maps = {
  embedUrl: `https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=Das+Glockenspiel,+Hinterstadt+13,+6370+Kitzb%C3%BChel&zoom=17`,
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Das+Glockenspiel,+Hinterstadt+13,+6370+Kitzb%C3%BChel",
};

export const nav = ["Home", "Food & Drinks", "Events", "Musik", "Kontakt"];

export const marqueeItems = ["Drinks", "Bites", "Beats", "Kitzbühel", "Aperitivo", "Late Night"];

// Home page content (CMS-editable via Sanity → baked to content/home.json).
export const home = homeData;

// Cross-page bits kept on `content`: the drinks page + structured data read
// `content.menu`, and several components read `content.hours`.
export const content = {
  menu: {
    eyebrow: homeData.menu.eyebrow,
    title: homeData.menu.heading,
    body: homeData.menu.body,
    button: homeData.menu.button,
  },
  hours: settings.hours.map((entry) => [entry.day, entry.hours] as [string, string]),
};

// Event pages — CMS-editable via Sanity → baked to content/events.json.
type EventSection = { eyebrow: string; title: string; body?: string[]; items?: string[] };
type EventPageContent = {
  slug: string;
  eyebrow: string;
  navLabel: string;
  title: string;
  kicker: string;
  body: string[];
  primaryCta: string;
  secondaryCta: string;
  heroImageKey: string;
  detailImageKey: string;
  atmosphereImageKey: string;
  seoTitle: string;
  seoDescription: string;
  facts: [string, string][];
  sections: EventSection[];
  final: { title: string; body: string; button: string };
};

const assetForKey = (key: string) => assets[key as keyof typeof assets];

const resolveEventPage = (page: EventPageContent) => ({
  ...page,
  heroImage: assetForKey(page.heroImageKey),
  detailImage: assetForKey(page.detailImageKey),
  atmosphereImage: assetForKey(page.atmosphereImageKey),
});

const events = eventsData as unknown as { private: EventPageContent; corporate: EventPageContent };

export const eventPages = {
  private: resolveEventPage(events.private),
  corporate: resolveEventPage(events.corporate),
};
