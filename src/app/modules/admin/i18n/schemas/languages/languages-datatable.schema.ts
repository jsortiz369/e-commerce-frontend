import z from 'zod';

import { LanguagesResponse, LanguageTable } from '../../interfaces';

export const languageDatatableSchema: z.ZodType<LanguageTable> = z
  .object({
    id: z.uuidv7(),
    name: z.string(),
    code: z.string(),
    image: z.string(),
    isActive: z.boolean(),
    isDefault: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict();

export const languagesDatatableSchema: z.ZodType<LanguagesResponse> = z
  .object({
    items: z.array(languageDatatableSchema),
    limit: z.number(),
    page: z.number(),
    total: z.number(),
    totalPages: z.number(),
  })
  .strict();
