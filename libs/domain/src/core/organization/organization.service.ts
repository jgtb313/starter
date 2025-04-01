import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Organization, BaseOrganization } from '@/schemas'
import { IOrganizationRepository } from '@/ports/database/organization'
import { WorkspaceService } from '../workspace'

type OrganizationWorkspaceReference = WithWorkspaceReference<'organizationId'>
const getOrganizationWorkspaceReference = createWorkspaceReference('organizationId')

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION_REPOSITORY') private readonly organizationRepository: IOrganizationRepository,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async getPaginatedOrganizations(input: Pagination<Organization>) {
    const result = await this.organizationRepository.findAllPaginated({
      ...input,
    })

    return result
  }

  async getOrganization(reference: OrganizationWorkspaceReference) {
    const { organizationId, workspaceId } = getOrganizationWorkspaceReference(reference)

    const organization = await this.organizationRepository.findById(organizationId)

    if (organization.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return organization
  }

  async create({ workspaceId, ...input }: BaseOrganization) {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const organization = await this.organizationRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
    })

    return organization
  }

  async updateOrganization(reference: OrganizationWorkspaceReference, input: Partial<Organization>) {
    const organization = await this.getOrganization(reference)

    const result = await this.organizationRepository.updateById(organization.organizationId, input)

    return result
  }

  async deleteOrganization(reference: OrganizationWorkspaceReference) {
    const organization = await this.getOrganization(reference)

    organization.deletedAt = new Date()

    await this.organizationRepository.updateById(organization.organizationId, organization)
  }

  async validateOrganizationIds(roleIds: string[]) {
    return this.organizationRepository.validateIds(roleIds)
  }
}
