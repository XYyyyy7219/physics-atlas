import type { NodeReview } from '../lib/catalog';
import { sitePath } from '../lib/paths';

const documents = new Map<string, Promise<Document>>();
let reviews: Promise<Record<string, NodeReview>> | undefined;

export async function readNodeReview(id: string) {
  reviews ??= fetch(sitePath('atlas-reviews.json')).then(async response => {
    if (!response.ok) throw new Error('无法读取知识点概要');
    return response.json() as Promise<Record<string, NodeReview>>;
  }).catch(error => {
    reviews = undefined;
    throw error;
  });
  const entries = await reviews;
  return Object.hasOwn(entries, id) ? entries[id] : undefined;
}

function readDocument(url: string) {
  let pending = documents.get(url);
  if (!pending) {
    pending = fetch(url).then(async response => {
      if (!response.ok) throw new Error('无法读取原讲义');
      return new DOMParser().parseFromString(await response.text(), 'text/html');
    }).catch(error => {
      documents.delete(url);
      throw error;
    });
    documents.set(url, pending);
  }
  return pending;
}

/** Extract just the selected knowledge point, without duplicating controls or page anchors. */
export async function readNodeContent(path: string) {
  const url = new URL(path, location.origin);
  if (url.origin !== location.origin) throw new Error('无法读取站外讲义');
  const id = decodeURIComponent(url.hash.slice(1));
  url.hash = '';
  const page = await readDocument(url.href);
  const article = id
    ? page.getElementById(id)?.closest('[data-knowledge-content]')
    : page.querySelector('.sl-markdown-content');
  if (!article) throw new Error('未找到知识点正文');
  const content = article.cloneNode(true) as HTMLElement;
  content.querySelectorAll('script, iframe, object, embed, form, button, [data-atlas-app], .node-reading-actions, .sl-anchor-link').forEach(el => el.remove());
  for (const element of content.querySelectorAll('*')) {
    element.removeAttribute('id');
    for (const attribute of Array.from(element.attributes)) {
      if (attribute.name.startsWith('on')) element.removeAttribute(attribute.name);
    }
  }
  for (const link of content.querySelectorAll('a[href], img[src]')) {
    const attr = link.tagName === 'A' ? 'href' : 'src';
    link.setAttribute(attr, new URL(link.getAttribute(attr)!, url).href);
  }
  return content.innerHTML;
}
