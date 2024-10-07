import { PlanSchema, Plan as IPlan, PlanStatusEnum } from '@starter/schema'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type PlanDomain = SetupDomain<IPlan>

export class Plan {
  state!: IPlan

  constructor(value: PlanDomain) {
    Object.assign(this, {
      state: setupDomain(
        {
          ...value
        },
        PlanSchema
      )
    })
  }

  markAsActive() {
    this.state.status = PlanStatusEnum.ACTIVE
  }

  markAsInactive() {
    this.state.status = PlanStatusEnum.INACTIVE
  }

  markAsDeleted() {
    this.state.status = PlanStatusEnum.DELETED
  }
}
