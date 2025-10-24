import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput } from '@starter/schema'

import type { OrganizationDomain } from '@/core/organization/organization.domain'
import type {
	Organization,
	OrganizationInput,
	UpdatableOrganizationInput,
} from '@/core/organization/organization.schema'

type FindOrganizationInput = Partial<Organization>

export type IOrganizationRepository = {
	findPaginated(
		input: Merge<
			[
				FindOrganizationInput,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<OrganizationDomain>>
	find(input: Partial<Organization>): Promise<OrganizationDomain[]>
	findById(organizationId: string): Promise<OrganizationDomain>
	countByWorkspaceId(workspaceId: string): Promise<number>
	create(input: OrganizationInput): Promise<OrganizationDomain>
	updateById(
		organizationId: string,
		input: UpdatableOrganizationInput,
	): Promise<OrganizationDomain>
	deleteById(organizationId: string): Promise<void>

	validateIds(organizationId: string[]): Promise<void>
}
