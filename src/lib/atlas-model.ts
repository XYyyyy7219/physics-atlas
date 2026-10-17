export const domains = [
  { id: 'mechanics', title: '力学' }, { id: 'electromagnetism', title: '电磁学' },
  { id: 'thermodynamics', title: '热学' },
  { id: 'optics', title: '光学' }, { id: 'atomic-physics', title: '原子物理学' },
  { id: 'math', title: '数学工具' },
] as const;
// 只用于兼容已有个人记录；不再作为地图入口或新建分类。
export const retiredDomains: readonly string[] = ['waves', 'modern'];
export const kinds = { concept: '概念', law: '定律', method: '方法', example: '例题' } as const;
export const statuses = { 'not-started': '未开始', learning: '学习中', mastered: '已掌握' } as const;
export type Status = keyof typeof statuses;
export interface KnowledgeNode {
  id: string; title: string; domain: string; kind: keyof typeof kinds; summary: string;
  requires: string[]; variants: { id: string; title: string; requires: string[] }[];
  url?: string; local?: boolean;
}
export interface LectureItem { nodeId: string; variantId: string; importance: number; placement: 'body' | 'reference'; note: string; }
export interface Lecture { id: string; title: string; mode: 'student' | 'teacher'; items: LectureItem[]; }
export interface AtlasState { version: 1; nodes: KnowledgeNode[]; progress: Record<string, Status>; currentNode: string | null; lectures: Lecture[]; activeLecture: string | null; }
export const freshState = (): AtlasState => ({ version: 1, nodes: [], progress: {}, currentNode: null, lectures: [], activeLecture: null });
export const newId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
export const newItem = (node: KnowledgeNode): LectureItem => ({ nodeId: node.id, variantId: node.variants[0]?.id || '', importance: 2, placement: 'body', note: '' });
export const allNodes = (published: KnowledgeNode[], state: AtlasState) => [...published, ...state.nodes];
export const dependencies = (node: KnowledgeNode, variantId = '') => [...new Set([...node.requires, ...(node.variants.find(v => v.id === variantId)?.requires || [])])];

export function validateGraph(nodes: KnowledgeNode[]) {
  const byId = new Map(nodes.map(n => [n.id, n]));
  if (byId.size !== nodes.length) throw new Error('知识点标识不能重复。');
  const visiting = new Set<string>(), done = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) throw new Error('前置关系形成了循环，请调整后再保存。');
    if (done.has(id)) return;
    const node = byId.get(id);
    if (!node) throw new Error(`有前置知识点尚未录入：${id}`);
    visiting.add(id);
    new Set([...node.requires, ...node.variants.flatMap(v => v.requires)]).forEach(visit);
    visiting.delete(id); done.add(id);
  };
  nodes.forEach(n => visit(n.id));
}

export function prerequisitePlan(lecture: Lecture, nodes: KnowledgeNode[]) {
  const byId = new Map(nodes.map(n => [n.id, n]));
  const selected = new Map(lecture.items.map(i => [i.nodeId, i]));
  const direct = new Set<string>();
  lecture.items.forEach(item => { const node = byId.get(item.nodeId); if (node) dependencies(node, item.variantId).forEach(id => direct.add(id)); });
  const ordered: string[] = [], visited = new Set<string>(), stack = new Set<string>();
  const visit = (id: string) => {
    if (stack.has(id)) throw new Error('前置关系存在循环。');
    if (visited.has(id)) return;
    const node = byId.get(id);
    if (!node) throw new Error(`找不到前置知识点：${id}`);
    stack.add(id);
    const variant = selected.get(id)?.variantId ?? node.variants[0]?.id ?? '';
    dependencies(node, variant).forEach(visit);
    stack.delete(id); visited.add(id); ordered.push(id);
  };
  lecture.items.forEach(i => visit(i.nodeId));
  return ordered.filter(id => !selected.has(id)).map(id => ({ node: byId.get(id)!, direct: direct.has(id) }));
}

export function completePrerequisites(lecture: Lecture, nodes: KnowledgeNode[]) {
  const plan = prerequisitePlan(lecture, nodes);
  const additions = plan.map(({node, direct}) => ({ ...newItem(node), placement: direct ? 'body' as const : 'reference' as const }));
  const items = [...additions, ...lecture.items];
  const byItem = new Map(items.map(i => [i.nodeId, i]));
  const byNode = new Map(nodes.map(n => [n.id, n]));
  const ordered: LectureItem[] = [], visited = new Set<string>();
  const visit = (item: LectureItem) => {
    if (visited.has(item.nodeId)) return;
    visited.add(item.nodeId);
    const node = byNode.get(item.nodeId);
    if (node) dependencies(node, item.variantId).forEach(id => { const pre = byItem.get(id); if (pre) visit(pre); });
    ordered.push(item);
  };
  items.forEach(visit);
  return { ...lecture, items: ordered };
}

/** 验证导入的个人记录，不接收外部链接或可执行内容。 */
export function parseState(value: unknown): AtlasState {
  const object = (v: unknown): Record<string, unknown> => { if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('备份格式不正确。'); return v as Record<string, unknown>; };
  const string = (v: unknown, max = 300): string => { if (typeof v !== 'string' || v.length > max) throw new Error('备份中的文字格式不正确。'); return v; };
  const list = (v: unknown, max = 2000): unknown[] => { if (!Array.isArray(v) || v.length > max) throw new Error('备份条目过多或格式不正确。'); return v; };
  const ids = (v: unknown) => list(v).map(v => string(v));
  const input = object(value);
  if (input.version !== 1) throw new Error('不支持这个备份版本。');
  const nodes: KnowledgeNode[] = list(input.nodes).map(raw => {
    const n = object(raw), id = string(n.id), domain = string(n.domain), kind = string(n.kind);
    if (!id.startsWith('local-') || (!domains.some(d => d.id === domain) && !retiredDomains.includes(domain)) || !Object.hasOwn(kinds, kind)) throw new Error('备份中的知识点格式不正确。');
    return { id, title: string(n.title, 100), domain, kind: kind as KnowledgeNode['kind'], summary: string(n.summary, 6000), requires: ids(n.requires), local: true,
      variants: list(n.variants, 20).map(raw => { const v = object(raw); return {id: string(v.id), title: string(v.title), requires: ids(v.requires)}; }) };
  });
  const progress: Record<string, Status> = Object.create(null);
  for (const [id, status] of Object.entries(object(input.progress))) {
    if (!Object.hasOwn(statuses, String(status))) throw new Error('学习状态格式不正确。');
    progress[string(id)] = status as Status;
  }
  const lectures: Lecture[] = list(input.lectures, 200).map(raw => {
    const l = object(raw);
    if (l.mode !== 'student' && l.mode !== 'teacher') throw new Error('讲义模式不正确。');
    const items: LectureItem[] = list(l.items).map(raw => { const i = object(raw);
      if (!['body','reference'].includes(String(i.placement)) || ![1,2,3].includes(Number(i.importance))) throw new Error('讲义条目格式不正确。');
      return { nodeId: string(i.nodeId), variantId: string(i.variantId), importance: Number(i.importance), placement: i.placement as LectureItem['placement'], note: string(i.note, 6000) };
    });
    if (new Set(items.map(i => i.nodeId)).size !== items.length) throw new Error('讲义包含重复条目。');
    return {id: string(l.id), title: string(l.title, 100), mode: l.mode, items};
  });
  if (new Set(lectures.map(l => l.id)).size !== lectures.length) throw new Error('讲义标识重复。');
  return { version: 1, nodes, progress, lectures, currentNode: input.currentNode === null ? null : string(input.currentNode), activeLecture: input.activeLecture === null ? null : string(input.activeLecture) };
}
