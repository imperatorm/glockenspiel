import { defineField, defineType } from "sanity";

export const reservation = defineType({
  name: "reservation",
  title: "Reservierung (Modal)",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Überschrift", type: "string" }),
    defineField({
      name: "occasions",
      title: "Anlässe (Auswahl)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "fields",
      title: "Feld-Beschriftungen",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "contact", title: "Kontakt", type: "string" },
        { name: "date", title: "Datum", type: "string" },
        { name: "time", title: "Uhrzeit", type: "string" },
        { name: "guests", title: "Personen", type: "string" },
        { name: "occasion", title: "Anlass", type: "string" },
        { name: "message", title: "Nachricht", type: "string" },
      ],
    }),
    defineField({
      name: "placeholders",
      title: "Platzhalter",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "contact", title: "Kontakt", type: "string" },
        { name: "guests", title: "Personen", type: "string" },
        { name: "message", title: "Nachricht", type: "string" },
      ],
    }),
    defineField({ name: "submit", title: "Senden-Button", type: "string" }),
    defineField({ name: "sending", title: "Senden läuft…", type: "string" }),
    defineField({ name: "success", title: "Erfolgsmeldung", type: "text", rows: 2 }),
    defineField({ name: "successButton", title: "Erfolg-Button", type: "string" }),
    defineField({ name: "errorPrefix", title: "Fehler-Hinweis", type: "string" }),
    defineField({
      name: "meta",
      title: "Kontakt-Labels",
      type: "object",
      fields: [
        { name: "direct", title: "Direkt", type: "string" },
        { name: "address", title: "Adresse", type: "string" },
        { name: "hours", title: "Öffnungszeiten", type: "string" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Reservierung (Modal)" }) },
});
