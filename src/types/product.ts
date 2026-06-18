import { z } from 'zod';

export const ProductMatchSchema = z.object({
  id: z.string(),
  originalName: z.string(),
  matchedName: z.string().nullable(),
  matchScore: z.number().min(0).max(100),
  status: z.enum(['matched', 'review_needed', 'unmatched']),
})

export type ProductMatchResult = z.infer<typeof ProductMatchSchema>;

export const ProductMatchResponseSchema = z.array(ProductMatchSchema);