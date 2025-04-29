import { Pagination, PaginationOutput } from '@starter/schema'

import { Subscription, BaseSubscription } from '@/core/subscription/subscription.schema'

export type ISubscriptionRepository = {
  findAllPaginated(input: Pagination<Subscription>): Promise<PaginationOutput<Subscription>>
  findAll(input: Partial<Subscription>): Promise<Subscription[]>
  findById(roleId: string): Promise<Subscription>
  create(input: BaseSubscription): Promise<Subscription>
  updateById(roleId: string, input: Partial<Subscription>): Promise<Subscription>
}
