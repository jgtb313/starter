import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { OrganizationDomain } from '@/core/organization/organization.domain'
import {
	OrganizationInputSchema,
	UpdatableOrganizationInputSchema,
} from '@/core/organization/organization.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindOrganizationInput,
	IOrganizationRepository,
	OrganizationSort,
} from '@/ports/database/organization/organization.repository'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaOrganization = Prisma.OrganizationGetPayload<{}>

@Injectable()
export class OrganizationPrisma implements IOrganizationRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IOrganizationRepository['findPaginated'] = async ({
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
					organizationId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaOrganization[],
			number,
		] = await Promise.all([
			prisma.organization.findMany({
				where,
				orderBy,
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
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IOrganizationRepository['find'] = async ({ sort, ...input }) => {
		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const values: PrismaOrganization[] = await prisma.organization.findMany({
			where,
			orderBy,
		})

		return values.map((organization) => this.toOrganizationDomain(organization))
	}

	findById: IOrganizationRepository['findById'] = async (organizationId) => {
		const organization: PrismaOrganization | null =
			await prisma.organization.findUnique({
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

	create: IOrganizationRepository['create'] = async (input) => {
		const { workspaceId, phone, document, ...data } =
			OrganizationInputSchema.parse(input)

		const organization: PrismaOrganization = await prisma.organization.create({
			data: {
				...data,
				workspace: {
					connect: {
						workspaceId,
					},
				},
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
			},
		})

		return this.toOrganizationDomain(organization)
	}

	updateById: IOrganizationRepository['updateById'] = async (
		organizationId,
		input,
	) => {
		const { phone, document, ...data } =
			UpdatableOrganizationInputSchema.parse(input)

		const organization: PrismaOrganization = await prisma.organization.update({
			where: {
				organizationId,
			},
			data: {
				...data,
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
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

	private parseWhere({
		name,
		status,
	}: FindOrganizationInput): Prisma.OrganizationWhereInput {
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

		return where
	}

	private parseOrderBy({
		sort,
	}: OrganizationSort): Prisma.OrganizationOrderByWithRelationInput[] {
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

	private toOrganizationDomain({
		phoneISO,
		phoneDDI,
		phoneNumber,
		documentType,
		documentNumber,
		...model
	}: PrismaOrganization) {
		const phone =
			phoneISO && phoneDDI && phoneNumber
				? {
						iso: phoneISO,
						ddi: phoneDDI,
						number: phoneNumber,
					}
				: undefined
		const document =
			documentType && documentNumber
				? {
						type: documentType,
						number: documentNumber,
					}
				: undefined

		return new OrganizationDomain(
			deepMapDatesToISOString({
				...model,
				phone,
				document,
			}),
			this.i18nService,
		)
	}
}
