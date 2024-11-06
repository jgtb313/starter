import type { SubscriptionFormInput } from '~/components'

type CreditCardInfo = {
  id: string
  method: string
  extra_info: {
    bin: string
    year: number
    month: number
    brand: string
    holder_name: string
    display_number: string
  }
  errors?: Record<string, string[]>
  test: boolean
}

type CreditCardData = {
  number: string
  verification_value: string
  first_name: string
  last_name: string
  month: string
  year: string
}

type Iugu = {
  setAccountID: (accountId: string) => void
  setTestMode: (isTestMode: boolean) => void

  CreditCard: (
    number: string,
    expirationMonth: string,
    expirationYear: string,
    holderFirstName: string,
    holderLastName: string,
    cvv: string
  ) => {
    toData: () => CreditCardData
  }

  createPaymentToken: (creditCardData: CreditCardData, callback: (response: CreditCardInfo) => void) => void
}

export const createCreditCardToken = async ({ card }: SubscriptionFormInput) => {
  return new Promise<string>((resolve, reject) => {
    if (!card) {
      reject('Seu cartão foi recusado. Verifique os dados e tente novamente ou use outro método de pagamento.')
      return
    }

    const iugu: Iugu = (window as any).Iugu

    iugu.setAccountID('C75A656E8E64496095010CD447958665')
    iugu.setTestMode(false)

    const [expirationMonth, expirationYear] = card.expirationDate.split('/')
    const [holderFirstName, holderLastName] = card.holderName.split('/')

    const creditCard = iugu.CreditCard(card.number, expirationMonth, expirationYear, holderFirstName, holderLastName, card?.cvv)

    iugu.createPaymentToken(creditCard.toData(), (response) => {
      if (response.errors) {
        reject('Seu cartão foi recusado. Verifique os dados e tente novamente ou use outro método de pagamento.')
        return
      }

      resolve(response.id)
    })
  })
}
