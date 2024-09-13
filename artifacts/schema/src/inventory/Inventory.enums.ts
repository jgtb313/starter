import { createEnumOptions } from '@/support'

export enum InventoryStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const InventoryStatus = createEnumOptions<InventoryStatusEnum>([
  {
    label: 'Ativo',
    value: InventoryStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: InventoryStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: InventoryStatusEnum.DELETED
  }
])
