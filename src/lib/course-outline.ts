import { courses, type Course } from '../data/courses.ts';
import { chapters, type Chapter } from '../data/chapters.ts';

/** Fail builds on broken syllabus references rather than publishing dangling links. */
export function validateOutline(courseList: readonly Course[] = courses, chapterList: readonly Chapter[] = chapters) {
  const courseIds = new Set(courseList.map(course => course.id));
  const byId = new Map(chapterList.map(chapter => [chapter.id, chapter]));
  if (courseIds.size !== courseList.length || byId.size !== chapterList.length) throw new Error('课程或章节 ID 重复');
  const paths = new Set<string>();
  for (const chapter of chapterList) {
    if (!courseIds.has(chapter.courseId)) throw new Error(`章节所属课程不存在：${chapter.id}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(chapter.slug)) throw new Error(`章节 slug 无效：${chapter.id}`);
    const path = `${chapter.courseId}/${chapter.slug}`;
    if (paths.has(path)) throw new Error(`章节路径重复：${path}`);
    paths.add(path);
  }
  const visiting = new Set<string>(), done = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) throw new Error('章节前置关系形成循环');
    if (done.has(id)) return;
    const chapter = byId.get(id);
    if (!chapter) throw new Error(`前置章节不存在：${id}`);
    visiting.add(id);
    chapter.requires.forEach(visit);
    visiting.delete(id); done.add(id);
  };
  chapterList.forEach(chapter => visit(chapter.id));
}

export function validateChapterAssignment(domain: string, chapterId?: string) {
  if (!chapterId) return;
  const chapter = chapters.find(chapter => chapter.id === chapterId);
  if (!chapter || chapter.courseId !== domain) throw new Error(`知识点的章节与课程不匹配：${domain} / ${chapterId}`);
}

validateOutline();
