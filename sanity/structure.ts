import type { StructureResolver } from "sanity/structure";

// Both content types are single documents (singletons) with fixed ids.
const SINGLETONS = [
  { id: "siteSettings", title: "Einstellungen", schemaType: "siteSettings" },
  { id: "home", title: "Startseite", schemaType: "home" },
  { id: "privateEvents", title: "Private Events", schemaType: "eventPage" },
  { id: "corporateEvents", title: "Corporate Events", schemaType: "eventPage" },
  { id: "privacyPolicy", title: "Datenschutz", schemaType: "legalPage" },
  { id: "cookiePolicy", title: "Cookie-Richtlinie", schemaType: "legalPage" },
  { id: "reservation", title: "Reservierung (Modal)", schemaType: "reservation" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalt")
    .items(
      SINGLETONS.map((s) =>
        S.listItem()
          .id(s.id)
          .title(s.title)
          .child(S.document().schemaType(s.schemaType).documentId(s.id)),
      ),
    );
