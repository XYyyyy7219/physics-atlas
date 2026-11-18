import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const origin = 'https://atlas.test';
async function list(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? list(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await list(root);
const htmlFiles = files.filter(f => f.endsWith('.html'));
const docs = new Map(await Promise.all(htmlFiles.map(async f => [f, await readFile(f, 'utf8')])));
const failures = [];
let checked = 0;
for (const [file, html] of docs) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const pageUrl = new URL(`${base}/${relative.replace(/index\.html$/, '')}`, origin);
  assert.match(html, /<html[^>]+lang="zh-CN"/, `${relative}: Chinese language`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${relative}: one main heading`);
  for (const match of html.matchAll(/\b(href|src)="([^"<>]+)"/g)) {
    const raw = match[2].replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, pageUrl);
    if (url.origin !== origin) continue;
    const pathname = decodeURIComponent(url.pathname);
    if (base && !pathname.startsWith(base + '/') && pathname !== base) {
      failures.push(`${relative}: link outside base ${raw}`); continue;
    }
    let target = path.join(root, pathname.slice(base.length).replace(/^\//, ''));
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      checked++;
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = docs.get(target) || await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${id}"`)) failures.push(`${relative}: missing anchor ${raw}`);
      }
    } catch { failures.push(`${relative}: missing target ${raw}`); }
  }
}
assert.equal(failures.length, 0, failures.join('\n'));
assert.ok(files.some(f => f.endsWith(path.join('pagefind', 'pagefind.js'))), 'Search index exists');

// 使用网站实际的 Markdown 配置验证公式，不把测试正文发布到站点。
const renderer = await config.markdown.processor.createRenderer({ syntaxHighlight: false });
const rendered = await renderer.render('## 渲染检查\n\n行内 $x^2$。\n\n$$\n\\int_0^1 x\\,\\mathrm dx=\\frac12\n$$\n');
assert.match(rendered.code, /class="katex"/);
assert.match(rendered.code, /class="katex-display"/);
assert.doesNotMatch(rendered.code, /katex-error/);
assert.ok(rendered.metadata.headings.some(h => h.text === '渲染检查'));
console.log(`通过：${htmlFiles.length} 个页面，${checked} 个站内链接与资源，中文标题结构、搜索索引、行内与独立公式。`);
