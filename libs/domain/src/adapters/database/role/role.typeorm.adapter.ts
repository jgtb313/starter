import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm'

import { Repository, ILike, FindOptionsWhere, DeepPartial, EntityManager, In } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PaginationSchemaTransform } from '@starter/schema'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IRoleRepository } from '@/ports/database/role'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { RoleDomain } from '@/core/role/role.domain'
import { BaseRole } from '@/core/role/role.schema'

@Injectable()
export class RoleTypeorm implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    @InjectRepository(RoleOrganizationEntity)
    private readonly roleOrganizationRepository: Repository<RoleOrganizationEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  findAllPaginated: IRoleRepository['findAllPaginated'] = async ({ offset, limit, ...query }) => {
    const { name, workspaceId, organizationIds, permissions, status } = query

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

  // create: IRoleRepository['create'] = async ({ organizationIds, permissions, ...input }) => {
  //   return this.entityManager.transaction(async (manager) => {
  //     const roleRepo = manager.getRepository(RoleEntity)
  //     const roleOrgRepo = manager.getRepository(RoleOrganizationEntity)
  //     const rolePermRepo = manager.getRepository(RolePermissionEntity)

  //     const data = roleRepo.create(this.toRoleEntity(input))
  //     const role = await roleRepo.save(data)

  //     const roleOrganizations = organizationIds.map((organizationId) =>
  //       roleOrgRepo.create({
  //         roleId: role.roleId,
  //         organizationId,
  //       }),
  //     )

  //     const rolePermissions = permissions.map((permissionId) =>
  //       rolePermRepo.create({
  //         roleId: role.roleId,
  //         permissionId,
  //       }),
  //     )

  //     await manager.insert(RoleOrganizationEntity, roleOrganizations)
  //     await manager.insert(RolePermissionEntity, rolePermissions)

  //     return this.toRoleDomain(role)
  //   })
  // }

  // updateById: IRoleRepository['updateById'] = async (roleId, { organizationIds, permissions, ...input }) => {
  //   const response = await this.entityManager.transaction(async (manager) => {
  //     const roleRepo = manager.getRepository(RoleEntity)
  //     const roleOrgRepo = manager.getRepository(RoleOrganizationEntity)
  //     const rolePermRepo = manager.getRepository(RolePermissionEntity)

  //     await roleRepo.update(roleId, this.toPartialRoleEntity(input))

  //     await roleOrgRepo.delete({ roleId })
  //     await rolePermRepo.delete({ roleId })

  //     const roleOrganizations = organizationIds?.map((organizationId) =>
  //       roleOrgRepo.create({
  //         roleId,
  //         organizationId,
  //       }),
  //     )

  //     const rolePermissions = permissions?.map((permissionId) =>
  //       rolePermRepo.create({
  //         roleId,
  //         permissionId,
  //       }),
  //     )

  //     if (roleOrganizations?.length) {
  //       await manager.insert(RoleOrganizationEntity, roleOrganizations)
  //     }

  //     if (rolePermissions?.length) {
  //       await manager.insert(RolePermissionEntity, rolePermissions)
  //     }

  //     const role = await roleRepo.findOne({ where: { roleId } })

  //     return this.toRoleDomain(role!)
  //   })

  //   return response
  // }

  create: IRoleRepository['create'] = async ({ organizationIds, permissions, ...input }) => {
    const data = this.repository.create(this.toRoleEntity(input))
    const role = await this.repository.save(data)

    const roleOrganizations = organizationIds.map((organizationId) =>
      this.roleOrganizationRepository.create({
        roleId: role.roleId,
        organizationId,
      }),
    )

    const rolePermissions = permissions.map((permissionId) =>
      this.rolePermissionRepository.create({
        roleId: role.roleId,
        permissionId,
      }),
    )

    if (roleOrganizations.length) {
      await this.roleOrganizationRepository.insert(roleOrganizations)
    }

    if (rolePermissions.length) {
      await this.rolePermissionRepository.insert(rolePermissions)
    }

    return this.toRoleDomain(role)
  }

  updateById: IRoleRepository['updateById'] = async (roleId, { organizationIds, permissions, ...input }) => {
    await this.repository.update(roleId, this.toPartialRoleEntity(input))

    await this.roleOrganizationRepository.delete({ roleId })
    await this.rolePermissionRepository.delete({ roleId })

    const roleOrganizations = organizationIds?.map((organizationId) =>
      this.roleOrganizationRepository.create({
        roleId,
        organizationId,
      }),
    )

    const rolePermissions = permissions?.map((permissionId) =>
      this.rolePermissionRepository.create({
        roleId,
        permissionId,
      }),
    )

    if (roleOrganizations?.length) {
      await this.roleOrganizationRepository.insert(roleOrganizations)
    }

    if (rolePermissions?.length) {
      await this.rolePermissionRepository.insert(rolePermissions)
    }

    const role = await this.repository.findOne({ where: { roleId } })

    return this.toRoleDomain(role!)
  }

  deleteById: IRoleRepository['deleteById'] = async (roleId) => {
    const role = await this.findById(roleId)

    await this.repository.softDelete({ roleId: role.state.roleId })
  }

  validateIdsByOrganizationId: IRoleRepository['validateIdsByOrganizationId'] = async (organizationId, roleIds) => {
    const roles = await this.roleOrganizationRepository.find({ where: { organizationId, roleId: In(roleIds) } })

    const foundRoleIds = roles.map((role) => role.roleId)

    const missingRoleIds = roleIds.filter((roleId) => !foundRoleIds.includes(roleId))
    if (missingRoleIds.length) {
      throw new NotFoundException(`The following roleIds were not found for organizationId ${organizationId}: ${missingRoleIds.join(', ')}`)
    }
  }

  private toRoleEntity(role: BaseRole): DeepPartial<RoleEntity> {
    return {
      ...role,
    }
  }

  private toPartialRoleEntity({ ...role }: Partial<BaseRole>): QueryDeepPartialEntity<RoleEntity> {
    return {
      ...role,
    }
  }

  private toRoleDomain(role: RoleEntity): RoleDomain {
    return new RoleDomain(deepMapDatesToISOString(role))
  }
}
