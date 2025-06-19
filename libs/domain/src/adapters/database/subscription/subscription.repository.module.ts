import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SubscriptionTypeorm } from '@/adapters/database/subscription/subscription.typeorm.adapter'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    {
      provide: 'SUBSCRIPTION_REPOSITORY',
      useClass: SubscriptionTypeorm,
    },
  ],
  exports: ['SUBSCRIPTION_REPOSITORY'],
})
export class SubscriptionRepositoryModule {}
