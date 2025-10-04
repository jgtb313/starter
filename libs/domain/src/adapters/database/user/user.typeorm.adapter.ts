import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { capitalize } from '@starter/common'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type DeepPartial,
	type FindOptionsWhere,
	ILike,
	MoreThan,
	type Repository,
} from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserDomain } from '@/core/user/user.domain'
import type { BaseUser, User } from '@/core/user/user.schema'
import type { IUserRepository } from '@/ports/database/user'
import { deepMapDatesToISOString } from '@/support/utilities'

@Injectable()
export class UserTypeorm implements IUserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	findAllPaginated: IUserRepository['findAllPaginated'] = async ({
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
			relations: {},
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

	findAll: IUserRepository['findAll'] = async (input) => {
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
		})

		return values.map((user) => this.toUserDomain(user))
	}

	findById: IUserRepository['findById'] = async (userId) => {
		const user = await this.repository.findOne({
			where: {
				userId,
			},
		})

		if (!user) {
			throw new NotFoundException(`User ${userId} not found`)
		}

		return this.toUserDomain(user)
	}

	findByEmail: IUserRepository['findByEmail'] = async (email, options) => {
		const where: FindOptionsWhere<UserEntity> = {}

		if (email) {
			where.email = email
		}

		if (options?.workspaceId) {
			where.workspaceId = options.workspaceId
		}

		const user = await this.repository.findOne({
			where,
		})

		if (!user) {
			return null
		}

		return this.toUserDomain(user)
	}

	findByPhone: IUserRepository['findByPhone'] = async (phone, options) => {
		const where: FindOptionsWhere<UserEntity> = {}

		if (phone) {
			where.phoneISO = phone.iso
			where.phoneDDI = phone.ddi
			where.phoneNumber = phone.number
		}

		if (options?.workspaceId) {
			where.workspaceId = options.workspaceId
		}

		const user = await this.repository.findOne({
			where,
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
		})

		if (!user) {
			return null
		}

		return this.toUserDomain(user)
	}

	create: IUserRepository['create'] = async (input) => {
		const payload = this.toUserEntity(input)
		const data = this.repository.create(payload)

		const user = await this.repository.save(data)

		return this.toUserDomain(user)
	}

	updateById: IUserRepository['updateById'] = async (userId, input) => {
		const user = await this.findById(userId)

		const payload = this.toPartialUserEntity(input)
		await this.repository.update(user.state.userId, payload)

		return this.findById(user.state.userId)
	}

	deleteById: IUserRepository['deleteById'] = async (userId) => {
		const user = await this.findById(userId)

		await this.repository.softDelete({
			userId: user.state.userId,
		})
	}

	private toUserEntity(user: BaseUser): DeepPartial<UserEntity> {
		return {
			...user,
			googleProviderId: user.googleProviderId ?? undefined,
			facebookProviderId: user.facebookProviderId ?? undefined,
			phoneISO: user.phone?.iso,
			phoneDDI: user.phone?.ddi,
			phoneNumber: user.phone?.number,
			documentType: user.document?.type,
			documentNumber: user.document?.number,
			addressMain: user.address?.main,
			addressTitle: user.address?.title,
			addressState: user.address?.state,
			addressCity: user.address?.city,
			addressZipCode: user.address?.zipCode,
			addressNeighborhood: user.address?.neighborhood,
			addressStreet: user.address?.street,
			addressNumber: user.address?.number,
			addressComplement: user.address?.complement,
			addressLandmark: user.address?.landmark,
			addressLocationLat: user.address?.location?.lat,
			addressLocationLng: user.address?.location?.lng,
		}
	}

	private toPartialUserEntity({
		phone,
		document,
		address,
		...user
	}: Partial<User>): QueryDeepPartialEntity<UserEntity> {
		return {
			...user,
			googleProviderId: user.googleProviderId ?? undefined,
			facebookProviderId: user.facebookProviderId ?? undefined,
			phoneISO: phone?.iso,
			phoneDDI: phone?.ddi,
			phoneNumber: phone?.number,
			documentType: document?.type,
			documentNumber: document?.number,
			addressMain: address?.main,
			addressTitle: address?.title,
			addressState: address?.state,
			addressCity: address?.city,
			addressZipCode: address?.zipCode,
			addressNeighborhood: address?.neighborhood,
			addressStreet: address?.street,
			addressNumber: address?.number,
			addressComplement: address?.complement,
			addressLandmark: address?.landmark,
			addressLocationLat: address?.location?.lat,
			addressLocationLng: address?.location?.lng,
		}
	}

	private toUserDomain(user: UserEntity): UserDomain {
		const state: UserDomain['state'] = {
			...user,
			organizations: [],
			googleProviderId: user.googleProviderId ?? undefined,
			facebookProviderId: user.facebookProviderId ?? undefined,
			phone:
				user.phoneISO && user.phoneDDI && user.phoneNumber
					? {
							iso: user.phoneISO,
							ddi: user.phoneDDI,
							number: user.phoneNumber,
						}
					: null,
			birthday: user.birthday ?? null,
			document:
				user.documentType && user.documentNumber
					? {
							type: user.documentType,
							number: user.documentNumber,
						}
					: null,
			address:
				user.addressTitle &&
				user.addressState &&
				user.addressCity &&
				user.addressZipCode &&
				user.addressNeighborhood &&
				user.addressStreet &&
				user.addressNumber &&
				user.addressComplement &&
				user.addressLandmark &&
				user.addressLocationLat &&
				user.addressLocationLng
					? {
							main: user.addressMain,
							title: user.addressTitle,
							state: user.addressState,
							city: user.addressCity,
							zipCode: user.addressZipCode,
							neighborhood: user.addressNeighborhood,
							street: user.addressStreet,
							number: user.addressNumber,
							complement: user.addressComplement,
							landmark: user.addressLandmark,
							location: {
								lat: user.addressLocationLat,
								lng: user.addressLocationLng,
							},
						}
					: null,
		}

		return new UserDomain(deepMapDatesToISOString(state))
	}
}
