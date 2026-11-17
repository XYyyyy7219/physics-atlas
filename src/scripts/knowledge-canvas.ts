import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy';
import { select } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';
import { chapterLabel, getChapter, sectionLabel } from '../data/chapters';
import { statuses, type KnowledgeNode, type Status } from '../lib/atlas-model';

const worldWidth = 1050;
const worldHeight = 640;

type AtlasPartition = { label: string; children: AtlasPartition[] } | { label: string; item: KnowledgeNode };

export function renderKnowledgeCanvas(
  list: KnowledgeNode[],
  domainTitle: (id: string) => string,
  statusOf: (id: string) => Status,
  current: string | null,
  escape: (value: unknown) => string,
) {
  const groups = Object.entries(Object.groupBy(list, node => node.domain));
  const root: AtlasPartition = { label: '', children: groups.map(([domain, domainNodes]) => ({
    label: domainTitle(domain),
    children: Object.entries(Object.groupBy(domainNodes!, node => node.chapterId ?? '')).map(([chapterId, chapterNodes]) => {
      const chapter = getChapter(chapterId);
      return {
        label: chapter ? `${chapterLabel(chapter.order)} · ${chapter.title}` : '独立知识点',
        children: Object.entries(Object.groupBy(chapterNodes!, node => node.section?.order ?? 0)).map(([order, group]) => ({
          label: Number(order) ? `${sectionLabel(Number(order))} · ${group![0].section!.title}` : '未分节',
          children: group!.map(item => ({ label: item.title, item })),
        })),
      };
    }),
  })) };
  const tree = hierarchy<AtlasPartition>(root, node => 'children' in node ? node.children : undefined)
    .sum(node => 'item' in node ? 1 : 0);
  const layout = treemap<AtlasPartition>()
    .tile(treemapSquarify.ratio(1.3)).size([worldWidth, worldHeight])
    .paddingInner(node => node.depth === 3 ? 2 : 6)
    .paddingTop(node => node.depth ? 26 : 0)
    .paddingLeft(node => node.depth ? 6 : 0)
    .paddingRight(node => node.depth ? 6 : 0)
    .paddingBottom(node => node.depth ? 6 : 0)(tree);
  const areas = layout.descendants().slice(1).map(area => {
    const { data, depth, x0, y0, x1, y1 } = area;
    const position = `left:${x0}px;top:${y0}px;width:${x1 - x0}px;height:${y1 - y0}px`;
    if (!('item' in data)) return `<div class="atlas-partition layer-${depth}" aria-hidden="true" style="${position}"><span>${escape(data.label)}</span></div>`;
    const { item } = data;
    const status = statusOf(item.id);
    const label = `${item.title} · ${statuses[status]}${item.local ? ' · 个人条目' : ''}`;
    return `<button type="button" class="atlas-partition-tile ${status}${current === item.id ? ' is-current' : ''}" style="${position}" data-action="show-node" data-id="${escape(item.id)}" aria-label="${escape(label)}" title="${escape(label)}">${escape(item.title)}</button>`;
  });
  return `<div class="atlas-partition-viewport" tabindex="0" role="region" aria-label="知识库分区图"><div class="atlas-partition-sheet">${areas.join('')}</div></div>`;
}

export function bindKnowledgeCanvas(container: HTMLElement) {
  const viewport = container.querySelector<HTMLElement>('.atlas-partition-viewport');
  const sheet = viewport?.querySelector<HTMLElement>('.atlas-partition-sheet');
  if (!viewport || !sheet) return;
  const selection = select(viewport);
  let fitScale = 1;
  let current = zoomIdentity;
  let initial = true;
  const camera = zoom<HTMLElement, unknown>()
    .clickDistance(5)
    .on('zoom', event => {
      current = event.transform;
      sheet.style.transform = `translate(${current.x}px,${current.y}px) scale(${current.k})`;
      sheet.classList.toggle('is-overview', current.k < .53);
    });
  selection.call(camera).on('dblclick.zoom', null);

  function fit() {
    const w = viewport!.clientWidth, h = viewport!.clientHeight;
    fitScale = Math.max(.12, Math.min((w - 32) / worldWidth, (h - 108) / worldHeight));
    camera.scaleExtent([fitScale * .7, Math.max(2.8, fitScale * 6)]);
    selection.call(camera.transform, zoomIdentity.translate((w - worldWidth * fitScale) / 2, (h - worldHeight * fitScale) / 2).scale(fitScale));
  }
  function controls(event: MouseEvent) {
    const action = (event.target as Element).closest<HTMLElement>('[data-partition-zoom]')?.dataset.partitionZoom;
    if (action === 'fit') fit();
    if (action === 'in' || action === 'out') selection.call(camera.scaleBy, action === 'in' ? 1.3 : 1 / 1.3);
  }
  function focusTile(event: FocusEvent) {
    const tile = (event.target as Element).closest<HTMLButtonElement>('.atlas-partition-tile');
    if (!tile?.matches(':focus-visible')) return;
    const x = tile.offsetLeft + tile.offsetWidth / 2, y = tile.offsetTop + tile.offsetHeight / 2;
    const px = current.applyX(x), py = current.applyY(y);
    const w = viewport!.clientWidth, h = viewport!.clientHeight;
    if (px < 28 || px > w - 28 || py < 54 || py > h - 44) selection.call(camera.translateTo, x, y);
  }
  const resize = new ResizeObserver(() => { if (!initial) fit(); initial = false; });
  fit();
  resize.observe(viewport);
  viewport.addEventListener('focusin', focusTile);
  container.addEventListener('click', controls);
  return () => {
    resize.disconnect();
    viewport.removeEventListener('focusin', focusTile);
    container.removeEventListener('click', controls);
    selection.on('.zoom', null);
  };
}
