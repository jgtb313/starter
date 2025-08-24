import { z } from '@/zod'

const maxLimit = (limit: number) => (limit > 100 ? 100 : limit)

export const PaginationSchema = z.object({
  offset: z.coerce.number().optional().meta({ description: 'Number of items to skip in the result set.' }),
  limit: z.coerce.number().optional().meta({ description: 'Maximum number of items to return.' }),
})

export const PaginationSchemaTransform = PaginationSchema.transform((pagination) => {
  return {
    offset: Number(pagination.offset ?? 0),
    limit: pagination.limit ? (Number(pagination.limit) > 0 ? maxLimit(Number(pagination.limit)) : 10) : 10,
  }
})

const PaginationMeta = z.object({
  total: z.number().default(0).meta({ example: 150 }),
  offset: z.number().default(0).meta({ example: 20 }),
  limit: z.number().default(0).meta({ example: 10 }),
})

export const BasePaginationSchemaOutput = z.object({
  values: z.array(z.unknown()).default([]),
  meta: PaginationMeta.default({
    total: 0,
    offset: 0,
    limit: 0,
  }),
})

export type Pagination = Partial<z.infer<typeof PaginationSchema>>
export type PaginationOutput<T> = {
  values: T[]
  meta: z.infer<typeof PaginationMeta>
}
