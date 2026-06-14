import { defineArrayMember, defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtliche Seite",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug (URL-Pfad)", type: "string", readOnly: true }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({ name: "description", title: "Beschreibung", type: "text", rows: 2 }),
    defineField({ name: "updated", title: "Stand", type: "string" }),
    defineField({
      name: "sections",
      title: "Abschnitte",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "id", title: "Anker-ID", type: "string" },
            { name: "title", title: "Überschrift", type: "string" },
            { name: "body", title: "Absätze", type: "array", of: [{ type: "text", rows: 3 }] },
            {
              name: "items",
              title: "Liste (optional)",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
