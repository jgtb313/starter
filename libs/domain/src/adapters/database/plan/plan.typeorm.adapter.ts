import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import { type DeepPartial, type FindOptionsWhere, ILike, type Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'

import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import { PlanDomain } from '@/core/plan/plan.domain'
import type { BasePlan, Plan } from '@/core/plan/plan.schema'
import type { IPlanRepository } from '@/ports/database/plan'

@Injectable()
export class PlanTypeorm implements IPlanRepository {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly repository: Repository<PlanEntity>,
  ) {}

  findAllPaginated: IPlanRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
    const { name, status } = query

    const where: FindOptionsWhere<PlanEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const paginate = PaginationSchemaTransform.parse({ offset, limit })

    const skip = paginate.offset
    const take = paginate.limit

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values: values.map(this.toPlanDomain),
      meta: {
        ...paginate,
        total,
      },
    }
  }

  findAll: IPlanRepository['findAll'] = async (input) => {
    const { name, status } = input

    const where: FindOptionsWhere<PlanEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map((plan) => this.toPlanDomain(plan))
  }

  findById: IPlanRepository['findById'] = async (planId) => {
    const plan = await this.repository.findOne({ where: { planId } })

    if (!plan) {
      throw new NotFoundException(`Plan ${planId} not found`)
    }

    return this.toPlanDomain(plan)
  }

  create: IPlanRepository['create'] = async (input) => {
    const data = this.repository.create(this.toPlanEntity(input))

    const plan = await this.repository.save(data)

    return this.toPlanDomain(plan)
  }

  updateById: IPlanRepository['updateById'] = async (planId, input) => {
    const plan = await this.findById(planId)

    await this.repository.update(plan.state.planId, this.toPartialPlanEntity(input))

    return this.findById(plan.state.planId)
  }

  private toPlanEntity(plan: BasePlan): DeepPartial<PlanEntity> {
    return {
      ...plan,
    }
  }

  private toPartialPlanEntity(plan: Partial<Plan>): QueryDeepPartialEntity<PlanEntity> {
    return {
      ...plan,
    }
  }

  private toPlanDomain(model: PlanEntity) {
    return new PlanDomain(deepMapDatesToISOString(model))
  }
}
