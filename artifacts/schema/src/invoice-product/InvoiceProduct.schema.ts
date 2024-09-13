import { z } from '@/zod'

import { ID, DateSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { ProductSchema } from '../product/Product.schema'
import { InvoiceProductStatusEnum } from './InvoiceProduct.enums'

const InvoiceId = ID

const ProductId = ID

const Product = ProductSchema

const Boxes = z.number()

const Value = z.number().nullish()

const ICMS = z.number().nullish()

const IPI = z.number().nullish()

const PIS = z.number().nullish()

const Confins = z.number().nullish()

const Lot = z.string().nullish()

const Validity = DateSchema.nullish()

const Status = z.nativeEnum(InvoiceProductStatusEnum)

export const InvoiceProductSchema = z.object({
  id: ID,
  invoiceId: InvoiceId,
  productId: ProductId,
  product: Product,
  boxes: Boxes,
  value: Value,
  icms: ICMS,
  ipi: IPI,
  pis: PIS,
  confins: Confins,
  lot: Lot,
  validity: Validity,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type InvoiceProduct = z.infer<typeof InvoiceProductSchema>
