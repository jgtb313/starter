import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { InvoiceSchema } from '@/schemas'
import { PaginationService } from '@/support/pagination'
import { IInvoiceRepository } from '@/ports/database/invoice'
import { InvoiceEntity } from './invoice.typeorm.entity'

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
      values: values.map((invoice) => InvoiceSchema.parse(invoice)),
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

    return values.map((invoice) => InvoiceSchema.parse(invoice))
  }

  findById: IInvoiceRepository['findById'] = async (invoiceId) => {
    const model = await this.repository.findOne({ where: { invoiceId } })

    if (!model) {
      throw new NotFoundException(`Invoice ${invoiceId} not found`)
    }

    return InvoiceSchema.parse(model)
  }

  findOne: IInvoiceRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<InvoiceEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return InvoiceSchema.parse(model)
  }

  create: IInvoiceRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return InvoiceSchema.parse(model)
  }

  updateById: IInvoiceRepository['updateById'] = async (invoiceId, input) => {
    const model = await this.findById(invoiceId)

    await this.repository.update(model.invoiceId, input)

    return this.findById(model.invoiceId)
  }
}
