import { Phone, Pagination, PaginationOutput } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { User, BaseUser } from '@/core/user/user.schema'

export type UserWorkspaceReference = WithWorkspaceReference<'userId'>
export type UserOrganizations = { organizations: { organizationId: string; roleIds: string[] }[] }

export const getUserWorkspaceReference = createWorkspaceReference('userId')

export interface IUserService {
  getPaginatedUsers(input: Pagination<User>): Promise<PaginationOutput<User>>

  getUser(reference: UserWorkspaceReference): Promise<User>

  getUserByEmail(email: string, options?: { workspaceId: string }): Promise<User | undefined>

  getUserByPhone(phone: Phone, options?: { workspaceId: string }): Promise<User | undefined>

  getUserBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }): Promise<User | undefined>

  createUser(input: Omit<BaseUser, 'organizationIds' | 'organizations' | 'roleIds'> & UserOrganizations): Promise<User>

  updateUser(
    reference: UserWorkspaceReference,
    input: Partial<Omit<User, 'organizationIds' | 'organizations' | 'roleIds' | 'password'> & UserOrganizations>,
  ): Promise<User>

  updateUserPassword(userId: string, password: string): Promise<void>

  verifyUserPassword(userId: string, password: string): Promise<void>

  deleteUser(reference: UserWorkspaceReference): Promise<void>
}
