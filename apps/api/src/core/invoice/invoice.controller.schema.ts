import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { InvoiceSchema } from '@starter/domain'
import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'

export const ListInvoicesSchema = createRequestSchema({
  query: PaginationSchema,
  output: BasePaginationSchemaOutput.merge(z.object({ values: z.array(InvoiceSchema) })),
})
export type ListInvoicesRequest = RequestInput<typeof ListInvoicesSchema>
