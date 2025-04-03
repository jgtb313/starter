import { Module } from '@nestjs/common'

import { RecurrenceService } from '@/adapters/recurrence'

@Module({
  providers: [RecurrenceService],
  exports: [RecurrenceService],
})
export class RecurrenceModule {}
