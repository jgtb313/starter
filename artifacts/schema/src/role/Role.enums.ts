import { createEnumOptions } from '@/support'

export enum RoleTypeEnum {
  OWNER = 'OWNER',
  STOCK = 'STOCK',
  INVENTORY = 'INVENTORY',
  STOCK_INVENTORY = 'STOCK_INVENTORY'
}

export const RoleType = createEnumOptions<RoleTypeEnum>([
  {
    label: 'Dono',
    value: RoleTypeEnum.OWNER
  },
  {
    label: 'Estoquista',
    value: RoleTypeEnum.STOCK
  },
  {
    label: 'Inventariante',
    value: RoleTypeEnum.INVENTORY
  },
  {
    label: 'Estoquista e Inventariante',
    value: RoleTypeEnum.STOCK_INVENTORY
  }
])
