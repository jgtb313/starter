import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { PermissionService } from '@/core/permission/permission.service'
import { DomainTestModule } from '@/domain.test.module'

describe('PermissionService', () => {
	let service: PermissionService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				PermissionService,
			],
		}).compile()

		service = module.get(PermissionService)

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
