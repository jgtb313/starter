import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SQS } from '@aws-sdk/client-sqs'

import { AWSSQSAdapter } from '@/adapters/publisher/aws-sqs.adapter'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SQS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const region = configService.get<string>('AWS_SQS_REGION')!

        return new SQS({ region })
      },
      inject: [ConfigService],
    },
    {
      provide: AWSSQSAdapter,
      useFactory: (client: SQS) => new AWSSQSAdapter(client),
      inject: ['SQS_CLIENT'],
    },
  ],
  exports: [AWSSQSAdapter],
})
export class AWSSQSAdapterModule {}
