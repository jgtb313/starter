import { z } from '@/zod'
import { formatToCapitalized } from '@starter/shared'

import { ID, DocumentCNPJSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { StoreStatusEnum } from './Store.enums'

const Name = z
  .string()
  .min(1)
  .transform((value) => formatToCapitalized(value))

const Document = DocumentCNPJSchema

const RCKY = z.string().min(1)

const Status = z.nativeEnum(StoreStatusEnum)

export const StoreSchema = z.object({
  id: ID,
  name: Name,
  document: Document,
  rcky: RCKY,
  status: Status,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Store = z.infer<typeof StoreSchema>
