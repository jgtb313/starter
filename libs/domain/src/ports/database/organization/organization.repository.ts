import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { OrganizationDomain } from '@/core/organization/organization.domain'
import type {
	Organization,
	OrganizationInput,
	UpdatableOrganizationInput,
} from '@/core/organization/organization.schema'

export type FindOrganizationInput = Partial<
	Pick<Organization, 'name' | 'status' | 'createdAt'>
>

export type OrganizationSort = Sort<'name' | 'status' | 'createdAt'>

export type IOrganizationRepository = {
	findPaginated(
		input: Merge<
			[
				FindOrganizationInput,
				OrganizationSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<OrganizationDomain>>
	find(
		input: Merge<
			[
				FindOrganizationInput,
				OrganizationSort,
			]
		>,
	): Promise<OrganizationDomain[]>
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
