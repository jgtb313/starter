import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { RoleDomain } from '@/core/role/role.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IRoleRepository } from '@/ports/database/role'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaRole = Prisma.RoleGetPayload<{
	include: {
		organizations: {
			include: {
				organization: true
			}
		}
	}
}>

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
			where.organizations = {
				some: {
					organizationId: {
						in: input.organizationIds,
					},
				},
			}
		}

		if (input.permissionIds?.length) {
			where.permissions = {
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

		const [values, total]: [
			PrismaRole[],
			number,
		] = await prisma.$transaction([
			prisma.role.findMany({
				include: {
					organizations: {
						include: {
							organization: true,
						},
					},
					permissions: true,
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.role.count({
				where,
			}),
		])

		const nextCursor = values.length ? values[values.length - 1].roleId : null

		return {
			values: values.map((role) => this.toRoleDomain(role)),
			meta: {
				...paginate,
				total,
				nextCursor,
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
			where.organizations = {
				some: {
					organizationId: {
						in: input.organizationIds,
					},
				},
			}
		}

		if (input.permissionIds?.length) {
			where.permissions = {
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

		const values: PrismaRole[] = await prisma.role.findMany({
			include: {
				organizations: {
					include: {
						organization: true,
					},
				},
				permissions: true,
			},
			where,
			orderBy,
		})

		return values.map((role) => this.toRoleDomain(role))
	}

	findById: IRoleRepository['findById'] = async (roleId) => {
		const role: PrismaRole | null = await prisma.role.findUnique({
			include: {
				organizations: {
					include: {
						organization: true,
					},
				},
				permissions: true,
			},
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
		organizationIds = [],
		permissionIds = [],
		tags,
		...input
	}) => {
		const role: PrismaRole = await prisma.role.create({
			include: {
				organizations: {
					include: {
						organization: true,
					},
				},
				permissions: true,
			},
			data: {
				...input,
				organizations: {
					createMany: {
						data: organizationIds.map((organizationId) => ({
							organizationId,
						})),
					},
				},
				permissions: {
					createMany: {
						data: permissionIds.map((permissionId) => ({
							permissionId,
						})),
					},
				},
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

		const role: PrismaRole = await prisma.role.update({
			include: {
				organizations: {
					include: {
						organization: true,
					},
				},
				permissions: true,
			},
			where: {
				roleId,
			},
			data: input,
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

		const foundIds = roles.map((role) => role.roleId)
		const missingIds = roleIds.filter((roleId) => !foundIds.includes(roleId))

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

	private toRoleDomain(model: PrismaRole) {
		return new RoleDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
