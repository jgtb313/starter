import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { RoleDomain } from '@/core/role/role.domain'
import {
	RoleInputSchema,
	UpdatableRoleInputSchema,
} from '@/core/role/role.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindRoleInput,
	IRoleRepository,
	RoleSort,
} from '@/ports/database/role/role.repository'
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

	findPaginated: IRoleRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...input
	}) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

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
		] = await Promise.all([
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
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IRoleRepository['find'] = async ({ sort, ...input }) => {
		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

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

	create: IRoleRepository['create'] = async (input) => {
		const { organizationIds, permissionIds, ...data } =
			RoleInputSchema.parse(input)

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
				...data,
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

	updateById: IRoleRepository['updateById'] = async (roleId, input) => {
		const data = UpdatableRoleInputSchema.parse(input)

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
			data,
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

	private parseWhere({
		workspaceId,
		organizationIds,
		permissionIds,
		name,
		tags,
		status,
	}: FindRoleInput): Prisma.RoleWhereInput {
		const where: Prisma.RoleWhereInput = {}

		if (workspaceId) {
			where.workspaceId = workspaceId
		}

		if (organizationIds?.length) {
			where.organizations = {
				some: {
					organizationId: {
						in: organizationIds,
					},
				},
			}
		}

		if (permissionIds?.length) {
			where.permissions = {
				some: {
					permissionId: {
						in: permissionIds,
					},
				},
			}
		}

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (tags?.length) {
			where.tags = {
				hasSome: tags,
			}
		}

		if (status) {
			where.status = status
		}

		return where
	}

	private parseOrderBy({
		sort,
	}: RoleSort): Prisma.RoleOrderByWithRelationInput[] {
		if (!sort) {
			return [
				{
					createdAt: 'desc',
				},
			]
		}

		const keyMap: Record<string, Prisma.RoleOrderByWithRelationInput> = {
			organizationName: {
				organizations: {
					_count: 'desc',
				},
			},
			permissionName: {
				permissions: {
					_count: 'desc',
				},
			},
		}

		return Object.entries(sort).map(([key, value]) => {
			const mappedKey = keyMap[key as keyof typeof keyMap]

			if (mappedKey) {
				return mappedKey
			}

			return {
				[key]: value,
			}
		})
	}

	private toRoleDomain(model: PrismaRole) {
		return new RoleDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
