import { Injectable } from '@nestjs/common'
import { IServerlessService } from '@starter/nestjs-serverless-hoisting'
import { CacheService, NotificationService, UserService } from '@starter/domain'

export type Service = IServerlessService<{}, number>

@Injectable()
export class LambdaExampleService implements Service {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async execute() {
    await this.notificationService.send('EMAIL', { template: 'WELCOME', recipient: 'jgtb313@gmail.com', props: { message: 'Welcome...' } })
    return 10
  }
}
