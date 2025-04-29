import { Phone, Pagination, PaginationOutput } from '@starter/schema'

import { User, BaseUser } from '@/core/user/user.schema'

export type IUserRepository = {
  findAllPaginated(input: Pagination<User>): Promise<PaginationOutput<User>>
  findAll(input: Partial<User>): Promise<User[]>
  findById(userId: string): Promise<User>
  findByEmail(email: string, options?: { workspaceId?: User['workspaceId'] }): Promise<User | null>
  findByPhone(phone: Phone, options?: { workspaceId?: User['workspaceId'] }): Promise<User | null>
  findBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }): Promise<User | null>
  create(input: BaseUser): Promise<User>
  updateById(userId: string, input: Partial<User>): Promise<User>
}
