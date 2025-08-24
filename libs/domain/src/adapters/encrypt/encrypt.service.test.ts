import { Test, type TestingModule } from '@nestjs/testing'
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type Mocked,
	vi,
} from 'vitest'

import { EncryptService } from './encrypt.service'

import type { IEncrypt } from '@/ports/encrypt'

describe('EncryptService', () => {
	let encryptService: EncryptService

	const mockEncrypt = {
		hash: vi.fn(),
		compare: vi.fn(),
	} as Mocked<IEncrypt>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EncryptService,
				{
					provide: 'Encrypt',
					useValue: mockEncrypt,
				},
			],
		}).compile()

		encryptService = module.get(EncryptService)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(encryptService).toBeDefined()
	})

	describe('hash', () => {
		it('should call hash with correct plainText', async () => {
			mockEncrypt.hash.mockResolvedValue('hashedValue')

			const result = await encryptService.hash('testPassword')

			expect(mockEncrypt.hash).toHaveBeenCalledWith('testPassword')
			expect(result).toBe('hashedValue')
		})
	})

	describe('compare', () => {
		it('should call compare with correct values', async () => {
			mockEncrypt.compare.mockResolvedValue(true)

			const result = await encryptService.compare('testPassword', 'hashedValue')

			expect(mockEncrypt.compare).toHaveBeenCalledWith(
				'testPassword',
				'hashedValue',
			)
			expect(result).toBe(true)
		})
	})
})
