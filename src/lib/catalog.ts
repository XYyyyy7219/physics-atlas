import { getCollection } from 'astro:content';
import { validateGraph, type KnowledgeNode } from './atlas-model';
import { sitePath } from './paths';
import { validateChapterAssignment } from './course-outline';

export async function getCatalog(): Promise<KnowledgeNode[]> {
  const entries = await getCollection('docs');
  const nodes = entries.filter(e => e.data.atlas).map(e => {
    const meta = e.data.atlas!;
    validateChapterAssignment(meta.domain, meta.chapter);
    return { id: meta.id, title: e.data.title, domain: meta.domain, kind: meta.kind,
      summary: e.data.description || '', requires: meta.requires, variants: meta.variants,
      url: sitePath(e.id.replace(/\/index$/, '') + '/'), local: false, chapterId: meta.chapter,
    } satisfies KnowledgeNode;
  });
  validateGraph(nodes);
  return nodes;
}
