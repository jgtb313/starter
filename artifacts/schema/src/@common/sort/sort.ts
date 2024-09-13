import { z } from '@/zod'

export enum SortEnum {
  ascend = 1,
  descend = -1
}

export const SortHttpSchema = z
  .object({
    sort: z
      .string()
      .optional()
      .refine((sort) => {
        if (!sort) {
          return true
        }

        return [!sort.startsWith(':'), sort.includes(':')].every(Boolean)
      })
      .refine((sort) => {
        if (!sort) {
          return true
        }

        return String(sort)
          .split(',')
          .every((s) => {
            const [order] = s.split(':').reverse()
            return ['ascend', 'descend'].includes(order || 'ascend')
          })
      })
  })
  .transform(({ sort }) => {
    return Object.fromEntries(
      String(sort ?? 'createdAt:descend')
        .split(',')
        .map((s) => {
          const [field, order] = s.split(':')
          return [field, SortEnum[(order || 'descend') as keyof typeof SortEnum]]
        })
    ) as Record<string, SortEnum>
  })
export type SortHttpInput = z.infer<typeof SortHttpSchema>

export const SortSchema = z.object({
  sort: z.record(z.string().trim().min(1), z.nativeEnum(SortEnum)).default({}).nullish()
})
export type SortInput = z.infer<typeof SortSchema>
