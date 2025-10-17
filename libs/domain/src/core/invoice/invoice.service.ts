import type { Merge } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import type { Pagination } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import type { BaseInvoice, Invoice } from '@/core/invoice/invoice.schema'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { LoggerService } from '@/adapters/logger'
import type { IInvoiceRepository } from '@/ports/database/invoice'

export type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
export const getInvoiceWorkspaceReference =
	createWorkspaceReference('invoiceId')

@Injectable()
export class InvoiceService {
	constructor(
		@Inject('INVOICE_REPOSITORY')
		private readonly invoiceRepository: IInvoiceRepository,
		@Inject(forwardRef(() => WorkspaceService))
		private readonly workspaceService: WorkspaceService,
		@Inject(forwardRef(() => SubscriptionService))
		private readonly subscriptionService: SubscriptionService,
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
	) {}

	async getPaginatedInvoices(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.invoiceRepository.findPaginated({
			...input,
		})
	}

	async getInvoice(reference: InvoiceWorkspaceReference) {
		const { invoiceId, workspaceId } = getInvoiceWorkspaceReference(reference)

		const invoice = await this.invoiceRepository.findById(invoiceId)

		if (workspaceId && invoice.state.workspaceId !== workspaceId) {
			throw new AclForbiddenException()
		}

		return invoice
	}

	async createInvoice({ workspaceId, subscriptionId, ...input }: BaseInvoice) {
		this.loggerService.info('Attempting to create invoice', {
			workspaceId,
			subscriptionId,
			input,
		})

		const workspace = await this.workspaceService.getWorkspace(workspaceId)

		const subscription = await this.subscriptionService.getSubscription({
			workspaceId,
			subscriptionId,
		})

		const invoice = await this.invoiceRepository.create({
			...input,
			workspaceId: workspace.state.workspaceId,
			subscriptionId: subscription.state.subscriptionId,
		})

		this.loggerService.info('Invoice has been created', {
			invoiceId: invoice.state.invoiceId,
			workspaceId,
			subscriptionId,
		})

		return invoice
	}

	async updateInvoice(
		reference: InvoiceWorkspaceReference,
		input: Partial<Invoice>,
	) {
		const invoice = await this.getInvoice(reference)

		const updatedInvoice = await this.invoiceRepository.updateById(
			invoice.state.invoiceId,
			input,
		)

		this.loggerService.info('Invoice has been updated', {
			invoiceId: invoice.state.invoiceId,
		})

		return updatedInvoice
	}
}
