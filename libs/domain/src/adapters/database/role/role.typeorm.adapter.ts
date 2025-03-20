import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { RoleSchema } from '@/schemas'
import { PaginationService } from '@/support/pagination'
import { IRoleRepository } from '@/ports/database/role'
import { RoleEntity } from './role.typeorm.entity'

@Injectable()
export class RoleTypeorm implements IRoleRepository {
  private readonly repository: Repository<RoleEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(RoleEntity)
  }

  findAll: IRoleRepository['findAll'] = async ({ offset, limit, ...query }) => {
    const { name, workspaceId, status } = query

    const where: FindOptionsWhere<RoleEntity> = {}

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
      values: values.map((role) => RoleSchema.parse(role)),
      meta,
    }
  }

  findById: IRoleRepository['findById'] = async (roleId) => {
    const model = await this.repository.findOne({ where: { roleId } })

    if (!model) {
      throw new NotFoundException(`Role ${roleId} not found`)
    }

    return RoleSchema.parse(model)
  }

  findOne: IRoleRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<RoleEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return RoleSchema.parse(model)
  }

  create: IRoleRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return RoleSchema.parse(model)
  }

  updateById: IRoleRepository['updateById'] = async (roleId, input) => {
    const role = await this.findById(roleId)

    await this.repository.update(role.roleId, input)

    return this.findById(role.roleId)
  }

  deleteById: IRoleRepository['deleteById'] = async (roleId) => {
    await this.repository.softDelete({ roleId })
  }
}
