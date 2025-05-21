import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { IInvoiceRepository } from '@/ports/database/invoice'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { InvoiceRepositoryModule } from '@/adapters/database/invoice/invoice.repository.module'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { InvoiceService } from '@/core/invoice/invoice.service'
import { invoiceMocks } from '@/core/invoice/invoice.mock'

describe('InvoiceDomain', () => {
  let service: InvoiceService
  let invoiceRepository: IInvoiceRepository

  const workspaceServiceMock = {
    getWorkspace: vi.fn(),
  }

  const subscriptionServiceMock = {
    getSubscription: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDatabaseModule.register(), InvoiceRepositoryModule],
      providers: [
        InvoiceService,
        {
          provide: WorkspaceService,
          useValue: workspaceServiceMock,
        },
        {
          provide: SubscriptionService,
          useValue: subscriptionServiceMock,
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
