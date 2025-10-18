import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { UserService } from '@/core/user/user.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { EncryptModule } from '@/adapters/encrypt/encrypt.module'
import type { IUserRepository } from '@/ports/database/user/user.repository.port'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const mockUserRepository: Mocked<IUserRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	findByEmail: vi.fn(),
	findByPhone: vi.fn(),
	findBySocial: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
	deleteById: vi.fn(),
	attachOrganization: vi.fn(),
	attachManyOrganizations: vi.fn(),
	detachOrganization: vi.fn(),
	detachManyOrganizations: vi.fn(),
	findPermissions: vi.fn(),
	attachPermission: vi.fn(),
	attachManyPermissions: vi.fn(),
	detachPermission: vi.fn(),
	detachManyPermissions: vi.fn(),
	createAddress: vi.fn(),
	updateAddressById: vi.fn(),
	deleteAddressById: vi.fn(),
}

describe('UserService', () => {
	let service: UserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				EncryptModule,
			],
			providers: [
				UserService,
				{
					provide: 'USER_REPOSITORY',
					useValue: mockUserRepository,
				},
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
			],
		}).compile()

		service = module.get(UserService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
