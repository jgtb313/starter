import { Inject, Injectable } from '@nestjs/common'

import type { IPermissionRepository } from '@/ports/database/permission'

@Injectable()
export class PermissionService {
	constructor(
		@Inject('PERMISSION_REPOSITORY')
		private readonly permissionRepository: IPermissionRepository,
	) {}

	getPermissions = async () => {
		return this.permissionRepository.findAll()
	}

	validatePermissionIds = async (permissionIds: string[]) => {
		return this.permissionRepository.validatePermissionIds(permissionIds)
	}
}
