import test from 'node:test';
import { strict as assert } from 'node:assert';

const verifier = await import('../functions/naver56ed36d6c8e45978cf59972d7e6300e6.html.js').catch(() => null);

test('serves the exact Naver verification body on the verification route', async () => {
  assert.ok(verifier?.onRequest, 'The exact Naver verification route must have a Pages Function handler');

  const response = verifier.onRequest({
    request: new Request('https://car.emfls.com/naver56ed36d6c8e45978cf59972d7e6300e6.html'),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8');
  assert.equal(await response.text(), 'naver-site-verification: naver56ed36d6c8e45978cf59972d7e6300e6.html');
});
