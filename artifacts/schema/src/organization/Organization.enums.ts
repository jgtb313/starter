import { createEnumOptions } from '@/support'

export enum OrganizationStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const OrganizationStatus = createEnumOptions<OrganizationStatusEnum>([
  {
    label: 'Ativo',
    value: OrganizationStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: OrganizationStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: OrganizationStatusEnum.DELETED
  }
])
