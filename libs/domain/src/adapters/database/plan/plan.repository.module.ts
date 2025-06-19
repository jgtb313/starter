import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlanTypeorm } from '@/adapters/database/plan/plan.typeorm.adapter'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [
    {
      provide: 'PLAN_REPOSITORY',
      useClass: PlanTypeorm,
    },
  ],
  exports: ['PLAN_REPOSITORY'],
})
export class PlanRepositoryModule {}
