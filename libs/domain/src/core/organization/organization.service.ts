import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { IOrganizationRepository } from '@/ports/database/organization'
import { IWorkspaceService } from '@/core/workspace/workspace.service.interface'
import { getOrganizationWorkspaceReference, IOrganizationService } from '@/core/organization/organization.service.interface'

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @Inject('ORGANIZATION_REPOSITORY') private readonly organizationRepository: IOrganizationRepository,
    @Inject('WORKSPACE_SERVICE') private readonly workspaceService: IWorkspaceService,
  ) {}

  getPaginatedOrganizations: IOrganizationService['getPaginatedOrganizations'] = async (input) => {
    const result = await this.organizationRepository.findAllPaginated({
      ...input,
    })

    return result
  }

  getOrganization: IOrganizationService['getOrganization'] = async (reference) => {
    const { organizationId, workspaceId } = getOrganizationWorkspaceReference(reference)

    const organization = await this.organizationRepository.findById(organizationId)

    if (organization.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return organization
  }

  create: IOrganizationService['create'] = async ({ workspaceId, ...input }) => {
    const workspace = await this.workspaceService.getWorkspace(workspaceId)

    const organization = await this.organizationRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
    })

    return organization
  }

  updateOrganization: IOrganizationService['updateOrganization'] = async (reference, input) => {
    const organization = await this.getOrganization(reference)

    const result = await this.organizationRepository.updateById(organization.organizationId, input)

    return result
  }

  deleteOrganization: IOrganizationService['deleteOrganization'] = async (reference) => {
    const organization = await this.getOrganization(reference)

    organization.deletedAt = new Date()

    await this.organizationRepository.updateById(organization.organizationId, organization)
  }

  validateOrganizationIds: IOrganizationService['validateOrganizationIds'] = async (organizationIds) => {
    await this.organizationRepository.validateIds(organizationIds)
  }
}
