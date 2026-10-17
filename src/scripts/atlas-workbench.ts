import { domains, kinds, statuses, freshState, parseState, validateGraph, allNodes, dependencies, prerequisitePlan, completePrerequisites, newId, newItem, type AtlasState, type KnowledgeNode, type Lecture, type LectureItem, type Status } from '../lib/atlas-model';
import { sitePath } from '../lib/paths';

const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const catalog: KnowledgeNode[] = JSON.parse(document.querySelector('[data-atlas-catalog]')?.textContent || '[]');
const key = `physics-atlas:workspace:v1:${import.meta.env.BASE_URL}`;
let state = freshState(), storageError = '', undo: AtlasState | null = null;
try { const raw = localStorage.getItem(key); if (raw) state = parseState(JSON.parse(raw)); validateGraph(allNodes(catalog, state)); }
catch { storageError = '个人记录暂时无法读取。请先导出备份，或使用之前保存的备份恢复。'; }
const app = document.querySelector<HTMLElement>('[data-atlas-app]');
const screen = app?.querySelector<HTMLElement>('[data-atlas-screen]');
const dialog = app?.querySelector<HTMLDialogElement>('[data-atlas-dialog]');
const modal = app?.querySelector<HTMLElement>('[data-atlas-modal]');
const view = app?.dataset.view || '';
const requestedDomain = new URL(location.href).searchParams.get('domain');
let domain = requestedDomain && domains.some(d=>d.id===requestedDomain) ? requestedDomain : app?.dataset.domain || 'all', query = '', statusFilter = 'all', selectedId = new URL(location.href).searchParams.get('node') || state.currentNode || '';
let dragged = '', stagedImport: AtlasState | null = null;
let zoom = 1, panX = 0, panY = 0;
const nodes = () => allNodes(catalog, state);
const findNode = (id: string) => nodes().find(n => n.id === id);
const activeLecture = () => state.lectures.find(l => l.id === state.activeLecture) || state.lectures[0];
const selected = (a: string, b: string) => a === b ? ' selected' : '';
const statusOf = (id: string): Status => Object.hasOwn(state.progress,id) ? state.progress[id] : 'not-started';
const domainTitle = (id: string) => domains.find(d => d.id === id)?.title || id;

function notify(message: string) {
  const el = app?.querySelector('[data-atlas-notice]');
  if (el) el.innerHTML = `${escape(message)}${undo ? ' <button data-action="undo">撤销上一步</button>' : ''}`;
}
function commit(next: AtlasState, message = '', rerender = true) {
  try { localStorage.setItem(key, JSON.stringify(next)); }
  catch { notify('浏览器未能保存，可能是空间不足或隐私模式限制。请先导出备份。'); return false; }
  undo = state; state = next; if(rerender) render(); if (message) notify(message); return true;
}
function update(change: (next: AtlasState) => void, message = '') { const next = structuredClone(state); change(next); return commit(next, message); }
function changeLecture(change: (lecture: Lecture) => void, message = '') {
  const current = activeLecture(); if (!current) return;
  update(next => { const lecture = next.lectures.find(l => l.id === current.id)!; change(lecture); }, message);
}
function optionsDomain(value: string, all = true) { return `${all ? '<option value="all">全部领域</option>' : ''}${domains.map(d => `<option value="${d.id}"${selected(d.id,value)}>${d.title}</option>`).join('')}`; }
function optionsNodes(exclude = '', checked: string[] = []) { return nodes().filter(n => n.id !== exclude).map(n => `<option value="${escape(n.id)}"${checked.includes(n.id) ? ' selected' : ''}>${escape(n.title)}</option>`).join(''); }
function filters() {
  return `<div class="atlas-filters"><label class="atlas-search"><span>⌕</span><input data-filter="query" type="search" aria-label="搜索知识点" placeholder="搜索知识点…" value="${escape(query)}" /></label><select data-filter="domain" aria-label="选择领域">${optionsDomain(domain)}</select><select data-filter="status" aria-label="筛选学习状态"><option value="all">全部状态</option>${Object.entries(statuses).map(([s,l])=>`<option value="${s}"${selected(s,statusFilter)}>${l}</option>`).join('')}</select><button class="atlas-button primary" data-action="new-node">＋ 新建知识点</button></div>`;
}
function filtered() { return nodes().filter(n => (domain === 'all' || n.domain === domain) && (statusFilter === 'all' || statusOf(n.id) === statusFilter) && `${n.title} ${n.summary}`.toLowerCase().includes(query.toLowerCase())); }
function legend() { return `<div class="map-legend"><span><i class="status-dot mastered"></i>已掌握</span><span><i class="status-dot learning"></i>学习中</span><span><i class="status-dot not-started"></i>未开始</span><span><i class="current-ring"></i>当前位置</span></div>`; }
function empty(title: string, text: string, action = '') { return `<div class="atlas-empty"><div class="empty-symbol">◇</div><h2>${title}</h2><p>${text}</p>${action}</div>`; }

function positions(items: KnowledgeNode[]) {
  const every = new Map(nodes().map(n => [n.id,n]));
  const depths = new Map<string,number>();
  const depth = (id: string, stack = new Set<string>()): number => {
    if (depths.has(id)) return depths.get(id)!;
    if (stack.has(id)) return 0;
    const n = every.get(id); if (!n) return 0;
    stack.add(id);
    const value = Math.min(30, Math.max(-1,...dependencies(n,n.variants[0]?.id).map(id=>depth(id,new Set(stack))))+1);
    depths.set(id,value); return value;
  };
  const rows = new Map<number,number>();
  return items.map(n => { const d = depth(n.id), row = rows.get(d) || 0; rows.set(d,row+1); return {node:n,x:32+d*222,y:36+row*104}; });
}
function graph(items: KnowledgeNode[], mini = false) {
  if (!items.length) {
    const visibleDomains = domain === 'all' || mini ? domains : domains.filter(d=>d.id===domain);
    return `<svg class="atlas-graph empty-graph" viewBox="0 0 650 390" role="img" aria-label="学习地图领域框架，尚无知识点"><defs><pattern id="${mini?'mini':'map'}-empty-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" opacity=".09"/></pattern></defs><rect width="650" height="390" fill="url(#${mini?'mini':'map'}-empty-grid)"/>${visibleDomains.map((d,i)=>`<g class="domain-map-node" data-map-domain="${d.id}" tabindex="0" role="button" aria-label="${d.title}，待录入知识点" transform="translate(${52+(i%3)*200},${55+Math.floor(i/3)*105})"><rect width="155" height="65" rx="8"/><text x="77" y="28" text-anchor="middle">${d.title}</text><text class="node-subtitle" x="77" y="48" text-anchor="middle">待录入知识点</text></g>`).join('')}</svg>`;
  }
  const layout = positions(items), byId = new Map(layout.map(p=>[p.node.id,p]));
  const width = Math.max(640,...layout.map(p=>p.x+212)), height = Math.max(340,...layout.map(p=>p.y+100));
  const edges = layout.flatMap(p=>dependencies(p.node,p.node.variants[0]?.id).map(id=> { const pre=byId.get(id); return pre ? `<path class="map-edge" d="M${pre.x+176},${pre.y+32} C${pre.x+204},${pre.y+32} ${p.x-28},${p.y+32} ${p.x},${p.y+32}" marker-end="url(#${mini?'mini':'map'}-arrow)"/>` : ''; })).join('');
  return `<svg class="atlas-graph" viewBox="0 0 ${width} ${height}" role="img" aria-label="知识前置关系图，连线由前置知识指向后续知识"><defs><pattern id="${mini?'mini':'map'}-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" opacity=".09"/></pattern><marker id="${mini?'mini':'map'}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="none" stroke="currentColor"/></marker></defs><rect width="${width}" height="${height}" fill="url(#${mini?'mini':'map'}-grid)"/><g data-map-transform transform="translate(${mini?0:panX} ${mini?0:panY}) scale(${mini?1:zoom})">${edges}${layout.map(p=>`<g class="knowledge-map-node ${statusOf(p.node.id)} ${state.currentNode===p.node.id?'is-current':''} ${selectedId===p.node.id?'is-selected':''}" transform="translate(${p.x} ${p.y})" data-map-node="${escape(p.node.id)}" tabindex="0" role="button" aria-label="${escape(p.node.title)}，${statuses[statusOf(p.node.id)]}${state.currentNode===p.node.id?'，当前位置':''}"><title>${escape(p.node.title)}</title><rect class="node-box" width="176" height="64" rx="8"/><circle cx="16" cy="22" r="4"/><text x="29" y="27">${escape(p.node.title.length>10?p.node.title.slice(0,10)+'…':p.node.title)}</text><text x="15" y="48" class="node-subtitle">${domainTitle(p.node.domain)} · ${kinds[p.node.kind]}</text>${state.currentNode===p.node.id?'<circle class="location-mark" cx="164" cy="0" r="7"/>':''}</g>`).join('')}</g></svg>`;
}
function renderMini() {
  document.querySelectorAll<HTMLElement>('[data-atlas-mini]').forEach(el=> {
    const current = state.currentNode ? findNode(state.currentNode) : undefined;
    el.innerHTML = `<a class="navigator-map" href="${sitePath('learning-map/')}${current?'?node='+encodeURIComponent(current.id):''}" aria-label="打开学习地图">${graph(nodes(),true)}</a><p>${current?`<span class="location-dot"></span>${escape(current.title)}`:'尚未选择学习位置'}</p>${legend()}<a class="navigator-open" href="${sitePath('learning-map/')}">打开完整地图 ↗</a>`;
    el.querySelectorAll('[tabindex]').forEach(node=>{node.removeAttribute('tabindex');node.removeAttribute('role');});
  });
}
function nodeDetail(node?: KnowledgeNode) {
  if (!node) return `<div class="node-detail-empty"><span>⌖</span><h2>你在图谱的哪一站？</h2><p>选择地图中的知识点，即可查看前置联系、记录学习状态或加入讲义。</p>${!nodes().length?'<p>目前只有领域框架，等待你录入第一个知识点。</p>':''}</div>`;
  return `<div class="node-detail-head"><span class="kind-badge">${kinds[node.kind]}</span><span>${domainTitle(node.domain)}</span></div><h2>${escape(node.title)}</h2><p class="node-summary">${escape(node.summary || '尚未填写内容概要。')}</p><label class="atlas-field">学习状态<select data-node-status="${escape(node.id)}">${Object.entries(statuses).map(([id,l])=>`<option value="${id}"${selected(id,statusOf(node.id))}>${l}</option>`).join('')}</select></label><button class="atlas-button" data-action="locate" data-id="${escape(node.id)}">${state.currentNode===node.id?'⌖ 当前学习位置':'⌖ 设为学习位置'}</button><button class="atlas-button primary" data-action="add-to-lecture" data-id="${escape(node.id)}">＋ 加入我的讲义</button><div class="node-relations"><h3>前置知识</h3>${dependencies(node,node.variants[0]?.id).length?dependencies(node,node.variants[0]?.id).map(id=>`<button class="text-button" data-action="select-node" data-id="${escape(id)}">${escape(findNode(id)?.title || id)} ↗</button>`).join(''):'<p>尚未设置前置关系</p>'}</div>${node.url?`<a class="atlas-button" href="${escape(node.url)}">阅读完整笔记 ↗</a>`:''}${node.local?`<button class="text-button" data-action="edit-node" data-id="${escape(node.id)}">编辑此知识点</button><small>个人条目 · 仅保存在当前浏览器</small>`:''}`;
}
function renderMap() {
  const count = nodes().length, mastered = nodes().filter(n=>statusOf(n.id)==='mastered').length;
  return `<div class="workbench-intro"><div><p>LEARN IN CONNECTIONS</p><h2>每一步，都知道自己在哪里。</h2><span>沿着前置关系探索知识，留下自己的学习足迹。</span></div><div class="progress-pill"><b>${mastered}<span> / ${count}</span></b><span>个知识点已掌握</span></div></div>${filters()}<div class="learning-map-layout"><div class="map-canvas" data-map-canvas><div class="map-caption">${count?'箭头：前置知识 → 后续知识':'领域已就位 · 知识点待录入'}</div>${graph(filtered())}<div class="map-controls"><button data-action="zoom-out" aria-label="缩小地图">−</button><span data-zoom-label>${Math.round(zoom*100)}%</span><button data-action="zoom-in" aria-label="放大地图">＋</button><button data-action="zoom-reset">复位</button></div></div><aside class="map-detail">${nodeDetail(findNode(selectedId))}</aside></div>${legend()}${count&&!filtered().length?'<p class="filter-empty">没有符合筛选条件的知识点。</p>':''}`;
}
function renderLibrary() {
  const list = filtered();
  return `<div class="workbench-intro"><div><p>YOUR KNOWLEDGE LIBRARY</p><h2>把知识连起来，也按自己的方式整理。</h2><span>选择知识点阅读、标记进度，或收入个人讲义。</span></div><a class="atlas-button" href="${sitePath('learning-map/')}">地图视图 ↗</a></div>${filters()}<div class="library-summary"><span>${list.length} 个知识点</span><span>${catalog.length} 个站点条目 · ${state.nodes.length} 个个人条目</span></div>${list.length?`<div class="node-library">${list.map(n=>`<article class="library-node"><div><span class="kind-badge">${kinds[n.kind]}</span><span class="library-domain">${domainTitle(n.domain)}${n.local?' · 个人':''}</span></div><h3><button data-action="show-node" data-id="${escape(n.id)}">${escape(n.title)}</button></h3><p>${escape(n.summary || '内容待补充。')}</p><div class="library-node-footer"><span><i class="status-dot ${statusOf(n.id)}"></i>${statuses[statusOf(n.id)]}</span><button data-action="add-to-lecture" data-id="${escape(n.id)}">＋ 加入讲义</button></div></article>`).join('')}</div>`:empty(nodes().length?'没有找到相关知识点':'知识库已就位，等待第一份内容。',nodes().length?'可以换一个关键词，或调整领域与状态筛选。':'无需先写好讲义。可以先建立知识点名称和前置关系，再逐步补充内容。','<button class="atlas-button primary" data-action="new-node">＋ 新建知识点</button>')}<div class="domain-shortcuts">${domains.map(d=>`<a href="${sitePath(d.id+'/')}">${d.title} ↗</a>`).join('')}</div>`;
}
function renderLectures() {
  const l = activeLecture();
  if (!l) return empty('你的讲义，由你编排。','从知识库挑选知识点，调整顺序、选择推导路径，组成自己的学习提纲。','<button class="atlas-button primary" data-action="new-lecture">＋ 新建我的讲义</button><a class="text-button" href="'+sitePath('library/')+'">先看看知识库 →</a>');
  const missing = prerequisitePlan(l,nodes());
  return `<div class="lecture-heading"><label class="atlas-field">当前讲义<select data-lecture-select aria-label="选择我的讲义">${state.lectures.map(x=>`<option value="${escape(x.id)}"${selected(x.id,l.id)}>${escape(x.title)}</option>`).join('')}</select></label><div><button class="text-button" data-action="rename-lecture">重命名</button><button class="atlas-button" data-action="new-lecture">＋ 新建讲义</button></div></div><div class="lecture-meta"><p>正文 ${l.items.filter(i=>i.placement==='body').length} 个条目 · 引用 ${l.items.filter(i=>i.placement==='reference').length} 个条目</p><div class="mode-switch" aria-label="讲义版本"><button data-action="mode" data-mode="teacher" aria-pressed="${l.mode==='teacher'}">教师版</button><button data-action="mode" data-mode="student" aria-pressed="${l.mode==='student'}">学生版</button></div></div>${l.items.length?`<ol class="lecture-items">${l.items.map((item,i)=>renderLectureItem(item,i)).join('')}</ol>`:empty('先放入一个知识点。','可以从知识库选择条目。条目顺序、推导路径和学习备注都能随时调整。','<button class="atlas-button" data-action="pick-nodes">从知识库添加</button>')}<div class="lecture-actions"><button class="atlas-button" data-action="pick-nodes">＋ 添加知识点</button><button class="atlas-button" data-action="prerequisites"${!missing.length?' disabled':''}>补齐前置${missing.length?' · '+missing.length:''}</button><button class="atlas-button primary" data-action="preview"${!l.items.length?' disabled':''}>讲义预览与打印</button><button class="text-button danger" data-action="delete-lecture">删除这份讲义</button></div>${missing.length?`<div class="prerequisite-alert"><strong>还有 ${missing.length} 个前置知识点未收入讲义</strong><p>可以保留当前提纲，或补齐直接前置与间接引用。</p><button class="text-button" data-action="prerequisites">查看前置关系 →</button></div>`:''}<p class="workbench-hint">拖动条目可排序，也可以使用上移、下移按钮。教师版在预览时显示学习备注；学生版隐藏备注。</p>`;
}
function renderLectureItem(item: LectureItem, index: number) {
  const node = findNode(item.nodeId); if (!node) return '';
  return `<li draggable="true" data-item-id="${escape(item.nodeId)}"><div class="lecture-item-title"><span class="drag-handle" aria-hidden="true">⠿</span><span class="item-number">${String(index+1).padStart(2,'0')}</span><span class="kind-badge">${kinds[node.kind]}</span><button data-action="show-node" data-id="${escape(node.id)}">${escape(node.title)}</button><div class="item-order"><button data-action="move-up" data-id="${escape(node.id)}" aria-label="上移${escape(node.title)}"${index===0?' disabled':''}>↑</button><button data-action="move-down" data-id="${escape(node.id)}" aria-label="下移${escape(node.title)}"${index===activeLecture()!.items.length-1?' disabled':''}>↓</button><button data-action="remove-item" data-id="${escape(node.id)}" aria-label="移除${escape(node.title)}">×</button></div></div><div class="item-settings">${node.variants.length?`<label>推导路径<select data-item-field="variantId" data-id="${escape(node.id)}">${node.variants.map(v=>`<option value="${escape(v.id)}"${selected(v.id,item.variantId)}>${escape(v.title)}</option>`).join('')}</select></label>`:''}<label>放置位置<select data-item-field="placement" data-id="${escape(node.id)}"><option value="body"${selected(item.placement,'body')}>加入正文</option><option value="reference"${selected(item.placement,'reference')}>只引用</option></select></label><label>重要性<select data-item-field="importance" data-id="${escape(node.id)}">${[1,2,3].map(v=>`<option value="${v}"${Number(item.importance)===v?' selected':''}>${'★'.repeat(v)} ${['','补充','常用','核心'][v]}</option>`).join('')}</select></label></div><label class="atlas-field item-note">学习备注（教师版显示）<textarea rows="2" data-item-field="note" data-id="${escape(node.id)}" placeholder="写下提醒、讲解要点或待补充的内容…">${escape(item.note)}</textarea></label></li>`;
}
function render() {
  if (screen) { try { screen.innerHTML = view==='map'?renderMap():view==='lectures'?renderLectures():renderLibrary(); } catch (error) { screen.innerHTML = empty('有一段知识联系需要修复。',escape((error as Error).message)); } }
  const l = activeLecture(); document.querySelectorAll('[data-atlas-count]').forEach(el=>el.textContent=String(l?.items.length||0));
  renderMini();
}
function openModal(title: string, body: string) {
  if (!dialog || !modal) return;
  modal.innerHTML = `<div class="atlas-dialog-title"><h2>${escape(title)}</h2><button data-action="close-dialog" aria-label="关闭对话框">×</button></div>${body}`;
  if (!dialog.open) dialog.showModal();
}
function newLecture(nodeId = '', rename = false) {
  const l = activeLecture();
  openModal(rename?'重命名讲义':'新建我的讲义', `<form data-lecture-form data-node="${escape(nodeId)}" data-rename="${rename}"><label class="atlas-field">讲义名称<input name="title" required maxlength="100" autofocus value="${rename?escape(l?.title):''}" placeholder="给这份讲义起个名字" /></label><button class="atlas-button primary" type="submit">${rename?'保存名称':'创建讲义'}</button></form>`);
}
function variantRow(variant?: KnowledgeNode['variants'][number], exclude = '') {
  return `<div class="variant-editor" data-variant-row data-variant-id="${escape(variant?.id || '')}"><label class="atlas-field">路径名称<input data-variant-title maxlength="100" value="${escape(variant?.title || '')}" placeholder="填写一种推导或解题路径" /></label><label class="atlas-field">这条路径额外需要的前置<select multiple data-variant-requires>${optionsNodes(exclude,variant?.requires)}</select></label><button class="text-button danger" type="button" data-action="remove-variant">移除此路径</button></div>`;
}
function editNode(id = '') {
  const n = findNode(id); if (n && !n.local) return;
  openModal(n?'编辑知识点':'新建知识点',`<form data-node-form data-id="${escape(n?.id || '')}"><p class="workbench-hint">可以只填写名称，正文以后再补。新建的个人条目保存在当前浏览器。</p><label class="atlas-field">名称<input name="title" required maxlength="100" value="${escape(n?.title || '')}" placeholder="填写知识点名称" /></label><div class="form-columns"><label class="atlas-field">所属领域<select name="domain">${optionsDomain(n?.domain || (domain==='all'?'mechanics':domain),false)}</select></label><label class="atlas-field">条目类型<select name="kind">${Object.entries(kinds).map(([id,t])=>`<option value="${id}"${selected(id,n?.kind||'concept')}>${t}</option>`).join('')}</select></label></div><label class="atlas-field">概要或占位说明<textarea name="summary" maxlength="6000" rows="3" placeholder="可留空，等内容准备好再补充">${escape(n?.summary||'')}</textarea></label><label class="atlas-field">共同前置知识<select multiple name="requires">${optionsNodes(n?.id,n?.requires)}</select><small>电脑上按住 Ctrl 可选多个。没有前置可留空。</small></label><div data-variant-rows>${n?.variants.map(v=>variantRow(v,n.id)).join('') || ''}</div><button class="text-button" type="button" data-action="add-variant">＋ 添加推导路径（可选）</button><div class="modal-actions"><button class="atlas-button primary" type="submit">保存知识点</button><button class="atlas-button" type="button" data-action="close-dialog">取消</button></div></form>`);
}
function addToLecture(id: string) {
  const node = findNode(id); if (!node) return;
  const l = activeLecture(); if (!l) { newLecture(id); return; }
  if (l.items.some(i=>i.nodeId===id)) { notify('这个知识点已经在当前讲义中。'); return; }
  changeLecture(l=>l.items.push(newItem(node)),`已加入“${l.title}”。`);
}
function pickNodes() {
  const l = activeLecture(); if (!l) { newLecture(); return; }
  const available = nodes().filter(n=>!l.items.some(i=>i.nodeId===n.id));
  openModal('从知识库添加',available.length?`<form data-pick-form><div class="node-picker">${available.map(n=>`<label><input type="checkbox" name="node" value="${escape(n.id)}" /><span><b>${escape(n.title)}</b><small>${domainTitle(n.domain)} · ${kinds[n.kind]}</small></span></label>`).join('')}</div><button class="atlas-button primary" type="submit">加入当前讲义</button></form>`:empty('暂时没有可添加的知识点。',nodes().length?'现有条目已经全部在这份讲义中。':'先在知识库里建立知识点，之后就能在这里编排。',`<a class="atlas-button primary" href="${sitePath('library/')}">打开知识库</a>`));
}
function showPrerequisites() {
  const l = activeLecture(); if (!l) return;
  const plan = prerequisitePlan(l,nodes());
  openModal(`补齐 ${plan.length} 个前置知识点`,`<p>直接前置默认加入正文，间接前置默认只引用。应用后按前置顺序排列，你仍可手动调整。</p><form data-prerequisite-form>${plan.map(p=>`<label class="prerequisite-row"><span><b>${escape(p.node.title)}</b><small>${p.direct?'直接前置':'间接前置'}</small></span><select name="${escape(p.node.id)}"><option value="body"${p.direct?' selected':''}>加入正文</option><option value="reference"${!p.direct?' selected':''}>只引用</option></select></label>`).join('')}<button class="atlas-button primary" type="submit">应用前置安排</button></form>`);
}
async function previewLecture() {
  const l = activeLecture(); if (!l) return;
  openModal('讲义预览', '<p>正在整理讲义…</p>');
  const parts = await Promise.all(l.items.filter(i=>i.placement==='body').map(async (item,index)=> {
    const node=findNode(item.nodeId)!; let content=`<p class="preview-summary">${escape(node.summary||'内容待补充。')}</p>`;
    if (node.url) {
      try { const url = new URL(node.url,location.origin); if (url.origin!==location.origin) throw new Error(); const response=await fetch(url); if (!response.ok) throw new Error(); const parsed=new DOMParser().parseFromString(await response.text(),'text/html'); const article=parsed.querySelector('.sl-markdown-content'); if (article) { article.querySelectorAll('script,iframe,object,embed,form,button,[data-atlas-app]').forEach(el=>el.remove()); article.querySelectorAll('*').forEach(el=>{ for(const attr of [...el.attributes]) if (attr.name.startsWith('on')) el.removeAttribute(attr.name); }); content=article.innerHTML; } } catch { content+='<p>正文暂时无法加载，请通过下方链接阅读。</p>'; }
    }
    return `<section class="preview-section"><h3>${index+1}. ${escape(node.title)}</h3>${content}${node.url?`<p><a href="${escape(node.url)}">阅读原笔记 ↗</a></p>`:''}${node.variants.length?`<p class="preview-path">推导路径：${escape(node.variants.find(v=>v.id===item.variantId)?.title||'尚未选择')}</p>`:''}${l.mode==='teacher'?`<div class="teacher-note"><span>${'★'.repeat(item.importance)} · 教师备注</span><p>${escape(item.note||'未填写备注。')}</p></div>`:''}</section>`;
  }));
  const refs=l.items.filter(i=>i.placement==='reference');
  if (!dialog?.open) return;
  openModal('讲义预览与打印',`<div class="preview-tools"><span>${l.mode==='teacher'?'教师版 · 含学习备注':'学生版 · 隐藏学习备注'}</span><button class="atlas-button primary" data-action="print">打印 / 保存 PDF</button></div><article class="lecture-print"><p class="eyebrow">PHYSICS ATLAS / PERSONAL NOTES</p><h2>${escape(l.title)}</h2>${parts.join('')}${refs.length?`<section><h3>附录 · 参考知识</h3><ul>${refs.map(i=>{const n=findNode(i.nodeId)!;return `<li>${n.url?`<a href="${escape(n.url)}">${escape(n.title)}</a>`:escape(n.title)}</li>`;}).join('')}</ul></section>`:''}</article>`);
}
function downloadBackup() {
  const raw=localStorage.getItem(key) || JSON.stringify(state);
  const url=URL.createObjectURL(new Blob([raw],{type:'application/json'}));
  const a=document.createElement('a'); a.href=url; a.download=`physics-atlas-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportBackup() {
  const raw=localStorage.getItem(key) || JSON.stringify(state);
  openModal('导出个人备份',`<p>备份包含个人知识点、讲义、学习进度和当前位置。可以下载文件，也可以复制下面的全部文字保存。</p><label class="atlas-field">备份内容<textarea readonly rows="8" data-backup-text>${escape(raw)}</textarea></label><div class="modal-actions"><button class="atlas-button primary" data-action="download-backup">下载备份文件</button><button class="atlas-button" data-action="copy-backup">复制备份内容</button></div>`);
}
function importBackup() {
  openModal('导入个人备份','<p>选择之前保存的 JSON 文件，或把备份文字粘贴到下面。确认后才会替换当前个人记录。</p><form data-import-form><label class="atlas-field">粘贴备份内容<textarea name="backup" rows="7" placeholder="在这里粘贴备份文字" required></textarea></label><div class="modal-actions"><button class="atlas-button primary" type="submit">检查并恢复</button><button class="atlas-button" type="button" data-action="choose-import-file">选择备份文件</button></div></form>');
}
function prepareImport(raw: string) {
  const candidate=parseState(JSON.parse(raw));const known=new Set(allNodes(catalog,candidate).map(n=>n.id));validateGraph(allNodes(catalog,candidate));
  if(candidate.lectures.some(l=>l.items.some(i=>!known.has(i.nodeId))))throw new Error('备份引用了当前站点尚未收录的知识点，请先补充相应内容。');
  stagedImport=candidate;
  openModal('恢复个人备份？',`<p>备份中有 ${candidate.nodes.length} 个个人知识点和 ${candidate.lectures.length} 份讲义。</p><p>这会替换当前浏览器中的个人知识点、讲义和学习进度。建议先导出当前记录。导入后也可以撤销上一步。</p><div class="modal-actions"><button class="atlas-button primary" data-action="confirm-import">确认恢复</button><button class="atlas-button" data-action="close-dialog">取消</button></div>`);
}
function selectNode(id: string) { selectedId=id; update(next=>{next.currentNode=id;}); }
function setMapTransform() {
  app?.querySelector('[data-map-transform]')?.setAttribute('transform',`translate(${panX} ${panY}) scale(${zoom})`);
  const el=app?.querySelector('[data-zoom-label]'); if(el) el.textContent=`${Math.round(zoom*100)}%`;
}

app?.addEventListener('click',event=> {
  const target=(event.target as Element).closest<HTMLElement>('[data-action],[data-map-node],[data-map-domain]'); if(!target) return;
  const id=target.dataset.id||'';
  if(target.dataset.mapNode) { selectNode(target.dataset.mapNode); return; }
  if(target.dataset.mapDomain) { domain=target.dataset.mapDomain; render(); return; }
  switch(target.dataset.action) {
    case 'new-node': editNode(); break;
    case 'edit-node': editNode(id); break;
    case 'add-variant': modal?.querySelector('[data-variant-rows]')?.insertAdjacentHTML('beforeend',variantRow(undefined,modal?.querySelector<HTMLElement>('[data-node-form]')?.dataset.id)); break;
    case 'remove-variant': target.closest('[data-variant-row]')?.remove(); break;
    case 'new-lecture': newLecture(); break;
    case 'rename-lecture': newLecture('',true); break;
    case 'close-dialog': dialog?.close(); break;
    case 'show-node': selectedId=id; openModal('知识点',`<div class="dialog-node-detail">${nodeDetail(findNode(id))}</div>`); break;
    case 'select-node': selectedId=id; if(dialog?.open) openModal('知识点',`<div class="dialog-node-detail">${nodeDetail(findNode(id))}</div>`); else render(); break;
    case 'locate': selectNode(id); notify('学习位置已更新。'); break;
    case 'add-to-lecture': addToLecture(id); break;
    case 'pick-nodes': pickNodes(); break;
    case 'prerequisites': showPrerequisites(); break;
    case 'mode': changeLecture(l=>{l.mode=target.dataset.mode as Lecture['mode'];}); break;
    case 'move-up': case 'move-down': changeLecture(l=>{const at=l.items.findIndex(i=>i.nodeId===id), to=at+(target.dataset.action==='move-up'?-1:1); if(to>=0&&to<l.items.length) [l.items[at],l.items[to]]=[l.items[to],l.items[at]];}); break;
    case 'remove-item': changeLecture(l=>{l.items=l.items.filter(i=>i.nodeId!==id);},'条目已移出讲义，知识点仍保留在知识库。'); break;
    case 'delete-lecture': openModal('删除这份讲义？','<p>知识库条目和学习进度会保留。删除后可使用“撤销上一步”恢复。</p><button class="atlas-button danger" data-action="confirm-delete-lecture">删除讲义</button>'); break;
    case 'confirm-delete-lecture': { const l=activeLecture(); if(l) update(next=>{next.lectures=next.lectures.filter(x=>x.id!==l.id);next.activeLecture=next.lectures[0]?.id||null;},'讲义已删除。'); dialog?.close(); break; }
    case 'preview': void previewLecture(); break;
    case 'print': document.body.dataset.atlasPrint='true'; window.print(); break;
    case 'zoom-in': zoom=Math.min(2.5,zoom+.2); setMapTransform(); break;
    case 'zoom-out': zoom=Math.max(.4,zoom-.2); setMapTransform(); break;
    case 'zoom-reset': zoom=1;panX=0;panY=0;setMapTransform();break;
    case 'export': exportBackup(); break;
    case 'download-backup': downloadBackup();break;
    case 'copy-backup': {const text=modal?.querySelector<HTMLTextAreaElement>('[data-backup-text]')?.value||''; void navigator.clipboard.writeText(text).then(()=>notify('备份内容已复制。')).catch(()=>notify('请选中备份内容，按 Ctrl+C 复制。'));break;}
    case 'import': importBackup();break;
    case 'choose-import-file': app.querySelector<HTMLInputElement>('[data-atlas-import]')?.click();break;
    case 'confirm-import': if(stagedImport) {commit(stagedImport,'备份已恢复。');stagedImport=null;dialog?.close();}break;
    case 'undo': if(undo) {const previous=undo; if(commit(previous)){undo=null;notify('已撤销上一步。');}} break;
  }
});
app?.addEventListener('submit',event=> {
  const form=event.target as HTMLFormElement; event.preventDefault(); const data=new FormData(form);
  try {
    if(form.hasAttribute('data-node-form')) {
      const id=form.dataset.id||newId('local'), title=String(data.get('title')||'').trim(); if(!title) throw new Error('请填写知识点名称。');
      const variants=[...form.querySelectorAll<HTMLElement>('[data-variant-row]')].map(row=>({ id:row.dataset.variantId||newId('path'), title:row.querySelector<HTMLInputElement>('[data-variant-title]')!.value.trim(), requires:[...row.querySelector<HTMLSelectElement>('[data-variant-requires]')!.selectedOptions].map(o=>o.value) })).filter(v=>v.title);
      const node: KnowledgeNode={id,title,domain:String(data.get('domain')),kind:String(data.get('kind')) as KnowledgeNode['kind'],summary:String(data.get('summary')||''),requires:data.getAll('requires').map(String),variants,local:true};
      const next=structuredClone(state);next.nodes=next.nodes.filter(n=>n.id!==id);next.nodes.push(node);validateGraph(allNodes(catalog,next));selectedId=id;
      if(commit(next,'知识点已保存；以后可以继续补充。')) dialog?.close();
    } else if(form.hasAttribute('data-lecture-form')) {
      const title=String(data.get('title')||'').trim();if(!title) throw new Error('请填写讲义名称。');
      if(form.dataset.rename==='true') changeLecture(l=>{l.title=title;},'讲义名称已保存。');
      else { const id=newId('lecture');const node=findNode(form.dataset.node||'');update(next=>{next.lectures.push({id,title,mode:'student',items:node?[newItem(node)]:[]});next.activeLecture=id;},'讲义已创建。'); }
      dialog?.close();
    } else if(form.hasAttribute('data-pick-form')) {
      const chosen=data.getAll('node').map(String);changeLecture(l=>{chosen.forEach(id=>{const node=findNode(id);if(node&&!l.items.some(i=>i.nodeId===id))l.items.push(newItem(node));});},`已加入 ${chosen.length} 个知识点。`);dialog?.close();
    } else if(form.hasAttribute('data-import-form')) {
      prepareImport(String(data.get('backup')||''));
    } else if(form.hasAttribute('data-prerequisite-form')) {
      changeLecture(l=>{const prior=new Set(l.items.map(i=>i.nodeId));const complete=completePrerequisites(l,nodes());complete.items.forEach(i=>{if(!prior.has(i.nodeId))i.placement=data.get(i.nodeId)==='body'?'body':'reference';});l.items=complete.items;},'前置安排已应用。');dialog?.close();
    }
  } catch(error) { const old=form.querySelector('[data-form-error]');old?.remove();const el=document.createElement('p');el.dataset.formError='';el.setAttribute('role','alert');el.className='form-error';el.textContent=(error as Error).message;form.prepend(el); }
});
app?.addEventListener('change',async event=> {
  const el=event.target as HTMLInputElement;
  if(el.matches('[data-filter="domain"]')) {domain=el.value;render();}
  else if(el.matches('[data-filter="status"]')) {statusFilter=el.value;render();}
  else if(el.hasAttribute('data-node-status')) {const id=el.dataset.nodeStatus!;update(next=>{next.progress[id]=el.value as Status;},'学习状态已保存。');}
  else if(el.hasAttribute('data-lecture-select')) update(next=>{next.activeLecture=el.value;});
  else if(el.hasAttribute('data-item-field')) changeLecture(l=>{const item=l.items.find(i=>i.nodeId===el.dataset.id);if(item){const field=el.dataset.itemField!;if(field==='importance')item.importance=Number(el.value);else if(field==='placement')item.placement=el.value as LectureItem['placement'];else if(field==='note')item.note=el.value;else item.variantId=el.value;}});
  else if(el.hasAttribute('data-atlas-import')&&el.files?.[0]) {
    try {if(el.files[0].size>2_000_000)throw new Error('备份文件过大，请选择小于 2 MB 的个人备份。');prepareImport(await el.files[0].text());}catch(error){notify((error as Error).message);}el.value='';
  }
});
app?.addEventListener('input',event=> { const input=event.target as HTMLInputElement;if(input.matches('[data-filter="query"]')){const position=input.selectionStart;query=input.value;render();const next=app.querySelector<HTMLInputElement>('[data-filter="query"]');next?.focus();try{next?.setSelectionRange(position,position);}catch{}} else if(input.matches('[data-item-field="note"]')){const next=structuredClone(state);const lecture=next.lectures.find(l=>l.id===activeLecture()?.id);const item=lecture?.items.find(i=>i.nodeId===input.dataset.id);if(item){item.note=input.value;commit(next,'',false);}} });
app?.addEventListener('keydown',event=> {const target=(event.target as Element).closest<HTMLElement>('[data-map-node],[data-map-domain]');if(target&&['Enter',' '].includes(event.key)){event.preventDefault();target.click();}});
app?.addEventListener('dragstart',event=>{const item=(event.target as Element).closest<HTMLElement>('[data-item-id]');if(item){dragged=item.dataset.itemId!;if(event.dataTransfer)event.dataTransfer.effectAllowed='move';}});
app?.addEventListener('dragover',event=>{if(dragged&&(event.target as Element).closest('[data-item-id]'))event.preventDefault();});
app?.addEventListener('drop',event=>{const row=(event.target as Element).closest<HTMLElement>('[data-item-id]');if(!row||!dragged)return;event.preventDefault();const from=dragged;dragged='';changeLecture(l=>{const start=l.items.findIndex(i=>i.nodeId===from),end=l.items.findIndex(i=>i.nodeId===row.dataset.itemId);if(start>=0&&end>=0){const[item]=l.items.splice(start,1);l.items.splice(end,0,item);}});});
app?.addEventListener('dragend',()=>{dragged='';});
let pointer: {id:number;x:number;y:number;px:number;py:number;factor:number}|null=null;
app?.addEventListener('pointerdown',event=>{const svg=(event.target as Element).closest<SVGSVGElement>('[data-map-canvas] svg');if(!svg||(event.target as Element).closest('[data-map-node],[data-map-domain]'))return;pointer={id:event.pointerId,x:event.clientX,y:event.clientY,px:panX,py:panY,factor:svg.viewBox.baseVal.width/svg.getBoundingClientRect().width};svg.setPointerCapture(event.pointerId);});
app?.addEventListener('pointermove',event=>{if(pointer&&pointer.id===event.pointerId){panX=pointer.px+(event.clientX-pointer.x)*pointer.factor;panY=pointer.py+(event.clientY-pointer.y)*pointer.factor;setMapTransform();}});
app?.addEventListener('pointerup',()=>{pointer=null;});
app?.addEventListener('pointercancel',()=>{pointer=null;});
window.addEventListener('afterprint',()=>{delete document.body.dataset.atlasPrint;});
window.addEventListener('storage',event=>{if(event.key===key){try{state=event.newValue?parseState(JSON.parse(event.newValue)):freshState();validateGraph(nodes());render();}catch{notify('另一标签页的个人记录无法读取，请先导出备份。');}}});

// 阅读站点知识点时，位置导览自动定位；不会把条目标记为“已掌握”。
const current=catalog.find(n=>n.url?.replace(/\/$/,'')===location.pathname.replace(/\/$/,''));
if(current&&state.currentNode!==current.id) update(next=>{next.currentNode=current.id;});
render();if(storageError)notify(storageError);
