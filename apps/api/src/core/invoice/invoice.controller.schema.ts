import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { ID, InvoiceSchema } from '@starter/domain'
import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'

export const ListInvoicesSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
  }),
  query: PaginationSchema,
  output: BasePaginationSchemaOutput.extend(z.object({ values: z.array(InvoiceSchema) })),
})
export type ListInvoicesRequest = RequestInput<typeof ListInvoicesSchema>

export const GetInvoiceSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
    invoiceId: ID('invoice'),
  }),
  output: InvoiceSchema,
})
export type GetInvoiceRequest = RequestInput<typeof GetInvoiceSchema>
