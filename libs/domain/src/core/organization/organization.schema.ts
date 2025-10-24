import {
	DocumentExplicitSchema,
	EmailSchema,
	PhoneSchema,
	z,
} from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
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

const Status = z.enum([
	'ACTIVE',
	'INACTIVE',
])

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
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const OrganizationInputSchema = OrganizationSchema.partial({
	organizationId: true,
	createdAt: true,
	updatedAt: true,
})

export const UpdatableOrganizationInputSchema =
	OrganizationSchema.partial().omit({
		organizationId: true,
		workspaceId: true,
	})

export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationInput = BaseDomainInput<
	z.input<typeof OrganizationInputSchema>
>
export type UpdatableOrganizationInput = BaseDomainInput<
	z.input<typeof UpdatableOrganizationInputSchema>
>
