import { Module } from '@nestjs/common'

import { StripeRecurrenceAdapter } from '@/adapters/recurrence/stripe.recurrence.adapter'
import { RecurrenceService } from '@/adapters/recurrence/recurrence.service'

@Module({
  providers: [RecurrenceService, StripeRecurrenceAdapter],
  exports: [RecurrenceService],
})
export class RecurrenceModule {}
