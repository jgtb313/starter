import { Module, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('StripeClient')

        const STAGE = configService.get<string>('STAGE')
        const STRIPE_API_KEY = configService.get<string>('STRIPE_API_KEY')

        if (!STRIPE_API_KEY) {
          throw new Error('Missing STRIPE_API_KEY')
        }

        const client = new Stripe(STRIPE_API_KEY, {
          apiVersion: '2025-03-31.basil',
        })

        logger.log(`Stripe client initialized [stage: ${STAGE}].`)

        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE_CLIENT'],
})
export class StripeAdapterModule {}
