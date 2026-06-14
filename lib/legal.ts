import legalData from "../content/legal.json";

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

// CMS-editable via Sanity → baked to content/legal.json.
const legal = legalData as unknown as { privacy: LegalPageContent; cookie: LegalPageContent };

export const privacyPolicy = legal.privacy;
export const cookiePolicy = legal.cookie;
