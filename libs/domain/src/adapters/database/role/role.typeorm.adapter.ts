import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	type DeepPartial,
	type FindOptionsOrder,
	type FindOptionsRelations,
	type FindOptionsWhere,
	ILike,
	In,
	type Repository,
} from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'
import { RoleDomain } from '@/core/role/role.domain'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import type { IRoleRepository } from '@/ports/database/role'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class RoleTypeorm implements IRoleRepository {
	private readonly relations: FindOptionsRelations<RoleEntity> = {
		organizations: true,
		permissions: true,
	}
	constructor(
		@InjectRepository(RoleEntity)
		private readonly repository: Repository<RoleEntity>,
		@InjectRepository(RoleOrganizationEntity)
		private readonly roleOrganizationRepository: Repository<RoleOrganizationEntity>,
		@InjectRepository(RolePermissionEntity)
		private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IRoleRepository['findPaginated'] = async (query) => {
		const offset = 0
		const {
			workspaceId,
			name,
			tags,
			organizationIds,
			permissionIds,
			status,
			limit = 10,
			sort,
		} = query

		const where: FindOptionsWhere<RoleEntity> = {}
		const order: FindOptionsOrder<RoleEntity> = {}

		if (workspaceId) {
			where.workspace = {
				workspaceId,
			}
		}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (tags?.length) {
			where.tags = In(tags)
		}

		if (organizationIds?.length) {
			where.organizations = {
				organizationId: In(organizationIds),
			}
		}

		if (permissionIds?.length) {
			where.permissions = {
				permissionId: In(permissionIds),
			}
		}

		if (status) {
			where.status = status
		}

		if (sort?.name) {
			order.name = sort.name
		}

		if (sort?.organizationName) {
			order.organizations = {
				name: sort.organizationName,
			}
		}

		if (sort?.permissionName) {
			order.permissions = {
				name: sort.permissionName,
			}
		}

		if (sort?.status) {
			order.status = sort.status
		}

		if (sort?.createdAt) {
			order.createdAt = sort.createdAt
		}

		const skip = offset
		const take = limit

		const [values, total] = await this.repository.findAndCount({
			relations: this.relations,
			where,
			order,
			take,
			skip,
		})

		return {
			values: values.map((role) => this.toRoleDomain(role)),
			meta: {
				offset,
				limit,
				total,
				nextCursor: null,
			},
		}
	}

	find: IRoleRepository['find'] = async (input) => {
		const { name, status } = input

		const where: FindOptionsWhere<RoleEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			relations: this.relations,
			where,
		})

		return values.map((role) => this.toRoleDomain(role))
	}

	findById: IRoleRepository['findById'] = async (roleId) => {
		const role = await this.repository.findOne({
			relations: this.relations,
			where: {
				roleId,
			},
		})

		if (!role) {
			throw new NotFoundException(
				this.i18nService.current.roleNotFound({
					roleId,
				}),
			)
		}

		return this.toRoleDomain(role)
	}

	create: IRoleRepository['create'] = async ({
		organizationIds,
		permissionIds,
		...input
	}) => {
		const data = this.repository.create(input)

		const role = await this.repository.save(data)

		const roleOrganizations = organizationIds.map((organizationId) =>
			this.roleOrganizationRepository.create({
				role: {
					roleId: role.roleId,
				},
				organization: {
					organizationId,
				},
			}),
		)

		const rolePermissions = permissionIds.map((permissionId) =>
			this.rolePermissionRepository.create({
				role: {
					roleId: role.roleId,
				},
				permission: {
					permissionId,
				},
			}),
		)

		if (roleOrganizations.length) {
			await this.roleOrganizationRepository.insert(roleOrganizations)
		}

		if (rolePermissions.length) {
			await this.rolePermissionRepository.insert(rolePermissions)
		}

		return this.findById(role.roleId)
	}

	updateById: IRoleRepository['updateById'] = async (
		roleId,
		{ organizationIds, permissionIds, ...input },
	) => {
		const role = await this.findById(roleId)

		await this.repository.update(role.state.roleId, input)

		const roleOrganizations = organizationIds?.map((organizationId) =>
			this.roleOrganizationRepository.create({
				role: {
					roleId,
				},
				organization: {
					organizationId,
				},
			}),
		)

		const rolePermissions = permissionIds?.map((permissionId) =>
			this.rolePermissionRepository.create({
				role: {
					roleId,
				},
				permission: {
					permissionId,
				},
			}),
		)

		if (roleOrganizations?.length) {
			await this.roleOrganizationRepository.delete({
				role: {
					roleId,
				},
			})
			await this.roleOrganizationRepository.insert(roleOrganizations)
		}

		if (rolePermissions?.length) {
			await this.rolePermissionRepository.delete({
				role: {
					roleId,
				},
			})
			await this.rolePermissionRepository.insert(rolePermissions)
		}

		return this.findById(role.state.roleId)
	}

	deleteById: IRoleRepository['deleteById'] = async (roleId) => {
		const role = await this.findById(roleId)

		await this.repository.softDelete({
			roleId: role.state.roleId,
		})
	}

	validateIds: IRoleRepository['validateIds'] = async (roleIds) => {
		const roles = await this.repository.find({
			where: {
				roleId: In(roleIds),
			},
		})

		const missingRoleIds = roleIds.filter(
			(roleId) => !roles.some((role) => role.roleId === roleId),
		)

		if (missingRoleIds.length) {
			throw new NotFoundException(
				this.i18nService.current.roleIdsNotFound({
					roleIds: missingRoleIds,
				}),
			)
		}
	}

	validateIdsByOrganizationId: IRoleRepository['validateIdsByOrganizationId'] =
		async (organizationId, roleIds) => {
			const roles = await this.roleOrganizationRepository.find({
				where: {
					organization: {
						organizationId,
					},
					role: {
						roleId: In(roleIds),
					},
				},
			})

			const foundRoleIds = roles.map((role) => role.role.roleId)

			const missingRoleIds = roleIds.filter(
				(roleId) => !foundRoleIds.includes(roleId),
			)

			if (missingRoleIds.length) {
				throw new NotFoundException(
					`The following roleIds were not found for organizationId ${organizationId}: ${missingRoleIds.join(', ')}`,
				)
			}
		}

	private toRoleDomain(role: RoleEntity): RoleDomain {
		return new RoleDomain(deepMapDatesToISOString(role))
	}
}
