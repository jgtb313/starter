import {
	BasePaginationSchemaOutput,
	PaginationSchema,
	z,
} from '@starter/schema'
import { BaseSchema, UserAddressSchema, UserSchema } from '@starter/domain'
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
		.and(
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
	output: BasePaginationSchemaOutput.and(
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
		email: true,
		phone: true,
		birthday: true,
		document: true,
		avatar: true,
		localePreference: true,
	}).partial(),
	output: UserSchema,
})
export type UpdateUserRequest = RequestInput<typeof UpdateUserSchema>

export const DefineUserScopesSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	body: z.object({
		organizations: z
			.array(
				z.object({
					organizationId: BaseSchema.id('organization'),
					roleId: BaseSchema.id('role'),
				}),
			)
			.optional(),
		permissionIds: z.array(BaseSchema.id('permission')).optional(),
	}),
	output: UserSchema,
})
export type DefineUserScopesRequest = RequestInput<
	typeof DefineUserScopesSchema
>

export const CreateUserAddressSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	body: UserAddressSchema.omit({
		addressId: true,
		location: true,
		deleteAt: true,
		createdAt: true,
		updatedAt: true,
	}),
	output: UserSchema,
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
	body: UserAddressSchema.omit({
		addressId: true,
		location: true,
		deleteAt: true,
		createdAt: true,
		updatedAt: true,
	}),
	output: UserSchema,
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
	output: UserSchema,
})
export type DeleteUserAddressRequest = RequestInput<
	typeof DeleteUserAddressSchema
>

export const ActivateUserSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	output: UserSchema,
})
export type ActivateUserRequest = RequestInput<typeof ActivateUserSchema>

export const DeactivateUserSchema = createRequestSchema({
	params: UserSchema.pick({
		userId: true,
	}).and(
		z.object({
			workspaceId: BaseSchema.id('workspace'),
		}),
	),
	output: UserSchema,
})
export type DeactivateUserRequest = RequestInput<typeof DeactivateUserSchema>
