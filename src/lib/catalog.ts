import { getCollection } from 'astro:content';
import { validateGraph, type KnowledgeNode } from './atlas-model';
import { sitePath } from './paths';
import { validateChapterAssignment } from './course-outline';
import { getChapter } from '../data/chapters';

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
  const lectureNodes = entries.filter(entry => entry.data.lecture).flatMap(entry => {
    const lecture = entry.data.lecture!;
    const chapter = getChapter(lecture.chapter)!;
    return lecture.nodes.map(node => ({ id: node.id, title: node.title, domain: chapter.courseId, chapterId: chapter.id, kind: node.kind, summary: node.summary, requires: node.requires, variants: [], url: sitePath(entry.id + '/') + '#' + node.id, local: false } satisfies KnowledgeNode));
  });
  const all = [...nodes, ...lectureNodes];
  validateGraph(all);
  return all;
}
