import { Injectable, Inject } from '@nestjs/common'
import { Pagination } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'
import { IInvoiceRepository } from '@/ports/database/invoice'

@Injectable()
export class InvoiceService {
  constructor(@Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository) {}

  async findAll(input: Pagination<Invoice>) {
    const result = await this.invoiceRepository.findAll(input)

    return result
  }

  async findById(invoiceId: string) {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    return invoice
  }

  async findOne(input: Partial<Invoice>) {
    const invoice = await this.invoiceRepository.findOne(input)

    return invoice
  }

  async create(input: BaseInvoice) {
    const invoice = await this.invoiceRepository.create(input)

    return invoice
  }

  async updateById(invoiceId: string, input: Partial<Invoice>) {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    const result = await this.invoiceRepository.updateById(invoice.invoiceId, input)

    return result
  }

  async deleteById(invoiceId: string) {
    await this.invoiceRepository.deleteById(invoiceId)
  }
}
