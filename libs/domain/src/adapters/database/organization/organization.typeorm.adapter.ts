import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type FindOptionsWhere, ILike, In, type Repository } from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { OrganizationDomain } from '@/core/organization/organization.domain'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import type { IOrganizationRepository } from '@/ports/database/organization'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OrganizationTypeorm implements IOrganizationRepository {
	constructor(
		@InjectRepository(OrganizationEntity)
		private readonly repository: Repository<OrganizationEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IOrganizationRepository['findPaginated'] = async ({
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

	find: IOrganizationRepository['find'] = async (input) => {
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
			throw new NotFoundException(
				this.i18nService.current.organizationNotFound({
					organizationId,
				}),
			)
		}

		return this.toOrganizationDomain(organization)
	}

	countByWorkspaceId: IOrganizationRepository['countByWorkspaceId'] = async (
		workspaceId,
	) => {
		return this.repository.count({
			where: {
				workspace: {
					workspaceId,
				},
			},
		})
	}

	create: IOrganizationRepository['create'] = async ({
		workspaceId,
		...input
	}) => {
		const data = this.repository.create({
			...input,
			workspace: {
				workspaceId,
			},
		})

		const organization = await this.repository.save(data)

		return this.toOrganizationDomain(organization)
	}

	updateById: IOrganizationRepository['updateById'] = async (
		organizationId,
		{ workspaceId, ...input },
	) => {
		const organization = await this.findById(organizationId)

		await this.repository.update(organization.state.organizationId, {
			...input,
			workspace: workspaceId
				? {
						workspaceId,
					}
				: undefined,
		})

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

	private toOrganizationDomain = (model: OrganizationEntity) => {
		return new OrganizationDomain(
			deepMapDatesToISOString(model),
			this.i18nService,
		)
	}
}
