import { User, RoleTypeEnum } from '@starter/schema'

export type Auth = {
  userId: string
  storeId: string
  role: RoleTypeEnum
}

export const createToken = (user: User, role: User['roles'][number]): Auth => {
  return {
    userId: user.id,
    storeId: role.storeId,
    role: role.role.type
  }
}
