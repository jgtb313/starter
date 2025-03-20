import { Module } from '@nestjs/common'

import { PlanRepositoryModule } from '@/adapters/database/plan'
import { PlanService } from './plan.service'

@Module({
  imports: [PlanRepositoryModule],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanServiceModule {}
