import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationNodeDatum } from 'd3-force';

export interface LayoutBody extends SimulationNodeDatum {
  kind: 'root' | 'chapter' | 'section';
  x: number;
  y: number;
}

export function createLectureLayout<T extends LayoutBody>(bodies: T[], links: { source: T; target: T }[]) {
  const centerX = bodies.reduce((sum, body) => sum + body.x, 0) / bodies.length;
  const centerY = bodies.reduce((sum, body) => sum + body.y, 0) / bodies.length;
  return forceSimulation(bodies)
    .force('links', forceLink<T, { source: T; target: T }>(links)
      .distance(({ target }) => target.kind === 'chapter' ? 210 : 135)
      .strength(.85))
    .force('charge', forceManyBody<T>().strength(body => body.kind === 'root' ? -850 : body.kind === 'chapter' ? -400 : -160))
    .force('center', forceCenter(centerX, centerY).strength(.18))
    .force('collision', forceCollide<T>().radius(body => body.kind === 'section' ? 30 : 43).strength(.85))
    .stop();
}
