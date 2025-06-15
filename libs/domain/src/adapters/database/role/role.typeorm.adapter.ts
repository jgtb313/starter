import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, In, FindOptionsWhere, DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PaginationSchemaTransform } from '@starter/schema'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IRoleRepository } from '@/ports/database/role'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleDomain } from '@/core/role/role.domain'
import { Role, BaseRole } from '@/core/role/role.schema'

@Injectable()
export class RoleTypeorm implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

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

    const paginate = PaginationSchemaTransform.parse({ offset, limit })

    const skip = paginate.offset
    const take = paginate.limit

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values: values.map((organization) => this.toRoleDomain(organization)),
      meta: {
        ...paginate,
        total,
      },
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

    return values.map((role) => this.toRoleDomain(role))
  }

  findById: IRoleRepository['findById'] = async (roleId) => {
    const role = await this.repository.findOne({ where: { roleId } })

    if (!role) {
      throw new NotFoundException(`Role ${roleId} not found`)
    }

    return this.toRoleDomain(role)
  }

  create: IRoleRepository['create'] = async (input) => {
    const data = this.repository.create(this.toRoleEntity(input))

    const role = await this.repository.save(data)

    return this.toRoleDomain(role)
  }

  updateById: IRoleRepository['updateById'] = async (roleId, input) => {
    const role = await this.findById(roleId)

    await this.repository.update(role.state.roleId, this.toPartialRoleEntity(input))

    return this.findById(role.state.roleId)
  }

  deleteById: IRoleRepository['deleteById'] = async (roleId) => {
    const role = await this.findById(roleId)

    await this.repository.softDelete({ roleId: role.state.roleId })
  }

  validateIdsByOrganizationId: IRoleRepository['validateIdsByOrganizationId'] = async (organizationId, roleIds) => {
    const roles = await this.repository.find({ where: { organizationIds: In([organizationId]), roleId: In(roleIds) } })

    const foundRoleIds = roles.map((role) => role.roleId)
    const missingRoleIds = roleIds.filter((roleId) => !foundRoleIds.includes(roleId))

    if (missingRoleIds.length) {
      throw new NotFoundException(`The following roleIds were not found for organizationId ${organizationId}: ${missingRoleIds.join(', ')}`)
    }
  }

  private toRoleEntity({ ...role }: BaseRole): DeepPartial<RoleEntity> {
    return {
      ...role,
    }
  }

  private toPartialRoleEntity({ organizations, ...role }: Partial<Role>): QueryDeepPartialEntity<RoleEntity> {
    return {
      ...role,
    }
  }

  private toRoleDomain(role: RoleEntity): RoleDomain {
    return new RoleDomain(deepMapDatesToISOString(role))
  }
}
