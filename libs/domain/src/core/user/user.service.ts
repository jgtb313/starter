import { Injectable } from '@nestjs/common'
import { ILike, FindOptionsWhere } from 'typeorm'
import { BadRequestException, ConflictException, NotFoundException, AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination, Phone } from '@starter/schema'

import { UserSchema, User, BaseUser } from '@/schemas'
import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { PaginationService } from '@/support/pagination'
import { EncryptService } from '@/adapters/encrypt'
import { UserRepository, UserEntity } from '@/adapters/database/user'
import { RoleService } from '../role'

type UserWorkspaceReference = WithWorkspaceReference<'userId'>
const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly encryptService: EncryptService,
    private readonly paginationService: PaginationService,
  ) {}

  async getPaginatedUsers({ offset, limit, ...input }: Pagination<User>) {
    const { name } = input

    const where: FindOptionsWhere<UserEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    const { values, meta } = await this.paginationService.paginate(this.userRepository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map((user) => UserSchema.parse(user)),
      meta,
    }
  }

  async getUser(reference: UserWorkspaceReference) {
    const { userId, workspaceId } = getUserWorkspaceReference(reference)

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .leftJoinAndMapMany('user.roles', 'roles', 'role', 'role.roleId = ANY(user.roleIds)')
      .getOne()

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`)
    }

    if (user.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return UserSchema.parse(user)
  }

  async getUserByEmail(email: string, options?: { workspaceId: string }) {
    const where: FindOptionsWhere<UserEntity> = {
      email,
      ...options,
    }

    const user = await this.userRepository.findOne({ where })

    if (!user) {
      return
    }

    return UserSchema.parse(user)
  }

  async getUserByPhone(phone: Phone, options?: { workspaceId: string }) {
    const where: FindOptionsWhere<UserEntity> = {
      phone,
      ...options,
    }

    const user = await this.userRepository.findOne({ where })

    if (!user) {
      return
    }

    return UserSchema.parse(user)
  }

  async getUserBySocial(context: 'FACEBOOK' | 'GOOGLE', input: { socialId: string; email: string | null }) {
    const { socialId, email } = input
    const socialKey = `${context.toLowerCase()}Id`

    const where: FindOptionsWhere<UserEntity>[] = [{ social: { [socialKey]: socialId } }]

    if (email) {
      where.push({ email })
    }

    const user = await this.userRepository.findOne({ where })

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
      where: {
        email: input.email,
      },
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

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...input,
        organizationIds,
        roleIds,
        password: hashedPassword,
      }),
    )

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

    await this.userRepository.update(user.userId, payload)

    return this.getUser(user.userId)
  }

  async updateUserPassword(userId: string, password: string) {
    const user = await this.getUser(userId)

    const newPassword = await this.encryptService.hash(password)

    await this.userRepository.update(user.userId, {
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

    await this.userRepository.softDelete({
      userId: user.userId,
    })
  }
}
