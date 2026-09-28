import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const contentSource = await readFile(new URL('../src/data/content.ts', import.meta.url), 'utf8');
const contentJavaScript = ts.transpile(contentSource, { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 });
const contentUrl = `data:text/javascript;base64,${Buffer.from(contentJavaScript).toString('base64')}`;
const { categories, guides, guideDetails, publishedCategories, publishedGuides } = await import(contentUrl);

test('only guides with complete detail content are publishable', () => {
  const detailSlugs = guideDetails.map(({ slug }) => slug);
  assert.deepEqual(publishedGuides.map(({ slug }) => slug).sort(), [...detailSlugs].sort());
  assert(detailSlugs.every((slug) => guides.some((guide) => guide.slug === slug)));
});

test('thin guide summaries do not become public routes', () => {
  const thinSlugs = ['wipers', 'coolant', 'fuel-economy', 'long-distance-driving', 'used-car-inspection'];
  const publishableSlugs = new Set(publishedGuides.map(({ slug }) => slug));
  assert.equal(guides.length, 15);
  for (const slug of thinSlugs) assert.equal(publishableSlugs.has(slug), false, `${slug} must remain unpublished until it has full guide content`);
  assert.deepEqual(publishedCategories.map(({ slug }) => slug), ['maintenance', 'consumables', 'tires', 'driving', 'warning-lights']);
  assert(publishedCategories.every((category) => categories.some(({ slug }) => slug === category.slug)));
});
