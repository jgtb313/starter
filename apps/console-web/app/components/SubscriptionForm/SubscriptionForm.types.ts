import { z, BaseCreateSubscriptionSchema, CreditCardSchema, SubscriptionPaymentMethodEnum } from '@ss/schema'
import { FormProps } from '@ss/components'

export const SubscriptionFormSchema = z
  .object({
    card: CreditCardSchema.nullish()
  })
  .and(BaseCreateSubscriptionSchema)
  .refine(
    ({ paymentMethod, card }) => {
      if (paymentMethod !== SubscriptionPaymentMethodEnum.CREDIT_CARD) {
        return true
      }

      return !!card
    },
    { path: ['card'] }
  )

export type SubscriptionFormInput = z.infer<typeof SubscriptionFormSchema>

export type SubscriptionFormProps = Omit<FormProps<SubscriptionFormInput>, 'children'> & {
  planId: string
}
