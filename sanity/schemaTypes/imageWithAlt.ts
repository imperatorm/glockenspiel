import { defineField, defineType } from "sanity";

// Reusable image + alt-text object used across the content model.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Bild",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Alt-Text",
      type: "string",
      description: "Beschreibung für Screenreader und SEO.",
    }),
  ],
});
