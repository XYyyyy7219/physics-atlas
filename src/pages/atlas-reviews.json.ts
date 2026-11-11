import type { APIRoute } from 'astro';
import { getNodeReviews } from '../lib/catalog';

export const GET: APIRoute = async () => new Response(JSON.stringify(await getNodeReviews()), {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
