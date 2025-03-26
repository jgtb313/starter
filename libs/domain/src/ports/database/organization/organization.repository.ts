import { Pagination, PaginationOutput } from '@starter/schema'

import { Organization, BaseOrganization } from '@/schemas'

export type IOrganizationRepository = {
  findAll(query: Pagination<Organization>): Promise<PaginationOutput<Organization>>
  findById(userId: string): Promise<Organization>
  findOne(input: Partial<Organization>): Promise<Organization | null>
  create(input: BaseOrganization): Promise<Organization>
  updateById(userId: string, input: Partial<Organization>): Promise<Organization>
  deleteById(userId: string): Promise<void>
  validateIds(userId: string[]): Promise<void>
}
