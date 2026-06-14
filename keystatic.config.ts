import { config, fields, singleton } from "@keystatic/core";

// Local-mode, git-based CMS. Content lives in /content as files committed to the
// repo. The admin UI (/keystatic) runs only during `next dev` (Webflow Cloud's
// Cloudflare Workers runtime has no fs). A build-time sync step turns this content
// into lib/cms-content.json, which the app imports — see scripts/sync-content.mjs.

const imageWithAlt = (label: string, key: string) =>
  fields.object(
    {
      image: fields.image({
        label: `${label} — Bild`,
        directory: "public/images",
        publicPath: "/images/",
      }),
      alt: fields.text({ label: `${label} — Alt-Text`, multiline: true }),
    },
    { label },
  );

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Das Glockenspiel" },
  },
  singletons: {
    settings: singleton({
      label: "Einstellungen & Inhalte",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        // ── Business / contact ──
        siteName: fields.text({ label: "Name", validation: { isRequired: true } }),
        shortName: fields.text({ label: "Kurzname" }),
        title: fields.text({ label: "SEO-Titel", validation: { isRequired: true } }),
        description: fields.text({ label: "SEO-Beschreibung", multiline: true }),
        phone: fields.text({ label: "Telefon" }),
        email: fields.text({ label: "E-Mail" }),
        instagram: fields.url({ label: "Instagram-URL" }),
        address: fields.object(
          {
            street: fields.text({ label: "Straße" }),
            postalCode: fields.text({ label: "PLZ" }),
            city: fields.text({ label: "Stadt" }),
            country: fields.text({ label: "Land (Code)" }),
          },
          { label: "Adresse" },
        ),

        // ── Opening hours ──
        hours: fields.array(
          fields.object({
            day: fields.text({ label: "Tag" }),
            hours: fields.text({ label: "Zeiten" }),
          }),
          { label: "Öffnungszeiten", itemLabel: (props) => `${props.fields.day.value} · ${props.fields.hours.value}` },
        ),

        // ── Menu PDF (Getränkekarte) ──
        menu: fields.object(
          {
            pdf: fields.file({
              label: "Getränkekarte (PDF)",
              directory: "public/menu",
              publicPath: "/menu/",
            }),
            pageCount: fields.integer({ label: "Seitenanzahl", validation: { min: 1 } }),
          },
          { label: "Getränkekarte" },
        ),

        // ── Brand images (with alt text) used across the site ──
        images: fields.object(
          {
            hero: imageWithAlt("Hero", "hero"),
            interior: imageWithAlt("Interior", "interior"),
            bar: imageWithAlt("Bar", "bar"),
            event: imageWithAlt("Event", "event"),
            food: imageWithAlt("Food", "food"),
            terrace: imageWithAlt("Terrasse", "terrace"),
            facade: imageWithAlt("Fassade", "facade"),
            foodTwo: imageWithAlt("Food 2", "foodTwo"),
            drink: imageWithAlt("Drink", "drink"),
          },
          { label: "Bilder" },
        ),
      },
    }),
  },
});
