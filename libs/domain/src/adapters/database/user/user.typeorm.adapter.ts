import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { UserSchema } from '@/schemas'
import { PaginationService } from '@/support/pagination'
import { IUserRepository } from '@/ports/database/user'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Injectable()
export class UserTypeorm implements IUserRepository {
  private readonly repository: Repository<UserEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity)
  }

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

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map((user) => UserSchema.parse(user)),
      meta,
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

    return values.map((invoice) => UserSchema.parse(invoice))
  }

  findById: IUserRepository['findById'] = async (userId) => {
    const model = await this.repository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .leftJoinAndMapMany('user.roles', 'roles', 'role', 'role.roleId = ANY(user.roleIds)')
      .getOne()

    if (!model) {
      throw new NotFoundException(`User ${userId} not found`)
    }

    return UserSchema.parse(model)
  }

  findOne: IUserRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<UserEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return UserSchema.parse(model)
  }

  findBySocial: IUserRepository['findBySocial'] = async (context, { socialId, email }) => {
    const socialKey = `${context.toLowerCase()}Id`
    const where: FindOptionsWhere<UserEntity> = {
      social: {
        [socialKey]: socialId,
      },
    }

    if (email) {
      where.email = email
    }

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return UserSchema.parse(model)
  }

  create: IUserRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return UserSchema.parse(model)
  }

  updateById: IUserRepository['updateById'] = async (userId, input) => {
    const model = await this.findById(userId)

    await this.repository.update(model.userId, input)

    return this.findById(model.userId)
  }
}
