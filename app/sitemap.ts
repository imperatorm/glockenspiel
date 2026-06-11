import type { MetadataRoute } from "next";
import { cookiePolicy, privacyPolicy } from "@/lib/legal";
import { eventPages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/${eventPages.private.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteConfig.siteUrl}/${eventPages.corporate.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${siteConfig.siteUrl}/${privacyPolicy.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${siteConfig.siteUrl}/${cookiePolicy.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.35,
    },
  ];
}
