import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ObjectLiteral, Repository } from 'typeorm'

import { PaginationService } from './pagination.service'

const mockRepository = {
  findAndCount: vi.fn(),
}

const paginationService = new PaginationService()

describe('PaginationService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return paginated results', async () => {
    mockRepository.findAndCount.mockResolvedValueOnce([[{ id: 1 }, { id: 2 }], 5])

    const result = await paginationService.paginate(mockRepository as unknown as Repository<ObjectLiteral>, {
      where: {},
      offset: 0,
      limit: 2,
    })

    expect(result).toStrictEqual({
      values: [{ id: 1 }, { id: 2 }],
      meta: {
        total: 5,
        offset: 0,
        limit: 2,
      },
    })
  })

  it('should return empty pagination when no items exist', async () => {
    mockRepository.findAndCount.mockResolvedValueOnce([[], 0])

    const result = await paginationService.paginate(mockRepository as unknown as Repository<ObjectLiteral>, {
      where: {},
      offset: 0,
      limit: 2,
    })

    expect(result).toEqual({
      values: [],
      meta: {
        total: 0,
        offset: 0,
        limit: 2,
      },
    })
  })
})
