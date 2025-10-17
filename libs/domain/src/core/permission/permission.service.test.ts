import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PermissionService } from '@/core/permission/permission.service'
import { PermissionRepositoryModule } from '@/adapters/database/permission/permission.repository.module'
import type { IPermissionRepository } from '@/ports/database/permission'
import { DomainTestModule } from '@/domain.test.module'

describe('PermissionService', () => {
	let service: PermissionService
	let repository: IPermissionRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				PermissionRepositoryModule,
			],
			providers: [
				PermissionService,
			],
		}).compile()

		service = module.get(PermissionService)
		repository = module.get<IPermissionRepository>('PERMISSION_REPOSITORY')

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
