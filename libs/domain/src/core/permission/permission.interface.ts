import { PermissionDomain } from '@/core/permission/permission.domain'

export interface IPermissionService {
  getPermissions(): Promise<PermissionDomain[]>

  validatePermissions(permissions: string[]): Promise<void>
}
