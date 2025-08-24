import { formatToCapitalized } from '@starter/common'
import { EmailSchema, PasswordSchema, PhoneSchema, z } from '@starter/schema'

import {
	type BaseSchema,
	CreatedAt,
	DeletedAt,
	ID,
	UpdatedAt,
} from '@/support/schema'

export enum UserStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

const UserId = ID('user')

const WorkspaceId = ID('workspaceId')
	.nullish()
	.transform((value) => value ?? null)

const Scopes = z.array(
	z.object({
		organizationId: ID('organization'),
		roleIds: z.array(ID('role')),
	}),
)

const Permissions = z.array(z.string()).default([])

const Name = z
	.string()
	.min(1)
	.transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Avatar = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Social = z
	.object({
		googleId: z
			.string()
			.nullish()
			.transform((value) => value ?? null),
		facebookId: z
			.string()
			.nullish()
			.transform((value) => value ?? null),
	})
	.default({
		googleId: null,
		facebookId: null,
	})
	.nullish()
	.transform((value) => value ?? null)

const Password = PasswordSchema

const Status = z.enum(UserStatusEnum).default(UserStatusEnum.ACTIVE)

export const UserSchema = z.object({
	userId: UserId,
	workspaceId: WorkspaceId,
	scopes: Scopes,
	permissions: Permissions,
	name: Name,
	email: Email,
	phone: Phone,
	avatar: Avatar,
	social: Social,
	password: Password,
	status: Status,
	deletedAt: DeletedAt,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
})
export type User = z.infer<typeof UserSchema>
export type UserInput = z.input<typeof UserSchema>
export type BaseUser = BaseSchema<'userId', User>
