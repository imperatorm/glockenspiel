import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/LegalPageTemplate";
import { privacyPolicy } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/${privacyPolicy.slug}`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyAliasPage() {
  return <LegalPageTemplate page={privacyPolicy} />;
}
