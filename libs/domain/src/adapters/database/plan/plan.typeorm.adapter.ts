import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	type FindOptionsOrder,
	type FindOptionsWhere,
	ILike,
	type Repository,
} from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { PlanDomain } from '@/core/plan/plan.domain'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import type { IPlanRepository } from '@/ports/database/plan'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PlanTypeorm implements IPlanRepository {
	constructor(
		@InjectRepository(PlanEntity)
		private readonly repository: Repository<PlanEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IPlanRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...query
	}) => {
		const { name, description, status } = query

		const where: FindOptionsWhere<PlanEntity> = {}
		const order: FindOptionsOrder<PlanEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (description) {
			where.description = ILike(`%${description}%`)
		}

		if (status) {
			where.status = status
		}

		if (sort?.name) {
			order.name = sort.name
		}

		if (sort?.description) {
			order.description = sort.description
		}

		if (sort?.status) {
			order.status = sort.status
		}

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const take = paginate.limit

		const [values, total] = await this.repository.findAndCount({
			where,
			order,
			take,
		})

		return {
			values: values.map(this.toPlanDomain),
			meta: {
				...paginate,
				total,
				nextCursor: null,
			},
		}
	}

	find: IPlanRepository['find'] = async (input) => {
		const { name, description, status, sort } = input

		const where: FindOptionsWhere<PlanEntity> = {}
		const order: FindOptionsOrder<PlanEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (description) {
			where.description = ILike(`%${description}%`)
		}

		if (status) {
			where.status = status
		}

		if (sort?.name) {
			order.name = sort.name
		}

		if (sort?.description) {
			order.description = sort.description
		}

		const values = await this.repository.find({
			where,
			order,
		})

		return values.map((plan) => this.toPlanDomain(plan))
	}

	findById: IPlanRepository['findById'] = async (planId) => {
		const plan = await this.repository.findOne({
			where: {
				planId,
			},
		})

		if (!plan) {
			throw new NotFoundException(
				this.i18nService.current.planNotFound({
					planId,
				}),
			)
		}

		return this.toPlanDomain(plan)
	}

	create: IPlanRepository['create'] = async (input) => {
		const data = this.repository.create(input)

		const plan = await this.repository.save(data)

		return this.toPlanDomain(plan)
	}

	updateById: IPlanRepository['updateById'] = async (planId, input) => {
		const plan = await this.findById(planId)

		await this.repository.update(plan.state.planId, input)

		return this.findById(plan.state.planId)
	}

	deleteById: IPlanRepository['deleteById'] = async (planId) => {
		const plan = await this.findById(planId)

		await this.repository.softDelete(plan.state.planId)
	}

	private toPlanDomain = (model: PlanEntity) => {
		return new PlanDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
