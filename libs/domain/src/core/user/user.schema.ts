import { formatToCapitalized } from '@starter/common'
import {
	BirthdaySchema,
	CustomerAddressSchema,
	DocumentExplicitSchema,
	EmailSchema,
	LocaleSchema,
	PasswordSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'

const WorkspaceId = BaseSchema.id('workspaceId')
	.nullish()
	.transform((value) => value ?? null)

const GoogleProviderExternalId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const FacebookProviderExternalId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Name = z
	.string()
	.min(1)
	.transform((value) => formatToCapitalized(value))

const Email = EmailSchema

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Birthday = BirthdaySchema.nullish().transform((value) => value ?? null)

const Document = DocumentExplicitSchema.nullish().transform(
	(value) => value ?? null,
)

const Addresses = z.array(CustomerAddressSchema).default([])

const Avatar = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const LocalePreference = LocaleSchema.nullish().transform(
	(value) => value ?? null,
)

const Password = PasswordSchema

const Status = z
	.enum([
		'ONBOARDING',
		'ACTIVE',
		'INACTIVE',
	])
	.default('ONBOARDING')
export type UserStatus = z.infer<typeof Status>

export const UserSchema = z.object({
	userId: BaseSchema.id('user'),
	workspaceId: WorkspaceId,
	googleProviderExternalId: GoogleProviderExternalId,
	facebookProviderExternalId: FacebookProviderExternalId,
	name: Name,
	email: Email,
	phone: Phone,
	birthday: Birthday,
	document: Document,
	addresses: Addresses,
	avatar: Avatar,
	localePreference: LocalePreference,
	password: Password,
	status: Status,
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const UserInputSchema = UserSchema.partial({
	userId: true,
	createdAt: true,
	updatedAt: true,
}).and(
	z.object({
		permissionIds: z.array(z.string()).default([]),
	}),
)

export const UpdatableUserInputSchema = UserSchema.partial().omit({
	userId: true,
	addresses: true,
})

export type User = z.infer<typeof UserSchema>
export type UserInput = BaseDomainInput<z.infer<typeof UserInputSchema>>
export type UpdatableUserInput = BaseDomainInput<
	z.infer<typeof UpdatableUserInputSchema>
>
