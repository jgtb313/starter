import { Inject, Injectable } from '@nestjs/common'

import { BaseDomain } from '@/support/base-domain'
import { type Plan, type PlanInput, PlanSchema } from '@/core/plan/plan.schema'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PlanDomain extends BaseDomain<Plan> {
	constructor(
		plan: PlanInput,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {
		super(PlanSchema.parse(plan))
	}
}
