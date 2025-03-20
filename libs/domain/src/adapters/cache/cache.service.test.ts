import { describe, it, expect, vi, beforeEach, afterEach, Mocked } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'

import { ICache } from '@/ports/cache'
import { CacheService } from './cache.service'

describe('CacheService', () => {
  let cacheService: CacheService

  const mockCache = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
  } as Mocked<ICache>

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: 'Cache',
          useValue: mockCache,
        },
      ],
    }).compile()

    cacheService = testingModule.get(CacheService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(cacheService).toBeDefined()
  })

  describe('get', () => {
    it('should call get with correct key', async () => {
      mockCache.get.mockResolvedValueOnce('cachedValue')

      const result = await cacheService.get('testKey')

      expect(mockCache.get).toHaveBeenCalledWith('testKey')
      expect(result).toBe('cachedValue')
    })
  })

  describe('set', () => {
    it('should call set with correct parameters', async () => {
      await cacheService.set('testKey', 'testValue', { expiresIn: 60 })

      expect(mockCache.set).toHaveBeenCalledWith('testKey', 'testValue', { expiresIn: 60 })
    })
  })

  describe('del', () => {
    it('should call del with correct key', async () => {
      await cacheService.del('testKey')

      expect(mockCache.del).toHaveBeenCalledWith('testKey')
    })
  })
})
