import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import type { ILogger } from '@/ports/logger'

import { LoggerSymbol } from './logger.module'
import { LoggerService } from './logger.service'

describe('LoggerService', () => {
	let loggerService: LoggerService

	const mockerLogger = {
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	} as Mocked<ILogger>

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LoggerService,
				{
					provide: LoggerSymbol,
					useValue: mockerLogger,
				},
			],
		}).compile()

		loggerService = module.get<LoggerService>(LoggerService)
	})

	it('should be defined', () => {
		expect(loggerService).toBeDefined()
	})

	describe('info', () => {
		it('should call info with correct parameters', () => {
			loggerService.info('Test message', 'TestEvent')

			expect(mockerLogger.info).toHaveBeenCalledWith(
				'Test message',
				'TestEvent',
			)
		})
	})

	describe('warn', () => {
		it('should call warn with correct parameters', () => {
			loggerService.warn('Warning message', 'WarningEvent')

			expect(mockerLogger.warn).toHaveBeenCalledWith(
				'Warning message',
				'WarningEvent',
			)
		})
	})

	describe('error', () => {
		it('should call error with correct parameters', () => {
			loggerService.error('Error message', 'ErrorEvent')

			expect(mockerLogger.error).toHaveBeenCalledWith(
				'Error message',
				'ErrorEvent',
			)
		})
	})
})
