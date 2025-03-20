import { Pagination, PaginationOutput } from '@starter/schema'

import { Subscription, BaseSubscription } from '@/schemas'

export type ISubscriptionRepository = {
  findAll(query: Pagination<Subscription>): Promise<PaginationOutput<Subscription>>
  findById(userId: string): Promise<Subscription>
  findOne(input: Partial<Subscription>): Promise<Subscription | null>
  create(input: BaseSubscription): Promise<Subscription>
  updateById(userId: string, input: Partial<Subscription>): Promise<Subscription>
  deleteById(userId: string): Promise<void>
}
