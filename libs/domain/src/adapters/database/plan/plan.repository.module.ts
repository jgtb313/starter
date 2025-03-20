import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PaginationModule } from '@/support/pagination'
import { PlanTypeorm } from './plan.typeorm.adapter'
import { PlanEntity } from './plan.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity]), PaginationModule],
  providers: [
    {
      provide: 'PLAN_REPOSITORY',
      useClass: PlanTypeorm,
    },
  ],
  exports: ['PLAN_REPOSITORY'],
})
export class PlanRepositoryModule {}
