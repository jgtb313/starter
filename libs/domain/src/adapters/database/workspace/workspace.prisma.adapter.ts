import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class WorkspacePrisma implements IWorkspaceRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IWorkspaceRepository['findPaginated'] = async (input) => {
		const paginate = PaginationSchemaTransform.parse({
			cursor: input.cursor,
			limit: input.limit,
		})

		const where: Prisma.WorkspaceWhereInput = {}

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const orderBy: Prisma.WorkspaceOrderByWithRelationInput[] = input.sort
			? Object.entries(input.sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		const take = paginate.limit
		const skip = paginate.cursor ? 1 : 0
		const cursorCriteria = paginate.cursor
			? {
					workspaceId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.workspace.findMany({
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
				include: {
					workspaceAddresses: true,
				},
			}),
			prisma.workspace.count({
				where,
			}),
		])

		const nextCursor = values.length
			? values[values.length - 1].workspaceId
			: null

		return {
			values: values.map(this.toWorkspaceDomain),
			meta: {
				...paginate,
				total,
				nextCursor,
			},
		}
	}

	find: IWorkspaceRepository['find'] = async (input) => {
		const where: Prisma.WorkspaceWhereInput = {}

		if (input.workspaceId) {
			where.workspaceId = input.workspaceId
		}

		if (input.name) {
			where.name = {
				contains: input.name,
				mode: 'insensitive',
			}
		}

		if (input.status) {
			where.status = input.status
		}

		const values = await prisma.workspace.findMany({
			where,
			include: {
				workspaceAddresses: true,
			},
		})

		return values.map(this.toWorkspaceDomain)
	}

	findById: IWorkspaceRepository['findById'] = async (workspaceId) => {
		const workspace = await prisma.workspace.findUnique({
			where: {
				workspaceId,
			},
			include: {
				workspaceAddresses: true,
			},
		})

		if (!workspace) {
			throw new NotFoundException(
				this.i18nService.current.workspaceNotFound({
					workspaceId,
				}),
			)
		}

		return this.toWorkspaceDomain(workspace)
	}

	create: IWorkspaceRepository['create'] = async ({
		planId,
		address,
		locale,
		...input
	}) => {
		const workspace = await prisma.workspace.create({
			data: {
				...input,
				plan: {
					connect: {
						planId,
					},
				},
				workspaceAddresses: address
					? {
							create: {
								...address,
								lat: address.location.lat,
								lng: address.location.lng,
							},
						}
					: undefined,
			},
			include: {
				workspaceAddresses: true,
			},
		})

		return this.toWorkspaceDomain(workspace)
	}

	updateById: IWorkspaceRepository['updateById'] = async (
		workspaceId,
		{ planId, address, locale, ...input },
	) => {
		const workspace = await prisma.workspace.update({
			where: {
				workspaceId,
			},
			data: {
				...input,
				planId,
			},
			include: {
				workspaceAddresses: true,
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
				// deletedAt: new Date(),
			},
		})
	}

	upsertAddress: IWorkspaceRepository['upsertAddress'] = async (
		workspaceId,
		input,
	) => {
		await prisma.workspaceAddress.upsert({
			where: {
				workspaceAddressId: '',
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
				workspaceAddressId: '',
			},
		})
	}

	private toWorkspaceDomain(
		model: Prisma.WorkspaceGetPayload<{
			include: {
				workspaceAddresses: true
			}
		}>,
	) {
		return new WorkspaceDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
