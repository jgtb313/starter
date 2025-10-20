import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import type { Permission } from '@/core/permission'
import { UserDomain } from '@/core/user/user.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IUserRepository } from '@/ports/database/user'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class UserPrisma implements IUserRepository {
	private readonly include: Prisma.UserInclude = {
		userAddresses: true,
	}

	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IUserRepository['findPaginated'] = async (input) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor: input.cursor,
			limit: input.limit,
		})

		const where: Prisma.UserWhereInput = {}

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.email) {
			where.email = input.email
		}

		if (input.phone) {
			where.AND = [
				{
					phoneISO: input.phone.iso,
				},
				{
					phoneDDI: input.phone.ddi,
				},
				{
					phoneNumber: input.phone.number,
				},
			]
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.UserOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					userId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.user.findMany({
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
				include: this.include,
			}),
			prisma.user.count({
				where,
			}),
		])

		const nextCursor = values.length ? values[values.length - 1].userId : null

		return {
			values: values.map((user) => this.toUserDomain(user)),
			meta: {
				...paginate,
				total,
				nextCursor,
			},
		}
	}

	find: IUserRepository['find'] = async (input) => {
		const where: Prisma.UserWhereInput = {}

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.email) {
			where.email = input.email
		}

		if (input.phone) {
			where.AND = [
				{
					phoneISO: input.phone.iso,
				},
				{
					phoneDDI: input.phone.ddi,
				},
				{
					phoneNumber: input.phone.number,
				},
			]
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.UserOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const values = await prisma.user.findMany({
			where,
			orderBy,
			include: this.include,
		})

		return values.map((user) => this.toUserDomain(user))
	}

	findById: IUserRepository['findById'] = async (userId) => {
		const user = await prisma.user.findUnique({
			where: {
				userId,
			},
			include: this.include,
		})

		if (!user) {
			throw new NotFoundException(
				this.i18nService.current.userNotFound({
					userId,
				}),
			)
		}

		return this.toUserDomain(user)
	}

	findByEmail: IUserRepository['findByEmail'] = async (email, options) => {
		const where: Prisma.UserWhereInput = {
			email,
		}

		if (options?.workspaceId) {
			where.workspaceId = options.workspaceId
		}

		const user = await prisma.user.findFirst({
			where,
			include: this.include,
		})

		return user ? this.toUserDomain(user) : null
	}

	findByPhone: IUserRepository['findByPhone'] = async (phone, options) => {
		const where: Prisma.UserWhereInput = {
			phoneISO: phone.iso,
			phoneDDI: phone.ddi,
			phoneNumber: phone.number,
		}

		if (options?.workspaceId) {
			where.workspaceId = options.workspaceId
		}

		const user = await prisma.user.findFirst({
			where,
			include: this.include,
		})

		return user ? this.toUserDomain(user) : null
	}

	findBySocial: IUserRepository['findBySocial'] = async (
		provider,
		providerToken,
		email,
	) => {
		const where: Prisma.UserWhereInput = {}

		if (provider === 'GOOGLE') {
			where.googleProviderExternalId = providerToken
		} else if (provider === 'FACEBOOK') {
			where.facebookProviderExternalId = providerToken
		}

		if (email) {
			where.email = email
		}

		const user = await prisma.user.findFirst({
			where,
			include: this.include,
		})

		return user ? this.toUserDomain(user) : null
	}

	create: IUserRepository['create'] = async ({
		addresses = [],
		permissionIds = [],
		workspaceId,
		...input
	}) => {
		const user = await prisma.user.create({
			data: {
				...input,
				workspaceId,
				userAddresses: {
					createMany: {
						data: addresses.map((address) => ({
							...address,
							lat: address.location.lat,
							lng: address.location.lng,
						})),
					},
				},
				userPermissions: {
					createMany: {
						data: permissionIds.map((permissionId) => ({
							permissionId,
						})),
					},
				},
			},
			include: this.include,
		})

		return this.toUserDomain(user)
	}

	updateById: IUserRepository['updateById'] = async (
		userId,
		{ workspaceId, ...input },
	) => {
		await this.findById(userId)

		const user = await prisma.user.update({
			where: {
				userId,
			},
			data: {
				...input,
				workspaceId,
			},
			include: this.include,
		})

		return this.toUserDomain(user)
	}

	deleteById: IUserRepository['deleteById'] = async (userId) => {
		await this.findById(userId)

		await prisma.user.update({
			where: {
				userId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	attachOrganization: IUserRepository['attachOrganization'] = async (
		userId,
		organizationId,
		roleId,
	) => {
		await prisma.userOrganization.create({
			data: {
				userId,
				organizationId,
				roleId,
			},
		})
	}

	attachManyOrganizations: IUserRepository['attachManyOrganizations'] = async (
		userId,
		input,
	) => {
		await prisma.userOrganization.createMany({
			data: input.map(({ organizationId, roleId }) => ({
				userId,
				organizationId,
				roleId,
			})),
		})
	}

	detachOrganization: IUserRepository['detachOrganization'] = async (
		userId,
		organizationId,
	) => {
		await prisma.userOrganization.updateMany({
			where: {
				userId,
				organizationId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	detachManyOrganizations: IUserRepository['detachManyOrganizations'] = async (
		userId,
		organizationIds,
	) => {
		await prisma.userOrganization.deleteMany({
			where: {
				userId,
				organizationId: {
					in: organizationIds,
				},
			},
		})
	}

	findPermissions: IUserRepository['findPermissions'] = async (userId) => {
		const userPermissions = await prisma.userPermission.findMany({
			where: {
				userId,
			},
			select: {
				permissionId: true,
				organizationId: true,
			},
		})

		const userOrganizations = await prisma.userOrganization.findMany({
			where: {
				userId,
			},
			include: {
				role: {
					include: {
						rolePermissions: true,
					},
				},
			},
		})

		return [
			...userPermissions.map((userPermission) => ({
				kind: 'WORKSPACE',
				permissionId: userPermission.permissionId as Permission,
				organizationId: null,
			})),
			...userOrganizations.flatMap((userOrganization) =>
				userOrganization.role.rolePermissions.map((rolePermission) => ({
					kind: 'ORGANIZATION',
					permissionId: rolePermission.permissionId as Permission,
					organizationId: userOrganization.organizationId,
				})),
			),
		]
	}

	attachPermission: IUserRepository['attachPermission'] = async (
		userId,
		permissionId,
		organizationId,
	) => {
		await prisma.userPermission.create({
			data: {
				userId,
				permissionId,
				organizationId,
			},
		})
	}

	attachManyPermissions: IUserRepository['attachManyPermissions'] = async (
		userId,
		input,
	) => {
		await prisma.userPermission.createMany({
			data: input.map(({ permissionId, organizationId }) => ({
				userId,
				permissionId,
				organizationId: organizationId ?? undefined,
			})),
		})
	}

	detachPermission: IUserRepository['detachPermission'] = async (
		userId,
		permissionId,
	) => {
		await prisma.userPermission.deleteMany({
			where: {
				userId,
				permissionId,
			},
		})
	}

	detachManyPermissions: IUserRepository['detachManyPermissions'] = async (
		userId,
		permissionIds,
	) => {
		await prisma.userPermission.deleteMany({
			where: {
				userId,
				permissionId: {
					in: permissionIds,
				},
			},
		})
	}

	createAddress: IUserRepository['createAddress'] = async (userId, input) => {
		await prisma.userAddress.create({
			data: {
				...input,
				userId,
				lat: input.location.lat,
				lng: input.location.lng,
			},
		})
	}

	updateAddressById: IUserRepository['updateAddressById'] = async (
		userId,
		addressId,
		input,
	) => {
		await prisma.userAddress.update({
			where: {
				userAddressId: addressId,
				userId,
			},
			data: {
				...input,
				lat: input.location.lat,
				lng: input.location.lng,
			},
		})
	}

	deleteAddressById: IUserRepository['deleteAddressById'] = async (
		userId,
		addressId,
	) => {
		await prisma.userAddress.delete({
			where: {
				userAddressId: addressId,
				userId,
			},
		})
	}

	private toUserDomain(
		model: Prisma.UserGetPayload<{
			include: {
				userAddresses: true
			}
		}>,
	) {
		return new UserDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
