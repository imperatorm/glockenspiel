import type { Metadata } from "next";
import type { Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Cursor } from "@/components/Cursor";
import { Veil } from "@/components/Veil";
import { ReservationModal } from "@/components/v2/ReservationModal";
import { assets, BASE_PATH, siteConfig, withBase } from "@/lib/site";
import "locomotive-scroll/locomotive-scroll.css";
import "./globals.css";

// Self-hosted at build time (no runtime request to Google → GDPR-friendly).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Glockenspiel Kitzbühel",
    "Bar Kitzbühel",
    "Tapas Kitzbühel",
    "Drinks Kitzbühel",
    "Live Musik Kitzbühel",
    "Events Kitzbühel",
    "Cocktailbar Kitzbühel",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  // Referenced through withBase so it resolves under the Webflow Cloud mount path.
  icons: {
    icon: [{ url: withBase("/icon.svg"), type: "image/svg+xml" }],
    shortcut: withBase("/icon.svg"),
    apple: withBase("/icon.svg"),
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: assets.hero,
        width: 1200,
        height: 630,
        alt: "Terrasse und Eingang vom Das Glockenspiel in Kitzbühel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [assets.hero],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#151216",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("glocken-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        {/* Logo backgrounds reference /public via the mount-path prefix (CSS url() can't read env). */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              `:root{--v2-glocke:url("${BASE_PATH}/logo/glocke_b.svg");--v2-logo:url("${BASE_PATH}/logo/glockenspiel_b.svg")}` +
              `[data-theme="dark"]{--v2-glocke:url("${BASE_PATH}/logo/glocke_w.svg");--v2-logo:url("${BASE_PATH}/logo/glockenspiel_w.svg")}`,
          }}
        />
      </head>
      <body>
        <a href="#top" className="skip-link">
          Zum Inhalt springen
        </a>
        <Veil />
        {children}
        <ReservationModal />
        <Cursor />
        <CookieConsent />
      </body>
    </html>
  );
}
