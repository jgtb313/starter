import { z } from '@starter/schema'

import { OrganizationSchema } from '@/core/organization/organization.schema'
import { PermissionsSchema } from '@/core/permission/permission.schema'
import { RoleSchema } from '@/core/role/role.schema'
import { UserSchema } from '@/core/user/user.schema'

const ScopesSchema = z.array(
	z.object({
		kind: z.enum([
			'WORKSPACE',
			'ORGANIZATION',
		]),
		organization: OrganizationSchema.pick({
			organizationId: true,
			name: true,
		}).optional(),
		role: RoleSchema.pick({
			roleId: true,
			name: true,
		}).optional(),
		permissionIds: PermissionsSchema,
	}),
)

export const ProfileSchema = z.object({
	userId: UserSchema.shape.userId,
	workspaceId: UserSchema.shape.workspaceId,
	scopes: ScopesSchema,
	name: UserSchema.shape.name,
	email: UserSchema.shape.email,
	phone: UserSchema.shape.phone,
	birthday: UserSchema.shape.birthday,
	document: UserSchema.shape.document,
	avatar: UserSchema.shape.avatar,
	localePreference: UserSchema.shape.localePreference,
	status: UserSchema.shape.status,
})
export type Profile = z.infer<typeof ProfileSchema>
