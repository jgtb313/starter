import { describe, it, expect, beforeEach } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'

import { LambdaExampleService } from './lambda-example.service'

describe('LambdaExampleService', () => {
  let service: LambdaExampleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LambdaExampleService],
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
