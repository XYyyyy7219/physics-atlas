export interface Chapter {
  id: string;
  courseId: string;
  slug: string;
  order: number;
  title: string;
  summary: string;
  focus: string;
  requires: string[];
  example: boolean;
  page?: string;
  totalSections?: number;
}

// Layout examples only. Replace or extend after the course syllabus is supplied.
// Keep IDs stable when adjusting titles; knowledge entries reference these IDs.
export const chapters: readonly Chapter[] = [
  { id: 'atomic-ch01', courseId: 'atomic-physics', slug: 'chapter-01', order: 1, title: '原子的位形：卢瑟福模型', summary: '从原子尺度和电子的实验证据出发，经由核式模型，建立卢瑟福散射的定量描述。', focus: '实验证据 → 原子结构模型 → 散射关系 → 实验检验', requires: [], example: false, page: 'atomic-physics/chapter-01/', totalSections: 5 },
  { id: 'mechanics-motion', courseId: 'mechanics', slug: 'motion', order: 1, title: '运动的描述', summary: '从位置随时间的变化出发，建立描述运动的语言。', focus: '现象与问题 → 参考系与运动模型 → 位置、速度与加速度', requires: [], example: true },
  { id: 'mechanics-dynamics', courseId: 'mechanics', slug: 'dynamics', order: 2, title: '相互作用与运动变化', summary: '从物体间的相互作用出发，连接受力分析与运动规律。', focus: '相互作用 → 研究对象与受力模型 → 运动规律及适用条件', requires: ['mechanics-motion'], example: true },
  { id: 'mechanics-conservation', courseId: 'mechanics', slug: 'conservation', order: 3, title: '守恒观点', summary: '以系统为研究对象，认识能量与动量提供的整体视角。', focus: '系统与边界 → 能量和动量的变化 → 守恒条件与问题检验', requires: ['mechanics-dynamics'], example: true },
];

export const getChapters = (courseId: string) => chapters.filter(chapter => chapter.courseId === courseId).sort((a, b) => a.order - b.order);
export const chapterAnchor = (chapter: Pick<Chapter, 'slug'>) => `chapter-${chapter.slug}`;
export const getChapter = (id?: string) => chapters.find(chapter => chapter.id === id);
export const sectionLabel = (order: number) => chapterLabel(order).replace(/章$/, '节');

/** Display numbering is independent of stable chapter IDs and URL anchors. */
export function chapterLabel(order: number) {
  if (!Number.isInteger(order) || order < 1 || order > 9999) return `第${order}章`;
  const digits = '零一二三四五六七八九';
  const units = ['', '十', '百', '千'];
  const number = String(order).split('').map((digit, index, values) => digit === '0' ? '零' : digits[Number(digit)] + units[values.length - index - 1]).join('').replace(/零+/g, '零').replace(/零$/, '').replace(/^一十/, '十');
  return `第${number}章`;
}
