import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { privacyPolicy } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/${privacyPolicy.slug}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DatenschutzPage() {
  return <LegalPageTemplate page={privacyPolicy} />;
}
