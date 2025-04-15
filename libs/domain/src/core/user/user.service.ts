import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { BadRequestException, ConflictException, AclForbiddenException } from '@starter/nestjs-error-handling'

import { User, Workspace } from '@/schemas'
import { IUserRepository } from '@/ports/database/user'
import { EncryptService } from '@/adapters/encrypt'
import { getUserWorkspaceReference, IUserService } from '@/core/user/user.service.interface'
import { WorkspaceService } from '@/core/workspace/workspace.service'
// import { IRoleService } from '@/core/role/role.service.interface'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    @Inject(forwardRef(() => WorkspaceService)) private readonly workspaceService: WorkspaceService,
    // @Inject('ROLE_SERVICE') private readonly roleService: IRoleService,
    private readonly encryptService: EncryptService,
  ) {}

  getPaginatedUsers: IUserService['getPaginatedUsers'] = async (input) => {
    return this.userRepository.findAllPaginated(input)
  }

  getUser: IUserService['getUser'] = async (reference) => {
    const { userId, workspaceId } = getUserWorkspaceReference(reference)

    const user = await this.userRepository.findById(userId)

    if (workspaceId && user.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return user
  }

  getUserByEmail: IUserService['getUserByEmail'] = async (email, options) => {
    const user = await this.userRepository.findOne({ email, ...options })

    if (!user) {
      return
    }

    return user
  }

  getUserByPhone: IUserService['getUserByPhone'] = async (phone, options) => {
    const user = await this.userRepository.findOne({ phone, ...options })

    if (!user) {
      return
    }

    return user
  }

  getUserBySocial: IUserService['getUserBySocial'] = async (context, input) => {
    const user = await this.userRepository.findBySocial(context, input)

    if (!user) {
      return
    }

    return user
  }

  createUser: IUserService['createUser'] = async ({ workspaceId, organizations, ...input }) => {
    let workspace: Workspace | undefined = undefined

    if (workspaceId) {
      workspace = await this.workspaceService.getWorkspace(workspaceId)
    }

    const emailExists = await this.userRepository.findOne({
      email: input.email,
    })

    if (emailExists) {
      throw new ConflictException(`Email ${input.email} has already been taken.`)
    }

    for (const { organizationId, roleIds } of organizations) {
      // await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
    }

    const hashedPassword = await this.encryptService.hash(input.password)

    const organizationIds = organizations.map((organization) => organization.organizationId)

    const roleIds = organizations.flatMap((organization) => organization.roleIds)

    const user = await this.userRepository.create({ ...input, organizationIds, roleIds, password: hashedPassword })

    return user
  }

  updateUser: IUserService['updateUser'] = async (reference, { organizations = [], ...input }) => {
    const user = await this.getUser(reference)

    const payload: Partial<User> = { ...input }

    if (organizations.length) {
      for (const { organizationId, roleIds } of organizations) {
        // await this.roleService.validateRoleIdsByOrganizationId(organizationId, roleIds)
      }

      const organizationIds = organizations.map((organization) => organization.organizationId)

      const roleIds = organizations.flatMap((organization) => organization.roleIds)

      payload.organizationIds = organizationIds
      payload.roleIds = roleIds
    }

    await this.userRepository.updateById(user.userId, payload)

    return this.getUser(user.userId)
  }

  updateUserPassword: IUserService['updateUserPassword'] = async (userId, password) => {
    const user = await this.getUser(userId)

    const newPassword = await this.encryptService.hash(password)

    await this.userRepository.updateById(user.userId, {
      password: newPassword,
    })
  }

  verifyUserPassword: IUserService['verifyUserPassword'] = async (userId, password) => {
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

  deleteUser: IUserService['deleteUser'] = async (reference) => {
    const user = await this.getUser(reference)

    await this.userRepository.updateById(user.userId, {
      userId: user.userId,
    })
  }
}
