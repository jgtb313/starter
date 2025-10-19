import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'
import { PermissionsSchema } from '@/core/permission/permission.schema'
import { UserSchema } from '@/core/user/user.schema'

const ScopesSchema = z.array(
	z.object({
		kind: z.enum([
			'WORKSPACE',
			'ORGANIZATION',
		]),
		organizationId: BaseSchema.id('organization').nullish(),
		permissions: PermissionsSchema,
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
