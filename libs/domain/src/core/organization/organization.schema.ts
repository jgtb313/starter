import { z } from '@starter/schema'

import {
	type BaseSchema,
	CreatedAt,
	DeletedAt,
	ID,
	UpdatedAt,
} from '@/support/schema'

const OrganizationId = ID('organization')

const WorkspaceId = ID('workspace')

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
	deletedAt: DeletedAt,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
})
export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationInput = z.input<typeof OrganizationSchema>
export type BaseOrganization = BaseSchema<'organizationId', Organization>
