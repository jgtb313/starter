import { formatToCapitalized } from '@starter/common'
import { EmailSchema, PasswordSchema, PhoneSchema, z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const WorkspaceId = BaseSchema.id('workspaceId')
	.nullish()
	.transform((value) => value ?? null)

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

const Status = z
	.enum([
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')
export type UserStatus = z.infer<typeof Status>

export const UserSchema = z.object({
	userId: BaseSchema.id('user'),
	workspaceId: WorkspaceId,
	name: Name,
	email: Email,
	phone: Phone,
	avatar: Avatar,
	social: Social,
	password: Password,
	status: Status,
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type User = z.infer<typeof UserSchema>
export type UserInput = z.input<typeof UserSchema>
export type BaseUser = BaseSchema<
	User,
	{
		optional: [
			'userId',
		]
	}
>
