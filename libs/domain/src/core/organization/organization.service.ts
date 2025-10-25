import type { Merge } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import type { Pagination } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import type {
	OrganizationInput,
	UpdatableOrganizationInput,
} from '@/core/organization/organization.schema'
import { PlanService } from '@/core/plan/plan.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IOrganizationRepository } from '@/ports/database/organization'

export type OrganizationWorkspaceReference =
	WithWorkspaceReference<'organizationId'>
export const getOrganizationWorkspaceReference =
	createWorkspaceReference('organizationId')

@Injectable()
export class OrganizationService {
	constructor(
		@Inject('ORGANIZATION_REPOSITORY')
		private readonly organizationRepository: IOrganizationRepository,
		@Inject(forwardRef(() => WorkspaceService))
		private readonly workspaceService: WorkspaceService,
		@Inject(forwardRef(() => PlanService))
		private readonly planService: PlanService,
	) {}

	async getPaginatedOrganizations(
		input: Merge<
			[
				Pagination,
			]
		>,
	) {
		return this.organizationRepository.findPaginated({
			...input,
		})
	}

	async getOrganization(reference: OrganizationWorkspaceReference) {
		const { organizationId, workspaceId } =
			getOrganizationWorkspaceReference(reference)

		const organization =
			await this.organizationRepository.findById(organizationId)

		if (workspaceId && organization.state.workspaceId !== workspaceId) {
			throw new AclForbiddenException()
		}

		return organization
	}

	async createOrganization({ workspaceId, ...input }: OrganizationInput) {
		const workspace = await this.workspaceService.getWorkspace(workspaceId)

		const plan = await this.planService.getPlan(workspace.state.planId)

		const organizationCount =
			await this.organizationRepository.countByWorkspaceId(workspaceId)

		plan.checkIfCanCreateOrganization(organizationCount)

		return await this.organizationRepository.create({
			...input,
			workspaceId: workspace.state.workspaceId,
		})
	}

	async updateOrganization(
		reference: OrganizationWorkspaceReference,
		input: UpdatableOrganizationInput,
	) {
		const organization = await this.getOrganization(reference)

		return this.organizationRepository.updateById(
			organization.state.organizationId,
			input,
		)
	}

	async activeOrganization(reference: OrganizationWorkspaceReference) {
		const organization = await this.getOrganization(reference)

		return this.organizationRepository.updateById(
			organization.state.organizationId,
			{
				status: 'ACTIVE',
			},
		)
	}

	async inactiveOrganization(reference: OrganizationWorkspaceReference) {
		const organization = await this.getOrganization(reference)

		return this.organizationRepository.updateById(
			organization.state.organizationId,
			{
				status: 'INACTIVE',
			},
		)
	}

	async deleteOrganization(reference: OrganizationWorkspaceReference) {
		const organization = await this.getOrganization(reference)

		await this.organizationRepository.deleteById(
			organization.state.organizationId,
		)
	}

	async validateOrganizationIds(organizationIds: string[]) {
		await this.organizationRepository.validateIds(organizationIds)
	}
}
