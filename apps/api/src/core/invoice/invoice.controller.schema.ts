import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'
import {
	BaseSchema,
	InvoiceSchema,
	UpcomingInvoiceSchema,
} from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

export const ListInvoicesSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
	}),
	query: z.object({}).partial().and(PaginationSchema),
	output: BasePaginationSchemaOutput.and(
		z.object({
			values: z.array(InvoiceSchema),
		}),
	),
})
export type ListInvoicesRequest = RequestInput<typeof ListInvoicesSchema>

export const GetUpcomingInvoiceSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
	}),
	output: UpcomingInvoiceSchema,
})
export type GetUpcomingInvoiceRequest = RequestInput<
	typeof GetUpcomingInvoiceSchema
>

export const GetInvoiceSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
		invoiceId: BaseSchema.id('invoice'),
	}),
	output: InvoiceSchema,
})
export type GetInvoiceRequest = RequestInput<typeof GetInvoiceSchema>
