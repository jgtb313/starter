import { Pagination, PaginationOutput } from '@starter/schema'

import { User, BaseUser } from '@/schemas'

export type IUserRepository = {
  findAll(query: Pagination<User>): Promise<PaginationOutput<User>>
  findById(userId: string): Promise<User>
  findBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }): Promise<User | null>
  findOne(input: Partial<User>): Promise<User | null>
  create(input: BaseUser): Promise<User>
  updateById(userId: string, input: Partial<User>): Promise<User>
  deleteById(userId: string): Promise<void>
}
