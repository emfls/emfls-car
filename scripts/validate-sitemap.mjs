import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';

const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
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

console.log(`sitemap validation passed: ${urls.length} URLs`);
