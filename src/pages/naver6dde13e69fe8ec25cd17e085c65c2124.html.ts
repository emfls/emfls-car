import type { APIRoute } from 'astro';

const verificationContent = 'naver-site-verification: naver6dde13e69fe8ec25cd17e085c65c2124.html';

export const GET: APIRoute = () => new Response(verificationContent, {
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
});
