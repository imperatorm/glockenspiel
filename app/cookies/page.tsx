import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { cookiePolicy } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/${cookiePolicy.slug}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return <LegalPageTemplate page={cookiePolicy} />;
}
