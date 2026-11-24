import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { navItems, secondaryNavItems, site as siteData } from "../data/site";
import { absoluteUrl } from "../utils/paths";

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection("news")).filter(post => !post.data.draft);
  const paths = new Set([
    "/", "/volunteer/",
    ...navItems.map(item => item.href),
    ...secondaryNavItems.map(item => item.href),
    ...posts.map(post => `/news/${post.id}/`)
  ]);
  const urls = [...paths].map(path => `<url><loc>${absoluteUrl(path, site ?? siteData.url)}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
