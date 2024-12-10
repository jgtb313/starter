import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { User } from '../../../core/user'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type UserRepository = User['state']

type UserFindInput = DatabaseFilterInput<UserRepository> & SortInput & PaginationInput<{}>

export type IUserRepository = () => {
  index(input: UserFindInput, options?: IRepositoriesMethodOptions): Promise<User[]>
  find(input: UserFindInput, options?: IRepositoriesMethodOptions): Promise<PaginationOutput<User>>
  findById(id: string, options?: IRepositoriesMethodOptions): Promise<User>
  findOne(input: UserFindInput, options?: IRepositoriesMethodOptions): Promise<User | undefined>
  create(input: User, options?: IRepositoriesMethodOptions): Promise<User>
  updateById(id: string, input: Partial<User>, options?: IRepositoriesMethodOptions): Promise<User>
  deleteById(id: string, options?: IRepositoriesMethodOptions): Promise<void>
}
