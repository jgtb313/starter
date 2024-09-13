import { z } from '@/zod'

import { ID, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { StoreSchema } from '../store/Store.schema'
import { InvoiceProductSchema } from '../invoice-product/InvoiceProduct.schema'
import { InvoiceStatusEnum } from './Invoice.enums'

const StoreId = ID

const Store = StoreSchema

const InvoiceProducts = z.array(InvoiceProductSchema).default([])

const Number = z.number()

const Boxes = z.number()

const Value = z.number().nullish()

const ICMS = z.number().nullish()

const IPI = z.number().nullish()

const PIS = z.number().nullish()

const Confins = z.number().nullish()

const Delivered = z.boolean()

const Status = z.nativeEnum(InvoiceStatusEnum)

export const InvoiceSchema = z.object({
  id: ID,
  storeId: StoreId,
  store: Store,
  invoiceProducts: InvoiceProducts,
  number: Number,
  boxes: Boxes,
  value: Value,
  icms: ICMS,
  ipi: IPI,
  pis: PIS,
  confins: Confins,
  delivered: Delivered,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Invoice = z.infer<typeof InvoiceSchema>
