import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { InvoiceService } from '@/core/invoice/invoice.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IInvoiceRepository } from '@/ports/database/invoice'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const subscriptionServiceMock = {
	getSubscription: vi.fn(),
}

const mockInvoiceRepository: Mocked<IInvoiceRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
}

describe('InvoiceService', () => {
	let service: InvoiceService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				InvoiceService,
				{
					provide: 'INVOICE_REPOSITORY',
					useValue: mockInvoiceRepository,
				},
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

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
