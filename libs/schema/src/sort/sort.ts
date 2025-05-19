import { z } from '@/zod'

export enum SortEnum {
  ascend = 1,
  descend = -1,
}

export const SortSchema = z.object({
  sort: z
    .record(z.string().trim().min(1), z.enum(SortEnum))
    .nullish()
    .refine((value) => (value ? !!Object.keys(value).length : true), { params: { i18n: 'invalid_type_received_undefined' } })
    .transform((value) => (value ? (Object.keys(value).length ? value : undefined) : undefined)),
})
export type Sort = z.infer<typeof SortSchema>

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
            return ['ascend', 'descend'].includes(order)
          })
      }),
  })
  .transform(({ sort }) => {
    return Object.fromEntries(
      String(sort || 'createdAt:descend')
        .split(',')
        .map((s) => {
          const [field, order] = s.split(':')
          return [field, SortEnum[order as keyof typeof SortEnum]]
        }),
    ) as Record<string, SortEnum>
  })
export type SortHttp = z.infer<typeof SortHttpSchema>
