import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { OrganizationDomain } from '@/core/organization/organization.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IOrganizationRepository } from '@/ports/database/organization'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OrganizationPrisma implements IOrganizationRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IOrganizationRepository['findPaginated'] = async ({
		cursor,
		limit,
		...input
	}) => {
		const { name, status } = input

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const where: Prisma.OrganizationWhereInput = {}

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (status) {
			where.status = status
		}

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					organizationId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.organization.findMany({
				where,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.organization.count({
				where,
			}),
		])

		const nextCursor = values.length
			? values[values.length - 1].organizationId
			: null

		return {
			values: values.map((organization) =>
				this.toOrganizationDomain(organization),
			),
			meta: {
				...paginate,
				total,
				nextCursor,
			},
		}
	}

	find: IOrganizationRepository['find'] = async (input) => {
		const { name, status } = input

		const where: Prisma.OrganizationWhereInput = {}

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (status) {
			where.status = status
		}

		const values = await prisma.organization.findMany({
			where,
		})

		return values.map((organization) => this.toOrganizationDomain(organization))
	}

	findById: IOrganizationRepository['findById'] = async (organizationId) => {
		const organization = await prisma.organization.findUnique({
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
		return prisma.organization.count({
			where: {
				workspaceId,
			},
		})
	}

	create: IOrganizationRepository['create'] = async ({
		workspaceId,
		...input
	}) => {
		const organization = await prisma.organization.create({
			data: {
				...input,
				workspaceId,
			},
		})

		return this.toOrganizationDomain(organization)
	}

	updateById: IOrganizationRepository['updateById'] = async (
		organizationId,
		{ workspaceId, ...input },
	) => {
		await this.findById(organizationId)

		const organization = await prisma.organization.update({
			where: {
				organizationId,
			},
			data: {
				...input,
				workspaceId,
			},
		})

		return this.toOrganizationDomain(organization)
	}

	deleteById: IOrganizationRepository['deleteById'] = async (
		organizationId,
	) => {
		await prisma.organization.update({
			where: {
				organizationId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	validateIds: IOrganizationRepository['validateIds'] = async (
		organizationIds,
	) => {
		const count = await prisma.organization.count({
			where: {
				organizationId: {
					in: organizationIds,
				},
			},
		})

		if (count !== organizationIds.length) {
			throw new NotFoundException(
				`The following organizationIds were not found: ${organizationIds.join(', ')}`,
			)
		}
	}

	private toOrganizationDomain(model: Prisma.OrganizationGetPayload<{}>) {
		return new OrganizationDomain(
			deepMapDatesToISOString(model),
			this.i18nService,
		)
	}
}
