import { createEnumOptions } from '@/support'

export enum RoleStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'DELETED' = 'DELETED'
}

export const RoleStatus = createEnumOptions<RoleStatusEnum>([
  {
    label: 'Ativo',
    value: RoleStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: RoleStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: RoleStatusEnum.DELETED
  }
])
