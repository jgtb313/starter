import { Module } from '@nestjs/common'
import { DatabaseModule, UserServiceModule, CacheModule } from '@starter/domain'

import { LambdaExampleService } from './lambda-example.service'

@Module({
  imports: [
    DatabaseModule.register({
      migrationsRun: false,
    }),

    UserServiceModule,
    CacheModule,
  ],
  providers: [LambdaExampleService],
})
export class AppModule {}
