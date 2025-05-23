import { uuid } from '@starter/common'

import { OrganizationDomain } from '@/core/organization/organization.domain'
import { OrganizationInput, OrganizationStatusEnum } from '@/core/organization/organization.schema'

type OrganizationOverrides = Partial<OrganizationInput>

export const makeOrganization = (overrides: OrganizationOverrides): OrganizationDomain => {
  const base: OrganizationInput = {
    organizationId: uuid(),
    workspaceId: uuid(),
    name: `Organization ${uuid()}`,
    deletedAt: null,
    status: OrganizationStatusEnum.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return new OrganizationDomain({
    ...base,
    ...overrides,
  })
}

export const organizationMocks: OrganizationDomain[] = [
  makeOrganization({ name: 'BrightFuture Inc.', status: OrganizationStatusEnum.ACTIVE }),
  makeOrganization({ name: 'GreenField Solutions', status: OrganizationStatusEnum.INACTIVE }),
  makeOrganization({ name: 'CloudHaven Ltd.', status: OrganizationStatusEnum.ACTIVE }),
  makeOrganization({ name: 'SilentWave Corp.', status: OrganizationStatusEnum.INACTIVE }),
  makeOrganization({ name: 'QuantumEdge', deletedAt: new Date().toISOString(), status: OrganizationStatusEnum.ACTIVE }),
  makeOrganization({ name: 'DeepFocus Group', status: OrganizationStatusEnum.INACTIVE }),
  makeOrganization({ name: 'PixelForge', deletedAt: new Date().toISOString(), status: OrganizationStatusEnum.ACTIVE }),
  makeOrganization({ name: 'IronBridge Technologies', deletedAt: new Date().toISOString(), status: OrganizationStatusEnum.INACTIVE }),
  makeOrganization({ name: 'NovaSpark', status: OrganizationStatusEnum.ACTIVE }),
  makeOrganization({ name: 'ColdStream Systems', status: OrganizationStatusEnum.INACTIVE }),
]
