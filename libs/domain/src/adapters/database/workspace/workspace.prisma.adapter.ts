import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import {
	UpdatableWorkspaceInputSchema,
	WorkspaceInputSchema,
} from '@/core/workspace/workspace.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindWorkspaceInput,
	IWorkspaceRepository,
	WorkspaceSort,
} from '@/ports/database/workspace/workspace.repository'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaWorkspace = Prisma.WorkspaceGetPayload<{
	include: {
		plan: {
			include: {
				intervals: true
				features: true
			}
		}
		address: true
	}
}>

@Injectable()
export class WorkspacePrisma implements IWorkspaceRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IWorkspaceRepository['findPaginated'] = async ({
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
					workspaceId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaWorkspace[],
			number,
		] = await Promise.all([
			prisma.workspace.findMany({
				include: {
					plan: {
						include: {
							intervals: true,
							features: true,
						},
					},
					address: true,
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.workspace.count({
				where,
			}),
		])

		const nextCursor = values.length
			? values[values.length - 1].workspaceId
			: null

		return {
			values: values.map((workspace) => this.toWorkspaceDomain(workspace)),
			meta: {
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IWorkspaceRepository['find'] = async (input) => {
		const { sort, ...rest } = input
		const where = this.parseWhere(rest)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const values: PrismaWorkspace[] = await prisma.workspace.findMany({
			include: {
				plan: {
					include: {
						intervals: true,
						features: true,
					},
				},
				address: true,
			},
			where,
			orderBy,
		})

		return values.map((workspace) => this.toWorkspaceDomain(workspace))
	}

	findById: IWorkspaceRepository['findById'] = async (workspaceId) => {
		const workspace: PrismaWorkspace | null = await prisma.workspace.findUnique(
			{
				include: {
					plan: {
						include: {
							intervals: true,
							features: true,
						},
					},
					address: true,
				},
				where: {
					workspaceId,
				},
			},
		)

		if (!workspace) {
			throw new NotFoundException(
				this.i18nService.current.workspaceNotFound({
					workspaceId,
				}),
			)
		}

		return this.toWorkspaceDomain(workspace)
	}

	create: IWorkspaceRepository['create'] = async (input) => {
		const { planId, phone, document, address, locale, ...data } =
			WorkspaceInputSchema.parse(input)

		const workspace: PrismaWorkspace = await prisma.workspace.create({
			include: {
				plan: {
					include: {
						intervals: true,
						features: true,
					},
				},
				address: true,
			},
			data: {
				...data,
				plan: {
					connect: {
						planId,
					},
				},
				address: address
					? {
							create: {
								...address,
								lat: address.location.lat,
								lng: address.location.lng,
							},
						}
					: undefined,
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
				locale: locale ? JSON.stringify(locale) : undefined,
			},
		})

		return this.toWorkspaceDomain(workspace)
	}

	updateById: IWorkspaceRepository['updateById'] = async (
		workspaceId,
		input,
	) => {
		const { phone, document, locale, ...data } =
			UpdatableWorkspaceInputSchema.parse(input)

		const workspace: PrismaWorkspace = await prisma.workspace.update({
			include: {
				plan: {
					include: {
						intervals: true,
						features: true,
					},
				},
				address: true,
			},
			where: {
				workspaceId,
			},
			data: {
				...data,
				phoneISO: phone?.iso,
				phoneDDI: phone?.ddi,
				phoneNumber: phone?.number,
				documentType: document?.type,
				documentNumber: document?.number,
				locale: locale ? JSON.stringify(locale) : undefined,
			},
		})

		return this.toWorkspaceDomain(workspace)
	}

	deleteById: IWorkspaceRepository['deleteById'] = async (workspaceId) => {
		await prisma.workspace.update({
			where: {
				workspaceId,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}

	upsertAddress: IWorkspaceRepository['upsertAddress'] = async (
		workspaceId,
		input,
	) => {
		await prisma.workspaceAddress.upsert({
			where: {
				workspaceId,
			},
			update: {
				...input,
				lat: input.location.lat,
				lng: input.location.lng,
			},
			create: {
				...input,
				lat: input.location.lat,
				lng: input.location.lng,
				workspace: {
					connect: {
						workspaceId,
					},
				},
			},
		})
	}

	deleteAddress: IWorkspaceRepository['deleteAddress'] = async (
		workspaceId,
	) => {
		await prisma.workspaceAddress.delete({
			where: {
				workspaceId,
			},
		})
	}

	private parseWhere({
		name,
		status,
	}: FindWorkspaceInput): Prisma.WorkspaceWhereInput {
		const where: Prisma.WorkspaceWhereInput = {}

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
	}: WorkspaceSort): Prisma.WorkspaceOrderByWithRelationInput[] {
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

	private toWorkspaceDomain(model: PrismaWorkspace) {
		return new WorkspaceDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
