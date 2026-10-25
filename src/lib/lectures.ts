import { getCollection } from 'astro:content';
import { getChapter } from '../data/chapters';

export async function getLectures(chapterId: string) {
  const entries = (await getCollection('docs')).filter(entry => entry.data.lecture?.chapter === chapterId).sort((a,b) => a.data.lecture!.order - b.data.lecture!.order);
  const orders = entries.map(entry => entry.data.lecture!.order);
  const chapter = getChapter(chapterId);
  if (new Set(orders).size !== orders.length || orders.some(order => chapter?.totalSections && order > chapter.totalSections)) throw new Error(`节次重复或超出课程目录：${chapterId}`);
  return entries;
}
