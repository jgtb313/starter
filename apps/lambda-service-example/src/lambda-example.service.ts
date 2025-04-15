import { Injectable } from '@nestjs/common'
import { IServerlessService } from '@starter/nestjs-serverless-hoisting'
import { CacheService, UserService } from '@starter/domain'

export type Service = IServerlessService<{}, number>

@Injectable()
export class LambdaExampleService implements Service {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  async execute() {
    return 10
  }
}
