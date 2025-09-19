import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationSchemaTransform } from '@starter/schema'
import {
	type DeepPartial,
	type FindOptionsWhere,
	ILike,
	In,
	type Repository,
} from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'

import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OrganizationDomain } from '@/core/organization/organization.domain'
import type {
	BaseOrganization,
	Organization,
} from '@/core/organization/organization.schema'
import type { IOrganizationRepository } from '@/ports/database/organization'

@Injectable()
export class OrganizationTypeorm implements IOrganizationRepository {
	constructor(
		@InjectRepository(OrganizationEntity)
		private readonly repository: Repository<OrganizationEntity>,
	) {}

	findAllPaginated: IOrganizationRepository['findAllPaginated'] = async ({
		cursor,
		limit,
		...input
	}) => {
		const { name, status } = input

		const where: FindOptionsWhere<OrganizationEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
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
		})

		return {
			values: values.map((organization) =>
				this.toOrganizationDomain(organization),
			),
			meta: {
				...paginate,
				total,
				nextCursor: null,
			},
		}
	}

	findAll: IOrganizationRepository['findAll'] = async (input) => {
		const { name, status } = input

		const where: FindOptionsWhere<OrganizationEntity> = {}

		if (name) {
			where.name = ILike(`%${name}%`)
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
		})

		return values.map((organization) => this.toOrganizationDomain(organization))
	}

	findById: IOrganizationRepository['findById'] = async (organizationId) => {
		const organization = await this.repository.findOne({
			where: {
				organizationId,
			},
		})

		if (!organization) {
			throw new NotFoundException(`Organization ${organizationId} not found`)
		}

		return this.toOrganizationDomain(organization)
	}

	create: IOrganizationRepository['create'] = async (input) => {
		const data = this.repository.create(this.toOrganizationEntity(input))

		const organization = await this.repository.save(data)

		return this.toOrganizationDomain(organization)
	}

	updateById: IOrganizationRepository['updateById'] = async (
		organizationId,
		input,
	) => {
		const organization = await this.findById(organizationId)

		await this.repository.update(
			organization.state.organizationId,
			this.toPartialOrganizationEntity(input),
		)

		return this.findById(organization.state.organizationId)
	}

	deleteById: IOrganizationRepository['deleteById'] = async (
		organizationId,
	) => {
		const organization = await this.findById(organizationId)

		await this.repository.softDelete({
			organizationId: organization.state.organizationId,
		})
	}

	validateIds: IOrganizationRepository['validateIds'] = async (
		organizationIds,
	) => {
		const organizations = await this.repository.find({
			where: {
				organizationId: In(organizationIds),
			},
		})

		const foundOrganizationIds = organizations.map(
			(organization) => organization.organizationId,
		)
		const missingOrganizationIds = organizationIds.filter(
			(organizationId) => !foundOrganizationIds.includes(organizationId),
		)

		if (missingOrganizationIds.length) {
			throw new NotFoundException(
				`The following organizationIds were not found: ${missingOrganizationIds.join(', ')}`,
			)
		}
	}

	private toOrganizationEntity(
		organization: BaseOrganization,
	): DeepPartial<OrganizationEntity> {
		return {
			...organization,
		}
	}

	private toPartialOrganizationEntity(
		organization: Partial<Organization>,
	): QueryDeepPartialEntity<OrganizationEntity> {
		return {
			...organization,
		}
	}

	private toOrganizationDomain(model: OrganizationEntity) {
		return new OrganizationDomain(deepMapDatesToISOString(model))
	}
}
