import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, FindOptionsWhere, DeepPartial } from 'typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import { capitalize } from '@starter/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IUserRepository } from '@/ports/database/user'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserDomain } from '@/core/user/user.domain'
import { User, BaseUser } from '@/core/user/user.schema'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class UserTypeorm implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  findAllPaginated: IUserRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
    const { name, workspaceId, status } = query

    const where: FindOptionsWhere<UserEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (workspaceId) {
      where.workspaceId = workspaceId
    }

    if (status) {
      where.status = status
    }

    const paginate = PaginationSchemaTransform.parse({ offset, limit })

    const skip = paginate.offset
    const take = paginate.limit

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values: values.map((user) => this.toUserDomain(user)),
      meta: {
        ...paginate,
        total,
      },
    }
  }

  findAll: IUserRepository['findAll'] = async (input) => {
    const { name, status } = input

    const where: FindOptionsWhere<UserEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map((user) => this.toUserDomain(user))
  }

  findById: IUserRepository['findById'] = async (userId) => {
    const user = await this.repository.findOne({ where: { userId } })

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`)
    }

    return this.toUserDomain(user)
  }

  findByEmail: IUserRepository['findByEmail'] = async (email, options) => {
    const where: FindOptionsWhere<UserEntity> = {}

    if (email) {
      where.email = email
    }

    if (options?.workspaceId) {
      where.workspaceId = options.workspaceId
    }

    const user = await this.repository.findOne({ where })

    if (!user) {
      return null
    }

    return this.toUserDomain(user)
  }

  findByPhone: IUserRepository['findByPhone'] = async (phone, options) => {
    const where: FindOptionsWhere<UserEntity> = {}

    if (phone) {
      where.phoneISO = phone.iso
      where.phoneDDI = phone.ddi
      where.phoneNumber = phone.number
    }

    if (options?.workspaceId) {
      where.workspaceId = options.workspaceId
    }

    const user = await this.repository.findOne({ where })

    if (!user) {
      return null
    }

    return this.toUserDomain(user)
  }

  findBySocial: IUserRepository['findBySocial'] = async (provider, providerToken, email) => {
    const socialKey = `social${capitalize(provider)}Id`
    const where: FindOptionsWhere<UserEntity> = {
      [socialKey]: providerToken,
    }

    if (email) {
      where.email = email
    }

    const user = await this.repository.findOne({ where })

    if (!user) {
      return null
    }

    return this.toUserDomain(user)
  }

  create: IUserRepository['create'] = async (input) => {
    const data = this.repository.create(this.toUserEntity(input))

    const user = await this.repository.save(data)

    return this.toUserDomain(user)
  }

  updateById: IUserRepository['updateById'] = async (userId, input) => {
    const user = await this.findById(userId)

    await this.repository.update(user.state.userId, this.toPartialRoleEntity(input))

    return this.findById(user.state.userId)
  }

  deleteById: IUserRepository['deleteById'] = async (userId) => {
    const user = await this.findById(userId)

    await this.repository.softDelete({ userId: user.state.userId })
  }

  private toUserEntity(user: BaseUser): DeepPartial<UserEntity> {
    return {
      ...user,
      phoneISO: user.phone?.iso,
      phoneDDI: user.phone?.ddi,
      phoneNumber: user.phone?.number,
      socialGoogleId: user.social?.googleId,
      socialFacebookId: user.social?.facebookId,
    }
  }

  private toPartialRoleEntity({ phone, ...user }: Partial<User>): QueryDeepPartialEntity<UserEntity> {
    return {
      ...user,
      phoneISO: phone?.iso,
      phoneDDI: phone?.ddi,
      phoneNumber: phone?.number,
      socialGoogleId: user.social?.googleId,
      socialFacebookId: user.social?.facebookId,
    }
  }

  private toUserDomain(user: UserEntity): UserDomain {
    const state: UserDomain['state'] = {
      ...user,
      phone:
        user.phoneISO && user.phoneDDI && user.phoneNumber
          ? {
              iso: user.phoneISO,
              ddi: user.phoneDDI,
              number: user.phoneNumber,
            }
          : null,
      social: {
        googleId: user.socialGoogleId,
        facebookId: user.socialFacebookId,
      },
    }

    return new UserDomain(deepMapDatesToISOString(state))
  }
}
