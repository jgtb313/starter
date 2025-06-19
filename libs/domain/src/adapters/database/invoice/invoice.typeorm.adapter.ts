import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, FindOptionsWhere, DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PaginationSchemaTransform } from '@starter/schema'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { Invoice, BaseInvoice } from '@/core/invoice/invoice.schema'

@Injectable()
export class InvoiceTypeorm implements IInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
  ) {}

  findAllPaginated: IInvoiceRepository['findAllPaginated'] = async ({ offset, limit, ...input }) => {
    const { description, status } = input

    const where: FindOptionsWhere<InvoiceEntity> = {}

    if (description) {
      where.description = ILike(`%${description}%`)
    }

    if (status) {
      where.status = status
    }

    const paginate = PaginationSchemaTransform.parse({ offset, limit })

    const skip = paginate.offset
    const take = paginate.limit

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values: values.map(this.toInvoiceDomain),
      meta: {
        ...paginate,
        total,
      },
    }
  }

  findAll: IInvoiceRepository['findAll'] = async (input) => {
    const { description, status } = input

    const where: FindOptionsWhere<InvoiceEntity> = {}

    if (description) {
      where.description = ILike(`%${description}%`)
    }

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map(this.toInvoiceDomain)
  }

  findById: IInvoiceRepository['findById'] = async (invoiceId) => {
    const invoice = await this.repository.findOne({ where: { invoiceId } })

    if (!invoice) {
      throw new NotFoundException(`Invoice ${invoiceId} not found`)
    }

    return this.toInvoiceDomain(invoice)
  }

  create: IInvoiceRepository['create'] = async (input) => {
    const data = this.repository.create(this.toInvoiceEntity(input))

    const invoice = await this.repository.save(data)

    return this.toInvoiceDomain(invoice)
  }

  updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
    const invoice = await this.findById(invoiceId)

    await this.repository.update(invoice.state.invoiceId, this.toPartialInvoiceEntity(input))

    return this.findById(invoice.state.invoiceId)
  }

  private toInvoiceEntity(invoice: BaseInvoice): DeepPartial<InvoiceEntity> {
    return {
      ...invoice,
    }
  }

  private toPartialInvoiceEntity(invoice: Partial<Invoice>): QueryDeepPartialEntity<InvoiceEntity> {
    return {
      ...invoice,
    }
  }

  private toInvoiceDomain(model: InvoiceEntity) {
    return new InvoiceDomain(deepMapDatesToISOString(model))
  }
}
