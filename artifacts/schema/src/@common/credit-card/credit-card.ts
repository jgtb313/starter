import { z } from '@/zod'
import { isCreditCardNumberValid, isCreditCardExpirationDateValid, isCreditCardCVVValid } from '@starter/shared'

export const CreditCardSafeSchema = z.object({
  number: z
    .string()
    .min(1)
    .refine((number) => isCreditCardNumberValid(number), { path: ['number'], message: 'Número inválido' }),
  holderName: z.string().min(1),
  expirationDate: z
    .string()
    .min(5)
    .max(5)
    .refine(
      (expirationDate) => {
        if (!expirationDate) {
          return true
        }

        const [month, year] = expirationDate.split('/')

        return isCreditCardExpirationDateValid(month, year)
      },
      {
        path: ['expirationDate']
      }
    )
    .openapi({ example: '10/10' })
})

export const CreditCardSchema = CreditCardSafeSchema.and(z.object({ cvv: z.string().min(3).max(4) })).refine(
  ({ number, cvv }) => (number && cvv ? isCreditCardCVVValid(number, cvv) : true),
  { path: ['cvv'] }
)
