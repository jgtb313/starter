import { uuid } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import { PlanService } from '@/core/plan/plan.service'
import type {
	Subscription,
	SubscriptionBoleto,
	SubscriptionCard,
	SubscriptionPix,
} from '@/core/subscription/subscription.schema'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { RecurrenceService } from '@/adapters/recurrence'
import type { ISubscriptionRepository } from '@/ports/database/subscription'

type SubscriptionWorkspaceReference = WithWorkspaceReference<'subscriptionId'>
const getSubscriptionWorkspaceReference =
	createWorkspaceReference('subscriptionId')

type CreateSubscriptionInput =
	| (Pick<
			SubscriptionCard,
			'workspaceId' | 'planId' | 'paymentMethod' | 'payer'
	  > & {
			cardToken: string
	  })
	| Pick<SubscriptionPix, 'workspaceId' | 'planId' | 'paymentMethod' | 'payer'>
	| Pick<
			SubscriptionBoleto,
			'workspaceId' | 'planId' | 'paymentMethod' | 'payer'
	  >

type ChangeSubscriptionPaymentMethodInput =
	| (Pick<SubscriptionCard, 'paymentMethod'> & {
			cardToken: string
	  })
	| Pick<SubscriptionPix, 'paymentMethod'>
	| Pick<SubscriptionBoleto, 'paymentMethod'>

@Injectable()
export class SubscriptionService {
	constructor(
		@Inject('SUBSCRIPTION_REPOSITORY')
		private readonly subscriptionRepository: ISubscriptionRepository,
		@Inject(forwardRef(() => WorkspaceService))
		private readonly workspaceService: WorkspaceService,
		@Inject(forwardRef(() => PlanService))
		private readonly planService: PlanService,
		@Inject(RecurrenceService)
		private readonly recurrenceService: RecurrenceService,
	) {}

	async getSubscription(reference: SubscriptionWorkspaceReference) {
		const { subscriptionId, workspaceId } =
			getSubscriptionWorkspaceReference(reference)

		const subscription =
			await this.subscriptionRepository.findById(subscriptionId)

		if (workspaceId && subscription.state.workspaceId !== workspaceId) {
			throw new AclForbiddenException()
		}

		return subscription
	}

	async getUpcomingInvoice(reference: SubscriptionWorkspaceReference) {
		const subscription = await this.getSubscription(reference)

		const invoice = await this.recurrenceService.getUpcomingInvoice(
			subscription.state.subscriptionId,
		)

		return invoice
	}

	async createSubscription({
		workspaceId,
		planId,
		payer,
		...input
	}: CreateSubscriptionInput) {
		const workspace = await this.workspaceService.getWorkspace(workspaceId)

		const plan = await this.planService.getPlan(planId)

		plan.checkIfIsSignable()

		const { customerId: recurrenceExternalId } =
			await this.recurrenceService.createCustmer({
				workspaceId,
				name: payer.name,
				email: payer.email,
			})

		const subscriptionId = uuid()

		const recurrenceSubscription =
			await this.recurrenceService.createSubscription({
				referenceId: subscriptionId,
				customerId: recurrenceExternalId,
				planId: plan.state.externalId,
				payer,
				...input,
			})

		const nextBillingDate = new Date()
		const deadline = new Date()

		const subscription = await this.subscriptionRepository.create({
			...recurrenceSubscription,
			subscriptionId,
			workspaceId: workspace.state.workspaceId,
			planId: plan.state.planId,
			externalId: recurrenceSubscription.subscriptionId,
			payer,
			paymentMethod: input.paymentMethod,
			nextBillingDate,
			deadline,
			status: 'TRIAL',
		})

		await this.workspaceService.updateWorkspace(
			subscription.state.workspaceId,
			{
				recurrenceExternalId,
			},
		)

		return subscription
	}

	async changeSubscriptionPaymentMethod(
		reference: SubscriptionWorkspaceReference,
		input: ChangeSubscriptionPaymentMethodInput,
	) {
		const subscription = await this.getSubscription(reference)

		await this.recurrenceService.changeSubscriptionPaymentMethod({
			subscriptionId: subscription.state.subscriptionId,
			...input,
		})

		// subscription.markAsChangedPaymentMethod()

		const updatedSubscription = await this.subscriptionRepository.updateById(
			subscription.state.subscriptionId,
			subscription.state,
		)

		return updatedSubscription
	}

	async changeSubscriptionPlan(
		reference: SubscriptionWorkspaceReference,
		input: Pick<Subscription, 'planId'>,
	) {
		const subscription = await this.getSubscription(reference)
		const plan = await this.planService.getPlan(input.planId)

		plan.checkIfIsSignable()

		await this.recurrenceService.changeSubscriptionPlan({
			subscriptionId: subscription.state.subscriptionId,
			...input,
		})

		// subscription.markAsChangedPlan()

		const updatedSubscription = await this.subscriptionRepository.updateById(
			subscription.state.subscriptionId,
			subscription.state,
		)

		return updatedSubscription
	}

	async cancelSubscription(reference: SubscriptionWorkspaceReference) {
		const subscription = await this.getSubscription(reference)

		await this.recurrenceService.cancelSubscription({
			subscriptionId: subscription.state.subscriptionId,
		})

		// subscription.markAsCanceled()

		const updatedSubscription = await this.subscriptionRepository.updateById(
			subscription.state.subscriptionId,
			subscription.state,
		)

		return updatedSubscription
	}
}
