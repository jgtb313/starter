import { Injectable, Inject } from '@nestjs/common'
import { BadRequestException, ConflictException, AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination, Phone } from '@starter/schema'

import { UserSchema, User, BaseUser } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { IUserRepository } from '@/ports/database/user'

import { EncryptService } from '@/adapters/encrypt'
import { RoleService } from '../role'
import { UserEntity } from '@/adapters/database/user'
import { FindOptionsWhere } from 'typeorm'

type UserWorkspaceReference = WithWorkspaceReference<'userId'>
const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    private readonly roleService: RoleService,
    private readonly encryptService: EncryptService,
  ) {}

  async getPaginatedUsers(input: Pagination<User>) {
    const result = await this.userRepository.findAllPaginated(input)

    return result
  }

  async getUser(reference: UserWorkspaceReference) {
    const { userId, workspaceId } = getUserWorkspaceReference(reference)

    const user = await this.userRepository.findById(userId)

    if (user.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return user
  }

  async getUserByEmail(email: string, options?: { workspaceId: string }) {
    const user = await this.userRepository.findOne({ email, ...options })

    if (!user) {
      return
    }

    return UserSchema.parse(user)
  }

  async getUserByPhone(phone: Phone, options?: { workspaceId: string }) {
    const user = await this.userRepository.findOne({ phone, ...options })

    if (!user) {
      return
    }

    return UserSchema.parse(user)
  }

  async getUserBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }) {
    const user = await this.userRepository.findBySocial(context, input)

    if (!user) {
      return
    }

    return UserSchema.parse(user)
  }

  async createUser({
    organizations,
    ...input
  }: Omit<BaseUser, 'organizationIds' | 'organizations' | 'roleIds'> & { organizations: { organizationId: string; roleIds: string[] }[] }) {
    const emailExists = await this.userRepository.findOne({
      email: input.email,
    })

    if (emailExists) {
      throw new ConflictException(`Email ${input.email} has already been taken.`)
    }

    for (const { organizationId, roleIds } of organizations) {
      await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
    }

    const hashedPassword = await this.encryptService.hash(input.password)

    const organizationIds = organizations.map((organization) => organization.organizationId)

    const roleIds = organizations.flatMap((organization) => organization.roleIds)

    const user = await this.userRepository.create({ ...input, organizationIds, roleIds, password: hashedPassword })

    return user
  }

  async updateUser(
    reference: UserWorkspaceReference,
    {
      organizations = [],
      ...input
    }: Partial<
      Omit<User, 'organizationIds' | 'organizations' | 'roleIds' | 'password'> & { organizations: { organizationId: string; roleIds: string[] }[] }
    >,
  ) {
    const user = await this.getUser(reference)

    const payload: Partial<User> = { ...input }

    if (organizations.length) {
      for (const { organizationId, roleIds } of organizations) {
        await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
      }

      const organizationIds = organizations.map((organization) => organization.organizationId)

      const roleIds = organizations.flatMap((organization) => organization.roleIds)

      payload.organizationIds = organizationIds
      payload.roleIds = roleIds
    }

    await this.userRepository.updateById(user.userId, payload)

    return this.getUser(user.userId)
  }

  async updateUserPassword(userId: string, password: string) {
    const user = await this.getUser(userId)

    const newPassword = await this.encryptService.hash(password)

    await this.userRepository.updateById(user.userId, {
      password: newPassword,
    })
  }

  async verifyUserPassword(userId: string, password: string) {
    const user = await this.getUser(userId)

    const isValidPassword = await this.encryptService.compare(password, user.password)

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

  async deleteUser(reference: UserWorkspaceReference) {
    const user = await this.getUser(reference)

    await this.userRepository.updateById(user.userId, {
      userId: user.userId,
    })
  }
}
