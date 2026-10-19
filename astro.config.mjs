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
        { label: '知识库', items: [{ label: '普通物理', items: orderedCourses.map(course => ({ label: course.title, slug: course.id })) }] },
        { label: '我的讲义', slug: 'my-lectures' },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      credits: false,
    }),
  ],
});
