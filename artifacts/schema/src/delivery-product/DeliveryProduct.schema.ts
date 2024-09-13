import { z } from '@/zod'

import { ID, DateSchema, CreatedAtSchema, UpdatedAtSchema } from '@/shared'
import { DeliveryProductStatusEnum } from './DeliveryProduct.enums'
import { InvoiceProductSchema } from '../invoice-product/InvoiceProduct.schema'
import { InvoiceSchema } from '../invoice/Invoice.schema'
import { ProductSchema } from '../product/Product.schema'

const InvoiceId = ID.nullish()

const Invoice = InvoiceSchema.nullish()

const InvoiceProductId = ID.nullish()

const InvoiceProduct = InvoiceProductSchema.nullish()

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

const Status = z.nativeEnum(DeliveryProductStatusEnum)

export const DeliveryProductSchema = z.object({
  id: ID,
  invoiceId: InvoiceId,
  invoice: Invoice,
  invoiceProductId: InvoiceProductId,
  invoiceProduct: InvoiceProduct,
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
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type DeliveryProduct = z.infer<typeof DeliveryProductSchema>
