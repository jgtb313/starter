import { Injectable, Inject } from '@nestjs/common'
import { Pagination } from '@starter/schema'

import { Invoice, BaseInvoice } from '@/schemas'
import { IInvoiceRepository } from '@/ports/database/invoice'

@Injectable()
export class InvoiceService {
  constructor(@Inject('INVOICE_REPOSITORY') private readonly invoiceRepository: IInvoiceRepository) {}

  async getPaginatedInvoices(input: Pagination<Invoice>) {
    const result = await this.invoiceRepository.findPaginated(input)

    return result
  }

  async getInvoice(invoiceId: string) {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    return invoice
  }

  async createInvoice(input: BaseInvoice) {
    const invoice = await this.invoiceRepository.create(input)

    return invoice
  }

  async updateInvoice(invoiceId: string, input: Partial<Invoice>) {
    const invoice = await this.invoiceRepository.findById(invoiceId)

    const result = await this.invoiceRepository.updateById(invoice.invoiceId, input)

    return result
  }
}
