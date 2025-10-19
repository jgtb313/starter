import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'
import { BaseSchema, PermissionSchema, RoleSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

import { FilterSchema } from '@/support/schema'

export const ListRolesSchema = createRequestSchema({
	params: RoleSchema.pick({
		workspaceId: true,
	}),
	query: RoleSchema.pick({
		name: true,
		status: true,
	})
		.partial()
		.and(
			z
				.object({
					filter: FilterSchema(
						[
							'name',
							'status',
						],
						{
							example: 'Acme',
						},
					),
				})
				.partial(),
		)
		.and(PaginationSchema),
	output: BasePaginationSchemaOutput.and(
		z.object({
			values: z.array(RoleSchema),
		}),
	),
})
export type ListRolesRequest = RequestInput<typeof ListRolesSchema>

export const GetRoleSchema = createRequestSchema({
	params: RoleSchema.pick({
		workspaceId: true,
		roleId: true,
	}),
	output: RoleSchema,
})
export type GetRoleRequest = RequestInput<typeof GetRoleSchema>

export const CreateRoleSchema = createRequestSchema({
	params: RoleSchema.pick({
		workspaceId: true,
	}),
	body: z.object({
		name: RoleSchema.shape.name,
		organizationIds: z.array(BaseSchema.id('organization')).meta({
			description: 'The IDs of the organizations to assign to the role',
			example: [
				'96738ebc-7da1-48e2-8685-705c7b9268cb',
				'96738ebc-7da1-48e2-8685-705c7b9268cb',
			],
		}),
		permissionIds: z.array(PermissionSchema.shape.permissionId).meta({
			description: 'The IDs of the permissions to assign to the role',
			example: [
				'user:read',
				'organization:read',
			],
		}),
		tags: RoleSchema.shape.tags,
	}),
	output: RoleSchema,
})
export type CreateRoleRequest = RequestInput<typeof CreateRoleSchema>

export const UpdateRoleSchema = createRequestSchema({
	params: RoleSchema.pick({
		workspaceId: true,
		roleId: true,
	}),
	body: RoleSchema.pick({
		// organizationIds: true,
		name: true,
		tags: true,
		// permissions: true,
	}).partial(),
	output: RoleSchema,
})
export type UpdateRoleRequest = RequestInput<typeof UpdateRoleSchema>

export const DeleteRoleSchema = createRequestSchema({
	params: RoleSchema.pick({
		workspaceId: true,
		roleId: true,
	}),
	output: RoleSchema,
})
export type DeleteRoleRequest = RequestInput<typeof DeleteRoleSchema>
