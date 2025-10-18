import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { OrganizationService } from '@/core/organization/organization.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IOrganizationRepository } from '@/ports/database/organization'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const mockOrganizationRepository: Mocked<IOrganizationRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
	deleteById: vi.fn(),
	validateIds: vi.fn(),
}

describe('OrganizationService', () => {
	let service: OrganizationService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				OrganizationService,
				{
					provide: 'ORGANIZATION_REPOSITORY',
					useValue: mockOrganizationRepository,
				},
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
			],
		}).compile()

		service = module.get(OrganizationService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
