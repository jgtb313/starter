import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { User } from '@/core/user/domain'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type UserRepository = User['state']

type UserFindInput = DatabaseFilterInput<UserRepository> & SortInput & PaginationInput<{}>

export type IUserRepository = () => {
  index(input: UserFindInput): Promise<User[]>
  find(input: UserFindInput): Promise<PaginationOutput<User>>
  findById(id: string): Promise<User>
  findOne(input: UserFindInput): Promise<User | undefined>
  create(input: User, options?: IRepositoriesMethodOptions): Promise<User>
  updateById(id: string, input: Partial<User>): Promise<User>
  deleteById(id: string): Promise<User>
}
