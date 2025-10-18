import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { PlanService } from '@/core/plan/plan.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { RecurrenceService } from '@/adapters/recurrence'
import type { ISubscriptionRepository } from '@/ports/database/subscription'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const planServiceMock = {
	getPlan: vi.fn(),
}

const recurrenceServiceMock = {
	createPlan: vi.fn(),
	updatePlan: vi.fn(),
	cancelPlan: vi.fn(),
}

const mockSubscriptionRepository: Mocked<ISubscriptionRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
}

describe('SubscriptionService', () => {
	let service: SubscriptionService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				SubscriptionService,
				{
					provide: 'SUBSCRIPTION_REPOSITORY',
					useValue: mockSubscriptionRepository,
				},
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
				{
					provide: PlanService,
					useValue: planServiceMock,
				},
				{
					provide: RecurrenceService,
					useValue: recurrenceServiceMock,
				},
			],
		}).compile()

		service = module.get(SubscriptionService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
