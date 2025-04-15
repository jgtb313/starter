import { Module } from '@nestjs/common'

import { PlanRepositoryModule } from '@/adapters/database/plan'
import { PlanService } from '@/core/plan/plan.service'

@Module({
  imports: [PlanRepositoryModule],
  providers: [
    {
      provide: 'PLAN_SERVICE',
      useClass: PlanService,
    },
  ],
  exports: ['PLAN_SERVICE'],
})
export class PlanServiceModule {}
