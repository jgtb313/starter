import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, FindOptionsWhere } from 'typeorm'

import { PaginationService } from '@/support/pagination'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'
import { InvoiceInput } from '@/core/invoice/invoice.schema'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'

@Injectable()
export class InvoiceTypeorm implements IInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
    private readonly paginationService: PaginationService,
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

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map(this.toInvoiceDomain),
      meta,
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
    return new InvoiceDomain({
      ...model,
      issuedAt: model.issuedAt.toISOString(),
      dueDate: model.dueDate.toISOString(),
      paidAt: model.paidAt ? model.paidAt.toISOString() : null,
      canceledAt: model.canceledAt ? model.canceledAt.toISOString() : null,
      createdAt: model.createdAt.toISOString(),
      updatedAt: model.updatedAt.toISOString(),
    } as InvoiceInput)
  }
}
