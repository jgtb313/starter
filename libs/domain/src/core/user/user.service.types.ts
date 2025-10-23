import type { Permission } from '@/core/permission/permission.schema'
import type { UserInput } from '@/core/user/user.schema'

export type CreateUserInput = UserInput & {
	permissionIds?: Permission[]
}
