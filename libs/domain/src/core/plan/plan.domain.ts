import { BaseDomain } from '@/support/base-domain'
import { type Plan, PlanSchema } from '@/core/plan/plan.schema'

export class PlanDomain extends BaseDomain<Plan> {
	constructor(plan: Plan) {
		super(PlanSchema, plan)
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	checkIfIsSignable() {
		return this.isActive()
	}
}
