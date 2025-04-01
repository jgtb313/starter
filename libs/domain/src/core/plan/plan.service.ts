import { Injectable, Inject } from '@nestjs/common'
import { Pagination } from '@starter/schema'

import { Plan, BasePlan } from '@/schemas'
import { IPlanRepository } from '@/ports/database/plan'

@Injectable()
export class PlanService {
  constructor(@Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository) {}

  async getPaginatedPlans(input: Pagination<Plan>) {
    const result = await this.planRepository.findAllPaginated(input)

    return result
  }

  async getPlan(planId: string) {
    const plan = await this.planRepository.findById(planId)

    return plan
  }

  async createPlan(input: BasePlan) {
    const plan = await this.planRepository.create(input)

    return plan
  }

  async updatePlan(planId: string, input: Partial<Plan>) {
    const plan = await this.planRepository.findById(planId)

    const result = await this.planRepository.updateById(plan.planId, input)

    return result
  }

  async deletePlan(planId: string) {
    const plan = await this.getPlan(planId)

    plan.deletedAt = new Date()

    await this.planRepository.updateById(plan.planId, plan)
  }
}
