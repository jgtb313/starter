import { z } from '@/zod'
import { isCreditCardNumberValid, isCreditCardExpirationDateValid, isCreditCardCVVValid } from '@starter/common'

export const BaseCreditCardSchema = z.object({
  number: z
    .string()
    .min(1)
    .refine((number) => isCreditCardNumberValid(number), { params: { i18n: 'invalid_credit_card_number' } }),
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
export type BaseCreditCard = z.infer<typeof BaseCreditCardSchema>

export const CreditCardSchema = BaseCreditCardSchema.and(z.object({ cvv: z.string().min(3).max(4) })).refine(
  ({ number, cvv }) => isCreditCardCVVValid(number, cvv),
  { path: ['cvv'], params: { i18n: 'invalid_credit_card_cvv' } },
)
export type CreditCard = z.infer<typeof CreditCardSchema>
