import type { Metadata } from "next";
import { V2LegalPage } from "@/components/v2/V2LegalPage";
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
  return <V2LegalPage page={cookiePolicy} />;
}
