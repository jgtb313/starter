import { Pagination, PaginationOutput } from '@starter/schema'

import { Organization, BaseOrganization } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'

export type OrganizationWorkspaceReference = WithWorkspaceReference<'organizationId'>

export const getOrganizationWorkspaceReference = createWorkspaceReference('organizationId')

export interface IOrganizationService {
  getPaginatedOrganizations(input: Pagination<Organization>): Promise<PaginationOutput<Organization>>

  getOrganization(reference: OrganizationWorkspaceReference): Promise<Organization>

  create(input: BaseOrganization): Promise<Organization>

  updateOrganization(reference: OrganizationWorkspaceReference, input: Partial<Organization>): Promise<Organization>

  deleteOrganization(reference: OrganizationWorkspaceReference): Promise<void>

  validateOrganizationIds(organizationIds: string[]): Promise<void>
}
