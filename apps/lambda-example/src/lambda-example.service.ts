import { Injectable } from '@nestjs/common'
import { IServerlessService } from '@starter/nestjs-serverless-hoisting'

export type Service = IServerlessService<{}, {}>

@Injectable()
export class LambdaExampleService implements Service {
  execute: Service['execute'] = () => {
    return {}
  }
}
