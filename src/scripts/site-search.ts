import type { KnowledgeNode } from '../lib/atlas-model';
import { sitePath } from '../lib/paths';

const normalize = (value: string) => value.normalize('NFKC').trim().toLowerCase();

export function matchingNodes(nodes: KnowledgeNode[], query: string) {
  const term = normalize(query);
  if (!term) return nodes;
  const words = term.split(/\s+/);
  return nodes.flatMap(node => {
    const title = normalize(node.title);
    const text = title + ' ' + normalize(node.summary);
    if (!words.every(word => text.includes(word))) return [];
    const rank = title === term ? 0 : title.startsWith(term) ? 1 : title.includes(term) ? 2 : 3;
    return [{ node, rank }];
  }).sort((a, b) => a.rank - b.rank).map(match => match.node);
}

interface PageResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
  sub_results?: { url: string; excerpt: string }[];
}
type Pagefind = { search(query: string): Promise<{ results: { data(): Promise<PageResult> }[] }> };
let pagefind: Promise<Pagefind> | undefined;

export async function matchingPages(query: string) {
  const indexUrl = sitePath('pagefind/pagefind.js');
  pagefind ??= import(/* @vite-ignore */ indexUrl).catch(error => {
    pagefind = undefined;
    throw error;
  });
  const { results } = await (await pagefind!).search(query);
  const pages = await Promise.all(results.slice(0, 12).map(result => result.data()));
  const byPath = new Map<string, { url: string; title: string; excerpt: string }>();
  for (const page of pages) {
    const url = new URL(page.url, location.origin);
    if (url.origin !== location.origin || byPath.has(url.pathname)) continue;
    const best = page.sub_results?.[0];
    const excerpt = new DOMParser().parseFromString(best?.excerpt ?? page.excerpt, 'text/html').body.textContent ?? '';
    byPath.set(url.pathname, { url: best?.url || page.url, title: page.meta.title || page.url, excerpt });
  }
  return [...byPath.values()];
}
