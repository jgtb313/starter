import { RoleSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'
import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'

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
		.merge(
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
	output: BasePaginationSchemaOutput.merge(
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
	body: RoleSchema.pick({
		// organizationIds: true,
		name: true,
		tags: true,
		// permissions: true,
		status: true,
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
