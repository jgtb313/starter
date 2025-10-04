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

import { OrganizationSchema } from '@/core/organization/organization.schema'
import { RoleSchema } from '@/core/role/role.schema'
import { BaseSchema } from '@/support/base-schema'

const WorkspaceId = BaseSchema.id('workspaceId')
	.nullish()
	.transform((value) => value ?? null)

const GoogleProviderId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const FacebookProviderId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Organizations = z
	.array(
		z.object({
			organizationId: BaseSchema.id('organization'),
			organization: OrganizationSchema,
			roleId: BaseSchema.id('role'),
			role: RoleSchema.omit({
				organizations: true,
			}),
		}),
	)
	.default([])

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
	.default('ACTIVE')
export type UserStatus = z.infer<typeof Status>

export const UserSchema = z.object({
	userId: BaseSchema.id('user'),
	workspaceId: WorkspaceId,
	googleProviderId: GoogleProviderId,
	facebookProviderId: FacebookProviderId,
	organizations: Organizations,
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
