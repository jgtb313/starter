import { Module } from '@nestjs/common'
import { CacheModule } from '@starter/domain'

import { LambdaExampleService } from './lambda-example.service'

@Module({
  imports: [CacheModule],
  providers: [LambdaExampleService],
})
export class AppModule {}
