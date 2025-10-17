import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PlanService } from '@/core/plan/plan.service'
import { SubscriptionService } from '@/core/subscription/subscription.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { SubscriptionRepositoryModule } from '@/adapters/database/subscription/subscription.repository.module'
import { RecurrenceService } from '@/adapters/recurrence'
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

describe('SubscriptionService', () => {
	let service: SubscriptionService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				SubscriptionRepositoryModule,
			],
			providers: [
				SubscriptionService,
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
