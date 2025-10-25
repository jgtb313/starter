import type { Merge } from '@starter/common'
import type { Pagination, PaginationOutput, Sort } from '@starter/schema'

import type { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import type {
	Subscription,
	SubscriptionInput,
	UpdatableSubscriptionInput,
} from '@/core/subscription/subscription.schema'

export type FindSubscriptionInput = Partial<
	Pick<
		Subscription,
		| 'workspaceId'
		| 'planId'
		| 'externalId'
		| 'paymentMethod'
		| 'deadline'
		| 'status'
	>
>

export type SubscriptionSort = Sort<'status' | 'createdAt'>

export type ISubscriptionRepository = {
	findPaginated(
		input: Merge<
			[
				FindSubscriptionInput,
				SubscriptionSort,
				Pagination,
			]
		>,
	): Promise<PaginationOutput<SubscriptionDomain>>
	find(
		input: Merge<
			[
				FindSubscriptionInput,
				SubscriptionSort,
			]
		>,
	): Promise<SubscriptionDomain[]>
	findById(roleId: string): Promise<SubscriptionDomain>
	create(input: SubscriptionInput): Promise<SubscriptionDomain>
	updateById(
		roleId: string,
		input: UpdatableSubscriptionInput,
	): Promise<SubscriptionDomain>
}
