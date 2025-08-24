import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AclForbiddenException, BadRequestException, ConflictException } from '@starter/nestjs-error-handling'
import type { Pagination, Phone } from '@starter/schema'

import { createWorkspaceReference, type WithWorkspaceReference } from '@/support/workspace-reference'

import type { EncryptService } from '@/adapters/encrypt'
import { RoleService } from '@/core/role/role.service'
import type { BaseUser, User } from '@/core/user/user.schema'
import type { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IUserRepository } from '@/ports/database/user'

export type UserWorkspaceReference = WithWorkspaceReference<'userId'>
export const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
    private readonly encryptService: EncryptService,
  ) {}

  async getPaginatedUsers(input: Pagination<User>) {
    return this.userRepository.findAllPaginated(input)
  }

  async getUser(reference: UserWorkspaceReference) {
    const { userId, workspaceId } = getUserWorkspaceReference(reference)

    const user = await this.userRepository.findById(userId)

    if (workspaceId && user.state.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return user
  }

  async getUserByEmail(email: User['email'], options?: Partial<Pick<User, 'workspaceId'>>) {
    const user = await this.userRepository.findByEmail(email, options)

    if (!user) {
      return
    }

    return user
  }

  async getUserByPhone(phone: Phone, options?: Partial<Pick<User, 'workspaceId'>>) {
    const user = await this.userRepository.findByPhone(phone, options)

    if (!user) {
      return
    }

    return user
  }

  async getUserBySocial(provider: 'FACEBOOK' | 'GOOGLE', providerToken: string, email: string) {
    const user = await this.userRepository.findBySocial(provider, providerToken, email)

    if (!user) {
      return
    }

    return user
  }

  async createUser({ workspaceId, scopes, ...input }: BaseUser) {
    let workspace: WorkspaceDomain | undefined 

    if (workspaceId) {
      workspace = await this.workspaceService.getWorkspace(workspaceId)
    }

    const emailExists = await this.userRepository.findByEmail(input.email)

    if (emailExists) {
      throw new ConflictException(`Email ${input.email} has already been taken.`)
    }

    for (const { organizationId, roleIds } of scopes) {
      await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
    }

    const hashedPassword = await this.encryptService.hash(input.password)

    const user = await this.userRepository.create({
      ...input,
      workspaceId: workspace?.state.workspaceId,
      scopes,
      password: hashedPassword,
    })

    return user
  }

  async updateUser(reference: UserWorkspaceReference, { scopes = [], ...input }: Partial<User>) {
    const user = await this.getUser(reference)

    const payload: Partial<User> = { ...input }

    if (scopes.length) {
      for (const { organizationId, roleIds } of scopes) {
        await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
      }

      payload.scopes = scopes
    }

    await this.userRepository.updateById(user.state.userId, payload)

    return this.getUser(user.state.userId)
  }

  async updateUserPassword(userId: string, password: string) {
    const user = await this.getUser(userId)

    const newPassword = await this.encryptService.hash(password)

    await this.userRepository.updateById(user.state.userId, {
      password: newPassword,
    })
  }

  async deleteUser(reference: UserWorkspaceReference) {
    const user = await this.getUser(reference)

    await this.userRepository.deleteById(user.state.userId)
  }

  async verifyUserPassword(userId: string, password: string) {
    const user = await this.getUser(userId)

    const isValidPassword = await this.encryptService.compare(password, user.state.password)

    if (!isValidPassword) {
      throw new BadRequestException({
        issues: [
          {
            password: 'Incorrect password',
          },
        ],
      })
    }
  }
}
