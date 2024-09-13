import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { ProductSchema } from '../product/Product.schema'
import { InventoryProductStatusEnum } from './InventoryProduct.enums'

const InventoryId = ID

const ProductId = ID

const Product = ProductSchema

const Unities = z.number().min(1)

const Status = z.nativeEnum(InventoryProductStatusEnum)

export const InventoryProductSchema = z.object({
  id: ID,
  inventoryId: InventoryId,
  productId: ProductId,
  product: Product,
  unities: Unities,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type InventoryProduct = z.infer<typeof InventoryProductSchema>
