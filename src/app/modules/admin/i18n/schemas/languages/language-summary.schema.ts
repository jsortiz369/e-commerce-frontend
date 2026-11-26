import z from 'zod';
import type { LanguageSummaryResponse } from '../../interfaces/language.interface';

export const languageSummaryResponseSchema: z.ZodType<LanguageSummaryResponse> = z
  .object({
    total: z.number(),
    totalVisibles: z.number(),
    translationProgress: z.number(),
    default: z
      .object({
        id: z.uuidv7(),
        code: z.string(),
        name: z.string(),
        image: z.string(),
      })
      .strict(),
  })
  .strict();
