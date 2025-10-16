import { capitalize } from '@starter/common'
import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	type FindOptionsOrder,
	type FindOptionsRelations,
	type FindOptionsWhere,
	ILike,
	In,
	MoreThan,
	type Repository,
} from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { UserSchema } from '@/core/user'
import { UserDomain } from '@/core/user/user.domain'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import type { IUserRepository } from '@/ports/database/user'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

import { UserAddressEntity } from './user-address.typeorm.entity'
import { UserOrganizationEntity } from './user-organization.typeorm.entity'
import { UserPermissionEntity } from './user-permission.typeorm.entity'

@Injectable()
export class UserTypeorm implements IUserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
		@InjectRepository(UserAddressEntity)
		private readonly userAddressRepository: Repository<UserAddressEntity>,
		@InjectRepository(UserOrganizationEntity)
		private readonly userOrganizationRepository: Repository<UserOrganizationEntity>,
		@InjectRepository(UserPermissionEntity)
		private readonly userPermissionRepository: Repository<UserPermissionEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IUserRepository['findPaginated'] = async ({
		cursor,
		limit,
		sort,
		...query
	}) => {
		const { workspaceId, name, phone, email, status } = query

		const where: FindOptionsWhere<UserEntity> = {}
		const order: FindOptionsOrder<UserEntity> = {
			...sort,
		}

		if (cursor) {
			where.userId = MoreThan(cursor)
		}

		if (workspaceId) {
			where.workspace = {
				workspaceId,
			}
		}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (phone) {
			where.phoneISO = phone.iso
			where.phoneDDI = phone.ddi
			where.phoneNumber = phone.number
		}

		if (email) {
			where.email = email
		}

		if (status) {
			where.status = status
		}

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const take = paginate.limit

		const [values, total] = await this.repository.findAndCount({
			where,
			take,
			order,
			relations: this.getRelations(),
		})

		const nextCursor =
			values.length > 0 ? values[values.length - 1].userId : null

		return {
			values: values.map((user) => this.toUserDomain(user)),
			meta: {
				total,
				limit: take,
				nextCursor,
			},
		}
	}

	find: IUserRepository['find'] = async ({ sort, ...query }) => {
		const { workspaceId, name, phone, email, status } = query

		const where: FindOptionsWhere<UserEntity> = {}
		const order: FindOptionsOrder<UserEntity> = {
			...sort,
		}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (workspaceId) {
			where.workspace = {
				workspaceId,
			}
		}

		if (phone) {
			where.phoneISO = phone.iso
			where.phoneDDI = phone.ddi
			where.phoneNumber = phone.number
		}

		if (email) {
			where.email = email
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
			order,
			relations: this.getRelations(),
		})

		return values.map((user) => this.toUserDomain(user))
	}

	findById: IUserRepository['findById'] = async (userId) => {
		const user = await this.repository.findOne({
			where: {
				userId,
			},
			relations: this.getRelations(),
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
		const where: FindOptionsWhere<UserEntity> = {
			email,
		}

		if (options?.workspaceId) {
			where.workspace = {
				workspaceId: options.workspaceId,
			}
		}

		const user = await this.repository.findOne({
			where,
			relations: this.getRelations(),
		})

		if (!user) {
			return null
		}

		return this.toUserDomain(user)
	}

	findByPhone: IUserRepository['findByPhone'] = async (phone, options) => {
		const where: FindOptionsWhere<UserEntity> = {
			phoneISO: phone.iso,
			phoneDDI: phone.ddi,
			phoneNumber: phone.number,
		}

		if (options?.workspaceId) {
			where.workspace = {
				workspaceId: options.workspaceId,
			}
		}

		const user = await this.repository.findOne({
			where,
			relations: this.getRelations(),
		})

		if (!user) {
			return null
		}

		return this.toUserDomain(user)
	}

	findBySocial: IUserRepository['findBySocial'] = async (
		provider,
		providerToken,
		email,
	) => {
		const socialKey = `${capitalize(provider)}ProviderId`
		const where: FindOptionsWhere<UserEntity> = {
			[socialKey]: providerToken,
		}

		if (email) {
			where.email = email
		}

		const user = await this.repository.findOne({
			where,
			relations: this.getRelations(),
		})

		if (!user) {
			return null
		}

		return this.toUserDomain(user)
	}

	async create({
		addresses = [],
		...input
	}: Parameters<IUserRepository['create']>[number]) {
		const data = this.repository.create(input)

		const user = await this.repository.save(data)

		if (addresses.length) {
			await this.userAddressRepository.insert(
				addresses.map((address) => ({
					userId: user.userId,
					...address,
				})),
			)
		}

		return this.toUserDomain(user)
	}

	updateById: IUserRepository['updateById'] = async (userId, input) => {
		const user = await this.findById(userId)

		await this.repository.update(user.state.userId, input)

		return this.findById(user.state.userId)
	}

	deleteById: IUserRepository['deleteById'] = async (userId) => {
		const user = await this.findById(userId)

		await this.repository.softDelete({
			userId: user.state.userId,
		})
	}

	attachOrganization: IUserRepository['attachOrganization'] = async (
		userId,
		organizationId,
		roleId,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.create({
			user: {
				userId: user.state.userId,
			},
			organization: {
				organizationId,
			},
			role: {
				roleId,
			},
		})

		return
	}

	attachManyOrganizations: IUserRepository['attachManyOrganizations'] = async (
		userId,
		input,
	) => {
		const user = await this.findById(userId)

		const organizationUsers = input.map(({ organizationId, roleId }) =>
			this.userOrganizationRepository.create({
				user: {
					userId: user.state.userId,
				},
				organization: {
					organizationId,
				},
				role: {
					roleId,
				},
			}),
		)

		await this.userOrganizationRepository.insert(organizationUsers)

		return
	}

	detachOrganization: IUserRepository['detachOrganization'] = async (
		userId,
		organizationId,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.softDelete({
			user: {
				userId: user.state.userId,
			},
			organization: {
				organizationId,
			},
		})
	}

	detachManyOrganizations: IUserRepository['detachManyOrganizations'] = async (
		userId,
		organizationIds,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.softDelete({
			user: {
				userId: user.state.userId,
			},
			organization: {
				organizationId: In(organizationIds),
			},
		})
	}

	createAddress: IUserRepository['createAddress'] = async (userId, input) => {
		const user = await this.findById(userId)

		const address = await this.userAddressRepository.create({
			...input,
			user: {
				userId: user.state.userId,
			},
		})

		await this.userAddressRepository.save(address)

		return
	}

	updateAddressById: IUserRepository['updateAddressById'] = async (
		userId,
		addressId,
		input,
	) => {
		const user = await this.findById(userId)

		await this.userAddressRepository.update(
			{
				userAddressId: addressId,
				user: {
					userId: user.state.userId,
				},
			},
			input,
		)

		return
	}

	deleteAddressById: IUserRepository['deleteAddressById'] = async (
		userId,
		addressId,
	) => {
		const user = await this.findById(userId)

		await this.userAddressRepository.softDelete({
			userAddressId: addressId,
			user: {
				userId: user.state.userId,
			},
		})
	}

	findPermissions: IUserRepository['findPermissions'] = async (userId) => {
		const user = await this.findById(userId)

		const permissions = await this.userPermissionRepository.find({
			where: {
				user: {
					userId: user.state.userId,
				},
			},
		})

		return permissions.map((permission) => permission.permission)
	}

	attachPermission: IUserRepository['attachPermission'] = async (
		userId,
		permissionId,
		organizationId,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.create({
			user: {
				userId: user.state.userId,
			},
			permission: {
				permissionId,
			},
			organization: {
				organizationId,
			},
		})

		return
	}

	attachManyPermissions: IUserRepository['attachManyPermissions'] = async (
		userId,
		input,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.insert(
			input.map(({ permissionId, organizationId }) => ({
				user: {
					userId: user.state.userId,
				},
				permissionId,
				organizationId: organizationId ?? undefined,
			})),
		)

		return
	}

	detachPermission: IUserRepository['detachPermission'] = async (
		userId,
		permissionId,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.softDelete({
			user: {
				userId: user.state.userId,
			},
			permission: {
				permissionId,
			},
		})
	}

	detachManyPermissions: IUserRepository['detachManyPermissions'] = async (
		userId,
		permissionIds,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.softDelete({
			user: {
				userId: user.state.userId,
			},
			permission: {
				permissionId: In(permissionIds),
			},
		})
	}

	private getRelations(): FindOptionsRelations<UserEntity> {
		return {
			userAddresses: true,
			userPermissions: {
				permission: true,
			},
		}
	}

	private toUserDomain(model: UserEntity) {
		return new UserDomain(deepMapDatesToISOString(model))
	}
}
