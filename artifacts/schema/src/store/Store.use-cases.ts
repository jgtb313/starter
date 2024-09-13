import { z } from '@/zod'

import { PaginationSchema, BasePaginationSchemaOutput } from '@/shared'
import { StoreSchema } from './Store.schema'

export const ListStoreSchema = StoreSchema.pick({}).and(PaginationSchema)
export const ListStoreSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(StoreSchema).default([]) })
export type ListStoreInput = z.infer<typeof ListStoreSchema>
export type ListStoreOutput = z.infer<typeof ListStoreSchemaOutput>

export const GetStoreSchema = StoreSchema.pick({ id: true })
export const GetStoreSchemaOutput = StoreSchema
export type GetStoreInput = z.infer<typeof GetStoreSchema>
export type GetStoreOutput = z.infer<typeof GetStoreSchemaOutput>

export const CreateStoreSchema = StoreSchema.pick({
  name: true,
  rcky: true,
  document: true
})
export const CreateStoreSchemaOutput = StoreSchema
export type CreateStoreInput = z.infer<typeof CreateStoreSchema>
export type CreateStoreOutput = z.infer<typeof CreateStoreSchemaOutput>

export const UpdateStoreSchema = StoreSchema.pick({
  id: true
}).merge(
  StoreSchema.pick({
    name: true,
    rcky: true,
    document: true
  }).partial()
)
export const UpdateStoreSchemaOutput = StoreSchema
export type UpdateStoreInput = z.infer<typeof UpdateStoreSchema>
export type UpdateStoreOutput = z.infer<typeof UpdateStoreSchemaOutput>

export const DeleteStoreSchema = StoreSchema.pick({
  id: true
})
export type DeleteStoreInput = z.infer<typeof DeleteStoreSchema>
export type DeleteStoreOutput = void
