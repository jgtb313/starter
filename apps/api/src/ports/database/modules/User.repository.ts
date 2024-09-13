import { PaginationInput, SortInput, PaginationOutput, SocialSignInEnum } from '@starter/schema'

import { User } from '@/core/user/domain'
import { DatabaseFilterInput } from '../Database.support'

type UserRepository = User['state']

type UserFindInput = DatabaseFilterInput<UserRepository> & SortInput & PaginationInput<{}>

export type IUserRepository = () => {
  find(data: UserFindInput): Promise<PaginationOutput<User>>
  findById(id: string, opts?: { storeId?: string | null }): Promise<User>
  findBySocial(strategy: SocialSignInEnum, id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  emailExists(email: string, opts?: { exclude?: string }): Promise<boolean>
  create(data: User): Promise<User>
  updateById(id: string, data: Partial<User>): Promise<User>
}
