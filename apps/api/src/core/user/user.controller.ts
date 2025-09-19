import { Inject, UseGuards } from '@nestjs/common'
import { type User, UserSchema, UserService } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import { AuthGuard } from '@/support/guards'

import {
	type CreateUserRequest,
	CreateUserSchema,
	DeleteUserRequest,
	DeleteUserSchema,
	type GetUserRequest,
	GetUserSchema,
	type ListUsersRequest,
	ListUsersSchema,
	type UpdateUserRequest,
	UpdateUserSchema,
} from './user.controller.schema'

@Controller({
	name: 'User',

	description: 'Handles operations for managing and retrieving users.',

	basePath: 'workspaces/:workspaceId/users',

	schemas: {
		User: {
			schema: UserSchema,
		},
	},
})
@UseGuards(AuthGuard)
export class UserController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(UserService)
		private readonly userService: UserService,
	) {}

	@Route({
		summary: 'List Users',

		description: 'Retrieves a list of users.',

		method: 'GET',

		parameters: {
			params: ListUsersSchema.params,
			query: ListUsersSchema.query,
		},

		responses: {
			200: {
				schema: ListUsersSchema.output,
			},
		},
	})
	listUsers(
		@AuthenticatedUser() user: User,
		@Request() { params, query }: ListUsersRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'user:read', {
			workspaceId: params.workspaceId,
		})

		return this.userService.getPaginatedUsers({})
	}

	@Route({
		summary: 'Get User',

		description: 'Retrieves a single user by their ID.',

		method: 'GET',

		path: '/:userId',

		parameters: {
			params: GetUserSchema.params,
		},

		responses: {
			200: {
				schema: GetUserSchema.output,
			},
		},
	})
	getUser(
		@AuthenticatedUser() user: User,
		@Request() { params }: GetUserRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'user:read', {
			workspaceId: params.workspaceId,
		})

		return this.userService.getUser(params)
	}

	@Route({
		summary: 'Create User',

		description: 'Creates a new user.',

		method: 'POST',

		parameters: {
			params: CreateUserSchema.params,
			body: CreateUserSchema.body,
		},

		responses: {
			201: {
				schema: CreateUserSchema.output,
			},
		},
	})
	createUser(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: CreateUserRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'user:create', {
			workspaceId: params.workspaceId,
		})

		return this.userService.createUser({
			...params,
			...body,
			status: 'ACTIVE',
		})
	}

	@Route({
		summary: 'Update User',

		description: 'Updates an existing user by their ID.',

		method: 'PATCH',

		path: '/:userId',

		parameters: {
			params: UpdateUserSchema.params,
			body: UpdateUserSchema.body,
		},

		responses: {
			200: {
				schema: UpdateUserSchema.output,
			},
		},
	})
	updateUser(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: UpdateUserRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'user:update', {
			workspaceId: params.workspaceId,
		})

		return this.userService.updateUser(params, {
			...body,
		})
	}

	// @Route({
	//   summary: 'Delete User',

	//   description: 'Deletes a user by their ID.',

	//   method: 'DELETE',

	//   path: '/:userId',

	//   parameters: {
	//     params: DeleteUserParamsSchema,
	//   },

	//   responses: {
	//     204: {
	//       description: 'User has been successfully deleted.',
	//     },
	//   },
	// })
	// deleteUser(@AuthenticatedUser() user: User, @Request() { params }: RequestInput<{}, DeleteUserParamsInput, {}>) {
	//   this.aclService.canPerformActionByPermission(user, 'user:delete', {
	//     workspaceId: params.workspaceId,
	//   })

	//   return this.userService.deleteById(params.workspaceId, params.userId)
	// }
}
