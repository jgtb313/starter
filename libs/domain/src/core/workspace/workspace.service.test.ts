import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { PlanService } from '@/core/plan/plan.service'
import { UserService } from '@/core/user/user.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { PublisherService } from '@/adapters/publisher/publisher.service'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { DomainTestModule } from '@/domain.test.module'

const userServiceMock = {
	getUser: vi.fn(),
}

const planServiceMock = {
	getPlan: vi.fn(),
}

const publisherServiceMock = {
	publish: vi.fn(),
}

const mockWorkspaceRepository: Mocked<IWorkspaceRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
	deleteById: vi.fn(),
	upsertAddress: vi.fn(),
	deleteAddress: vi.fn(),
}

describe('WorkspaceService', () => {
	let service: WorkspaceService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				WorkspaceService,
				{
					provide: 'WORKSPACE_REPOSITORY',
					useValue: mockWorkspaceRepository,
				},
				{
					provide: UserService,
					useValue: userServiceMock,
				},
				{
					provide: PublisherService,
					useValue: publisherServiceMock,
				},
				{
					provide: PlanService,
					useValue: planServiceMock,
				},
			],
		}).compile()

		service = module.get(WorkspaceService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
