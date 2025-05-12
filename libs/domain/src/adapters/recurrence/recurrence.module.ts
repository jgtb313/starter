import { Module } from '@nestjs/common'

import { RecurrenceService } from '@/adapters/recurrence/recurrence.service'
import { InMemoryRecurrenceAdapter } from '@/adapters/recurrence/in-memory.recurrence.adapter'

@Module({
  providers: [{ provide: 'Adapter', useClass: InMemoryRecurrenceAdapter }, RecurrenceService],
  exports: [RecurrenceService],
})
export class RecurrenceModule {}
