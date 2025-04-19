import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { PaginationService } from '@/support/pagination'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { Invoice } from '@/core/invoice/invoice.schema'
import { InvoiceDomain } from '@/core/invoice/invoice.domain'

@Injectable()
export class InvoiceTypeorm implements IInvoiceRepository {
  private readonly repository: Repository<InvoiceEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(InvoiceEntity)
  }

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
      values: values.map((invoice) => new InvoiceDomain(invoice as Invoice)),
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

    return values.map((invoice) => new InvoiceDomain(invoice as Invoice))
  }

  findById: IInvoiceRepository['findById'] = async (invoiceId) => {
    const invoice = await this.repository.findOne({ where: { invoiceId } })

    if (!invoice) {
      throw new NotFoundException(`Invoice ${invoiceId} not found`)
    }

    return new InvoiceDomain(invoice as Invoice)
  }

  findOne: IInvoiceRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<InvoiceEntity>

    const invoice = await this.repository.findOne({ where })

    if (!invoice) {
      return null
    }

    return new InvoiceDomain(invoice as Invoice)
  }

  create: IInvoiceRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const invoice = await this.repository.save(data)

    return new InvoiceDomain(invoice as Invoice)
  }

  updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
    const invoice = await this.findById(invoiceId)

    await this.repository.update(invoice.state.invoiceId, input)

    return this.findById(invoice.state.invoiceId)
  }
}
