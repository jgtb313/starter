import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { User, BaseUser } from '@/schemas'
import { IUserRepository } from '@/ports/database/user'
import { EncryptService } from '@/adapters/encrypt'
import { RoleService } from '../role'

type UserWorkspaceReference = WithWorkspaceReference<'userId'>
const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    private readonly roleService: RoleService,
    private readonly encryptService: EncryptService,
  ) {}

  async findAll(input: Pagination<User>) {
    const result = await this.userRepository.findAll({
      ...input,
    })

    return result
  }

  async findById(reference: UserWorkspaceReference) {
    const { userId, workspaceId } = getUserWorkspaceReference(reference)

    const user = await this.userRepository.findById(userId)

    if (workspaceId && user.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return user
  }

  async findBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }) {
    const user = await this.userRepository.findBySocial(context, input)

    return user
  }

  async findOne(input: Partial<User>) {
    const user = await this.userRepository.findOne({
      ...input,
    })

    if (input.workspaceId && user && user.workspaceId !== input.workspaceId) {
      throw new AclForbiddenException()
    }

    return user
  }

  async create({
    organizations,
    ...input
  }: Omit<BaseUser, 'organizationIds' | 'organizations' | 'roleIds'> & { organizations: { organizationId: string; roleIds: string[] }[] }) {
    const emailExists = await this.userRepository.findOne({ email: input.email })

    if (emailExists) {
      throw new ConflictException(`Email ${input.email} has already been taken.`)
    }

    for (const { organizationId, roleIds } of organizations) {
      await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
    }

    const hashedPassword = await this.encryptService.hash(input.password)

    const organizationIds = organizations.map((organization) => organization.organizationId)

    const roleIds = organizations.flatMap((organization) => organization.roleIds)

    const user = await this.userRepository.create({
      ...input,
      organizationIds,
      roleIds,
      password: hashedPassword,
    })

    return user
  }

  async updateById(
    reference: UserWorkspaceReference,
    {
      organizations = [],
      ...input
    }: Partial<
      Omit<User, 'organizationIds' | 'organizations' | 'roleIds' | 'password'> & { organizations: { organizationId: string; roleIds: string[] }[] }
    >,
  ) {
    const user = await this.findById(reference)

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

    const result = await this.userRepository.updateById(user.userId, payload)

    return result
  }

  async verifyPassword(userId: string, password: string) {
    const user = await this.userRepository.findById(userId)

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

  async updatePassword(userId: string, password: string) {
    const user = await this.userRepository.findById(userId)

    const newPassword = await this.encryptService.hash(password)

    await this.userRepository.updateById(user.userId, {
      password: newPassword,
    })
  }

  async deleteById(reference: UserWorkspaceReference) {
    const user = await this.findById(reference)

    await this.userRepository.deleteById(user.userId)
  }
}
