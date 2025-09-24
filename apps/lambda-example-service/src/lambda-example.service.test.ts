import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { LambdaExampleService } from './lambda-example.service'
import { LambdaExampleServiceModule } from './lambda-example.service.module'

describe('LambdaExampleService', () => {
	let service: LambdaExampleService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				LambdaExampleServiceModule,
			],
			providers: [
				LambdaExampleService,
			],
		}).compile()

		service = module.get(LambdaExampleService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return 10', async () => {
		const result = await service.execute()

		expect(result).toBe(10)
	})
})
