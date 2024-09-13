import { createEnumOptions } from '@/support'

export enum SubscriptionPaymentMethodEnum {
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
  BOLETO = 'BOLETO'
}

export enum SubscriptionStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const SubscriptionPaymentMethod = createEnumOptions<SubscriptionPaymentMethodEnum>([
  {
    label: 'Cartão',
    value: SubscriptionPaymentMethodEnum.CREDIT_CARD
  },
  {
    label: 'Pix',
    value: SubscriptionPaymentMethodEnum.PIX
  },
  {
    label: 'Boleto',
    value: SubscriptionPaymentMethodEnum.BOLETO
  }
])

export const SubscriptionStatus = createEnumOptions<SubscriptionStatusEnum>([
  {
    label: 'Ativo',
    value: SubscriptionStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: SubscriptionStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: SubscriptionStatusEnum.DELETED
  }
])
