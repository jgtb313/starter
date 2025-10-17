import { BaseDomain } from '@/support/base-domain'
import { type Plan, type PlanInput, PlanSchema } from '@/core/plan/plan.schema'

export class PlanDomain extends BaseDomain<Plan, PlanInput> {
	constructor(plan: PlanInput) {
		super(PlanSchema, plan)
	}
}
