import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { userMocks } from '@/core/user/user.mock'
import { UserService } from '@/core/user/user.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { UserRepositoryModule } from '@/adapters/database/user/user.repository.module'
import { EncryptModule } from '@/adapters/encrypt/encrypt.module'
import type { IUserRepository } from '@/ports/database/user/user.repository.port'
import { DomainTestModule } from '@/domain.test.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

describe('UserService', () => {
	let service: UserService
	let repository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				UserRepositoryModule,
				EncryptModule,
			],
			providers: [
				UserService,
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
			],
		}).compile()

		service = module.get(UserService)
		repository = module.get<IUserRepository>('USER_REPOSITORY')

		for (const user of userMocks) {
			await repository.create(user.state)
		}

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
