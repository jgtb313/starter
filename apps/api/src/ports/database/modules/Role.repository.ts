import { Role } from '@/core/role/domain'
import { DatabaseFilterInput } from '../Database.support'

type RoleRepository = Role['state']

type RoleIndexInput = DatabaseFilterInput<RoleRepository>

export type IRoleRepository = () => {
  index(data: RoleIndexInput): Promise<Role[]>
}
