import { Injectable } from '@nestjs/common'
import { IServerlessService } from '@starter/nestjs-serverless-hoisting'

export type Service = IServerlessService<{}, number>

@Injectable()
export class LambdaExampleService implements Service {
  constructor() {}

  async execute() {
    return 10
  }
}
