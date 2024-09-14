import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { InvoiceStatusEnum } from './Invoice.enums'

const Status = z.nativeEnum(InvoiceStatusEnum)

export const InvoiceSchema = z.object({
  id: ID,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Invoice = z.infer<typeof InvoiceSchema>
