import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, In, FindOptionsWhere } from 'typeorm'

import { RoleSchema } from '@/core/role/role.schema'
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

  findAllPaginated: IRoleRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
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

  findAll: IRoleRepository['findAll'] = async (input) => {
    const { name, status } = input

    const where: FindOptionsWhere<RoleEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map((invoice) => RoleSchema.parse(invoice))
  }

  findById: IRoleRepository['findById'] = async (roleId) => {
    const model = await this.repository.findOne({ where: { roleId } })

    if (!model) {
      throw new NotFoundException(`Role ${roleId} not found`)
    }

    return RoleSchema.parse(model)
  }

  create: IRoleRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return RoleSchema.parse(model)
  }

  updateById: IRoleRepository['updateById'] = async (roleId, input) => {
    const model = await this.findById(roleId)

    await this.repository.update(model.roleId, input)

    return this.findById(model.roleId)
  }

  validateIdsByOrganizationId: IRoleRepository['validateIdsByOrganizationId'] = async (organizationId, roleIds) => {
    const models = await this.repository.find({ where: { organizationIds: In([organizationId]), roleId: In(roleIds) } })

    const foundRoleIds = models.map((role) => role.roleId)
    const missingRoleIds = roleIds.filter((roleId) => !foundRoleIds.includes(roleId))

    if (missingRoleIds.length) {
      throw new NotFoundException(`The following roleIds were not found for organizationId ${organizationId}: ${missingRoleIds.join(', ')}`)
    }
  }
}
