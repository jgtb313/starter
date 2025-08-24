import { Inject, Injectable } from '@nestjs/common'

import type { IPermissionService } from '@/core/permission/permission.service.interface'
import type { IPermissionRepository } from '@/ports/database/permission'

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(@Inject('PERMISSION_REPOSITORY') private readonly permissionRepository: IPermissionRepository) {}

  getPermissions: IPermissionService['getPermissions'] = async () => {
    return this.permissionRepository.findAll()
  }

  validatePermissionIds: IPermissionService['validatePermissionIds'] = async (permissionIds) => {
    return this.permissionRepository.validatePermissionIds(permissionIds)
  }
}
