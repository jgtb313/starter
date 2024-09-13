import { z } from '@/zod'

import { PaginationSchema, BasePaginationSchemaOutput } from '@/shared'
import { InventorySchema } from './Inventory.schema'

export const ListInventorySchema = InventorySchema.pick({ storeId: true }).merge(PaginationSchema)
export const ListInventorySchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(InventorySchema).default([]) })
export type ListInventoryInput = z.infer<typeof ListInventorySchema>
export type ListInventoryOutput = z.infer<typeof ListInventorySchemaOutput>

export const GetInventorySchema = InventorySchema.pick({ storeId: true, id: true })
export const GetInventorySchemaOutput = InventorySchema
export type GetInventoryInput = z.infer<typeof GetInventorySchema>
export type GetInventoryOutput = z.infer<typeof GetInventorySchemaOutput>

export const CreateInventorySchema = InventorySchema.pick({
  storeId: true
})
export const CreateInventorySchemaOutput = InventorySchema
export type CreateInventoryInput = z.infer<typeof CreateInventorySchema>
export type CreateInventoryOutput = z.infer<typeof CreateInventorySchemaOutput>

export const UpdateInventorySchema = InventorySchema.pick({
  storeId: true,
  id: true
})
export const UpdateInventorySchemaOutput = InventorySchema
export type UpdateInventoryInput = z.infer<typeof UpdateInventorySchema>
export type UpdateInventoryOutput = z.infer<typeof UpdateInventorySchemaOutput>

export const DeleteInventorySchema = InventorySchema.pick({
  storeId: true,
  id: true
})
export type DeleteInventoryInput = z.infer<typeof DeleteInventorySchema>
export type DeleteInventoryOutput = void
