import type { Pagination, PaginationOutput } from '@starter/schema'

import type { SubscriptionDomain } from '@/core/subscription/subscription.domain'
import type {
	BaseSubscription,
	Subscription,
} from '@/core/subscription/subscription.schema'

export type ISubscriptionRepository = {
	findAllPaginated(
		input: Pagination<Subscription>,
	): Promise<PaginationOutput<SubscriptionDomain>>
	findAll(input: Partial<Subscription>): Promise<SubscriptionDomain[]>
	findById(roleId: string): Promise<SubscriptionDomain>
	create(input: BaseSubscription): Promise<SubscriptionDomain>
	updateById(
		roleId: string,
		input: Partial<Subscription>,
	): Promise<SubscriptionDomain>
}
