// Webflow Cloud mounts the app at a path ("/app"). Static files and routes are
// served under that prefix, so every hand-authored absolute URL (img src, CSS
// url(), internal <a href>, client fetch) must include it. Next only auto-prefixes
// next/link|image|script.
//
// An explicit non-empty NEXT_PUBLIC_BASE_PATH always wins. Otherwise (unset OR an
// empty string — e.g. a leaked empty value in a production build) fall back by
// environment: "/app" in production, "" for local dev. Keying off NODE_ENV instead
// of an empty string makes this robust against build envs that inject "".
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
export const BASE_PATH =
  envBasePath !== undefined && envBasePath !== ""
    ? envBasePath
    : process.env.NODE_ENV === "production"
      ? "/app"
      : "";

export const withBase = (path: string): string => {
  if (!path.startsWith("/")) return path;
  // Idempotent: a value that already carries the prefix (e.g. a CMS-entered
  // "/app/corporate-events") must not get prefixed again into "/app/app/…".
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return `${BASE_PATH}${path}`;
};

// Content edited via Keystatic (/keystatic in `npm run dev`) lives in
// content/settings/index.json and is imported here so the existing export
// shapes stay identical for every consumer (client, server, metadata, SSG).
import eventsData from "../content/events.json";
import homeData from "../content/home.json";
import reservationData from "../content/reservation.json";
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
  // Per-position feature slots (home page).
  heroStripLeft: withBase(cmsImages.heroStripLeft.image),
  heroStripRight: withBase(cmsImages.heroStripRight.image),
  introOne: withBase(cmsImages.introOne.image),
  introTwo: withBase(cmsImages.introTwo.image),
  introThree: withBase(cmsImages.introThree.image),
  menuMedia: withBase(cmsImages.menuMedia.image),
  stripOne: withBase(cmsImages.stripOne.image),
  stripTwo: withBase(cmsImages.stripTwo.image),
  stripThree: withBase(cmsImages.stripThree.image),
  stripFour: withBase(cmsImages.stripFour.image),
  stripFive: withBase(cmsImages.stripFive.image),
  setsImage: withBase(cmsImages.setsImage.image),
  host: withBase(cmsImages.host.image),
  // Event cards (home) + event subpage images.
  cardPrivate: withBase(cmsImages.cardPrivate.image),
  cardCorporate: withBase(cmsImages.cardCorporate.image),
  privateHero: withBase(cmsImages.privateHero.image),
  privateDetail: withBase(cmsImages.privateDetail.image),
  privateAtmosphere: withBase(cmsImages.privateAtmosphere.image),
  corporateHero: withBase(cmsImages.corporateHero.image),
  corporateDetail: withBase(cmsImages.corporateDetail.image),
  corporateAtmosphere: withBase(cmsImages.corporateAtmosphere.image),
  thumbSignature: withBase(cmsImages.thumbSignature.image),
  thumbKlassiker: withBase(cmsImages.thumbKlassiker.image),
  thumbChampagner: withBase(cmsImages.thumbChampagner.image),
};

export const menuFlipbook = {
  pdfUrl: withBase(settings.menu.pdf),
  pageCount: settings.menu.pageCount,
};

// Menu/dark-section video (CMS-editable → Sanity CDN url after bake, local path
// in the committed fallback). Absolute CDN urls are used as-is; local paths get
// the mount-path prefix. Empty when unset, so the section falls back to the image.
const rawMenuVideo = (settings as { menuVideo?: string }).menuVideo || "";
export const menuVideo = rawMenuVideo
  ? rawMenuVideo.startsWith("http")
    ? rawMenuVideo
    : withBase(rawMenuVideo)
  : "";

const rawSetsVideo = (settings as { setsVideo?: string }).setsVideo || "";
export const setsVideo = rawSetsVideo
  ? rawSetsVideo.startsWith("http")
    ? rawSetsVideo
    : withBase(rawSetsVideo)
  : "";

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
  heroStripLeft: cmsImages.heroStripLeft.alt,
  heroStripRight: cmsImages.heroStripRight.alt,
  introOne: cmsImages.introOne.alt,
  introTwo: cmsImages.introTwo.alt,
  introThree: cmsImages.introThree.alt,
  menuMedia: cmsImages.menuMedia.alt,
  stripOne: cmsImages.stripOne.alt,
  stripTwo: cmsImages.stripTwo.alt,
  stripThree: cmsImages.stripThree.alt,
  stripFour: cmsImages.stripFour.alt,
  stripFive: cmsImages.stripFive.alt,
  setsImage: cmsImages.setsImage.alt,
  host: cmsImages.host.alt,
  cardPrivate: cmsImages.cardPrivate.alt,
  cardCorporate: cmsImages.cardCorporate.alt,
  privateHero: cmsImages.privateHero.alt,
  privateDetail: cmsImages.privateDetail.alt,
  privateAtmosphere: cmsImages.privateAtmosphere.alt,
  corporateHero: cmsImages.corporateHero.alt,
  corporateDetail: cmsImages.corporateDetail.alt,
  corporateAtmosphere: cmsImages.corporateAtmosphere.alt,
  thumbSignature: cmsImages.thumbSignature.alt,
  thumbKlassiker: cmsImages.thumbKlassiker.alt,
  thumbChampagner: cmsImages.thumbChampagner.alt,
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

export const nav = ["Home", "Essen und Trinken", "Events", "Musik", "Kontakt"];

export const marqueeItems = ["Drinks", "Bites", "Beats", "Kitzbühel", "Aperitivo", "Late Night"];

// Structural chrome labels (topbar tagline, hero strip, meta row).
// Defensive defaults so a Sanity doc baked before this field existed can't break the build.
const rawLabels = settings.labels as
  | { tagline?: string; heroStrip?: string[]; metaRow?: string[] }
  | null
  | undefined;
export const labels = {
  tagline: rawLabels?.tagline ?? "Drinks · Bites · Beats — Kitzbühel",
  heroStrip: rawLabels?.heroStrip ?? ["Drinks", "Bites", "Beats"],
  metaRow: rawLabels?.metaRow ?? ["Drinks", "Bites", "Late Night"],
};

// Home page content (CMS-editable via Sanity → baked to content/home.json).
export const home = homeData;

// Reservation modal copy (CMS-editable via Sanity → baked to content/reservation.json).
export const reservation = reservationData;

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
