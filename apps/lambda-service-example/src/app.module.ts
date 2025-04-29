import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule, UserServiceModule, CacheModule, NotificationModule } from '@starter/domain'

import { LambdaExampleService } from './lambda-example.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule.register({
      migrationsRun: false,
    }),

    UserServiceModule,
    CacheModule,
    NotificationModule,
  ],
  providers: [LambdaExampleService],
})
export class AppModule {}
