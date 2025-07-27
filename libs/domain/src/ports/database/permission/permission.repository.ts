import { PermissionDomain } from '@/core/permission/permission.domain'

export type IPermissionRepository = {
  findAll(): Promise<PermissionDomain[]>

  validatePermissions(permissions: string[]): Promise<void>
}
