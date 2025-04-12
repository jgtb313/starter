import { Module } from '@nestjs/common'

import { LambdaExampleService } from './lambda-example.service'

@Module({
  providers: [LambdaExampleService],
})
export class AppModule {}
