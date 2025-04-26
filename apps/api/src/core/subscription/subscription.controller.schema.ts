import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import {
  ID,
  SubscriptionSchema,
  SubscriptionCreditCardSchema,
  SubscriptionDebitCardSchema,
  SubscriptionPixSchema,
  SubscriptionBoletoSchema,
} from '@starter/domain'
import { z } from '@starter/schema'

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
    SubscriptionCreditCardSchema.pick({ planId: true, payer: true, paymentMethod: true, creditCard: true }).meta({ title: 'SubscriptionCreditCard' }),
    SubscriptionDebitCardSchema.pick({ planId: true, payer: true, paymentMethod: true, debitCard: true }).meta({ title: 'SubscriptionDebitCard' }),
    SubscriptionPixSchema.pick({ planId: true, payer: true, paymentMethod: true, pix: true }).meta({ title: 'SubscriptionPix' }),
    SubscriptionBoletoSchema.pick({ planId: true, payer: true, paymentMethod: true, boleto: true }).meta({ title: 'SubscriptionBoleto' }),
  ]),
  output: SubscriptionSchema,
})
export type CreateSubscriptionRequest = RequestInput<typeof CreateSubscriptionSchema>

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
export type ChangeSubscriptionPlanRequest = RequestInput<typeof ChangeSubscriptionPlanSchema>

export const ChangeSubscriptionPaymentMethodSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
    subscriptionId: ID('subscription'),
  }),
  body: z.discriminatedUnion('paymentMethod', [
    SubscriptionCreditCardSchema.pick({ paymentMethod: true, creditCard: true }).meta({ title: 'SubscriptionCreditCard' }),
    SubscriptionDebitCardSchema.pick({ paymentMethod: true, debitCard: true }).meta({ title: 'SubscriptionDebitCard' }),
    SubscriptionPixSchema.pick({ paymentMethod: true, pix: true }).meta({ title: 'SubscriptionPix' }),
    SubscriptionBoletoSchema.pick({ paymentMethod: true, boleto: true }).meta({ title: 'SubscriptionBoleto' }),
  ]),
  output: SubscriptionSchema,
})
export type ChangeSubscriptionPaymentMethodRequest = RequestInput<typeof ChangeSubscriptionPaymentMethodSchema>

export const CancelSubscriptionSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
    subscriptionId: ID('subscription'),
  }),
  output: SubscriptionSchema,
})
export type CancelSubscriptionRequest = RequestInput<typeof CancelSubscriptionSchema>
