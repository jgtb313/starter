import { z } from '@/zod'
import { isPaymentCardNumberValid, isPaymentCardExpirationDateValid, isPaymentCardCVVValid } from '@starter/common'

const Number = z
  .string()
  .min(1)
  .refine((number) => isPaymentCardNumberValid(number), { params: { i18n: 'invalid_payment_card_number' } })

const HolderName = z.string().min(1)

const ExpirationDate = z.string().refine(
  (expirationDate) => {
    const [month, year] = expirationDate.split('/')
    return isPaymentCardExpirationDateValid(month, year)
  },
  {
    params: { i18n: 'invalid_payment_expiration_date' },
  },
)

const CVV = z.string().min(1)

export const BasePaymentCardSchema = z.object({
  number: Number.meta({
    description: 'Masked card number for secure display.',
    examples: ['5555 ********* 55'],
  }),
  holderName: HolderName.meta({
    description: 'Name of the cardholder as printed on the card.',
    examples: ['John Doe'],
  }),
  expirationDate: ExpirationDate.meta({
    description: 'Card expiration date in MM/YY format.',
    examples: ['12/27'],
  }),
})
export type BasePaymentCard = z.infer<typeof BasePaymentCardSchema>

export const PaymentCardSchema = z
  .object({
    number: Number.meta({
      description: 'Full credit card number.',
      examples: ['5555555555554444'],
    }),
    holderName: HolderName.meta({
      description: 'Name of the cardholder as printed on the card.',
      examples: ['John Doe'],
    }),
    expirationDate: ExpirationDate.meta({
      description: 'Card expiration date in MM/YY format.',
      examples: ['12/27'],
    }),
    cvv: CVV.meta({
      description: 'Card Verification Value (CVV), usually 3 or 4 digits.',
      examples: ['123'],
    }),
  })
  .refine(({ number, cvv }) => isPaymentCardCVVValid(number, cvv), {
    path: ['cvv'],
    params: { i18n: 'invalid_payment_card_cvv' },
  })
export type PaymentCard = z.infer<typeof PaymentCardSchema>
