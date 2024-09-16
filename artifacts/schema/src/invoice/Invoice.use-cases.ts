import { z } from '@/zod'

import { FilterableSchema, PaginationSchema, BasePaginationSchemaOutput, SortSchema } from '@/common'
import { InvoiceSchema } from './Invoice.schema'

export const ListInvoicesSchema = InvoiceSchema.pick({})
  .and(PaginationSchema)
  .and(SortSchema)
  .and(
    z
      .object({
        filter: FilterableSchema(['plan.name'], { example: 'Plano Básico' })
      })
      .partial()
  )
export const ListInvoicesSchemaOutput = BasePaginationSchemaOutput.extend({ values: z.array(InvoiceSchema).default([]) })
export type ListInvoicesInput = z.infer<typeof ListInvoicesSchema>
export type ListInvoicesOutput = Promise<z.infer<typeof ListInvoicesSchemaOutput>>
