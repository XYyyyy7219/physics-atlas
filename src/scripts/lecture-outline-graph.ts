import { createLectureLayout, type LayoutBody } from '../lib/lecture-forces';

interface GraphNode extends LayoutBody {
  el: HTMLElement;
  id: string;
  parent?: string;
  targetX: number;
  targetY: number;
  dim: boolean;
}

const graph = document.querySelector<HTMLElement>('[data-lecture-graph]');
if (graph) initGraph(graph);

function initGraph(graph: HTMLElement) {
  const stage = graph.querySelector<HTMLElement>('[data-graph-stage]')!;
  const canvas = stage.querySelector('canvas')!;
  const context = canvas.getContext('2d');
  if (!context) return;
  const search = graph.querySelector<HTMLInputElement>('[data-graph-search]')!;
  const status = graph.querySelector<HTMLElement>('[data-graph-status]')!;
  const modes = [...graph.querySelectorAll<HTMLButtonElement>('[data-graph-mode]')];
  const pause = graph.querySelector<HTMLButtonElement>('[data-graph-action="pause"]')!;
  const nodes: GraphNode[] = [...stage.querySelectorAll<HTMLElement>('[data-graph-node]')].map(el => ({
    el, id: el.dataset.graphNode!, kind: el.dataset.graphKind as GraphNode['kind'], parent: el.dataset.graphParent,
    x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0, dim: false,
  }));
  const byId = new Map(nodes.map(node => [node.id, node]));
  const chapters = nodes.filter(node => node.kind === 'chapter');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sectionMode = false;
  let selected = '';
  let paused = reducedMotion;
  let frame = 0;
  let simulation: ReturnType<typeof createLectureLayout<GraphNode>> | undefined;
  let visible: GraphNode[] = [];
  let edges: { source: GraphNode; target: GraphNode }[] = [];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let moved = false;
  let drag: { id: number; x: number; y: number; node?: GraphNode } | undefined;

  function arrange() {
    const oneChapter = chapters.length === 1;
    const compact = oneChapter && width < 560 && sectionMode;
    byId.get('course')!.targetY = compact ? -145 : 0;
    chapters.forEach((chapter, index) => {
      const angle = oneChapter ? 0 : -Math.PI / 2 + index * 2 * Math.PI / chapters.length;
      const children = nodes.filter(node => node.parent === chapter.id);
      const distance = oneChapter ? 220 : Math.max(180, chapters.length * (sectionMode ? 43 : 34));
      chapter.targetX = compact ? 30 : Math.cos(angle) * distance;
      chapter.targetY = compact ? 12 : Math.sin(angle) * distance;
      const spread = oneChapter ? 2.05 : Math.min(1.9, 5.4 / chapters.length);
      const reach = Math.max(205, (children.length - 1) * 51 / spread);
      children.forEach((child, order) => {
        if (compact) {
          child.targetX = 200;
          child.targetY = (order - (children.length - 1) / 2) * 96;
          return;
        }
        const direction = angle + (children.length === 1 ? 0 : (order / (children.length - 1) - .5) * spread);
        child.targetX = chapter.targetX + Math.cos(direction) * reach;
        child.targetY = chapter.targetY + Math.sin(direction) * reach;
      });
    });
  }

  function draw() {
    frame = 0;
    const ink = getComputedStyle(graph).getPropertyValue('--book-graph-line').trim();
    context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    context!.clearRect(0, 0, width, height);
    for (const node of visible) {
      node.el.style.left = `${offsetX + node.x * scale}px`;
      node.el.style.top = `${offsetY + node.y * scale}px`;
    }
    for (const { source: parent, target: node } of edges) {
      context!.beginPath();
      context!.moveTo(offsetX + parent.x * scale, offsetY + parent.y * scale);
      context!.lineTo(offsetX + node.x * scale, offsetY + node.y * scale);
      context!.strokeStyle = ink;
      context!.lineWidth = node.kind === 'chapter' ? 2 : 1.4;
      context!.globalAlpha = node.dim ? .23 : .83;
      context!.stroke();
    }
  }

  function invalidate() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function fit(items: GraphNode[]) {
    const left = Math.min(...items.map(node => node.x));
    const right = Math.max(...items.map(node => node.x));
    const top = Math.min(...items.map(node => node.y));
    const bottom = Math.max(...items.map(node => node.y));
    // Leave space around the centres for labels and the toolbar.
    const toolbar = graph.querySelector<HTMLElement>('.book-graph-controls')!.offsetHeight + 22;
    scale = Math.max(.18, Math.min(1.24, (width - Math.min(235, width * .40)) / Math.max(1, right - left),
      (height - toolbar - 96) / Math.max(1, bottom - top)));
    offsetX = width / 2 - (left + right) * scale / 2;
    offsetY = (height + toolbar - 33) / 2 - (top + bottom) * scale / 2;
    invalidate();
  }

  function matchesQuery(node: GraphNode, query: string) {
    return `${node.el.dataset.graphNumber ?? ''} ${node.el.dataset.graphLabel}`.toLocaleLowerCase().includes(query);
  }

  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    const candidates = nodes.filter(node => sectionMode || node.kind !== 'section');
    const matches = query ? candidates.filter(node => matchesQuery(node, query)) : [];
    const focused = byId.get(selected);
    const related = new Set<string>();
    const addBranch = (node: GraphNode) => {
      related.add(node.id);
      let ancestor = byId.get(node.parent ?? '');
      while (ancestor) { related.add(ancestor.id); ancestor = byId.get(ancestor.parent ?? ''); }
      if (node.kind === 'chapter') candidates.filter(child => child.parent === node.id).forEach(child => related.add(child.id));
    };
    if (query) matches.forEach(addBranch);
    else if (focused) addBranch(focused);
    for (const node of nodes) {
      node.el.hidden = !sectionMode && node.kind === 'section';
      node.dim = (Boolean(query) || Boolean(focused)) && !related.has(node.id);
      node.el.classList.toggle('is-dim', node.dim);
      node.el.classList.toggle('is-selected', selected === node.id || matches.includes(node));
      if (node.el instanceof HTMLButtonElement) node.el.setAttribute('aria-pressed', String(selected === node.id));
    }
    modes.forEach(button => button.setAttribute('aria-pressed', String((button.dataset.graphMode === 'sections') === sectionMode)));
    status.textContent = query ? (matches.length ? `${matches.length} 个匹配节点` : '没有匹配节点')
      : focused ? `已聚焦 · ${focused.el.dataset.graphLabel}` : '';
    return { candidates, matches, related };
  }

  function relayout(reset = false) {
    const { candidates, related } = update();
    if (!simulation || reset || candidates.length !== visible.length) {
      simulation?.stop();
      arrange();
      visible = candidates;
      visible.forEach(node => {
        node.x = node.targetX; node.y = node.targetY;
        node.vx = node.vy = 0;
        node.fx = node.fy = null;
      });
      edges = visible.flatMap(node => {
        const parent = byId.get(node.parent ?? '');
        return parent ? [{ source: parent, target: node }] : [];
      });
      simulation = createLectureLayout(visible, edges).on('tick', invalidate);
      if (!paused) {
        simulation.tick(100);
        simulation.alpha(.1).restart();
      }
    }
    const visibleBranch = candidates.filter(node => related.has(node.id));
    fit(visibleBranch.length ? visibleBranch : candidates);
  }

  function resize() {
    width = stage.clientWidth;
    height = stage.clientHeight;
    ratio = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    relayout(true);
  }

  function zoom(factor: number, x = width / 2, y = height / 2) {
    const next = Math.max(.18, Math.min(3.5, scale * factor));
    offsetX = x - (x - offsetX) * next / scale;
    offsetY = y - (y - offsetY) * next / scale;
    scale = next;
    invalidate();
  }

  function showPauseState() {
    const text = paused ? '恢复物理模拟' : '暂停物理模拟';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', text);
    pause.title = text;
    pause.textContent = paused ? '▶' : 'Ⅱ';
  }

  graph.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest<HTMLButtonElement>('[data-graph-action], [data-graph-mode]');
    const item = event.target.closest<HTMLElement>('[data-graph-node]');
    if (item && moved && event.detail > 0) { event.preventDefault(); return; }
    if (item?.dataset.graphKind === 'root') {
      selected = '';
      search.value = '';
      relayout();
    }
    if (item?.dataset.graphKind === 'chapter') {
      const id = item.dataset.graphNode!;
      selected = selected === id ? '' : id;
      search.value = '';
      sectionMode = true;
      relayout();
    }
    if (control?.dataset.graphMode) {
      sectionMode = control.dataset.graphMode === 'sections';
      selected = '';
      relayout();
    }
    switch (control?.dataset.graphAction) {
      case 'in': zoom(1.26); break;
      case 'out': zoom(1 / 1.26); break;
      case 'reset': search.value = ''; selected = ''; relayout(); break;
      case 'pause':
        paused = !paused;
        showPauseState();
        if (paused) simulation?.stop();
        else simulation?.alpha(.3).restart();
        break;
    }
  });

  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    if (query && nodes.some(node => node.kind === 'section' && matchesQuery(node, query))) sectionMode = true;
    selected = '';
    relayout();
  });
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const { matches } = update();
    if (matches.length === 1) matches[0].el.focus({ preventScroll: true });
  });

  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = (event.target as Element).closest<HTMLElement>('[data-graph-node]');
    moved = false;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, node: byId.get(target?.dataset.graphNode ?? '') };
  });
  stage.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    if (!moved) {
      stage.setPointerCapture(event.pointerId);
      drag.node?.el.classList.add('is-dragging');
      if (drag.node && paused && !reducedMotion) { paused = false; showPauseState(); }
      if (drag.node && !paused) simulation?.alpha(Math.max(simulation.alpha(), .3)).alphaTarget(.2).restart();
    }
    moved = true;
    if (drag.node) {
      drag.node.fx = drag.node.x = (drag.node.fx ?? drag.node.x) + dx / scale;
      drag.node.fy = drag.node.y = (drag.node.fy ?? drag.node.y) + dy / scale;
    } else {
      offsetX += dx;
      offsetY += dy;
    }
    drag.x = event.clientX;
    drag.y = event.clientY;
    invalidate();
  });
  const endDrag = (event: PointerEvent) => {
    if (drag?.id !== event.pointerId) return;
    if (drag.node && moved) {
      drag.node.el.classList.remove('is-dragging');
      drag.node.fx = drag.node.fy = null;
      simulation?.alphaTarget(0);
    }
    drag = undefined;
  };
  window.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('lostpointercapture', endDrag);
  stage.addEventListener('wheel', event => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const rect = stage.getBoundingClientRect();
    zoom(event.deltaY < 0 ? 1.12 : 1 / 1.12, event.clientX - rect.left, event.clientY - rect.top);
  }, { passive: false });
  new MutationObserver(invalidate).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  showPauseState();
  resize();
  new ResizeObserver(resize).observe(stage);
}
