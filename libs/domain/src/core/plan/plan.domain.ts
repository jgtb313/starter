import { ConflictException } from '@starter/nestjs-error-handling'
import { addDays, addWeeks, addMonths, addYears } from '@starter/common'

import { BaseDomain } from '@/support/base-domain'
import { RecurrenceIntervalEnum } from '@/ports/recurrence'
import { PlanSchema, Plan, PlanStatusEnum } from '@/core/plan/plan.schema'

export class PlanDomain extends BaseDomain<Plan> {
  constructor(plan: Plan) {
    super(PlanSchema, plan)
  }

  isActive() {
    return this.state.status === PlanStatusEnum.ACTIVE
  }

  isInactive() {
    return this.state.status === PlanStatusEnum.INACTIVE
  }

  isDeleted() {
    return !!this.state.deletedAt
  }

  isSignable() {
    return this.isActive()
  }

  getMonthlyRevenue() {
    const intervals = {
      [RecurrenceIntervalEnum.DAY]: this.state.amount * 31,
      [RecurrenceIntervalEnum.WEEK]: this.state.amount * 4,
      [RecurrenceIntervalEnum.MONTH]: this.state.amount * 1,
      [RecurrenceIntervalEnum.YEAR]: Math.ceil(this.state.amount / 12),
    }

    return intervals[this.state.interval]
  }

  nextBillingDate(lastBillingDate: Date) {
    const intervals = {
      [RecurrenceIntervalEnum.DAY]: addDays(new Date(lastBillingDate), this.state.intervalCount),
      [RecurrenceIntervalEnum.WEEK]: addWeeks(new Date(lastBillingDate), this.state.intervalCount),
      [RecurrenceIntervalEnum.MONTH]: addMonths(new Date(lastBillingDate), this.state.intervalCount),
      [RecurrenceIntervalEnum.YEAR]: addYears(new Date(lastBillingDate), this.state.intervalCount),
    }

    return intervals[this.state.interval]
  }

  markAsActive() {
    this.state.status = PlanStatusEnum.ACTIVE
  }

  markAsInactive() {
    this.state.status = PlanStatusEnum.INACTIVE
  }

  markAsDeleted() {
    if (this.isDeleted()) {
      throw new ConflictException(`Plan ${this.state.planId} is already deleted`)
    }

    this.state.deletedAt = new Date()
  }

  checkIfIsSignable() {
    if (this.isSignable()) {
      return
    }

    throw new ConflictException(`Plan ${this.state.planId} is not available for subscription`)
  }
}
