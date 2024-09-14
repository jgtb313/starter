import { createEnumOptions } from '@/support'

export enum WorkspaceStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const WorkspaceStatus = createEnumOptions<WorkspaceStatusEnum>([
  {
    label: 'Ativo',
    value: WorkspaceStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: WorkspaceStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: WorkspaceStatusEnum.DELETED
  }
])
