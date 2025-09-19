import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

const OrganizationId = BaseSchema.id('organization')

const WorkspaceId = BaseSchema.id('workspace')

const Name = z.string().min(1)

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
	status: Status,
	deletedAt: BaseSchema.deletedAt,
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
