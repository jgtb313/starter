import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { User } from '@/core/user/domain'
import { DatabaseFilterInput } from '../Database.support'

type UserRepository = User['state']

type UserFindInput = DatabaseFilterInput<UserRepository> & SortInput & PaginationInput<{}>

export type IUserRepository = () => {
  index(data: UserFindInput): Promise<User[]>
  find(data: UserFindInput): Promise<PaginationOutput<User>>
  findById(id: string): Promise<User>
  create(data: User): Promise<User>
  updateById(id: string, data: Partial<User>): Promise<User>
  deleteById(id: string): Promise<User>
}
