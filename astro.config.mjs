import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import { orderedCourses } from './src/data/courses.ts';

// Netlify / Cloudflare 可保持默认值；GitHub Pages 工作流会提供站点和子路径。
const site = process.env.SITE_URL || process.env.URL;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  trailingSlash: 'always',
  output: 'static',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }]],
    }),
  },
  integrations: [
    starlight({
      title: 'Physics Atlas',
      description: '从概念到定律，从直觉到推导。一本持续生长的中文物理知识库。',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      favicon: '/favicon.svg',
      customCss: ['katex/dist/katex.min.css', './src/styles/custom.css', './src/styles/workbench.css', './src/styles/courses.css'],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        SocialIcons: './src/components/HeaderLinks.astro',
        Hero: './src/components/AtlasHero.astro',
        Footer: './src/components/Footer.astro',
        Sidebar: './src/components/AtlasSidebar.astro',
        PageTitle: './src/components/CoursePageTitle.astro',
        PageSidebar: './src/components/CoursePageSidebar.astro',
        TwoColumnContent: './src/components/CourseColumns.astro',
        ThemeProvider: './src/components/AtlasThemeProvider.astro',
      },
      sidebar: [
        { label: '知识库首页', link: '/' },
        { label: '知识库', slug: 'library' },
        { label: '我的讲义', slug: 'my-lectures' },
        { label: '学习地图', slug: 'learning-map' },
        { label: '开始探索', items: [
          { label: '关于图谱', slug: 'start/welcome' },
          { label: '学习路线', slug: 'start/roadmap' },
        ] },
        ...orderedCourses.map(course => ({ label: `${String(course.order).padStart(2, '0')} · ${course.title}`, items: [{ autogenerate: { directory: course.id } }], collapsed: course.order !== 1 })),
        { label: '数学工具', items: [{ autogenerate: { directory: 'math' } }], collapsed: true },
        { label: '专题讲义', items: [{ autogenerate: { directory: 'lectures' } }], collapsed: true },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      credits: false,
    }),
  ],
});
