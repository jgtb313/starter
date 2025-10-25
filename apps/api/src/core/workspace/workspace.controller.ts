import {
	type Profile,
	type User,
	WorkspaceSchema,
	WorkspaceService,
} from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject, UseGuards } from '@nestjs/common'

import { ACLService } from '@/support/access-control'
import { AuthenticatedProfile } from '@/support/decorators'
import { AuthGuard } from '@/support/guards/auth-guard'

import {
	type CreateWorkspaceRequest,
	CreateWorkspaceSchema,
	type DefineWorkspaceAddressRequest,
	DefineWorkspaceAddressSchema,
	type DeleteWorkspaceAddressRequest,
	DeleteWorkspaceAddressSchema,
	type GetWorkspaceRequest,
	GetWorkspaceSchema,
	type UpdateWorkspaceRequest,
	UpdateWorkspaceSchema,
} from './workspace.controller.schema'

@Controller({
	name: 'Workspace',

	description: 'Handles operations for managing and retrieving workspaces.',

	basePath: 'workspaces',

	schemas: {
		Workspace: {
			schema: WorkspaceSchema,
		},
	},
})
@UseGuards(AuthGuard)
export class WorkspaceController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(WorkspaceService)
		private readonly workspaceService: WorkspaceService,
	) {}

	@Route({
		summary: 'Get Workspace',

		description: 'Retrieves a single workspace by their ID.',

		method: 'GET',

		path: '/:workspaceId',

		parameters: {
			params: GetWorkspaceSchema.params,
		},

		responses: {
			200: {
				schema: GetWorkspaceSchema.output,
			},
		},
	})
	async getWorkspace(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetWorkspaceRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'workspace:read', {
			workspaceId: params.workspaceId,
		})

		const workspace = await this.workspaceService.getWorkspace(
			params.workspaceId,
		)

		return workspace.toJSON()
	}

	@Route({
		summary: 'Create Workspace',

		description: 'Creates a new workspace.',

		method: 'POST',

		parameters: {
			body: CreateWorkspaceSchema.body,
		},

		responses: {
			200: {
				schema: CreateWorkspaceSchema.output,
			},
		},
	})
	async createWorkspace(
		@AuthenticatedProfile() profile: Profile,
		@Request() { body }: CreateWorkspaceRequest,
	) {
		const workspace = await this.workspaceService.createWorkspace(
			profile.userId,
			{
				...body,
				status: 'ACTIVE',
			},
		)

		return workspace.toJSON()
	}

	@Route({
		summary: 'Update Workspace',

		description: 'Updates an existing workspace by their ID.',

		method: 'PATCH',

		path: '/:workspaceId',

		parameters: {
			params: UpdateWorkspaceSchema.params,
			body: UpdateWorkspaceSchema.body,
		},

		responses: {
			200: {
				schema: UpdateWorkspaceSchema.output,
			},
		},
	})
	async updateWorkspace(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: UpdateWorkspaceRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'workspace:read', {
			workspaceId: params.workspaceId,
		})

		const workspace = await this.workspaceService.updateWorkspace(
			params.workspaceId,
			body,
		)

		return workspace.toJSON()
	}

	@Route({
		summary: 'Define Workspace Address',

		description: 'Defines the address for a workspace.',

		method: 'POST',

		path: '/:workspaceId/address',

		parameters: {
			params: DefineWorkspaceAddressSchema.params,
			body: DefineWorkspaceAddressSchema.body,
		},

		responses: {
			200: {
				schema: DefineWorkspaceAddressSchema.output,
			},
		},
	})
	async defineWorkspaceAddress(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: DefineWorkspaceAddressRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'workspace:read', {
			workspaceId: params.workspaceId,
		})

		const workspace = await this.workspaceService.defineWorkspaceAddress(
			params.workspaceId,
			body,
		)

		return workspace.toJSON()
	}

	@Route({
		summary: 'Delete Workspace Address',

		description: 'Deletes the address for a workspace.',

		method: 'DELETE',

		path: '/:workspaceId/address',

		parameters: {
			params: DeleteWorkspaceAddressSchema.params,
		},

		responses: {
			204: {
				description: 'Workspace address has been successfully deleted.',
			},
		},
	})
	async deleteWorkspaceAddress(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: DeleteWorkspaceAddressRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'workspace:read', {
			workspaceId: params.workspaceId,
		})

		await this.workspaceService.deleteWorkspaceAddress(params.workspaceId)
	}
}
