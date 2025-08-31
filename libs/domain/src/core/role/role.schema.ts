import { z } from '@starter/schema'

import { BaseSchema } from '@/support/base-schema'

import { OrganizationSchema } from '@/core/organization/organization.schema'
import { PermissionSchema } from '@/core/permission/permission.schema'

const RoleId = BaseSchema.id('role')

const WorkspaceId = BaseSchema.id('workspace')

const Organization = z.array(OrganizationSchema).default([])

const Permission = z.array(PermissionSchema).default([])

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
	organizations: Organization,
	permissions: Permission,
	name: Name,
	tags: Tags,
	status: Status,
	deletedAt: BaseSchema.deletedAt,
	createdAt: BaseSchema.createdAt,
	updatedAt: BaseSchema.updatedAt,
})
export type Role = z.infer<typeof RoleSchema>
export type RoleInput = z.input<typeof RoleSchema>
export type BaseRole = BaseSchema<
	Role,
	{
		optional: [
			'roleId',
		]
	}
>
