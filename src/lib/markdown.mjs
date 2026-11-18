import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const markdownProcessor = unified({
  remarkPlugins: [remarkMath],
  rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }]],
});
