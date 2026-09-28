import type { APIRoute } from 'astro';
import { publishedGuides } from '@/data/content';

const productionOrigin = 'https://car.emfls.com';

const publicPaths = [
  '/',
  '/guides/',
  ...publishedGuides.map((guide) => `/guides/${guide.slug}/`),
  '/tools/',
  '/tools/fuel-economy/',
  '/tools/maintenance-planner/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/editorial-policy/',
];

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ?? character);

export const GET: APIRoute = () => {
  const urls = [...new Set(publicPaths)].map((path) => `  <url><loc>${escapeXml(new URL(path, productionOrigin).toString())}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
