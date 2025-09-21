import { forwardRef, Inject, Injectable } from '@nestjs/common'
import type { Merge } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { I18nService } from '@starter/nestjs-i18n'
import type { Pagination } from '@starter/schema'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'

import type { BaseInvoice, Invoice } from '@/core/invoice/invoice.schema'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IInvoiceRepository } from '@/ports/database/invoice'

export type InvoiceWorkspaceReference = WithWorkspaceReference<'invoiceId'>
export const getInvoiceWorkspaceReference =
	createWorkspaceReference('invoiceId')

@Injectable()
export class InvoiceService {
	constructor(
		@Inject(I18nService)
		private readonly i18nService: I18nService,
		@Inject('INVOICE_REPOSITORY')
		private readonly invoiceRepository: IInvoiceRepository,
		@Inject(forwardRef(() => WorkspaceService))
		private readonly workspaceService: WorkspaceService,
		@Inject(forwardRef(() => SubscriptionService))
		private readonly subscriptionService: SubscriptionService,
	) {}

	example(): any {
		const hi = this.i18nService.current.hi({
			name: 'John',
			age: 20,
		})

		return {
			message: {
				hi,
			},
		}
	}

	async getPaginatedInvoices(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.invoiceRepository.findAllPaginated({
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
		const workspace = await this.workspaceService.getWorkspace(workspaceId)

		const subscription =
			await this.subscriptionService.getSubscription(subscriptionId)

		return this.invoiceRepository.create({
			...input,
			workspaceId: workspace.state.workspaceId,
			subscriptionId: subscription.state.subscriptionId,
		})
	}

	async updateInvoice(
		reference: InvoiceWorkspaceReference,
		input: Partial<Invoice>,
	) {
		const invoice = await this.getInvoice(reference)

		return this.invoiceRepository.updateById(invoice.state.invoiceId, input)
	}
}
