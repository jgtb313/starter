import { Pagination, PaginationOutput } from '@starter/schema'

import { Subscription, BaseSubscription } from '@/schemas'

export type ISubscriptionRepository = {
  findAllPaginated(input: Pagination<Subscription>): Promise<PaginationOutput<Subscription>>
  findAll(input: Partial<Subscription>): Promise<Subscription[]>
  findById(roleId: string): Promise<Subscription>
  findOne(input: Partial<Subscription>): Promise<Subscription | null>
  create(input: BaseSubscription): Promise<Subscription>
  updateById(roleId: string, input: Partial<Subscription>): Promise<Subscription>
}
