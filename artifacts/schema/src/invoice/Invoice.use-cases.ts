import { z } from '@/zod'

import { FilterableSchema, BooleanSchema, PaginationSchema, BasePaginationSchemaOutput } from '@/shared'
import { InvoiceSchema } from './Invoice.schema'
import { BatchInvoicesFileStatusEnum, BatchInvoicesStatusEnum } from './Invoice.enums'

export const ListInvoiceSchema = InvoiceSchema.pick({
  storeId: true
})
  .merge(PaginationSchema)
  .merge(
    z.object({
      filter: FilterableSchema(['number'], '001366400'),
      delivered: BooleanSchema.nullish().openapi({ description: 'Results to return only delivered invoices' })
    })
  )
export const ListInvoiceSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(InvoiceSchema).default([]) })
export type ListInvoiceInput = z.infer<typeof ListInvoiceSchema>
export type ListInvoiceOutput = z.infer<typeof ListInvoiceSchemaOutput>

export const BatchInvoicesSchema = InvoiceSchema.pick({
  storeId: true
}).merge(
  z.object({
    files: z
      .array(z.any().openapi({ description: 'Accepts only XML format' }))
      .min(1)
      .max(20)
  })
)
export const BatchInvoicesSchemaOutput = z.object({
  files: z.array(
    z.object({
      filename: z.string(),
      message: z.string(),
      status: z.nativeEnum(BatchInvoicesFileStatusEnum)
    })
  ),
  status: z.nativeEnum(BatchInvoicesStatusEnum)
})
export type BatchInvoicesInput = z.infer<typeof BatchInvoicesSchema>
export type BatchInvoicesOutput = z.infer<typeof BatchInvoicesSchemaOutput>

export const DeleteInvoiceSchema = InvoiceSchema.pick({
  storeId: true,
  id: true
})
export type DeleteInvoiceInput = z.infer<typeof DeleteInvoiceSchema>
export type DeleteInvoiceOutput = void
