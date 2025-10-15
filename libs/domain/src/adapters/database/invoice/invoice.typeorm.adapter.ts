import { PaginationSchemaTransform } from '@starter/schema'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	type FindOptionsOrder,
	type FindOptionsWhere,
	ILike,
	type Repository,
} from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import type { IInvoiceRepository } from '@/ports/database/invoice'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class InvoiceTypeorm implements IInvoiceRepository {
	constructor(
		@InjectRepository(InvoiceEntity)
		private readonly repository: Repository<InvoiceEntity>,
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

		const where: FindOptionsWhere<InvoiceEntity> = {}
		const order: FindOptionsOrder<InvoiceEntity> = {
			...sort,
		}

		if (description) {
			where.description = ILike(`%${description}%`)
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
			order,
		})

		return {
			values: values.map(this.toInvoiceDomain),
			meta: {
				...paginate,
				total,
				nextCursor: null,
			},
		}
	}

	find: IInvoiceRepository['find'] = async ({ sort, ...input }) => {
		const { description, status } = input

		const where: FindOptionsWhere<InvoiceEntity> = {}
		const order: FindOptionsOrder<InvoiceEntity> = {
			...sort,
		}

		if (description) {
			where.description = ILike(`%${description}%`)
		}

		if (status) {
			where.status = status
		}

		const values = await this.repository.find({
			where,
			order,
		})

		return values.map(this.toInvoiceDomain)
	}

	findById: IInvoiceRepository['findById'] = async (invoiceId) => {
		const invoice = await this.repository.findOne({
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
		const data = this.repository.create(input)

		const invoice = await this.repository.save(data)

		return this.toInvoiceDomain(invoice)
	}

	updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
		const invoice = await this.findById(invoiceId)

		await this.repository.update(invoice.state.invoiceId, input)

		return this.findById(invoice.state.invoiceId)
	}

	private toInvoiceDomain(model: InvoiceEntity) {
		return new InvoiceDomain(deepMapDatesToISOString(model))
	}
}
