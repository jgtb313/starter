import {
	ID,
	SubscriptionBoletoSchema,
	SubscriptionCardSchema,
	SubscriptionPixSchema,
	SubscriptionSchema,
} from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import { PaymentCardTokenSchema, z } from '@starter/schema'

export const GetSubscriptionSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
		subscriptionId: ID('subscription'),
	}),
	output: SubscriptionSchema,
})
export type GetSubscriptionRequest = RequestInput<typeof GetSubscriptionSchema>

export const CreateSubscriptionSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
	}),
	body: z.discriminatedUnion('paymentMethod', [
		SubscriptionCardSchema.pick({
			planId: true,
			payer: true,
			paymentMethod: true,
		})
			.extend({
				cardToken: PaymentCardTokenSchema,
			})
			.meta({
				title: 'SubscriptionCard',
			}),
		SubscriptionPixSchema.pick({
			planId: true,
			payer: true,
			paymentMethod: true,
		}).meta({
			title: 'SubscriptionPix',
		}),
		SubscriptionBoletoSchema.pick({
			planId: true,
			payer: true,
			paymentMethod: true,
		}).meta({
			title: 'SubscriptionBoleto',
		}),
	]),
	output: SubscriptionSchema,
})
export type CreateSubscriptionRequest = RequestInput<
	typeof CreateSubscriptionSchema
>

export const ChangeSubscriptionPlanSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
		subscriptionId: ID('subscription'),
	}),
	body: z.object({
		planId: ID('plan'),
	}),
	output: SubscriptionSchema,
})
export type ChangeSubscriptionPlanRequest = RequestInput<
	typeof ChangeSubscriptionPlanSchema
>

export const ChangeSubscriptionPaymentMethodSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
		subscriptionId: ID('subscription'),
	}),
	body: z.discriminatedUnion('paymentMethod', [
		SubscriptionCardSchema.pick({
			paymentMethod: true,
		})
			.extend({
				cardToken: PaymentCardTokenSchema,
			})
			.meta({
				title: 'SubscriptionCard',
			}),
		SubscriptionPixSchema.pick({
			paymentMethod: true,
		}).meta({
			title: 'SubscriptionPix',
		}),
		SubscriptionBoletoSchema.pick({
			paymentMethod: true,
		}).meta({
			title: 'SubscriptionBoleto',
		}),
	]),
	output: SubscriptionSchema,
})
export type ChangeSubscriptionPaymentMethodRequest = RequestInput<
	typeof ChangeSubscriptionPaymentMethodSchema
>

export const CancelSubscriptionSchema = createRequestSchema({
	params: z.object({
		workspaceId: ID('workspace'),
		subscriptionId: ID('subscription'),
	}),
	output: SubscriptionSchema,
})
export type CancelSubscriptionRequest = RequestInput<
	typeof CancelSubscriptionSchema
>
