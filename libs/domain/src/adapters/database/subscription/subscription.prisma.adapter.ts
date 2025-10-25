import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import {
	SubscriptionInputSchema,
	UpdatableSubscriptionInputSchema,
} from '@/core/subscription/subscription.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindSubscriptionInput,
	ISubscriptionRepository,
	SubscriptionSort,
} from '@/ports/database/subscription/subscription.repository'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaSubscription = Prisma.SubscriptionGetPayload<{
	include: {
		plan: true
	}
}>

@Injectable()
export class SubscriptionPrisma implements ISubscriptionRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: ISubscriptionRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...input
	}) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					subscriptionId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaSubscription[],
			number,
		] = await Promise.all([
			prisma.subscription.findMany({
				include: {
					plan: true,
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.subscription.count({
				where,
			}),
		])

		const nextCursor = values.length
			? values[values.length - 1].subscriptionId
			: null

		return {
			values: values.map((subscription) =>
				this.toSubscriptionDomain(subscription),
			),
			meta: {
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: ISubscriptionRepository['find'] = async ({ sort, ...input }) => {
		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const values: PrismaSubscription[] = await prisma.subscription.findMany({
			include: {
				plan: true,
			},
			where,
			orderBy,
		})

		return values.map((subscription) => this.toSubscriptionDomain(subscription))
	}

	findById: ISubscriptionRepository['findById'] = async (subscriptionId) => {
		const subscription: PrismaSubscription | null =
			await prisma.subscription.findUnique({
				include: {
					plan: true,
				},
				where: {
					subscriptionId,
				},
			})

		if (!subscription) {
			throw new NotFoundException(
				this.i18nService.current.subscriptionNotFound({
					subscriptionId,
				}),
			)
		}

		return this.toSubscriptionDomain(subscription)
	}

	create: ISubscriptionRepository['create'] = async (input) => {
		const { workspaceId, planId, ...data } =
			SubscriptionInputSchema.parse(input)

		const subscription: PrismaSubscription = await prisma.subscription.create({
			include: {
				plan: true,
			},
			data: {
				...data,
				workspace: {
					connect: {
						workspaceId,
					},
				},
				plan: {
					connect: {
						planId,
					},
				},
			},
		})

		return this.toSubscriptionDomain(subscription)
	}

	updateById: ISubscriptionRepository['updateById'] = async (
		subscriptionId,
		input,
	) => {
		const data = UpdatableSubscriptionInputSchema.parse(input)

		const subscription: PrismaSubscription = await prisma.subscription.update({
			include: {
				plan: true,
			},
			where: {
				subscriptionId,
			},
			data,
		})

		return this.toSubscriptionDomain(subscription)
	}

	private parseWhere({
		workspaceId,
		planId,
		externalId,
		paymentMethod,
		status,
	}: FindSubscriptionInput): Prisma.SubscriptionWhereInput {
		const where: Prisma.SubscriptionWhereInput = {}

		if (workspaceId) {
			where.workspaceId = workspaceId
		}

		if (planId) {
			where.planId = planId
		}

		if (externalId) {
			where.externalId = externalId
		}

		if (paymentMethod) {
			where.paymentMethod = paymentMethod
		}

		if (status) {
			where.status = status
		}

		return where
	}

	private parseOrderBy({
		sort,
	}: SubscriptionSort): Prisma.SubscriptionOrderByWithRelationInput[] {
		if (!sort) {
			return [
				{
					createdAt: 'desc',
				},
			]
		}

		return Object.entries(sort).map(([key, value]) => ({
			[key]: value,
		}))
	}

	private toSubscriptionDomain(model: Prisma.SubscriptionGetPayload<{}>) {
		return new SubscriptionDomain(
			deepMapDatesToISOString(model),
			this.i18nService,
		)
	}
}
