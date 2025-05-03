import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { PaginationService } from '@/support/pagination'
import { IPlanRepository } from '@/ports/database/plan'
import { PlanDomain } from '@/core/plan/plan.domain'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'

@Injectable()
export class PlanTypeorm implements IPlanRepository {
  private readonly repository: Repository<PlanEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(PlanEntity)
  }

  findAllPaginated: IPlanRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
    const { name, status } = query

    const where: FindOptionsWhere<PlanEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map((plan) => new PlanDomain(plan)),
      meta,
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

    return values.map((plan) => new PlanDomain(plan))
  }

  findById: IPlanRepository['findById'] = async (planId) => {
    console.log({ planId })

    const plan = await this.repository.findOne({ where: { planId } })

    if (!plan) {
      throw new NotFoundException(`Plan ${planId} not found`)
    }

    return new PlanDomain(plan)
  }

  create: IPlanRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const plan = await this.repository.save(data)

    return new PlanDomain(plan)
  }

  updateById: IPlanRepository['updateById'] = async (planId, input) => {
    const plan = await this.findById(planId)

    await this.repository.update(plan.state.planId, input)

    return this.findById(plan.state.planId)
  }
}
