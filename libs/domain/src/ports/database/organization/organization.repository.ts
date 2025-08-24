import type { Pagination, PaginationOutput } from '@starter/schema'

import type { OrganizationDomain } from '@/core/organization/organization.domain'
import type {
	BaseOrganization,
	Organization,
} from '@/core/organization/organization.schema'

export type IOrganizationRepository = {
	findAllPaginated(
		input: Pagination<Organization>,
	): Promise<PaginationOutput<OrganizationDomain>>
	findAll(input: Partial<Organization>): Promise<OrganizationDomain[]>
	findById(organizationId: string): Promise<OrganizationDomain>
	create(input: BaseOrganization): Promise<OrganizationDomain>
	updateById(
		organizationId: string,
		input: Partial<Organization>,
	): Promise<OrganizationDomain>
	deleteById(organizationId: string): Promise<void>
	validateIds(organizationId: string[]): Promise<void>
}
