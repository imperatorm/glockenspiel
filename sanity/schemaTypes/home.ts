import { defineArrayMember, defineField, defineType } from "sanity";

const IMAGE_KEYS = ["hero", "interior", "bar", "event", "food", "terrace", "facade", "foodTwo", "drink"];

const imageKeyField = (name = "imageKey", title = "Bild") =>
  defineField({
    name,
    title,
    type: "string",
    options: { list: IMAGE_KEYS.map((k) => ({ title: k, value: k })) },
    description: "Verweist auf ein Bild aus Einstellungen → Bilder.",
  });

export const home = defineType({
  name: "home",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro",
      type: "object",
      fields: [
        { name: "text", title: "Text", type: "text", rows: 3 },
        { name: "button", title: "Button", type: "string" },
      ],
    }),
    defineField({
      name: "menu",
      title: "Drinks-Sektion",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Überschrift", type: "text", rows: 2 },
        { name: "body", title: "Text", type: "text", rows: 3 },
        { name: "button", title: "Button", type: "string" },
      ],
    }),
    defineField({
      name: "thumbs",
      title: "Drinks-Kacheln",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            imageKeyField(),
            { name: "icon", title: "Icon-Pfad", type: "string" },
          ],
          preview: { select: { title: "label" } },
        }),
      ],
    }),
    defineField({ name: "statement", title: "Statement", type: "text", rows: 2 }),
    defineField({
      name: "sets",
      title: "Nächte-Sektion",
      type: "object",
      fields: [
        { name: "heading", title: "Überschrift", type: "string" },
        { name: "body", title: "Text", type: "text", rows: 3 },
        { name: "followerLabel", title: "Hover-Label", type: "string" },
      ],
    }),
    defineField({
      name: "nights",
      title: "Nächte",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "date", title: "Datum", type: "string" },
            { name: "cta", title: "Button", type: "string" },
            {
              name: "link",
              title: "Link",
              type: "string",
              options: { list: [{ title: "Instagram", value: "instagram" }, { title: "E-Mail", value: "email" }] },
            },
            { name: "hot", title: "Hervorgehoben", type: "boolean" },
            imageKeyField(),
          ],
          preview: { select: { title: "name", subtitle: "date" } },
        }),
      ],
    }),
    defineField({
      name: "host",
      title: "Gastgeber",
      type: "object",
      fields: [
        { name: "caption", title: "Bildunterschrift", type: "text", rows: 2 },
        imageKeyField(),
      ],
    }),
    defineField({
      name: "instagram",
      title: "Instagram-Sektion",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Überschrift", type: "string" },
        { name: "button", title: "Button", type: "string" },
      ],
    }),
    defineField({
      name: "about",
      title: "Über uns",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        {
          name: "blocks",
          title: "Blöcke",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "heading", title: "Überschrift", type: "text", rows: 2 },
                { name: "body", title: "Absätze", type: "array", of: [{ type: "text", rows: 3 }] },
              ],
              preview: { select: { title: "heading" } },
            }),
          ],
        },
        {
          name: "cards",
          title: "Event-Karten",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "eyebrow", title: "Eyebrow", type: "string" },
                { name: "title", title: "Titel", type: "string" },
                { name: "text", title: "Text", type: "text", rows: 2 },
                { name: "href", title: "Link (Pfad)", type: "string" },
                imageKeyField(),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "invite",
      title: "Einladung",
      type: "object",
      fields: [{ name: "text", title: "Text", type: "text", rows: 2 }],
    }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});
