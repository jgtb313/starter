import { Injectable, Inject } from '@nestjs/common'
import { Pagination } from '@starter/schema'

import { Plan, BasePlan } from '@/schemas'
import { IPlanRepository } from '@/ports/database/plan'

@Injectable()
export class PlanService {
  constructor(@Inject('PLAN_REPOSITORY') private readonly planRepository: IPlanRepository) {}

  async findAll(input: Pagination<Plan>) {
    const result = await this.planRepository.findAll(input)

    return result
  }

  async findById(planId: string) {
    const result = await this.planRepository.findById(planId)

    return result
  }

  async findOne(input: Partial<Plan>) {
    const result = await this.planRepository.findOne(input)

    return result
  }

  async create(input: BasePlan) {
    const result = await this.planRepository.create(input)

    return result
  }

  async updateById(planId: string, input: Partial<Plan>) {
    const plan = await this.planRepository.findById(planId)

    const result = await this.planRepository.updateById(plan.planId, input)

    return result
  }

  async deleteById(planId: string) {
    await this.planRepository.deleteById(planId)
  }
}
