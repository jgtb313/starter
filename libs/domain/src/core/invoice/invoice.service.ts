import type { Merge } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import type { Pagination } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import type { InvoiceInput } from '@/core/invoice/invoice.schema'
import type { UpcomingInvoice } from '@/core/invoice/invoice-upcoming.schema'
import { PlanService } from '@/core/plan/plan.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { LoggerService } from '@/adapters/logger'
import { RecurrenceService } from '@/adapters/recurrence'
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
		@Inject(forwardRef(() => PlanService))
		private readonly planService: PlanService,
		@Inject(RecurrenceService)
		private readonly recurrenceService: RecurrenceService,
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

	async getUpcomingInvoice(workspaceId: string): Promise<UpcomingInvoice> {
		const workspace = await this.workspaceService.getWorkspace(workspaceId)

		workspace.checkIfHasSubscription()

		const subscription = await this.subscriptionService.getSubscription(
			workspace.state.subscriptionId!,
		)

		const recurrenceUpcomingInvoice =
			await this.recurrenceService.getUpcomingInvoice({
				subscriptionId: subscription.state.externalId,
			})

		if (subscription.state.paymentMethod === 'CARD') {
			return {
				invoiceId: recurrenceUpcomingInvoice.invoiceId,
				workspaceId: workspace.state.workspaceId,
				subscriptionId: subscription.state.subscriptionId,
				planId: subscription.state.planId,
				plan: subscription.state.plan,
				paymentMethod: subscription.state.paymentMethod,
				card: subscription.state.card,
				amount: recurrenceUpcomingInvoice.amount,
				dueDate: recurrenceUpcomingInvoice.dueDate,
				status: recurrenceUpcomingInvoice.status,
			}
		}

		return {
			invoiceId: recurrenceUpcomingInvoice.invoiceId,
			workspaceId: workspace.state.workspaceId,
			subscriptionId: subscription.state.subscriptionId,
			planId: subscription.state.planId,
			plan: subscription.state.plan,
			paymentMethod: subscription.state.paymentMethod,
			amount: recurrenceUpcomingInvoice.amount,
			dueDate: recurrenceUpcomingInvoice.dueDate,
			status: recurrenceUpcomingInvoice.status,
		}
	}

	async createInvoice({
		workspaceId,
		subscriptionId,
		planId,
		...input
	}: InvoiceInput) {
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

		const plan = await this.planService.getPlan(planId)

		const invoice = await this.invoiceRepository.create({
			...input,
			workspaceId: workspace.state.workspaceId,
			subscriptionId: subscription.state.subscriptionId,
			planId: plan.state.planId,
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
		input: Partial<InvoiceInput>,
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
