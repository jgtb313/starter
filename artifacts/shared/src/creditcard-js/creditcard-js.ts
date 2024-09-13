import { isValid, isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber } from 'creditcard.js'

export type CreditCard =
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

export const isCreditCardNumberValid = (cardNumber: string) => isValid(cardNumber)

export const isCreditCardExpirationDateValid = (month: string, year: string) => isExpirationDateValid(month, year)

export const isCreditCardCVVValid = (cardNumber: string, cvv: string) => isSecurityCodeValid(cardNumber, cvv)

export const getCreditCardName = (cardNumber: string): CreditCard => {
  const mapping: Record<string, CreditCard> = {
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
    Visa: 'VISA'
  }

  const value = getCreditCardNameByNumber(cardNumber)

  return mapping[value] ?? 'GENERIC'
}
