import { getCollection } from 'astro:content';
import { chapters } from '../data/chapters';
import { getCourse } from '../data/courses';
import { sitePath } from './paths';

export async function getPracticeBooks() {
  const entries = await getCollection('docs');
  return chapters.flatMap(chapter => {
    const entry = entries.find(doc => doc.id + '/' === chapter.practicePage);
    if (!entry || !chapter.practicePage) return [];
    const headings = (entry.body ?? '').split(/^##\s+/m).slice(1);
    const questions = headings.map(block => {
      const lines = block.split(/\r?\n/);
      const title = lines.shift()!.trim();
      const prompt = lines.join('\n').split('<details')[0].trim();
      return { title, prompt, url: sitePath(chapter.practicePage!) + '#' + title };
    });
    return [{ id: chapter.id, title: entry.data.title, url: sitePath(chapter.practicePage), course: getCourse(chapter.courseId)!.title, questions }];
  });
}
