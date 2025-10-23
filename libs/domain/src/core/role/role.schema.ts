import { z } from '@starter/schema'

import type { BaseDomainInput } from '@/support/base-domain'
import { BaseSchema } from '@/support/base-schema'
import { OrganizationSchema } from '@/core/organization/organization.schema'
import { PermissionSchema } from '@/core/permission/permission.schema'

const RoleId = BaseSchema.id('role')

const WorkspaceId = BaseSchema.id('workspace')

const OrganizationIds = z.array(BaseSchema.id('organization')).meta({
	description: 'The IDs of the organizations to assign to the role',
	example: [
		'96738ebc-7da1-48e2-8685-705c7b9268cb',
		'96738ebc-7da1-48e2-8685-705c7b9268cb',
	],
})

const Organization = z.array(OrganizationSchema).default([])

const PermissionIds = z.array(PermissionSchema.shape.permissionId).meta({
	description: 'The IDs of the permissions to assign to the role',
	example: [
		'user:read',
		'organization:read',
	],
})

const Permissions = z.array(PermissionSchema).default([])

const Name = z.string().min(1)

const Tags = z
	.array(z.string())
	.nullish()
	.transform((value) => value ?? null)

const Status = z
	.enum([
		'ACTIVE',
		'INACTIVE',
	])
	.default('ACTIVE')

export const RoleSchema = z.object({
	roleId: RoleId,
	workspaceId: WorkspaceId,
	organizationIds: OrganizationIds,
	organizations: Organization,
	permissionIds: PermissionIds,
	permissions: Permissions,
	name: Name,
	tags: Tags,
	status: Status,
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})

export const RoleInputSchema = RoleSchema.partial({
	roleId: true,
}).omit({
	organizations: true,
	permissions: true,
})

export type Role = z.infer<typeof RoleSchema>
export type RoleInput = BaseDomainInput<z.input<typeof RoleInputSchema>>
