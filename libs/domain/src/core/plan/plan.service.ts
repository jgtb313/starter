import { Injectable, Inject } from '@nestjs/common'
import { uuid } from '@starter/common'

import { IPlanRepository } from '@/ports/database/plan'
import { RecurrenceService } from '@/adapters/recurrence'
import { IPlanService } from '@/core/plan/plan.service.interface'

@Injectable()
export class PlanService implements IPlanService {
  constructor(
    @Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository,
    private readonly recurrenceService: RecurrenceService,
  ) {}

  getPaginatedPlans: IPlanService['getPaginatedPlans'] = async (input) => {
    return this.planRepository.findAllPaginated(input)
  }

  getPlan: IPlanService['getPlan'] = async (planId) => {
    return this.planRepository.findById(planId)
  }

  createPlan: IPlanService['createPlan'] = async (input) => {
    const planId = uuid()

    const recurrencePlan = await this.recurrenceService.createPlan({
      ...input,
      referenceId: planId,
    })

    return this.planRepository.create({
      ...input,
      planId,
      externalId: recurrencePlan.planId,
    })
  }

  updatePlan: IPlanService['updatePlan'] = async (planId, input) => {
    const plan = await this.planRepository.findById(planId)

    await this.recurrenceService.updatePlan({
      planId,
      ...input,
    })

    return this.planRepository.updateById(plan.state.planId, input)
  }

  deletePlan: IPlanService['deletePlan'] = async (planId) => {
    const plan = await this.planRepository.findById(planId)

    await this.recurrenceService.cancelPlan({
      planId,
    })

    plan.markAsDeleted()

    await this.planRepository.updateById(plan.state.planId, plan.state)
  }
}
