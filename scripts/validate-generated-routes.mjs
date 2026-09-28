import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { extname, join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const toFileUrl = (path) => new URL(path.replace(/^\//, ''), dist);

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectHtml(path) : entry.name.endsWith('.html') ? [path] : [];
  }));
  return nested.flat();
}

const files = await collectHtml(dist.pathname);
let checked = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const references = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const reference of references) {
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    const pathname = decodeURIComponent(new URL(reference, 'https://car.emfls.com').pathname);
    const target = pathname.endsWith('/')
      ? `${pathname}index.html`
      : extname(pathname)
        ? pathname
        : `${pathname}/index.html`;
    try {
      await access(toFileUrl(target), constants.F_OK);
    } catch {
      assert.fail(`${file} references missing ${reference}`);
    }
    checked += 1;
  }
}

console.log(`generated route/link validation passed: ${files.length} HTML files, ${checked} local href/src references`);
