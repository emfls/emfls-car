export function onRequest() {
  return new Response('naver-site-verification: naver56ed36d6c8e45978cf59972d7e6300e6.html', {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      'x-content-type-options': 'nosniff',
    },
  });
}
