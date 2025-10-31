import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import type { Permission } from '@/core/permission'
import { UserDomain } from '@/core/user/user.domain'
import {
	UpdatableUserInputSchema,
	UserInputSchema,
} from '@/core/user/user.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindUserInput,
	IUserRepository,
	UserSort,
} from '@/ports/database/user/user.repository.port'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaUser = Prisma.UserGetPayload<{
	include: {
		addresses: true
	}
}>

@Injectable()
export class UserPrisma implements IUserRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IUserRepository['findPaginated'] = async ({
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
					userId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaUser[],
			number,
		] = await Promise.all([
			prisma.user.findMany({
				include: {
					addresses: {
						where: {
							deletedAt: null,
						},
						orderBy: {
							createdAt: 'desc',
						},
					},
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.user.count({
				where,
			}),
		])

		const nextCursor = values.length ? values[values.length - 1].userId : null

		return {
			values: values.map((user) => this.toUserDomain(user)),
			meta: {
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IUserRepository['find'] = async ({ sort, ...input }) => {
		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const values: PrismaUser[] = await prisma.user.findMany({
			include: {
				addresses: {
					where: {
						deletedAt: null,
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
			where,
			orderBy,
		})

		return values.map((user) => this.toUserDomain(user))
	}

	findById: IUserRepository['findById'] = async (userId) => {
		const user: PrismaUser | null = await prisma.user.findUnique({
			include: {
				addresses: true,
			},
			where: {
				userId,
			},
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

		const user: PrismaUser | null = await prisma.user.findFirst({
			include: {
				addresses: true,
			},
			where,
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
			include: {
				addresses: true,
			},
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

		const user: PrismaUser | null = await prisma.user.findFirst({
			include: {
				addresses: true,
			},
			where,
		})

		return user ? this.toUserDomain(user) : null
	}

	create: IUserRepository['create'] = async (input) => {
		const { addresses, permissionIds, workspaceId, phone, document, ...data } =
			UserInputSchema.parse(input)

		const user = await prisma.user.create({
			include: {
				addresses: true,
			},
			data: {
				...data,
				workspace: workspaceId
					? {
							connect: {
								workspaceId,
							},
						}
					: undefined,
				addresses: {
					createMany: {
						data: addresses.map((address) => ({
							...address,
							lat: address.location.lat,
							lng: address.location.lng,
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
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
			},
		})

		return this.toUserDomain(user)
	}

	updateById: IUserRepository['updateById'] = async (userId, input) => {
		const { workspaceId, permissionIds, phone, document, ...data } =
			UpdatableUserInputSchema.parse(input)

		const user: PrismaUser = await prisma.user.update({
			include: {
				addresses: true,
			},
			where: {
				userId,
			},
			data: {
				...data,
				workspace: workspaceId
					? {
							connect: {
								workspaceId,
							},
						}
					: undefined,
				permissions: permissionIds
					? {
							deleteMany: {},
							createMany: {
								data: permissionIds.map((permissionId) => ({
									permissionId,
								})),
							},
						}
					: undefined,
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
			},
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
				deletedAt: null,
			},
			select: {
				permissionId: true,
				organizationId: true,
			},
		})

		const userOrganizations = await prisma.userOrganization.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			include: {
				organization: true,
				role: {
					include: {
						permissions: true,
					},
				},
			},
		})

		return [
			...userPermissions.map((userPermission) => ({
				kind: 'WORKSPACE',
				permissionId: userPermission.permissionId as Permission,
				organization: null,
				role: null,
			})),
			...userOrganizations.flatMap((userOrganization) =>
				userOrganization.role.permissions.map((rolePermission) => ({
					kind: 'ORGANIZATION',
					organization: {
						organizationId: userOrganization.organizationId,
						name: userOrganization.organization.name,
					},
					role: {
						roleId: userOrganization.role.roleId,
						name: userOrganization.role.name,
					},
					permissionId: rolePermission.permissionId as Permission,
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

	findAddresses: IUserRepository['findAddresses'] = async (userId) => {
		const addresses = await prisma.userAddress.findMany({
			where: {
				userId,
			},
		})

		return addresses.map((address) => this.toUserAddressDomain(address))
	}

	findAddressById: IUserRepository['findAddressById'] = async (
		userId,
		addressId,
	) => {
		const address = await prisma.userAddress.findUnique({
			where: {
				userAddressId: addressId,
				userId,
			},
		})

		if (!address) {
			throw new NotFoundException(
				this.i18nService.current.userAddressNotFound({
					addressId,
				}),
			)
		}

		return this.findById(address.userId)
	}

	createAddress: IUserRepository['createAddress'] = async (userId, input) => {
		const { location, ...data } = input

		await prisma.userAddress.create({
			data: {
				userId,
				...data,
				lat: location.lat,
				lng: location.lng,
			},
		})
	}

	updateAddressById: IUserRepository['updateAddressById'] = async (
		userId,
		addressId,
		input,
	) => {
		const { location, ...data } = input

		await prisma.userAddress.update({
			where: {
				userAddressId: addressId,
				userId,
			},
			data: {
				...data,
				lat: location.lat,
				lng: location.lng,
			},
		})
	}

	deleteAddressById: IUserRepository['deleteAddressById'] = async (
		userId,
		addressId,
	) => {
		await prisma.userAddress.update({
			where: {
				userAddressId: addressId,
				userId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	private parseWhere({
		workspaceId,
		name,
		email,
		phone,
		status,
	}: FindUserInput): Prisma.UserWhereInput {
		const where: Prisma.UserWhereInput = {
			deletedAt: null,
		}

		if (workspaceId) {
			where.workspaceId = workspaceId
		}

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (email) {
			where.email = email
		}

		if (phone) {
			where.AND = [
				{
					phoneISO: phone.iso,
				},
				{
					phoneDDI: phone.ddi,
				},
				{
					phoneNumber: phone.number,
				},
			]
		}

		if (status) {
			where.status = status
		}

		return where
	}

	private parseOrderBy({
		sort,
	}: UserSort): Prisma.UserOrderByWithRelationInput[] {
		if (!sort) {
			return [
				{
					createdAt: 'desc',
				},
			]
		}

		return Object.entries(sort).map(([key, value]) => ({
			[key]: value,
		}))
	}

	private toUserDomain(model: PrismaUser) {
		const phone =
			model.phoneISO && model.phoneDDI && model.phoneNumber
				? {
						iso: model.phoneISO,
						ddi: model.phoneDDI,
						number: model.phoneNumber,
					}
				: undefined
		const document =
			model.documentType && model.documentNumber
				? {
						type: model.documentType,
						number: model.documentNumber,
					}
				: undefined
		const addresses = model.addresses.map((address) => {
			const lat = address.lat.toString()
			const lng = address.lng.toString()

			return {
				...address,
				addressId: address.userAddressId,
				location: {
					lat,
					lng,
				},
				deleteAt: address.deletedAt,
				createdAt: address.createdAt,
				updatedAt: address.updatedAt,
			}
		})

		return new UserDomain(
			deepMapDatesToISOString({
				...model,
				phone,
				document,
				addresses,
			}),
			this.i18nService,
		)
	}

	private toUserAddressDomain(model: Prisma.UserAddressGetPayload<{}>) {}
}
