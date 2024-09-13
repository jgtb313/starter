import { z } from '@/zod'

import { ID, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { ProductStatusEnum } from './Product.enums'

const Name = z.string().min(1)

const Code = z.string().min(1)

const Status = z.nativeEnum(ProductStatusEnum)

export const ProductSchema = z.object({
  id: ID,
  name: Name,
  code: Code,
  status: Status,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Product = z.infer<typeof ProductSchema>
