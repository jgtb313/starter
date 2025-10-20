import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { PlanDomain } from '@/core/plan/plan.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IPlanRepository } from '@/ports/database/plan'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PlanPrisma implements IPlanRepository {
	private readonly include: Prisma.PlanInclude = {
		planIntervals: true,
		planFeatures: true,
	}

	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IPlanRepository['findPaginated'] = async (input) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor: input.cursor,
			limit: input.limit,
		})

		const where: Prisma.PlanWhereInput = {}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.description) {
			where.description = {
				contains: input.description,
				mode: 'insensitive',
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.PlanOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					planId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.plan.findMany({
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
				include: this.include,
			}),
			prisma.plan.count({
				where,
			}),
		])

		const nextCursor = values.length ? values[values.length - 1].planId : null

		return {
			values: values.map((plan) => this.toPlanDomain(plan)),
			meta: {
				...paginate,
				total,
				nextCursor,
			},
		}
	}

	find: IPlanRepository['find'] = async (input) => {
		const where: Prisma.PlanWhereInput = {}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.description) {
			where.description = {
				contains: input.description,
				mode: 'insensitive',
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.PlanOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const values = await prisma.plan.findMany({
			where,
			orderBy,
			include: this.include,
		})

		return values.map((plan) => this.toPlanDomain(plan))
	}

	findById: IPlanRepository['findById'] = async (planId) => {
		const plan = await prisma.plan.findUnique({
			where: {
				planId,
			},
			include: this.include,
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
		const plan = await prisma.plan.findFirst({
			where: {
				default: true,
			},
			include: this.include,
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
		const plan = await prisma.plan.create({
			data: input,
			include: this.include,
		})

		return this.toPlanDomain(plan)
	}

	updateById: IPlanRepository['updateById'] = async (planId, input) => {
		const plan = await prisma.plan.update({
			where: {
				planId,
			},
			data: input,
			include: this.include,
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

	private toPlanDomain({
		planIntervals,
		planFeatures,
		...model
	}: Prisma.PlanGetPayload<{
		include: {
			planIntervals: true
			planFeatures: true
		}
	}>) {
		return new PlanDomain(
			deepMapDatesToISOString({
				...model,
				intervals: planIntervals,
				features: planFeatures,
			}),
			this.i18nService,
		)
	}
}
