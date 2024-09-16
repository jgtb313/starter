import { z } from '@/zod'

import { SubscriptionSchema } from './Subscription.schema'
import { SubscriptionPaymentMethodEnum } from './Subscription.enums'

export const CreateSubscriptionSchema = SubscriptionSchema.pick({
  planId: true,
  customer: true,
  paymentMethod: true
}).merge(
  z.object({
    cardToken: z
      .string()
      .min(1)
      .nullish()
      .openapi({
        description: `- required if paymentMethod is ${SubscriptionPaymentMethodEnum.CREDIT_CARD}`
      })
  })
)
// .refine(({ paymentMethod, cardToken }) => paymentMethod !== SubscriptionPaymentMethodEnum.CREDIT_CARD || !!cardToken, { path: ['cardToken'] })
export const CreateSubscriptionSchemaOutput = SubscriptionSchema
export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>
export type CreateSubscriptionOutput = Promise<z.infer<typeof CreateSubscriptionSchemaOutput>>

export const ChangeSubscriptionPlanSchema = SubscriptionSchema.pick({
  id: true,
  planId: true
})
export const ChangeSubscriptionPlanSchemaOutput = SubscriptionSchema
export type ChangeSubscriptionPlanInput = z.infer<typeof ChangeSubscriptionPlanSchema>
export type ChangeSubscriptionPlanOutput = Promise<z.infer<typeof ChangeSubscriptionPlanSchemaOutput>>

export const ChangeSubscriptionPaymentMethodSchema = SubscriptionSchema.pick({
  id: true,
  paymentMethod: true
}).merge(
  z.object({
    cardToken: z
      .string()
      .min(1)
      .nullish()
      .openapi({
        description: `- required if paymentMethod is ${SubscriptionPaymentMethodEnum.CREDIT_CARD}`
      })
  })
)
// .refine(({ paymentMethod, cardToken }) => paymentMethod !== SubscriptionPaymentMethodEnum.CREDIT_CARD || !!cardToken, { path: ['cardToken'] })
export const ChangeSubscriptionPaymentMethodSchemaOutput = SubscriptionSchema
export type ChangeSubscriptionPaymentMethodInput = z.infer<typeof ChangeSubscriptionPaymentMethodSchema>
export type ChangeSubscriptionPaymentMethodOutput = Promise<z.infer<typeof ChangeSubscriptionPaymentMethodSchemaOutput>>

export const CancelSubscriptionSchema = SubscriptionSchema.pick({
  id: true
})
export const CancelSubscriptionSchemaOutput = SubscriptionSchema
export type CancelSubscriptionInput = z.infer<typeof CancelSubscriptionSchema>
export type CancelSubscriptionOutput = Promise<z.infer<typeof CancelSubscriptionSchemaOutput>>
