import { defineField, defineType } from "sanity";

const imageKeys: { name: string; title: string }[] = [
  { name: "hero", title: "Hero" },
  { name: "interior", title: "Interior" },
  { name: "bar", title: "Bar" },
  { name: "event", title: "Event" },
  { name: "food", title: "Food" },
  { name: "terrace", title: "Terrasse" },
  { name: "facade", title: "Fassade" },
  { name: "foodTwo", title: "Food 2" },
  { name: "drink", title: "Drink" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Einstellungen",
  type: "document",
  groups: [
    { name: "business", title: "Betrieb", default: true },
    { name: "media", title: "Medien" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "shortName", title: "Kurzname", type: "string", group: "business" }),
    defineField({ name: "title", title: "SEO-Titel", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({ name: "description", title: "SEO-Beschreibung", type: "text", rows: 3, group: "business" }),
    defineField({ name: "phone", title: "Telefon", type: "string", group: "business" }),
    defineField({ name: "email", title: "E-Mail", type: "string", group: "business" }),
    defineField({ name: "instagram", title: "Instagram-URL", type: "url", group: "business" }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      group: "business",
      fields: [
        defineField({ name: "street", title: "Straße", type: "string" }),
        defineField({ name: "postalCode", title: "PLZ", type: "string" }),
        defineField({ name: "city", title: "Stadt", type: "string" }),
        defineField({ name: "country", title: "Land (Code)", type: "string" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Öffnungszeiten",
      type: "array",
      group: "business",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Tag", type: "string" },
            { name: "hours", title: "Zeiten", type: "string" },
          ],
          preview: { select: { title: "day", subtitle: "hours" } },
        },
      ],
    }),
    defineField({ name: "menuPdf", title: "Getränkekarte (PDF)", type: "file", group: "media" }),
    defineField({ name: "menuPageCount", title: "Seitenanzahl", type: "number", group: "media" }),
    defineField({
      name: "images",
      title: "Bilder",
      type: "object",
      group: "media",
      fields: imageKeys.map((k) => defineField({ name: k.name, title: k.title, type: "imageWithAlt" })),
    }),
  ],
  preview: { prepare: () => ({ title: "Einstellungen" }) },
});
