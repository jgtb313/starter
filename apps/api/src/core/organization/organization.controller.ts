import {
	OrganizationSchema,
	OrganizationService,
	type Profile,
} from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import { Inject, UseGuards } from '@nestjs/common'

import { ACLService } from '@/support/access-control'
import { AuthenticatedProfile } from '@/support/decorators'
import { AuthGuard } from '@/support/guards/auth-guard'
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
	async listOrganizations(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, query }: ListOrganizationsRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'organization:read', {
			workspaceId: params.workspaceId,
		})

		const response = await this.organizationService.getPaginatedOrganizations({
			...query,
		})

		return {
			...response,
			values: response.values.map((organization) => organization.toJSON()),
		}
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
	async getOrganization(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: GetOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(profile, 'organization:read', {
			workspaceId: params.workspaceId,
			organizationId: params.organizationId,
		})

		const organization = await this.organizationService.getOrganization(params)

		return organization.toJSON()
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
	async createOrganization(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: CreateOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'organization:create',
			{
				workspaceId: params.workspaceId,
			},
		)

		console.log({
			body,
		})

		const organization = await this.organizationService.createOrganization({
			...body,
			workspaceId: params.workspaceId,
		})

		return organization.toJSON()
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
	async updateOrganization(
		@AuthenticatedProfile() profile: Profile,
		@Request() { params, body }: UpdateOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'organization:update',
			{
				workspaceId: params.workspaceId,
				organizationId: params.organizationId,
			},
		)

		const organization = await this.organizationService.updateOrganization(
			params,
			{
				...body,
			},
		)

		return organization.toJSON()
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
		@AuthenticatedProfile() profile: Profile,
		@Request() { params }: DeleteOrganizationRequest,
	) {
		this.aclService.canPerformActionByPermission(
			profile,
			'organization:delete',
			{
				workspaceId: params.workspaceId,
				organizationId: params.organizationId,
			},
		)

		return this.organizationService.deleteOrganization(params)
	}
}
