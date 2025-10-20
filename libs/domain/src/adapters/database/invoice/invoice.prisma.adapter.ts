import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IInvoiceRepository } from '@/ports/database/invoice'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

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
		const { description, status } = input

		const paginate = PaginationSchemaTransform.parse({
			cursor,
			limit,
		})

		const where: Prisma.InvoiceWhereInput = {}
		const orderBy: Prisma.InvoiceOrderByWithRelationInput[] = sort
			? Object.entries(sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		if (description) {
			where.description = {
				contains: description,
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
					invoiceId: paginate.cursor,
				}
			: undefined

		const [values, total] = await prisma.$transaction([
			prisma.invoice.findMany({
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

		return {
			values: values.map(this.toInvoiceDomain),
			meta: {
				...paginate,
				total,
				nextCursor: values.length ? values[values.length - 1].invoiceId : null,
			},
		}
	}

	find: IInvoiceRepository['find'] = async ({ sort, ...input }) => {
		const { description, status } = input

		const where: Prisma.InvoiceWhereInput = {}
		const orderBy: Prisma.InvoiceOrderByWithRelationInput[] = sort
			? Object.entries(sort).map(([key, value]) => ({
					[key]: value,
				}))
			: [
					{
						createdAt: 'desc',
					},
				]

		if (description) {
			where.description = {
				contains: description,
				mode: 'insensitive',
			}
		}

		if (status) {
			where.status = status
		}

		const values = await prisma.invoice.findMany({
			where,
			orderBy,
		})

		return values.map(this.toInvoiceDomain)
	}

	findById: IInvoiceRepository['findById'] = async (invoiceId) => {
		const invoice = await prisma.invoice.findUnique({
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
		const invoice = await prisma.invoice.create({
			data: input,
		})

		return this.toInvoiceDomain(invoice)
	}

	updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
		const invoice = await prisma.invoice.update({
			where: {
				invoiceId,
			},
			data: input,
		})

		return this.toInvoiceDomain(invoice)
	}

	private toInvoiceDomain(model: Prisma.InvoiceGetPayload<{}>) {
		return new InvoiceDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
