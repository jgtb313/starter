import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import { OrganizationSchema, Organization, OrganizationInput, OrganizationStatusEnum } from '@/core/organization/organization.schema'

export class OrganizationDomain extends BaseDomain<Organization, OrganizationInput> {
  constructor(organization: OrganizationInput) {
    super(OrganizationSchema, organization)
  }

  isActive() {
    return this.state.status === OrganizationStatusEnum.ACTIVE
  }

  isInactive() {
    return this.state.status === OrganizationStatusEnum.INACTIVE
  }

  markAsActive() {
    if (this.isActive()) {
      throw new ConflictException(`Organization ${this.state.organizationId} is already 'ACTIVE'.`)
    }

    this.state.status = OrganizationStatusEnum.ACTIVE
  }

  markAsInactive() {
    if (this.isInactive()) {
      throw new ConflictException(`Organization ${this.state.organizationId} is already 'INACTIVE'.`)
    }

    this.state.status = OrganizationStatusEnum.INACTIVE
  }
}
