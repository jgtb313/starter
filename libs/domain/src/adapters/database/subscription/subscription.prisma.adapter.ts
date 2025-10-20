import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { ISubscriptionRepository } from '@/ports/database/subscription'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

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

		const [values, total] = await prisma.$transaction([
			prisma.subscription.findMany({
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

		return {
			values: values.map(this.toSubscriptionDomain),
			meta: {
				...paginate,
				total,
				nextCursor: values.length
					? values[values.length - 1].subscriptionId
					: null,
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

		const values = await prisma.subscription.findMany({
			where,
			orderBy,
		})

		return values.map(this.toSubscriptionDomain)
	}

	findById: ISubscriptionRepository['findById'] = async (subscriptionId) => {
		const subscription = await prisma.subscription.findUnique({
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
		const subscription = await prisma.subscription.create({
			data: input,
		})

		return this.toSubscriptionDomain(subscription)
	}

	updateById: ISubscriptionRepository['updateById'] = async (
		subscriptionId,
		input,
	) => {
		const subscription = await prisma.subscription.update({
			where: {
				subscriptionId,
			},
			data: input,
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
