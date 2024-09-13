import { z } from '@/zod'

import { PaginationSchema, BasePaginationSchemaOutput } from '@/shared'
import { DeliveryProductSchema } from '../delivery-product'
import { DeliverySchema } from './Delivery.schema'

export const ListDeliverySchema = DeliverySchema.pick({ storeId: true }).merge(PaginationSchema)
export const ListDeliverySchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(DeliverySchema).default([]) })
export type ListDeliveryInput = z.infer<typeof ListDeliverySchema>
export type ListDeliveryOutput = z.infer<typeof ListDeliverySchemaOutput>

export const GetDeliverySchema = DeliverySchema.pick({ storeId: true, id: true })
export const GetDeliverySchemaOutput = DeliverySchema
export type GetDeliveryInput = z.infer<typeof GetDeliverySchema>
export type GetDeliveryOutput = z.infer<typeof GetDeliverySchemaOutput>

export const CreateDeliverySchema = DeliverySchema.pick({
  storeId: true
}).merge(
  z.object({
    deliveryProducts: z
      .array(
        DeliveryProductSchema.omit({
          id: true,
          invoice: true,
          invoiceProduct: true,
          status: true,
          createdAt: true,
          updatedAt: true
        })
      )
      .min(1)
  })
)
export const CreateDeliverySchemaOutput = DeliverySchema
export type CreateDeliveryInput = z.infer<typeof CreateDeliverySchema>
export type CreateDeliveryOutput = z.infer<typeof CreateDeliverySchemaOutput>

export const UpdateDeliverySchema = DeliverySchema.pick({
  storeId: true,
  id: true
}).merge(
  z.object({
    deliveryProducts: z
      .array(
        DeliveryProductSchema.omit({
          id: true,
          invoice: true,
          invoiceProduct: true,
          status: true,
          createdAt: true,
          updatedAt: true
        })
      )
      .min(1)
  })
)
export const UpdateDeliverySchemaOutput = DeliverySchema
export type UpdateDeliveryInput = z.infer<typeof UpdateDeliverySchema>
export type UpdateDeliveryOutput = z.infer<typeof UpdateDeliverySchemaOutput>

export const DeleteDeliverySchema = DeliverySchema.pick({
  storeId: true,
  id: true
})
export type DeleteDeliveryInput = z.infer<typeof DeleteDeliverySchema>
export type DeleteDeliveryOutput = void
