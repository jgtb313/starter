import { createEnumOptions } from '@/support'

export enum InventoryProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const InventoryProductStatus = createEnumOptions<InventoryProductStatusEnum>([
  {
    label: 'Ativo',
    value: InventoryProductStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: InventoryProductStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: InventoryProductStatusEnum.DELETED
  }
])
