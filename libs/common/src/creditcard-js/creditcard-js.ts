import { isValid, isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber } from 'creditcard.js'

export type PaymentCard =
  | 'ALIPAY'
  | 'AMEX'
  | 'DINERS'
  | 'DISCOVER'
  | 'ELO'
  | 'HIPER'
  | 'HIPERCARD'
  | 'JCB'
  | 'MAESTRO'
  | 'MASTERCARD'
  | 'VISA'
  | 'GENERIC'

export const isPaymentCardNumberValid = (cardNumber: string) => isValid(cardNumber)

export const isPaymentCardExpirationDateValid = (month: string, year: string) => isExpirationDateValid(month, year)

export const isPaymentCardCVVValid = (cardNumber: string, cvv: string) => isSecurityCodeValid(cardNumber, cvv)

export const getPaymentCardName = (cardNumber: string): PaymentCard => {
  const mapping: Record<string, PaymentCard> = {
    'American Express': 'AMEX',
    Aura: 'GENERIC',
    Banescard: 'GENERIC',
    Cabal: 'GENERIC',
    Diners: 'DINERS',
    Discover: 'DISCOVER',
    Elo: 'ELO',
    Goodcard: 'GENERIC',
    Hipercard: 'HIPERCARD',
    Mastercard: 'MASTERCARD',
    Maxxvan: 'GENERIC',
    Visa: 'VISA',
  }

  const value = getCreditCardNameByNumber(cardNumber)

  return mapping[value] ?? 'GENERIC'
}
