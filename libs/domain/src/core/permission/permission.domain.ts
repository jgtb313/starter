import { BaseDomain } from '@/support/base-domain'
import { PermissionSchema, Permission, PermissionInput } from '@/core/permission/permission.schema'

export class PermissionDomain extends BaseDomain<Permission, PermissionInput> {
  constructor(permission: PermissionInput) {
    super(PermissionSchema, permission)
  }
}
