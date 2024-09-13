import { z } from '@/zod'

import { ProductSchema } from './Product.schema'

export const IndexProductSchema = ProductSchema.pick({})
export const IndexProductSchemaOutput = z.array(ProductSchema)
export type IndexProductInput = z.infer<typeof IndexProductSchema>
export type IndexProductOutput = z.infer<typeof IndexProductSchemaOutput>
