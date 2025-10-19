import {
	type Profile,
	SubscriptionSchema,
	SubscriptionService,
	type User,
} from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject } from '@nestjs/common'

import { ACLService } from '@/support/access-control'
import { AuthenticatedProfile } from '@/support/decorators'
import {
	type CancelSubscriptionRequest,
	CancelSubscriptionSchema,
	type ChangeSubscriptionPaymentMethodRequest,
	ChangeSubscriptionPaymentMethodSchema,
	type ChangeSubscriptionPlanRequest,
	ChangeSubscriptionPlanSchema,
	type CreateSubscriptionRequest,
	CreateSubscriptionSchema,
	type GetSubscriptionRequest,
	GetSubscriptionSchema,
} from '@/core/subscription/subscription.controller.schema'

@Controller({
	name: 'Subscription',

	description: 'Handles operations for managing and retrieving subscriptions.',

	basePath: 'workspaces/:workspaceId/subscriptions',

	schemas: {
		Subscription: {
			schema: SubscriptionSchema,
		},
	},
})
export class SubscriptionController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(SubscriptionService)
		private readonly subscriptionService: SubscriptionService,
	) {}

	@Route({
		summary: 'Get Subscription',

		description: 'Retrieves a current subscription.',

		method: 'GET',
		path: '/:subscriptionId',

		parameters: {
			params: GetSubscriptionSchema.params,
		},

		responses: {
			200: {
				schema: GetSubscriptionSchema.output,
			},
		},
	})
	getSubscription(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetSubscriptionRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'subscription:read', {
			workspaceId: params.workspaceId,
		})

		return this.subscriptionService.getSubscription(params)
	}

	@Route({
		summary: 'Create Subscription',

		description: 'Creates a new subscription.',

		method: 'POST',

		parameters: {
			params: CreateSubscriptionSchema.params,
			body: CreateSubscriptionSchema.body,
		},

		responses: {
			200: {
				schema: CreateSubscriptionSchema.output,
			},
		},
	})
	createSubscription(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: CreateSubscriptionRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'subscription:create',
			{
				workspaceId: params.workspaceId,
			},
		)

		return this.subscriptionService.createSubscription({
			...params,
			...body,
		})
	}

	@Route({
		summary: 'Change Subscription Plan',

		description: 'Updates plan of an existing subscription by its ID.',

		method: 'POST',
		path: '/:subscriptionId/plan',

		parameters: {
			params: ChangeSubscriptionPlanSchema.params,
			body: ChangeSubscriptionPlanSchema.body,
		},

		responses: {
			200: {
				schema: ChangeSubscriptionPlanSchema.output,
			},
		},
	})
	changeSubscriptionPlan(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: ChangeSubscriptionPlanRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'subscription:update:plan',
			{
				workspaceId: params.workspaceId,
			},
		)

		return this.subscriptionService.changeSubscriptionPlan(
			params.workspaceId,
			body,
		)
	}

	@Route({
		summary: 'Change Subscription Payment Method',

		description:
			'Updates payment method of an existing subscription by its ID.',

		method: 'POST',
		path: '/:subscriptionId/payment-method',

		parameters: {
			params: ChangeSubscriptionPaymentMethodSchema.params,
			body: ChangeSubscriptionPaymentMethodSchema.body,
		},

		responses: {
			200: {
				schema: ChangeSubscriptionPaymentMethodSchema.output,
			},
		},
	})
	changeSubscriptionPaymentMethod(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: ChangeSubscriptionPaymentMethodRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'subscription:update:payment-method',
			{
				workspaceId: params.workspaceId,
			},
		)

		return this.subscriptionService.changeSubscriptionPaymentMethod(
			params.workspaceId,
			{} as any,
		)
	}

	@Route({
		summary: 'Cancel Subscription',

		description: 'Cancels an existing subscription by its ID.',

		method: 'DELETE',
		path: '/:subscriptionId',

		parameters: {
			params: CancelSubscriptionSchema.params,
		},

		responses: {
			200: {
				schema: CancelSubscriptionSchema.output,
			},
		},
	})
	cancelSubscription(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: CancelSubscriptionRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'subscription:delete',
			{
				workspaceId: params.workspaceId,
			},
		)

		return this.subscriptionService.cancelSubscription(params.workspaceId)
	}
}
