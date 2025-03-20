import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { User, BaseUser } from '@/schemas'
import { IUserRepository } from '@/ports/database/user'
import { EncryptService } from '@/adapters/encrypt'

type UserWorkspaceReference = WithWorkspaceReference<'userId'>
const getUserWorkspaceReference = createWorkspaceReference('userId')

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
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

  async create(input: BaseUser) {
    const emailExists = await this.userRepository.findOne({ email: input.email })

    if (emailExists) {
      throw new ConflictException(`Email ${input.email} has already been taken.`)
    }

    const hashedPassword = await this.encryptService.hash(input.password)

    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    })

    return user
  }

  async updateById(reference: UserWorkspaceReference, input: Partial<User>) {
    const user = await this.findById(reference)

    const result = await this.userRepository.updateById(user.userId, input)

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
