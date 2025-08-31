import { addDays, addMonths, addWeeks, addYears } from '@starter/common'
import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'

import { type Plan, type PlanInput, PlanSchema } from '@/core/plan/plan.schema'

export class PlanDomain extends BaseDomain<Plan, PlanInput> {
	constructor(plan: PlanInput) {
		super(PlanSchema, plan)
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isInactive() {
		return this.state.status === 'INACTIVE'
	}

	isDeleted() {
		return !!this.state.deletedAt
	}

	isSignable() {
		return this.isActive()
	}

	getMonthlyRevenue() {
		const intervals = {
			DAY: this.state.amount * 31,
			WEEK: this.state.amount * 4,
			MONTH: this.state.amount * 1,
			YEAR: Math.ceil(this.state.amount / 12),
		}

		return intervals[this.state.interval]
	}

	nextBillingDate(lastBillingDate: Date) {
		const intervals = {
			DAY: addDays(new Date(lastBillingDate), this.state.intervalCount),
			WEEK: addWeeks(new Date(lastBillingDate), this.state.intervalCount),
			MONTH: addMonths(new Date(lastBillingDate), this.state.intervalCount),
			YEAR: addYears(new Date(lastBillingDate), this.state.intervalCount),
		}

		return intervals[this.state.interval]
	}

	markAsActive() {
		this.state.status = 'ACTIVE'
	}

	markAsInactive() {
		this.state.status = 'INACTIVE'
	}

	markAsDeleted() {
		if (!this.isDeleted()) {
			this.state.deletedAt = new Date().toISOString()

			return
		}

		throw new ConflictException(`Plan ${this.state.planId} is already deleted`)
	}

	checkIfIsSignable() {
		if (this.isSignable()) {
			return
		}

		throw new ConflictException(
			`Plan ${this.state.planId} is not available for subscription`,
		)
	}
}
