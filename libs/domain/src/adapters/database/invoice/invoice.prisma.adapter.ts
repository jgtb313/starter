import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import {
	InvoiceInputSchema,
	UpdatableInvoiceInputSchema,
} from '@/core/invoice/invoice.schema'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type {
	FindInvoiceInput,
	IInvoiceRepository,
	InvoiceSort,
} from '@/ports/database/invoice/invoice.repository'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

type PrismaInvoice = Prisma.InvoiceGetPayload<{
	include: {
		plan: true
	}
}>

@Injectable()
export class InvoicePrisma implements IInvoiceRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findPaginated: IInvoiceRepository['findPaginated'] = async ({
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
					invoiceId: paginate.cursor,
				}
			: undefined

		const [values, total]: [
			PrismaInvoice[],
			number,
		] = await Promise.all([
			prisma.invoice.findMany({
				include: {
					plan: true,
				},
				where,
				orderBy,
				take,
				skip,
				cursor: cursorCriteria,
			}),
			prisma.invoice.count({
				where,
			}),
		])

		const nextCursor = values.length
			? values[values.length - 1].invoiceId
			: null

		return {
			values: values.map((invoice) => this.toInvoiceDomain(invoice)),
			meta: {
				limit: paginate.limit,
				total,
				nextCursor,
			},
		}
	}

	find: IInvoiceRepository['find'] = async ({ sort, ...input }) => {
		const where = this.parseWhere(input)
		const orderBy = this.parseOrderBy({
			sort,
		})

		const values: PrismaInvoice[] = await prisma.invoice.findMany({
			include: {
				plan: true,
			},
			where,
			orderBy,
		})

		return values.map((invoice) => this.toInvoiceDomain(invoice))
	}

	findById: IInvoiceRepository['findById'] = async (invoiceId) => {
		const invoice: PrismaInvoice | null = await prisma.invoice.findUnique({
			include: {
				plan: true,
			},
			where: {
				invoiceId,
			},
		})

		if (!invoice) {
			throw new NotFoundException(
				this.i18nService.current.invoiceNotFound({
					invoiceId,
				}),
			)
		}

		return this.toInvoiceDomain(invoice)
	}

	create: IInvoiceRepository['create'] = async (input) => {
		const { workspaceId, subscriptionId, planId, ...data } =
			InvoiceInputSchema.parse(input)

		const invoice: PrismaInvoice = await prisma.invoice.create({
			include: {
				plan: true,
			},
			data: {
				...data,
				workspace: {
					connect: {
						workspaceId,
					},
				},
				subscription: {
					connect: {
						subscriptionId,
					},
				},
				plan: {
					connect: {
						planId,
					},
				},
			},
		})

		return this.toInvoiceDomain(invoice)
	}

	updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
		const data = UpdatableInvoiceInputSchema.parse(input)

		const invoice: PrismaInvoice = await prisma.invoice.update({
			include: {
				plan: true,
			},
			where: {
				invoiceId,
			},
			data,
		})

		return this.toInvoiceDomain(invoice)
	}

	private parseWhere({
		description,
		status,
	}: FindInvoiceInput): Prisma.InvoiceWhereInput {
		const where: Prisma.InvoiceWhereInput = {}

		if (description) {
			where.description = {
				contains: description,
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
	}: InvoiceSort): Prisma.InvoiceOrderByWithRelationInput[] {
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

	private toInvoiceDomain(model: PrismaInvoice) {
		return new InvoiceDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
