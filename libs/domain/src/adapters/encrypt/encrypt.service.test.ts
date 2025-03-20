import { describe, it, expect, vi, beforeEach, afterEach, Mocked } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'

import { IEncrypt } from '@/ports/encrypt'
import { EncryptService } from './encrypt.service'

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

      expect(mockEncrypt.compare).toHaveBeenCalledWith('testPassword', 'hashedValue')
      expect(result).toBe(true)
    })
  })
})
