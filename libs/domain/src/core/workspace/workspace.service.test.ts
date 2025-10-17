import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { UserService } from '@/core/user/user.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { WorkspaceRepositoryModule } from '@/adapters/database/workspace/workspace.repository.module'
import { PublisherService } from '@/adapters/publisher/publisher.service'
import type { IWorkspaceRepository } from '@/ports/database/workspace'
import { DomainTestModule } from '@/domain.test.module'

const userServiceMock = {
	getUser: vi.fn(),
}

const publisherServiceMock = {
	publish: vi.fn(),
}

describe('WorkspaceService', () => {
	let service: WorkspaceService
	let repository: IWorkspaceRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				WorkspaceRepositoryModule,
			],
			providers: [
				WorkspaceService,
				{
					provide: UserService,
					useValue: userServiceMock,
				},
				{
					provide: PublisherService,
					useValue: publisherServiceMock,
				},
			],
		}).compile()

		service = module.get(WorkspaceService)
		repository = module.get<IWorkspaceRepository>('WORKSPACE_REPOSITORY')

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
