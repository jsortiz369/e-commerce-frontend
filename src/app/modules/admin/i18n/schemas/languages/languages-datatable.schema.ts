import z from 'zod';

import { LanguagesResponse } from '../../interfaces';

const languageDatatableSchema = z
  .object({
    id: z.uuidv7(),
    name: z.string(),
    code: z.string(),
    image: z.string(),
    isActive: z.boolean(),
    isDefault: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
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
