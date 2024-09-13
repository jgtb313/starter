import { createEnumOptions } from '@/support'

export enum UserStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'DELETED' = 'DELETED'
}

export const UserStatus = createEnumOptions<UserStatusEnum>([
  {
    label: 'Ativo',
    value: UserStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: UserStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: UserStatusEnum.DELETED
  }
])
