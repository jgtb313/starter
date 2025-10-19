import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { PlanService } from '@/core/plan/plan.service'
import { RecurrenceService } from '@/adapters/recurrence'
import type { IPlanRepository } from '@/ports/database/plan'
import { DomainTestModule } from '@/domain.test.module'

const recurrenceServiceMock = {
	createPlan: vi.fn(),
	updatePlan: vi.fn(),
	cancelPlan: vi.fn(),
}

const mockPlanRepository: Mocked<IPlanRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	findDefault: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
	deleteById: vi.fn(),
}

describe('PlanService', () => {
	let service: PlanService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				PlanService,
				{
					provide: 'PLAN_REPOSITORY',
					useValue: mockPlanRepository,
				},
				{
					provide: RecurrenceService,
					useValue: recurrenceServiceMock,
				},
			],
		}).compile()

		service = module.get(PlanService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
