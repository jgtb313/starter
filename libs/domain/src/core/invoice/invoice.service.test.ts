import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { IInvoiceRepository } from '@/ports/database/invoice'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { invoiceMocks } from '@/core/invoice/invoice.mock'

class InvoiceInMemoryRepository {}

describe('InvoiceDomain', () => {
  let service: InvoiceService
  let invoiceRepository: IInvoiceRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: 'INVOICE_REPOSITORY',
          useClass: InvoiceInMemoryRepository,
        },
      ],
    }).compile()

    service = module.get(InvoiceService)
    invoiceRepository = module.get<IInvoiceRepository>('INVOICE_REPOSITORY')

    for (const invoice of invoiceMocks) {
      invoiceRepository.create(invoice.state)
    }

    vi.clearAllMocks()
  })

  it('should define service correctly', () => {
    expect(service).toBeDefined()
  })
})
