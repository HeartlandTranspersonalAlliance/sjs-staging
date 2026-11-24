import type { APIRoute } from "astro";
import { site as siteData } from "../data/site";
import { absoluteUrl } from "../utils/paths";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteData.url);
  // Allow crawlers to read staging's page-level noindex directives.
  const sitemap = origin.hostname === "heartlandtranspersonalalliance.github.io"
    ? "" : `Sitemap: ${absoluteUrl("/sitemap.xml", origin)}\n`;
  return new Response(`User-agent: *\nAllow: /\n${sitemap}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
