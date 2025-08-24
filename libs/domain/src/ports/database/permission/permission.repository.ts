import type { PermissionDomain } from '@/core/permission/permission.domain'

export type IPermissionRepository = {
	findAll(): Promise<PermissionDomain[]>

	validatePermissionIds(permissionIds: string[]): Promise<void>
}
