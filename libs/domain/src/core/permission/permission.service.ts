import { Injectable, Inject } from '@nestjs/common'

import { IPermissionRepository } from '@/ports/database/permission'
import { IPermissionService } from '@/core/permission/permission.service.interface'

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
