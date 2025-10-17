import { BaseDomain } from '@/support/base-domain'
import {
	type Organization,
	type OrganizationInput,
	OrganizationSchema,
} from '@/core/organization/organization.schema'

export class OrganizationDomain extends BaseDomain<
	Organization,
	OrganizationInput
> {
	constructor(organization: OrganizationInput) {
		super(OrganizationSchema, organization)
	}
}
