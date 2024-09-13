import { z } from '@/zod'

import { SubscriptionSchema } from './Subscription.schema'
import { SubscriptionPaymentMethodEnum } from './Subscription.enums'

export const BaseCreateSubscriptionSchema = SubscriptionSchema.pick({
  planId: true,
  customer: true,
  paymentMethod: true
})
export const CreateSubscriptionSchema = BaseCreateSubscriptionSchema.and(
  z.object({
    cardToken: z
      .string()
      .min(1)
      .nullish()
      .openapi({
        description: `- required if paymentMethod is ${SubscriptionPaymentMethodEnum.CREDIT_CARD}`
      })
  })
).refine(
  ({ paymentMethod, cardToken }) => {
    if (paymentMethod !== SubscriptionPaymentMethodEnum.CREDIT_CARD) {
      return true
    }

    return !!cardToken
  },
  { path: ['cardToken'] }
)
export const CreateSubscriptionSchemaOutput = SubscriptionSchema
export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>
export type CreateSubscriptionOutput = Promise<z.infer<typeof CreateSubscriptionSchemaOutput>>
