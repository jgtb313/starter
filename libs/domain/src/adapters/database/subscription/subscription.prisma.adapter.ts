import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import { SubscriptionInputSchema } from '@/core/subscription/subscription.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { ISubscriptionRepository } from '@/ports/database/subscription'
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

	findPaginated: ISubscriptionRepository['findPaginated'] = async (input) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor: input.cursor,
			limit: input.limit,
		})

		const where: Prisma.SubscriptionWhereInput = {}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.SubscriptionOrderByWithRelationInput[] = input.sort
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
					subscriptionId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaSubscription[],
			number,
		] = await prisma.$transaction([
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
				...paginate,
				total,
				nextCursor,
			},
		}
	}

	find: ISubscriptionRepository['find'] = async (input) => {
		const where: Prisma.SubscriptionWhereInput = {}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.SubscriptionOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

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
		const { workspaceId, planId, ...data } =
			SubscriptionInputSchema.parse(input)

		const subscription: PrismaSubscription = await prisma.subscription.update({
			include: {
				plan: true,
			},
			where: {
				subscriptionId,
			},
			data: {
				...data,
				workspace: {
					connect: {
						workspaceId,
					},
				},
				plan: workspaceId
					? {
							connect: {
								planId,
							},
						}
					: undefined,
			},
		})

		return this.toSubscriptionDomain(subscription)
	}

	private toSubscriptionDomain(model: Prisma.SubscriptionGetPayload<{}>) {
		return new SubscriptionDomain(
			deepMapDatesToISOString(model),
			this.i18nService,
		)
	}
}
