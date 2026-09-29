import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { strict as assert } from 'node:assert';

const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const publicFiles = await readdir(new URL('../dist/', import.meta.url));
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

assert.equal((xml.match(/<urlset\b/g) ?? []).length, 1);
assert.equal(xml.includes('sitemap-index'), false);
assert.equal(xml.includes('sitemap-0.xml'), false);
assert.equal(urls.length, new Set(urls).size);
assert(urls.length > 0);
assert(urls.every((url) => url.startsWith('https://car.emfls.com/')));
assert(urls.every((url) => url.endsWith('/')));
assert(urls.includes('https://car.emfls.com/editorial-policy/'));
assert(urls.includes('https://car.emfls.com/tools/fuel-economy/'));
assert(urls.includes('https://car.emfls.com/tools/maintenance-planner/'));
assert(!urls.some((url) => url.includes('/404')));
assert(!urls.some((url) => url.includes('/category/ev/')));
assert(!urls.some((url) => url.includes('/wipers/')));
assert(!urls.some((url) => url.includes('/guides/coolant/')));

const indexNowKeys = publicFiles.filter((file) => /^[a-f0-9]{64}\.txt$/.test(file));
assert.equal(indexNowKeys.length, 1, 'Production output must contain one site-specific IndexNow key file');
const indexNowKey = indexNowKeys[0].slice(0, -4);
assert.equal((await readFile(new URL(`../dist/${indexNowKeys[0]}`, import.meta.url), 'utf8')).trim(), indexNowKey);

const functionRoutesOutput = await readFile(new URL('../dist/_routes.json', import.meta.url), 'utf8').catch(() => null);
assert.ok(functionRoutesOutput, 'Cloudflare Pages must invoke the verification handler on the exact Naver route');
const functionRoutes = JSON.parse(functionRoutesOutput);
assert.deepEqual(functionRoutes, {
  version: 1,
  include: ['/naver56ed36d6c8e45978cf59972d7e6300e6.html'],
  exclude: [],
});

const publishedGuideSlugs = [
  'engine-oil-change-interval',
  'brake-pad-replacement',
  'tire-pressure',
  'car-battery-replacement',
  'dashboard-warning-lights',
  'wiper-replacement',
  'coolant-check',
  'long-distance-driving-checklist',
  'tire-replacement',
  'fuel-economy-drop',
];
const thinGuideSlugs = ['wipers', 'coolant', 'fuel-economy', 'long-distance-driving', 'used-car-inspection'];
const redirects = await readFile(new URL('../dist/_redirects', import.meta.url), 'utf8');
assert.deepEqual(
  redirects.trim().split('\n'),
  [
    '/guides/wipers/ /guides/wiper-replacement/ 301',
    '/guides/coolant/ /guides/coolant-check/ 301',
    '/guides/long-distance-driving/ /guides/long-distance-driving-checklist/ 301',
  ],
);
const guideUrls = urls.filter((url) => /^https:\/\/car\.emfls\.com\/guides\/[^/]+\/$/.test(url));
assert.deepEqual(guideUrls, publishedGuideSlugs.map((slug) => `https://car.emfls.com/guides/${slug}/`));

for (const slug of publishedGuideSlugs) {
  await access(new URL(`../dist/guides/${slug}/index.html`, import.meta.url), constants.F_OK);
}
for (const slug of thinGuideSlugs) {
  await assert.rejects(access(new URL(`../dist/guides/${slug}/index.html`, import.meta.url), constants.F_OK));
}

const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const guidesIndex = await readFile(new URL('../dist/guides/index.html', import.meta.url), 'utf8');
for (const slug of thinGuideSlugs) {
  assert(!home.includes(`/guides/${slug}/`), `Home must not link to unpublished guide ${slug}`);
  assert(!guidesIndex.includes(`/guides/${slug}/`), `Guide index must not link to unpublished guide ${slug}`);
}

console.log(`guide publication and sitemap validation passed: ${publishedGuideSlugs.length} detailed guides, ${thinGuideSlugs.length} unpublished fallbacks, ${urls.length} sitemap URLs, IndexNow key output valid`);
