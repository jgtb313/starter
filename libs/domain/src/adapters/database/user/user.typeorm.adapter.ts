import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { capitalize } from '@starter/common'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type FindOptionsRelations,
	type FindOptionsWhere,
	ILike,
	In,
	MoreThan,
	type Repository,
} from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { UserSchema } from '@/core/user'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import type { IUserRepository } from '@/ports/database/user'

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
	) {}

	findPaginated: IUserRepository['findPaginated'] = async ({
		cursor,
		limit,
		...query
	}) => {
		const { workspaceId, status } = query

		const where: FindOptionsWhere<UserEntity> = {}

		if (cursor) {
			where.userId = MoreThan(cursor)
		}

		// if (name) {
		//   where.name = ILike(`%${name}%`)
		// }

		if (workspaceId) {
			where.workspaceId = workspaceId
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

	find: IUserRepository['find'] = async (input) => {
		const { name, status } = input

		const where: FindOptionsWhere<UserEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
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
			throw new NotFoundException(`User ${userId} not found`)
		}

		return this.toUserDomain(user)
	}

	findByEmail: IUserRepository['findByEmail'] = async (email, options) => {
		const where: FindOptionsWhere<UserEntity> = {
			email,
		}

		if (options?.workspaceId) {
			where.workspaceId = options.workspaceId
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
			where.workspaceId = options.workspaceId
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
		organizations = [],
		attachedPermissions = [],
		addresses = [],
		...input
	}: Parameters<IUserRepository['create']>[number]) {
		const data = this.repository.create(input)

		const user = await this.repository.save(data)

		if (organizations.length) {
			await this.userOrganizationRepository.insert(
				organizations.map((organization) => ({
					userId: user.userId,
					organizationId: organization.organizationId,
					roleId: organization.roleId,
				})),
			)
		}

		if (attachedPermissions.length) {
			await this.userPermissionRepository.insert(
				attachedPermissions.map((permission) => ({
					userId: user.userId,
					permissionId: permission.permissionId,
					organizationId: permission.organizationId ?? undefined,
				})),
			)
		}

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

		await this.repository.update(user.userId, input)

		return this.findById(user.userId)
	}

	deleteById: IUserRepository['deleteById'] = async (userId) => {
		const user = await this.findById(userId)

		await this.repository.softDelete({
			userId: user.userId,
		})
	}

	findOrganizations: IUserRepository['findOrganizations'] = async (userId) => {
		const user = await this.findById(userId)

		return user.organizations
	}

	attachOrganization: IUserRepository['attachOrganization'] = async (
		userId,
		organizationId,
		roleId,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.create({
			userId: user.userId,
			organizationId,
			roleId,
		})

		return this.findById(user.userId)
	}

	attachManyOrganizations: IUserRepository['attachManyOrganizations'] = async (
		userId,
		input,
	) => {
		const user = await this.findById(userId)

		const organizationUsers = input.map(({ organizationId, roleId }) =>
			this.userOrganizationRepository.create({
				userId: user.userId,
				organizationId,
				roleId,
			}),
		)

		await this.userOrganizationRepository.insert(organizationUsers)

		return this.findById(user.userId)
	}

	detachOrganization: IUserRepository['detachOrganization'] = async (
		userId,
		organizationId,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.softDelete({
			userId: user.userId,
			organizationId,
		})
	}

	detachManyOrganizations: IUserRepository['detachManyOrganizations'] = async (
		userId,
		organizationIds,
	) => {
		const user = await this.findById(userId)

		await this.userOrganizationRepository.softDelete({
			userId: user.userId,
			organizationId: In(organizationIds),
		})
	}

	findAddresses: IUserRepository['findAddresses'] = async (userId) => {
		const user = await this.findById(userId)

		return user.addresses
	}

	createAddress: IUserRepository['createAddress'] = async (userId, input) => {
		const user = await this.findById(userId)

		const address = await this.userAddressRepository.create({
			...input,
			userId: user.userId,
		})

		await this.userAddressRepository.save(address)

		return this.findById(user.userId)
	}

	updateAddressById: IUserRepository['updateAddressById'] = async (
		userId,
		addressId,
		input,
	) => {
		const user = await this.findById(userId)

		await this.userAddressRepository.update(addressId, input)

		return this.findById(user.userId)
	}

	deleteAddressById: IUserRepository['deleteAddressById'] = async (
		userId,
		addressId,
	) => {
		const user = await this.findById(userId)

		await this.userAddressRepository.softDelete({
			userId: user.userId,
			userAddressId: addressId,
		})
	}

	findPermissions: IUserRepository['findPermissions'] = async (userId) => {
		const user = await this.findById(userId)

		return user.attachedPermissions
	}

	attachPermission: IUserRepository['attachPermission'] = async (
		userId,
		permissionId,
		organizationId,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.create({
			userId: user.userId,
			permissionId,
			organizationId,
		})

		return this.findById(user.userId)
	}

	attachManyPermissions: IUserRepository['attachManyPermissions'] = async (
		userId,
		input,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.insert(
			input.map(({ permissionId, organizationId }) => ({
				userId: user.userId,
				permissionId,
				organizationId: organizationId ?? undefined,
			})),
		)

		return this.findById(user.userId)
	}

	detachPermission: IUserRepository['detachPermission'] = async (
		userId,
		permissionId,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.softDelete({
			userId: user.userId,
			permissionId,
		})
	}

	detachManyPermissions: IUserRepository['detachManyPermissions'] = async (
		userId,
		permissionIds,
	) => {
		const user = await this.findById(userId)

		await this.userPermissionRepository.softDelete({
			userId: user.userId,
			permissionId: In(permissionIds),
		})
	}

	private getRelations(): FindOptionsRelations<UserEntity> {
		return {
			organizations: {
				organization: true,
				role: true,
			},
			userAddresses: true,
			userPermissions: {
				permission: true,
			},
		}
	}

	private toUserDomain(model: UserEntity) {
		return UserSchema.parse(deepMapDatesToISOString(model))
	}
}
