import {
	InvoiceSchema,
	InvoiceService,
	type Profile,
	UpcomingInvoiceSchema,
} from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject, UseGuards } from '@nestjs/common'

import { ACLService } from '@/support/access-control'
import { AuthenticatedProfile } from '@/support/decorators'
import { AuthGuard } from '@/support/guards/auth-guard'
import {
	type GetInvoiceRequest,
	GetInvoiceSchema,
	type GetUpcomingInvoiceRequest,
	GetUpcomingInvoiceSchema,
	type ListInvoicesRequest,
	ListInvoicesSchema,
} from '@/core/invoice/invoice.controller.schema'

@Controller({
	name: 'Invoice',

	description: 'Handles operations for managing and retrieving invoices.',

	basePath: '/workspaces/:workspaceId/invoices',

	schemas: {
		Invoice: {
			schema: InvoiceSchema,
		},
		UpcomingInvoice: {
			schema: UpcomingInvoiceSchema,
		},
	},
})
@UseGuards(AuthGuard)
export class InvoiceController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(InvoiceService)
		private readonly invoiceService: InvoiceService,
	) {}

	@Route({
		summary: 'List Invoices',

		description: 'Retrieves a list of invoices.',

		method: 'GET',

		parameters: {
			params: ListInvoicesSchema.params,
			query: ListInvoicesSchema.query,
		},

		responses: {
			200: {
				schema: ListInvoicesSchema.output,
			},
		},
	})
	async listInvoices(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, query, pagination }: ListInvoicesRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'invoice:read', {
			workspaceId: params.workspaceId,
		})

		return this.invoiceService.getPaginatedInvoices({
			...query,
			...pagination,
		})
	}

	@Route({
		summary: 'Get Upcoming Invoice',

		description: 'Retrieves the upcoming invoice for a workspace.',

		method: 'GET',

		path: '/upcoming',

		parameters: {
			params: GetUpcomingInvoiceSchema.params,
		},

		responses: {
			200: {
				schema: GetUpcomingInvoiceSchema.output,
			},
		},
	})
	getUpcomingInvoice(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetUpcomingInvoiceRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'invoice:read', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Get Invoice',

		description: 'Retrieves a single invoice by their ID.',

		method: 'GET',

		path: '/:invoiceId',

		parameters: {
			params: GetInvoiceSchema.params,
		},

		responses: {
			200: {
				schema: GetInvoiceSchema.output,
			},
		},
	})
	getInvoice(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetInvoiceRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'invoice:read', {
			workspaceId: params.workspaceId,
		})

		return this.invoiceService.getInvoice(params)
	}
}
