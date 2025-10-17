import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { OrganizationService } from '@/core/organization/organization.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { OrganizationRepositoryModule } from '@/adapters/database/organization/organization.repository.module'
import type { IOrganizationRepository } from '@/ports/database/organization'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

describe('OrganizationService', () => {
	let service: OrganizationService
	let repository: IOrganizationRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				OrganizationRepositoryModule,
			],
			providers: [
				OrganizationService,
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
			],
		}).compile()

		service = module.get(OrganizationService)
		repository = module.get<IOrganizationRepository>('ORGANIZATION_REPOSITORY')

		// for (const organization of organizationMocks) {
		// 	await repository.create(organization.state)
		// }

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
