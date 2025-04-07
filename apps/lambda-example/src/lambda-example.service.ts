import { Injectable } from '@nestjs/common'
import { IServerlessService } from '@starter/nestjs-serverless-hoisting'
import { CacheService } from '@starter/domain'

export type Service = IServerlessService<{ abc: string }, { abc: string }>

@Injectable()
export class LambdaExampleService implements Service {
  constructor(private readonly cacheService: CacheService) {}

  async execute() {
    return {
      abc: '123',
    }
  }
}
