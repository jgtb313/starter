import { Test, type TestingModule } from '@nestjs/testing'
import { CacheService } from '@starter/domain'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LambdaExampleService } from './lambda-example.service'

describe('LambdaExampleService', () => {
	let service: LambdaExampleService
	let cacheService: CacheService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LambdaExampleService,
				{
					provide: CacheService,
					useValue: {
						get: vi.fn(),
						set: vi.fn(),
					},
				},
			],
		}).compile()

		service = module.get(LambdaExampleService)
		cacheService = module.get(CacheService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return 10', async () => {
		const result = await service.execute()

		expect(result).toBe(10)
	})
})
