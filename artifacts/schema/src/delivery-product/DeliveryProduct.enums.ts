import { createEnumOptions } from '@/support'

export enum DeliveryProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const DeliveryProductStatus = createEnumOptions<DeliveryProductStatusEnum>([
  {
    label: 'Ativo',
    value: DeliveryProductStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: DeliveryProductStatusEnum.INACTIVE
  }
])
