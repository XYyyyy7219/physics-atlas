import { getCollection } from 'astro:content';
import { getChapter, getChapters } from '../data/chapters';
import { orderedCourses } from '../data/courses';

export async function getLectures(chapterId: string) {
  const entries = (await getCollection('docs')).filter(entry => entry.data.lecture?.chapter === chapterId).sort((a,b) => a.data.lecture!.order - b.data.lecture!.order);
  const orders = entries.map(entry => entry.data.lecture!.order);
  const chapter = getChapter(chapterId);
  if (new Set(orders).size !== orders.length || orders.some(order => chapter?.totalSections && order > chapter.totalSections)) throw new Error(`节次重复或超出课程目录：${chapterId}`);
  return entries;
}

export async function getLectureBook(courseId: string) {
  const chapters = getChapters(courseId).filter(chapter => !chapter.example && chapter.page);
  const book = await Promise.all(chapters.map(async chapter => ({ chapter, sections: await getLectures(chapter.id) })));
  return book.filter(({ sections }) => sections.length > 0);
}

export async function getPublishedLectureBooks() {
  const books = await Promise.all(orderedCourses.map(async course => ({
    course,
    chapters: await getLectureBook(course.id),
  })));
  return books.filter(({ chapters }) => chapters.length > 0);
}
