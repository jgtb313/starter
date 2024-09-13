import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { StoreSchema } from '../store/Store.schema'
import { UserSchema } from '../user/User.schema'
import { InventoryProductSchema } from '../inventory-product/InventoryProduct.schema'
import { InventoryStatusEnum } from './Inventory.enums'

const StoreId = ID

const Store = StoreSchema

const CreatedById = ID

const CreatedBy = UserSchema

const Date = z.date()

const InventoryProducts = z.array(InventoryProductSchema).default([])

const Status = z.nativeEnum(InventoryStatusEnum)

export const InventorySchema = z.object({
  id: ID,
  storeId: StoreId,
  store: Store,
  createdById: CreatedById,
  createdBy: CreatedBy,
  date: Date,
  inventoryProducts: InventoryProducts,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Inventory = z.infer<typeof InventorySchema>
