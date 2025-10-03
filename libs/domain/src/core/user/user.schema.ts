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

const Organizations = z
	.array(
		z.object({
			organizationId: BaseSchema.id('organization'),
			organization: OrganizationSchema,
			roleIds: z.array(BaseSchema.id('role')),
			roles: z.array(
				RoleSchema.omit({
					organizations: true,
				}),
			),
		}),
	)
	.default([])

const SocialGoogleId = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const SocialFacebookId = z
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

const Address = CustomerAddressSchema.nullish().transform(
	(value) => value ?? null,
)

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
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')
export type UserStatus = z.infer<typeof Status>

export const UserSchema = z.object({
	userId: BaseSchema.id('user'),
	workspaceId: WorkspaceId,
	organizations: Organizations,
	socialGoogleId: SocialGoogleId,
	socialFacebookId: SocialFacebookId,
	name: Name,
	email: Email,
	phone: Phone,
	birthday: Birthday,
	document: Document,
	address: Address,
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

const user: User = {
	userId: '123',
	workspaceId: '123',
	organizations: [
		{
			organizationId: '123',
			organization: {
				organizationId: '123',
				workspaceId: '123',
				name: 'Organization 1',
				status: 'ACTIVE',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			roleIds: [
				'123',
			],
			roles: [
				{
					roleId: '123',
					workspaceId: '123',
					name: 'Role 1',
					status: 'ACTIVE',
					permissions: [
						{
							permissionId: '123',
							name: 'Permission 1',
							action: 'READ',
							description: 'Permission 1 description',
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						},
					],
					tags: [
						'tag1',
						'tag2',
						'tag3',
					],
					deletedAt: null,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
			],
		},
	],
	socialGoogleId: null,
	socialFacebookId: null,
	name: 'John Doe',
	email: 'john.doe@example.com',
	phone: null,
	document: null,
	address: null,
	birthday: null,
	avatar: null,
	localePreference: null,
	password: 'hashedPassword',
	status: 'ACTIVE',
	deletedAt: null,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
}
