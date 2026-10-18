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
}

// Layout examples only. Replace or extend after the course syllabus is supplied.
// Keep IDs stable when adjusting titles; knowledge entries reference these IDs.
export const chapters: readonly Chapter[] = [
  { id: 'mechanics-motion', courseId: 'mechanics', slug: 'motion', order: 1, title: '运动的描述', summary: '从位置随时间的变化出发，建立描述运动的语言。', focus: '现象与问题 → 参考系与运动模型 → 位置、速度与加速度', requires: [], example: true },
  { id: 'mechanics-dynamics', courseId: 'mechanics', slug: 'dynamics', order: 2, title: '相互作用与运动变化', summary: '从物体间的相互作用出发，连接受力分析与运动规律。', focus: '相互作用 → 研究对象与受力模型 → 运动规律及适用条件', requires: ['mechanics-motion'], example: true },
  { id: 'mechanics-conservation', courseId: 'mechanics', slug: 'conservation', order: 3, title: '守恒观点', summary: '以系统为研究对象，认识能量与动量提供的整体视角。', focus: '系统与边界 → 能量和动量的变化 → 守恒条件与问题检验', requires: ['mechanics-dynamics'], example: true },
];

export const getChapters = (courseId: string) => chapters.filter(chapter => chapter.courseId === courseId).sort((a, b) => a.order - b.order);
export const chapterAnchor = (chapter: Pick<Chapter, 'slug'>) => `chapter-${chapter.slug}`;
