import { ConflictException } from '@starter/nestjs-error-handling'

import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Plan, PlanSchema } from '@/core/plan/plan.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PlanDomain extends BaseDomain<Plan> {
	constructor(
		plan: Plan,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(PlanSchema.parse(plan))
	}

	checkIfCanCreateOrganization = (organizationCount: number) => {
		const organizationCountFeature = this.state.features.find(
			(feature) => feature.feature === 'ORGANIZATION_COUNT',
		)

		if (!organizationCountFeature) {
			return
		}

		const hasReachedLimit =
			organizationCountFeature.props.maxOrganizations <= organizationCount

		if (!hasReachedLimit) {
			return
		}

		throw new ConflictException(
			this.i18nService.current.planOrganizationCountLimitReached({
				maxOrganizations: organizationCountFeature.props.maxOrganizations,
			}),
		)
	}
}
