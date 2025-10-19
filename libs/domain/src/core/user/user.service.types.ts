import type { Permission } from '@/core/permission/permission.schema'
import type { BaseUser } from '@/core/user/user.schema'

export type CreateUserInput = BaseUser & {
	permissionIds?: Permission[]
}
