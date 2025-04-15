import { Injectable, Inject } from '@nestjs/common'

import { IPlanRepository } from '@/ports/database/plan'
import { IPlanService } from '@/core/plan/plan.service.interface'

@Injectable()
export class PlanService implements IPlanService {
  constructor(@Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository) {}

  getPaginatedPlans: IPlanService['getPaginatedPlans'] = async (input) => {
    return this.planRepository.findAllPaginated(input)
  }

  getPlan: IPlanService['getPlan'] = async (planId) => {
    return this.planRepository.findById(planId)
  }

  createPlan: IPlanService['createPlan'] = async (input) => {
    return this.planRepository.create(input)
  }

  updatePlan: IPlanService['updatePlan'] = async (planId, input) => {
    const plan = await this.planRepository.findById(planId)

    return this.planRepository.updateById(plan.planId, input)
  }

  deletePlan: IPlanService['deletePlan'] = async (planId) => {
    const plan = await this.getPlan(planId)

    plan.deletedAt = new Date()

    await this.planRepository.updateById(plan.planId, plan)
  }
}
