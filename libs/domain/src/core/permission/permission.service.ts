import { Injectable, Inject } from '@nestjs/common'

import { IPermissionRepository } from '@/ports/database/permission'
import { IPermissionService } from '@/core/permission/permission.interface'

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(@Inject('PERMISSION_REPOSITORY') private readonly permissionRepository: IPermissionRepository) {}

  getPermissions: IPermissionService['getPermissions'] = async () => {
    return this.permissionRepository.findAll()
  }

  validatePermissions: IPermissionService['validatePermissions'] = async (permissions) => {
    return this.permissionRepository.validatePermissions(permissions)
  }
}
