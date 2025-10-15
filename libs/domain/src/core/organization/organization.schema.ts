import {
	DocumentExplicitSchema,
	EmailSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const OrganizationId = BaseSchema.id('organization')

const WorkspaceId = BaseSchema.id('workspace')

const Name = z.string().min(1)

const Email = EmailSchema.nullish().transform((value) => value ?? null)

const Phone = PhoneSchema.nullish().transform((value) => value ?? null)

const Document = DocumentExplicitSchema.nullish().transform(
	(value) => value ?? null,
)

const Logo = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Domain = z
	.string()
	.nullish()
	.transform((value) => value ?? null)

const Status = z
	.enum([
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')

export const OrganizationSchema = z.object({
	organizationId: OrganizationId,
	workspaceId: WorkspaceId,
	name: Name,
	email: Email,
	phone: Phone,
	document: Document,
	logo: Logo,
	domain: Domain,
	status: Status,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationInput = z.input<typeof OrganizationSchema>
export type BaseOrganization = BaseSchema<
	Organization,
	{
		optional: [
			'organizationId',
		]
	}
>
