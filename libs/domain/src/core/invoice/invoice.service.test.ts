import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InvoiceService } from '@/core/invoice/invoice.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InvoiceRepositoryModule } from '@/adapters/database/invoice/invoice.repository.module'
import type { IInvoiceRepository } from '@/ports/database/invoice/invoice.repository'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const subscriptionServiceMock = {
	getSubscription: vi.fn(),
}

describe('InvoiceService', () => {
	let service: InvoiceService
	let repository: IInvoiceRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				InvoiceRepositoryModule,
			],
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
		repository = module.get<IInvoiceRepository>('INVOICE_REPOSITORY')

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
