import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

import {
	PERMISSION_SUBJECT_ACTIONS,
	PERMISSIONS,
	type Permission,
} from './permission.schema'

@Injectable()
export class PermissionService {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	getPermissions = async () => {
		return Object.values(PERMISSION_SUBJECT_ACTIONS).flat()
	}

	validatePermissionIds = async (permissionIds: Permission[]) => {
		const missingPermissionIds = permissionIds.filter(
			(permissionId) => !PERMISSIONS.has(permissionId),
		)

		if (missingPermissionIds.length) {
			throw new NotFoundException(
				this.i18nService.current.permissionIdsNotFound({
					permissionIds: missingPermissionIds,
				}),
			)
		}
	}
}
