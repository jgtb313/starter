import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { DeliveryStatusEnum } from './Delivery.enums'
import { DeliveryProductSchema } from '../delivery-product/DeliveryProduct.schema'
import { StoreSchema } from '../store/Store.schema'
import { UserSchema } from '../user/User.schema'

const StoreId = ID

const Store = StoreSchema

const CreatedById = ID

const CreatedBy = UserSchema

const Date = z.date()

const DeliveryProducts = z.array(DeliveryProductSchema).min(1)

const Status = z.nativeEnum(DeliveryStatusEnum)

export const DeliverySchema = z.object({
  id: ID,
  storeId: StoreId,
  store: Store,
  createdById: CreatedById,
  createdBy: CreatedBy,
  date: Date,
  deliveryProducts: DeliveryProducts,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Delivery = z.infer<typeof DeliverySchema>
