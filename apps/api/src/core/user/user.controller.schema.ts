import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'
import { BaseSchema, UserSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

import { FilterSchema } from '@/support/schema'

export const ListUsersSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
	}),
	query: UserSchema.pick({
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
							'email',
						],
						{
							example: 'John Doe',
						},
					),
				})
				.partial(),
		)
		.and(PaginationSchema),
	output: BasePaginationSchemaOutput.merge(
		z.object({
			values: z.array(UserSchema),
		}),
	),
})
export type ListUsersRequest = RequestInput<typeof ListUsersSchema>

export const GetUserSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	output: UserSchema,
})
export type GetUserRequest = RequestInput<typeof GetUserSchema>

export const CreateUserSchema = createRequestSchema({
	params: z.object({
		workspaceId: BaseSchema.id('workspace'),
	}),
	body: UserSchema.pick({
		// permissions: true,
		name: true,
		email: true,
		phone: true,
		avatar: true,
		password: true,
	}).and(
		z.object({
			organizations: z.array(
				z.object({
					organizationId: BaseSchema.id('organization'),
					roleIds: z.array(BaseSchema.id('role')),
				}),
			),
		}),
	),
	output: UserSchema,
})
export type CreateUserRequest = RequestInput<typeof CreateUserSchema>

export const UpdateUserSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	body: UserSchema.pick({
		name: true,
		status: true,
	})
		.partial()
		.and(
			z
				.object({
					organizations: z.array(
						z.object({
							organizationId: BaseSchema.id('organization'),
							roleIds: z.array(BaseSchema.id('role')),
						}),
					),
				})
				.partial(),
		),
	output: UserSchema,
})
export type UpdateUserRequest = RequestInput<typeof UpdateUserSchema>

export const CreateUserAddressSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	body: z.object({}),
})
export type CreateUserAddressRequest = RequestInput<
	typeof CreateUserAddressSchema
>

export const UpdateUserAddressSchema = createRequestSchema({
	params: z
		.object({
			userId: BaseSchema.id('user'),
			addressId: BaseSchema.id('userAddress'),
		})
		.and(
			z.object({
				workspaceId: BaseSchema.id('workspace'),
			}),
		),
	body: z.object({}),
})
export type UpdateUserAddressRequest = RequestInput<
	typeof UpdateUserAddressSchema
>

export const DeleteUserAddressSchema = createRequestSchema({
	params: z
		.object({
			userId: BaseSchema.id('user'),
			addressId: BaseSchema.id('userAddress'),
		})
		.and(
			z.object({
				workspaceId: BaseSchema.id('workspace'),
			}),
		),
})
export type DeleteUserAddressRequest = RequestInput<
	typeof DeleteUserAddressSchema
>

export const DeleteUserSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	output: UserSchema,
})
export type DeleteUserRequest = RequestInput<typeof DeleteUserSchema>
