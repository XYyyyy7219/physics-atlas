import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: z.object({
    atlas: z.object({
      id: z.string().min(1).refine(id => !id.startsWith('local-'), 'local- 为个人条目保留'),
      domain: z.enum(['mechanics', 'electromagnetism', 'thermodynamics', 'optics', 'atomic-physics', 'math']),
      kind: z.enum(['concept', 'law', 'method', 'example']).default('concept'),
      requires: z.array(z.string()).default([]),
      variants: z.array(z.object({ id: z.string(), title: z.string(), requires: z.array(z.string()).default([]) })).default([]),
    }).optional(),
  }) }) }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
