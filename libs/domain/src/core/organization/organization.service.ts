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

  async findAll(input: Pagination<Organization>) {
    const result = await this.organizationRepository.findAll({
      ...input,
    })

    return result
  }

  async findById(reference: OrganizationWorkspaceReference) {
    const { organizationId, workspaceId } = getOrganizationWorkspaceReference(reference)

    const organization = await this.organizationRepository.findById(organizationId)

    if (organization.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return organization
  }

  async findOne(input: Partial<Organization>) {
    const organization = await this.organizationRepository.findOne({
      ...input,
    })

    return organization
  }

  async create({ workspaceId, ...input }: BaseOrganization) {
    const workspace = await this.workspaceService.findById(workspaceId)

    const result = await this.organizationRepository.create({
      ...input,
      workspaceId: workspace.workspaceId,
    })

    return result
  }

  async updateById(reference: OrganizationWorkspaceReference, input: Partial<Organization>) {
    const organization = await this.findById(reference)

    const result = await this.organizationRepository.updateById(organization.organizationId, input)

    return result
  }

  async deleteById(reference: OrganizationWorkspaceReference) {
    const organization = await this.findById(reference)

    await this.organizationRepository.deleteById(organization.organizationId)
  }

  async validateIds(roleIds: string[]) {
    return this.organizationRepository.validateIds(roleIds)
  }
}
