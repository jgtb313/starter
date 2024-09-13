import { createEnumOptions } from '@/support'

export enum DeliveryStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const DeliveryStatus = createEnumOptions<DeliveryStatusEnum>([
  {
    label: 'Ativo',
    value: DeliveryStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: DeliveryStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: DeliveryStatusEnum.DELETED
  }
])
