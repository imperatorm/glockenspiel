import type { Metadata } from "next";
import { V2EventPage } from "@/components/v2/V2EventPage";
import { eventPages, siteConfig } from "@/lib/site";

const page = eventPages.corporate;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: {
    canonical: `${siteConfig.siteUrl}/${page.slug}`,
  },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: `${siteConfig.siteUrl}/${page.slug}`,
    type: "website",
    images: [{ url: page.heroImage, alt: page.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.seoTitle,
    description: page.seoDescription,
    images: [page.heroImage],
  },
};

export default function CorporateEventsPage() {
  return <V2EventPage page={page} />;
}
