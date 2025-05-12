import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, FindOptionsWhere } from 'typeorm'

import { SubscriptionSchema } from '@/core/subscription/subscription.schema'
import { PaginationService } from '@/support/pagination'
import { ISubscriptionRepository } from '@/ports/database/subscription'
import { SubscriptionEntity } from './subscription.typeorm.entity'

@Injectable()
export class SubscriptionTypeorm implements ISubscriptionRepository {
  private readonly repository: Repository<SubscriptionEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(SubscriptionEntity)
  }

  findAllPaginated: ISubscriptionRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
    const { status } = query

    const where: FindOptionsWhere<SubscriptionEntity> = {}

    if (status) {
      where.status = status
    }

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map(this.toSubscriptionDomain),
      meta,
    }
  }

  findAll: ISubscriptionRepository['findAll'] = async (input) => {
    const { status } = input

    const where: FindOptionsWhere<SubscriptionEntity> = {}

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map(this.toSubscriptionDomain)
  }

  findById: ISubscriptionRepository['findById'] = async (subscriptionId) => {
    const model = await this.repository.findOne({ where: { subscriptionId } })

    if (!model) {
      throw new NotFoundException(`Subscription ${subscriptionId} not found`)
    }

    return this.toSubscriptionDomain(model)
  }

  create: ISubscriptionRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return this.toSubscriptionDomain(model)
  }

  updateById: ISubscriptionRepository['updateById'] = async (subscriptionId, input) => {
    const model = await this.findById(subscriptionId)

    await this.repository.update(model.subscriptionId, input)

    return this.findById(model.subscriptionId)
  }

  private toSubscriptionDomain(model: SubscriptionEntity) {
    return SubscriptionSchema.parse({
      ...model,
      deadline: model.deadline.toISOString(),
      canceledAt: model.canceledAt ? model.canceledAt.toISOString() : null,
      createdAt: model.createdAt.toISOString(),
      updatedAt: model.updatedAt.toISOString(),
    })
  }
}
