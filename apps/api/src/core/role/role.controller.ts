import { Inject, UseGuards } from '@nestjs/common'
import { RoleSchema, RoleService, type User } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import { AuthGuard } from '@/support/guards'

import {
	type CreateRoleRequest,
	CreateRoleSchema,
	type DeleteRoleRequest,
	DeleteRoleSchema,
	type GetRoleRequest,
	GetRoleSchema,
	type ListRolesRequest,
	ListRolesSchema,
	type UpdateRoleRequest,
	UpdateRoleSchema,
} from './role.controller.schema'

@Controller({
	name: 'Role',

	description: 'Handles operations for managing and retrieving roles.',

	basePath: 'workspaces/:workspaceId/roles',

	schemas: {
		Role: {
			schema: RoleSchema,
		},
	},
})
@UseGuards(AuthGuard)
export class RoleController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(RoleService)
		private readonly roleService: RoleService,
	) {}

	@Route({
		summary: 'List Roles',

		description: 'Retrieves a list of roles.',

		method: 'GET',

		parameters: {
			params: ListRolesSchema.params,
			query: ListRolesSchema.query,
		},

		responses: {
			200: {
				schema: ListRolesSchema.output,
			},
		},
	})
	listRoles(
		@AuthenticatedUser() user: User,
		@Request() { params, query }: ListRolesRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'role:read', {
			workspaceId: params.workspaceId,
		})

		return this.roleService.getPaginatedRoles({
			...query,
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Get Role',

		description: 'Retrieves a single role by their ID.',

		method: 'GET',

		path: '/:roleId',

		parameters: {
			params: GetRoleSchema.params,
		},

		responses: {
			200: {
				schema: GetRoleSchema.output,
			},
		},
	})
	getRole(
		@AuthenticatedUser() user: User,
		@Request() { params }: GetRoleRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'role:read', {
			workspaceId: params.workspaceId,
		})

		return this.roleService.getRole(params)
	}

	@Route({
		summary: 'Create Role',

		description: 'Creates a new role.',

		method: 'POST',

		parameters: {
			params: CreateRoleSchema.params,
			body: CreateRoleSchema.body,
		},

		responses: {
			201: {
				schema: CreateRoleSchema.output,
			},
		},
	})
	createRole(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: CreateRoleRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'role:create', {
			workspaceId: params.workspaceId,
		})

		return this.roleService.createRole({
			...body,
			workspaceId: params.workspaceId,
			organizationIds: [],
			permissionIds: [],
		})
	}

	@Route({
		summary: 'Update Role',

		description: 'Updates an existing role by their ID.',

		method: 'PATCH',

		path: '/:roleId',

		parameters: {
			params: UpdateRoleSchema.params,
			body: UpdateRoleSchema.body,
		},

		responses: {
			200: {
				schema: UpdateRoleSchema.output,
			},
		},
	})
	updateRole(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: UpdateRoleRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'role:update', {
			workspaceId: params.workspaceId,
		})

		return this.roleService.updateRole(params, {
			...body,
		})
	}

	@Route({
		summary: 'Delete Role',

		description: 'Deletes a role by their ID.',

		method: 'DELETE',

		path: '/:roleId',

		parameters: {
			params: DeleteRoleSchema.params,
		},

		responses: {
			204: {
				description: 'Role has been successfully deleted.',
			},
		},
	})
	deleteRole(
		@AuthenticatedUser() user: User,
		@Request() { params }: DeleteRoleRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'role:delete', {
			workspaceId: params.workspaceId,
		})

		return this.roleService.deleteRole(params)
	}
}
