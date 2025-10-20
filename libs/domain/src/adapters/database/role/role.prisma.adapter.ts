import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { RoleDomain } from '@/core/role/role.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IRoleRepository } from '@/ports/database/role'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class RolePrisma implements IRoleRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IRoleRepository['findPaginated'] = async (input) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor: input.cursor,
			limit: input.limit,
		})

		const where: Prisma.RoleWhereInput = {}
		const orderBy: Prisma.RoleOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.tags?.length) {
			where.tags = {
				// hasSome: input.tags,
			}
		}

		if (input.organizationIds?.length) {
			where.roleOrganizations = {
				some: {
					organizationId: {
						in: input.organizationIds,
					},
				},
			}
		}

		if (input.permissionIds?.length) {
			where.rolePermissions = {
				some: {
					permissionId: {
						in: input.permissionIds,
					},
				},
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					roleId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.role.findMany({
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
				include: {
					roleOrganizations: {
						include: {
							organization: true,
						},
					},
					rolePermissions: true,
				},
			}),
			prisma.role.count({
				where,
			}),
		])

		return {
			values: values.map(this.toRoleDomain),
			meta: {
				...paginate,
				total,
				nextCursor: values.length ? values[values.length - 1].roleId : null,
			},
		}
	}

	find: IRoleRepository['find'] = async (input) => {
		const where: Prisma.RoleWhereInput = {}

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.tags?.length) {
			where.tags = {
				// hasSome: input.tags,
			}
		}

		if (input.organizationIds?.length) {
			where.roleOrganizations = {
				some: {
					organizationId: {
						in: input.organizationIds,
					},
				},
			}
		}

		if (input.permissionIds?.length) {
			where.rolePermissions = {
				some: {
					permissionId: {
						in: input.permissionIds,
					},
				},
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.RoleOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const values = await prisma.role.findMany({
			where,
			orderBy,
			include: {
				roleOrganizations: {
					include: {
						organization: true,
					},
				},
				rolePermissions: true,
			},
		})

		return values.map(this.toRoleDomain)
	}

	findById: IRoleRepository['findById'] = async (roleId) => {
		const role = await prisma.role.findUnique({
			where: {
				roleId,
			},
			include: {
				roleOrganizations: {
					include: {
						organization: true,
					},
				},
				rolePermissions: true,
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
		organizationIds = [],
		permissionIds = [],
		tags,
		...input
	}) => {
		const role = await prisma.role.create({
			data: {
				...input,
				roleOrganizations: {
					createMany: {
						data: organizationIds.map((organizationId) => ({
							organizationId,
						})),
					},
				},
				rolePermissions: {
					createMany: {
						data: permissionIds.map((permissionId) => ({
							permissionId,
						})),
					},
				},
			},
			include: {
				roleOrganizations: {
					include: {
						organization: true,
					},
				},
				rolePermissions: true,
			},
		})

		return this.toRoleDomain(role)
	}

	updateById: IRoleRepository['updateById'] = async (
		roleId,
		{ organizationIds, permissionIds, tags, ...input },
	) => {
		if (organizationIds !== undefined) {
			await prisma.roleOrganization.deleteMany({
				where: {
					roleId,
				},
			})
			await prisma.roleOrganization.createMany({
				data: organizationIds.map((organizationId) => ({
					roleId,
					organizationId,
				})),
			})
		}

		if (permissionIds !== undefined) {
			await prisma.rolePermission.deleteMany({
				where: {
					roleId,
				},
			})
			await prisma.rolePermission.createMany({
				data: permissionIds.map((permissionId) => ({
					roleId,
					permissionId,
				})),
			})
		}

		const role = await prisma.role.update({
			where: {
				roleId,
			},
			data: input,
			include: {
				roleOrganizations: {
					include: {
						organization: true,
					},
				},
				rolePermissions: true,
			},
		})

		return this.toRoleDomain(role)
	}

	deleteById: IRoleRepository['deleteById'] = async (roleId) => {
		await prisma.role.update({
			where: {
				roleId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	validateIds: IRoleRepository['validateIds'] = async (roleIds) => {
		const roles = await prisma.role.findMany({
			where: {
				roleId: {
					in: roleIds,
				},
			},
		})

		const foundIds = roles.map((r) => r.roleId)
		const missingIds = roleIds.filter((id) => !foundIds.includes(id))

		if (roles.length !== roleIds.length) {
			throw new NotFoundException(
				this.i18nService.current.roleIdsNotFound({
					roleIds: missingIds,
				}),
			)
		}
	}

	validateIdsByOrganizationId: IRoleRepository['validateIdsByOrganizationId'] =
		async (organizationId, roleIds) => {
			const roles = await prisma.roleOrganization.findMany({
				where: {
					organizationId,
					roleId: {
						in: roleIds,
					},
				},
			})

			if (roles.length !== roleIds.length) {
				const foundIds = roles.map((r) => r.roleId)
				const missingIds = roleIds.filter((id) => !foundIds.includes(id))

				throw new NotFoundException(
					this.i18nService.current.roleIdsNotFound({
						roleIds: missingIds,
					}),
				)
			}
		}

	private toRoleDomain(
		model: Prisma.RoleGetPayload<{
			include: {
				roleOrganizations: {
					include: {
						organization: true
					}
				}
				rolePermissions: true
			}
		}>,
	) {
		return new RoleDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
