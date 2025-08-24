import { ID, InvoiceSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'

export const ListInvoicesSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
	}),
	query: PaginationSchema,
	output: BasePaginationSchemaOutput.merge(
		z.object({
			values: z.array(InvoiceSchema),
		}),
	),
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
