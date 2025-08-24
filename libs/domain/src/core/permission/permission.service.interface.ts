import type { PermissionDomain } from '@/core/permission/permission.domain'

export interface IPermissionService {
	getPermissions(): Promise<PermissionDomain[]>

	validatePermissionIds(permissionIds: string[]): Promise<void>
}
