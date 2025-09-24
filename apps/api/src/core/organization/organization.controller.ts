import { Inject, UseGuards } from '@nestjs/common'
import {
	OrganizationSchema,
	OrganizationService,
	type User,
} from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import {
	type CreateOrganizationRequest,
	CreateOrganizationSchema,
	type DeleteOrganizationRequest,
	DeleteOrganizationSchema,
	type GetOrganizationRequest,
	GetOrganizationSchema,
	type ListOrganizationsRequest,
	ListOrganizationsSchema,
	type UpdateOrganizationRequest,
	UpdateOrganizationSchema,
} from '@/core/organization/organization.controller.schema'
import { ACLService } from '@/support/access-control'
import { AuthenticatedUser } from '@/support/decorators'
import { AuthGuard } from '@/support/guards'

@Controller({
	name: 'Organization',

	description: 'Handles operations for managing and retrieving organizations.',

	basePath: 'workspaces/:workspaceId/organizations',

	schemas: {
		Organization: {
			schema: OrganizationSchema,
		},
	},
})
@UseGuards(AuthGuard)
export class OrganizationController {
	constructor(
		@Inject(ACLService)
		private readonly aclService: ACLService,
		@Inject(OrganizationService)
		private readonly organizationService: OrganizationService,
	) {}

	@Route({
		summary: 'List Organizations',

		description: 'Retrieves a list of organizations.',

		method: 'GET',

		parameters: {
			params: ListOrganizationsSchema.params,
			query: ListOrganizationsSchema.query,
		},

		responses: {
			200: {
				schema: ListOrganizationsSchema.output,
			},
		},
	})
	listOrganizations(
		@AuthenticatedUser() user: User,
		@Request() { params, query }: ListOrganizationsRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'organization:read', {
			workspaceId: params.workspaceId,
		})

		return this.organizationService.getPaginatedOrganizations({})
	}

	@Route({
		summary: 'Get Organization',

		description: 'Retrieves a single organization by their ID.',

		method: 'GET',

		path: '/:organizationId',

		parameters: {
			params: GetOrganizationSchema.params,
		},

		responses: {
			200: {
				schema: GetOrganizationSchema.output,
			},
		},
	})
	getOrganization(
		@AuthenticatedUser() user: User,
		@Request() { params }: GetOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'organization:read', {
			workspaceId: params.workspaceId,
			organizationId: params.organizationId,
		})

		return this.organizationService.getOrganization(params)
	}

	@Route({
		summary: 'Create Organization',

		description: 'Creates a new organization.',

		method: 'POST',

		parameters: {
			params: CreateOrganizationSchema.params,
			body: CreateOrganizationSchema.body,
		},

		responses: {
			201: {
				schema: CreateOrganizationSchema.output,
			},
		},
	})
	createOrganization(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: CreateOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'organization:create', {
			workspaceId: params.workspaceId,
		})

		return this.organizationService.createOrganization({
			...body,
			name: body.name['pt-BR'],
			workspaceId: params.workspaceId,
		})
	}

	@Route({
		summary: 'Update Organization',

		description: 'Updates an existing organization by their ID.',

		method: 'PATCH',

		path: '/:organizationId',

		parameters: {
			params: UpdateOrganizationSchema.params,
			body: UpdateOrganizationSchema.body,
		},

		responses: {
			200: {
				schema: UpdateOrganizationSchema.output,
			},
		},
	})
	updateOrganization(
		@AuthenticatedUser() user: User,
		@Request() { params, body }: UpdateOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'organization:update', {
			workspaceId: params.workspaceId,
			organizationId: params.organizationId,
		})

		return this.organizationService.updateOrganization(params, {
			...body,
		})
	}

	@Route({
		summary: 'Delete Organization',

		description: 'Deletes a organization by their ID.',

		method: 'DELETE',

		path: '/:organizationId',

		parameters: {
			params: DeleteOrganizationSchema.params,
		},

		responses: {
			204: {
				description: 'Organization has been successfully deleted.',
			},
		},
	})
	deleteOrganization(
		@AuthenticatedUser() user: User,
		@Request() { params }: DeleteOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(user, 'organization:delete', {
			workspaceId: params.workspaceId,
			organizationId: params.organizationId,
		})

		return this.organizationService.deleteOrganization(params)
	}
}
