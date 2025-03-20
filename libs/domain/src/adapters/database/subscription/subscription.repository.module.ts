import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { SubscriptionTypeorm } from './subscription.typeorm.adapter'
import { SubscriptionEntity } from './subscription.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity]), PaginationModule],
  providers: [
    {
      provide: 'SUBSCRIPTION_REPOSITORY',
      useClass: SubscriptionTypeorm,
    },
  ],
  exports: ['SUBSCRIPTION_REPOSITORY'],
})
export class SubscriptionRepositoryModule {}
