import { defineArrayMember, defineField, defineType } from "sanity";

const IMAGE_KEYS = ["hero", "interior", "bar", "event", "food", "terrace", "facade", "foodTwo", "drink"];

const imageKeyField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    options: { list: IMAGE_KEYS.map((k) => ({ title: k, value: k })) },
    description: "Verweist auf ein Bild aus Einstellungen → Bilder.",
  });

export const eventPage = defineType({
  name: "eventPage",
  title: "Event-Seite",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug (URL-Pfad)", type: "string", readOnly: true }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "navLabel", title: "Navi-Label", type: "string" }),
    defineField({ name: "title", title: "Titel", type: "text", rows: 2 }),
    defineField({ name: "kicker", title: "Kicker", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Intro-Absätze", type: "array", of: [{ type: "text", rows: 2 }] }),
    defineField({ name: "primaryCta", title: "Primärer Button", type: "string" }),
    defineField({ name: "secondaryCta", title: "Sekundärer Button", type: "string" }),
    imageKeyField("heroImageKey", "Hero-Bild"),
    imageKeyField("detailImageKey", "Detail-Bild"),
    imageKeyField("atmosphereImageKey", "Atmosphäre-Bild"),
    defineField({ name: "seoTitle", title: "SEO-Titel", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO-Beschreibung", type: "text", rows: 3 }),
    defineField({
      name: "facts",
      title: "Eckdaten",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Wert", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Abschnitte",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "eyebrow", title: "Eyebrow", type: "string" },
            { name: "title", title: "Überschrift", type: "text", rows: 2 },
            { name: "body", title: "Absätze (Text)", type: "array", of: [{ type: "text", rows: 2 }] },
            {
              name: "items",
              title: "Liste (Aufzählung)",
              type: "array",
              of: [{ type: "string" }],
              description: "Wenn ausgefüllt, wird statt der Absätze eine Liste angezeigt.",
            },
          ],
          preview: { select: { title: "title", subtitle: "eyebrow" } },
        }),
      ],
    }),
    defineField({
      name: "final",
      title: "Abschluss-CTA",
      type: "object",
      fields: [
        { name: "title", title: "Titel", type: "string" },
        { name: "body", title: "Text", type: "text", rows: 3 },
        { name: "button", title: "Button", type: "string" },
      ],
    }),
  ],
  preview: { select: { title: "navLabel" } },
});
