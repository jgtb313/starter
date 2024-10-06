import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Role } from '@/core/role/domain'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type RoleRepository = Role['state']

type RoleFindInput = DatabaseFilterInput<RoleRepository> & SortInput & PaginationInput<{}>

export type IRoleRepository = () => {
  index(input: RoleFindInput, options?: IRepositoriesMethodOptions): Promise<Role[]>
  find(input: RoleFindInput, options?: IRepositoriesMethodOptions): Promise<PaginationOutput<Role>>
  findById(id: string, options?: IRepositoriesMethodOptions): Promise<Role>
  findOne(input: RoleFindInput, options?: IRepositoriesMethodOptions): Promise<Role | undefined>
  create(input: Role, options?: IRepositoriesMethodOptions): Promise<Role>
  updateById(id: string, input: Partial<Role>, options?: IRepositoriesMethodOptions): Promise<Role>
  deleteById(id: string, options?: IRepositoriesMethodOptions): Promise<Role>
}
