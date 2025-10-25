import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { PlanDomain } from '@/core/plan/plan.domain'
import {
	PlanInputSchema,
	UpdatablePlanInputSchema,
} from '@/core/plan/plan.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IPlanRepository } from '@/ports/database/plan'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaPlan = Prisma.PlanGetPayload<{
	include: {
		intervals: true
		features: true
	}
}>

@Injectable()
export class PlanPrisma implements IPlanRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IPlanRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...input
	}) => {
		const { name, description, status } = input

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const where: Prisma.PlanWhereInput = {}
		const orderBy: Prisma.PlanOrderByWithRelationInput[] = sort
			? Object.entries(sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (description) {
			where.description = {
				contains: description,
				mode: 'insensitive',
			}
		}

		if (status) {
			where.status = status
		}

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					planId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaPlan[],
			number,
		] = await Promise.all([
			prisma.plan.findMany({
				include: {
					intervals: true,
					features: true,
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.plan.count({
				where,
			}),
		])

		const nextCursor = values.length ? values[values.length - 1].planId : null

		return {
			values: values.map((plan) => this.toPlanDomain(plan)),
			meta: {
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IPlanRepository['find'] = async ({ sort, ...input }) => {
		const { name, description, status } = input

		const where: Prisma.PlanWhereInput = {}
		const orderBy: Prisma.PlanOrderByWithRelationInput[] = sort
			? Object.entries(sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (description) {
			where.description = {
				contains: description,
				mode: 'insensitive',
			}
		}

		if (status) {
			where.status = status
		}

		const values: PrismaPlan[] = await prisma.plan.findMany({
			include: {
				intervals: true,
				features: true,
			},
			where,
			orderBy,
		})

		return values.map((plan) => this.toPlanDomain(plan))
	}

	findById: IPlanRepository['findById'] = async (planId) => {
		const plan: PrismaPlan | null = await prisma.plan.findUnique({
			include: {
				intervals: true,
				features: true,
			},
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

	findDefault: IPlanRepository['findDefault'] = async () => {
		const plan: PrismaPlan | null = await prisma.plan.findFirst({
			include: {
				intervals: true,
				features: true,
			},
			where: {
				default: true,
			},
		})

		if (!plan) {
			throw new NotFoundException(
				this.i18nService.current.planNotFound({
					planId: 'default',
				}),
			)
		}

		return this.toPlanDomain(plan)
	}

	create: IPlanRepository['create'] = async (input) => {
		const { intervals, features, ...data } = PlanInputSchema.parse(input)

		const plan: PrismaPlan = await prisma.plan.create({
			include: {
				intervals: true,
				features: true,
			},
			data: {
				...data,
				intervals: {
					createMany: {
						data: intervals,
					},
				},
				features: {
					createMany: {
						data: features,
					},
				},
			},
		})

		return this.toPlanDomain(plan)
	}

	updateById: IPlanRepository['updateById'] = async (planId, input) => {
		const data = UpdatablePlanInputSchema.parse(input)

		const plan: PrismaPlan = await prisma.plan.update({
			include: {
				intervals: true,
				features: true,
			},
			where: {
				planId,
			},
			data,
		})

		return this.toPlanDomain(plan)
	}

	deleteById: IPlanRepository['deleteById'] = async (planId) => {
		await prisma.plan.update({
			where: {
				planId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	private toPlanDomain(model: PrismaPlan) {
		return new PlanDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
