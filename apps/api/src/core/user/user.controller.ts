import { type Profile, UserSchema, UserService } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject } from '@nestjs/common'

import { ACLService } from '@/support/access-control'
import { AuthenticatedProfile } from '@/support/decorators'

import {
	type ActivateUserRequest,
	ActivateUserSchema,
	type CreateUserAddressRequest,
	CreateUserAddressSchema,
	type DeactivateUserRequest,
	DeactivateUserSchema,
	type DefineUserScopesRequest,
	DefineUserScopesSchema,
	type DeleteUserAddressRequest,
	DeleteUserAddressSchema,
	type GetUserRequest,
	GetUserSchema,
	type ListUsersRequest,
	ListUsersSchema,
	type UpdateUserAddressRequest,
	UpdateUserAddressSchema,
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
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, query }: ListUsersRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:read', {
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
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetUserRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:read', {
			workspaceId: params.workspaceId,
		})

		return this.userService.getUser(params)
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
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: UpdateUserRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})

		return this.userService.updateUser(params.userId, {
			...body,
		})
	}

	@Route({
		summary: 'Define User Scopes',

		description: 'Defines the scopes for a user.',

		method: 'POST',

		path: '/:userId/scopes',

		parameters: {
			params: DefineUserScopesSchema.params,
			body: DefineUserScopesSchema.body,
		},

		responses: {
			200: {
				schema: DefineUserScopesSchema.output,
			},
		},
	})
	defineUserScopes(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: DefineUserScopesRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Create User Address',

		description: 'Creates a new user address.',

		method: 'POST',

		path: '/:userId/addresses',

		parameters: {
			params: CreateUserAddressSchema.params,
			body: CreateUserAddressSchema.body,
		},

		responses: {
			200: {
				schema: CreateUserAddressSchema.output,
			},
		},
	})
	createUserAddress(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: CreateUserAddressRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Update User Address',

		description: 'Updates a user address by their ID.',

		method: 'PATCH',

		path: '/:userId/addresses/:addressId',

		parameters: {
			params: UpdateUserAddressSchema.params,
			body: UpdateUserAddressSchema.body,
		},

		responses: {
			200: {
				schema: UpdateUserAddressSchema.output,
			},
		},
	})
	updateUserAddress(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: UpdateUserAddressRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Delete User Address',

		description: 'Deletes a user address by their ID.',

		method: 'DELETE',

		path: '/:userId/addresses/:addressId',

		parameters: {
			params: DeleteUserAddressSchema.params,
		},

		responses: {
			204: {
				description: 'User address has been successfully deleted.',
			},
		},
	})
	deleteUserAddress(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: DeleteUserAddressRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Activate User',

		description: 'Activates a user by their ID.',

		method: 'POST',

		path: '/:userId/activate',

		parameters: {
			params: ActivateUserSchema.params,
		},

		responses: {
			200: {
				schema: ActivateUserSchema.output,
			},
		},
	})
	activateUser(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: ActivateUserRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Deactivate User',

		description: 'Deactivates a user by their ID.',

		method: 'POST',

		path: '/:userId/deactivate',

		parameters: {
			params: DeactivateUserSchema.params,
		},

		responses: {
			200: {
				schema: DeactivateUserSchema.output,
			},
		},
	})
	deactivateUser(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: DeactivateUserRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'user:update', {
			workspaceId: params.workspaceId,
		})
	}
}
