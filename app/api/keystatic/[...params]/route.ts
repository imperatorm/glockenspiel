import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Local-only: the handler writes content files via fs, which the production
// Workers runtime doesn't support. Return 404 outside local dev.
const notFound = () => new Response(null, { status: 404 });

const handlers =
  process.env.NODE_ENV === "development"
    ? makeRouteHandler({ config })
    : { GET: notFound, POST: notFound };

export const GET = handlers.GET;
export const POST = handlers.POST;
