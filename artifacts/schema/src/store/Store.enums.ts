import { createEnumOptions } from '@/support'

export enum StoreStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const StoreStatus = createEnumOptions<StoreStatusEnum>([
  {
    label: 'Ativo',
    value: StoreStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: StoreStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: StoreStatusEnum.DELETED
  }
])
