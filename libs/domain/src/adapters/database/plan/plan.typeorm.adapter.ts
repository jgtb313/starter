import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { PlanSchema } from '@/schemas'
import { PaginationService } from '@/support/pagination'
import { IPlanRepository } from '@/ports/database/plan'
import { PlanEntity } from './plan.typeorm.entity'

@Injectable()
export class PlanTypeorm implements IPlanRepository {
  private readonly repository: Repository<PlanEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(PlanEntity)
  }

  findAll: IPlanRepository['findAll'] = async ({ offset, limit, ...query }) => {
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
      values: values.map((plan) => PlanSchema.parse(plan)),
      meta,
    }
  }

  findById: IPlanRepository['findById'] = async (planId) => {
    const model = await this.repository.findOne({ where: { planId } })

    if (!model) {
      throw new NotFoundException(`Plan ${planId} not found`)
    }

    return PlanSchema.parse(model)
  }

  findOne: IPlanRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<PlanEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return PlanSchema.parse(model)
  }

  create: IPlanRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return PlanSchema.parse(model)
  }

  updateById: IPlanRepository['updateById'] = async (planId, input) => {
    const plan = await this.findById(planId)

    await this.repository.update(plan.planId, input)

    return this.findById(plan.planId)
  }

  deleteById: IPlanRepository['deleteById'] = async (planId) => {
    await this.repository.softDelete({ planId })
  }
}
