import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import type { DeepPartial, FindOptionsWhere, Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'

import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'
import { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import type {
	BaseSubscription,
	Subscription,
} from '@/core/subscription/subscription.schema'
import type { ISubscriptionRepository } from '@/ports/database/subscription'

@Injectable()
export class SubscriptionTypeorm implements ISubscriptionRepository {
	constructor(
		@InjectRepository(SubscriptionEntity)
		private readonly repository: Repository<SubscriptionEntity>,
	) {}

	findAllPaginated: ISubscriptionRepository['findAllPaginated'] = async ({
		cursor,
		limit,
		...query
	}) => {
		const { status } = query

		const where: FindOptionsWhere<SubscriptionEntity> = {}

		if (status) {
			where.status = status
		}

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const take = paginate.limit

		const [values, total] = await this.repository.findAndCount({
			where,
			take,
		})

		return {
			values: values.map(this.toSubscriptionDomain),
			meta: {
				...paginate,
				total,
				nextCursor: null,
			},
		}
	}

	findAll: ISubscriptionRepository['findAll'] = async (input) => {
		const { status } = input

		const where: FindOptionsWhere<SubscriptionEntity> = {}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
		})

		return values.map(this.toSubscriptionDomain)
	}

	findById: ISubscriptionRepository['findById'] = async (subscriptionId) => {
		const subscription = await this.repository.findOne({
			where: {
				subscriptionId,
			},
		})

		if (!subscription) {
			throw new NotFoundException(`Subscription ${subscriptionId} not found`)
		}

		return this.toSubscriptionDomain(subscription)
	}

	create: ISubscriptionRepository['create'] = async (input) => {
		const data = this.repository.create(this.toSubscriptionEntity(input))

		const subscription = await this.repository.save(data)

		return this.toSubscriptionDomain(subscription)
	}

	updateById: ISubscriptionRepository['updateById'] = async (
		subscriptionId,
		input,
	) => {
		const subscription = await this.findById(subscriptionId)

		await this.repository.update(
			subscription.state.subscriptionId,
			this.toPartialSubscriptionEntity(input),
		)

		return this.findById(subscription.state.subscriptionId)
	}

	private toSubscriptionEntity(
		subscription: BaseSubscription,
	): DeepPartial<SubscriptionEntity> {
		return {
			...subscription,
		}
	}

	private toPartialSubscriptionEntity(
		subscription: Partial<Subscription>,
	): QueryDeepPartialEntity<SubscriptionEntity> {
		return {
			...subscription,
		}
	}

	private toSubscriptionDomain(subscription: SubscriptionEntity) {
		return new SubscriptionDomain(deepMapDatesToISOString(subscription))
	}
}
