import { z } from '@/zod'
import { isCreditCardNumberValid, isCreditCardExpirationDateValid, isCreditCardCVVValid } from '@starter/common'

export const BasePaymentCardSchema = z.object({
  number: z
    .string()
    .min(1)
    .refine((number) => isCreditCardNumberValid(number), { params: { i18n: 'invalid_payment_card_number' } }),
  holderName: z.string().min(1),
  expirationDate: z
    .string()
    .min(5)
    .max(5)
    .refine(
      (expirationDate) => {
        const [month, year] = expirationDate.split('/')
        return isCreditCardExpirationDateValid(month, year)
      },
      {
        params: { i18n: 'invalid_date' },
      },
    )
    .openapi({ example: '10/10' }),
})
export type BasePaymentCard = z.infer<typeof BasePaymentCardSchema>

export const PaymentCardSchema = BasePaymentCardSchema.and(z.object({ cvv: z.string().min(3).max(4) })).refine(
  ({ number, cvv }) => isCreditCardCVVValid(number, cvv),
  { path: ['cvv'], params: { i18n: 'invalid_payment_card_cvv' } },
)
export type PaymentCard = z.infer<typeof PaymentCardSchema>
