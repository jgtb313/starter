import { Pagination, PaginationOutput } from '@starter/schema'

import { Organization, BaseOrganization } from '@/schemas'

export type IOrganizationRepository = {
  findAllPaginated(input: Pagination<Organization>): Promise<PaginationOutput<Organization>>
  findAll(input: Partial<Organization>): Promise<Organization[]>
  findOne(input: Partial<Organization>): Promise<Organization | null>
  findById(organizationId: string): Promise<Organization>
  create(input: BaseOrganization): Promise<Organization>
  updateById(organizationId: string, input: Partial<Organization>): Promise<Organization>
  validateIds(organizationId: string[]): Promise<void>
}
