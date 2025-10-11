import type { PermissionDomain } from '@/core/permission/permission.domain'

export type IPermissionRepository = {
	find(): Promise<PermissionDomain[]>
	validateIds(permissionIds: string[]): Promise<void>
}
