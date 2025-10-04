import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { capitalize } from '@starter/common'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type FindOptionsWhere,
	ILike,
	MoreThan,
	type Repository,
} from 'typeorm'

import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserDomain } from '@/core/user/user.domain'
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
			relations: {
				organizations: {
					organization: true,
					role: true,
				},
			},
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
		const data = this.repository.create(input as unknown as UserEntity)

		const user = await this.repository.save(data)

		return this.toUserDomain(user)
	}

	updateById: IUserRepository['updateById'] = async (userId, input) => {
		const user = await this.findById(userId)

		await this.repository.update(
			user.state.userId,
			input as unknown as UserEntity,
		)

		return this.findById(user.state.userId)
	}

	deleteById: IUserRepository['deleteById'] = async (userId) => {
		const user = await this.findById(userId)

		await this.repository.softDelete({
			userId: user.state.userId,
		})
	}

	private toUserDomain(user: UserEntity): UserDomain {
		return new UserDomain(deepMapDatesToISOString(user))
	}
}
