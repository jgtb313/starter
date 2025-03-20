import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Organization, BaseOrganization } from '@/schemas'
import { IOrganizationRepository } from '@/ports/database/organization'

type OrganizationWorkspaceReference = WithWorkspaceReference<'organizationId'>
const getOrganizationWorkspaceReference = createWorkspaceReference('organizationId')

@Injectable()
export class OrganizationService {
  constructor(@Inject('ORGANIZATION_REPOSITORY') private readonly organizationRepository: IOrganizationRepository) {}

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

  async create(input: BaseOrganization) {
    const result = await this.organizationRepository.create({
      ...input,
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
}
