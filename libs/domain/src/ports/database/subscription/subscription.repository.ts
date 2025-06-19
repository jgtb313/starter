import { Pagination, PaginationOutput } from '@starter/schema'

import { Subscription, BaseSubscription } from '@/core/subscription/subscription.schema'
import { SubscriptionDomain } from '@/core/subscription/subscription.domain'

export type ISubscriptionRepository = {
  findAllPaginated(input: Pagination<Subscription>): Promise<PaginationOutput<SubscriptionDomain>>
  findAll(input: Partial<Subscription>): Promise<SubscriptionDomain[]>
  findById(roleId: string): Promise<SubscriptionDomain>
  create(input: BaseSubscription): Promise<SubscriptionDomain>
  updateById(roleId: string, input: Partial<Subscription>): Promise<SubscriptionDomain>
}
