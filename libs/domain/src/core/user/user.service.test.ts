import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RoleService } from '@/core/role/role.service'
import { UserService } from '@/core/user/user.service'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { UserRepositoryModule } from '@/adapters/database/user/user.repository.module'
import { EncryptModule } from '@/adapters/encrypt'
import { LoggerModule } from '@/adapters/logger'
import type { IUserRepository } from '@/ports/database/user'
import { I18nDomainModule } from '@/domain.i18n.module'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const roleServiceMock = {
	validateRoleIdsByOrganizationId: vi.fn(),
}

describe('UserService', () => {
	let service: UserService
	let repository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				InMemoryDatabaseModule.register(),
				I18nDomainModule,
				LoggerModule,
				UserRepositoryModule,
			],
			providers: [
				UserService,
				EncryptModule,
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
				{
					provide: RoleService,
					useValue: roleServiceMock,
				},
			],
		}).compile()

		service = module.get(UserService)
		repository = module.get<IUserRepository>('USER_REPOSITORY')

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
