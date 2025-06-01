import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NotificationModule } from '@starter/domain'

import { LambdaExampleService } from './lambda-example.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    NotificationModule,
  ],

  providers: [LambdaExampleService],
})
export class AppModule {}
