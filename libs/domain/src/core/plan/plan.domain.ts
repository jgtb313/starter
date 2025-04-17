import { ConflictException } from '@starter/nestjs-error-handling'
import { addDays, addWeeks, addMonths, addYears } from '@starter/common'

import { BaseDomain } from '@/support/base-domain'
import { PlanSchema, Plan, PlanIntervalEnum, PlanStatusEnum } from '@/core/plan/plan.schema'

export class PlanDomain extends BaseDomain<Plan> {
  constructor(plan: Plan) {
    super(PlanSchema, plan)
  }

  checkIfIsSignable() {
    if (this.signable()) {
      return
    }

    throw new ConflictException('Plano não disponível para assinatura')
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

  signable() {
    return this.isActive()
  }

  getMonthlyRevenue() {
    const intervals = {
      [PlanIntervalEnum.DAY]: this.state.amount * 31,
      [PlanIntervalEnum.WEEK]: this.state.amount * 4,
      [PlanIntervalEnum.MONTH]: this.state.amount * 1,
      [PlanIntervalEnum.YEAR]: Math.ceil(this.state.amount / 12),
    }

    return intervals[this.state.interval]
  }

  nextBillingDate(lastBillingDate: Date) {
    const intervals = {
      [PlanIntervalEnum.DAY]: addDays(new Date(lastBillingDate), this.state.intervalCount),
      [PlanIntervalEnum.WEEK]: addWeeks(new Date(lastBillingDate), this.state.intervalCount),
      [PlanIntervalEnum.MONTH]: addMonths(new Date(lastBillingDate), this.state.intervalCount),
      [PlanIntervalEnum.YEAR]: addYears(new Date(lastBillingDate), this.state.intervalCount),
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
      throw new ConflictException('Este plano já está deletado')
    }

    this.state.deletedAt = new Date()
  }
}
