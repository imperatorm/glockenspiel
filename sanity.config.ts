import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Sanity Studio config. Run locally with `npm run sanity` (sanity dev) and
// publish the hosted editor with `npm run sanity:deploy` (sanity deploy).
export default defineConfig({
  name: "glockenspiel",
  title: "Das Glockenspiel",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
