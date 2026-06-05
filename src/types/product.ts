import { z } from 'zod';

export const ProductMatchSchema = z.object({
  id: z.string(),
  originalName: z.string(), // Как товар назывался в файле клиента
  matchedName: z.string().nullable(), // Как товар называется в нашей базе (если найдено)
  matchScore: z.number().min(0).max(100), // Процент совпадения
  status: z.enum(['matched', 'review_needed', 'unmatched']),
})

export type ProductMatchResult = z.infer<typeof ProductMatchSchema>;

export const ProductMatchResponseSchema = z.array(ProductMatchSchema);