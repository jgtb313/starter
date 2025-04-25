import { Module } from '@nestjs/common'

import { RecurrenceService } from '@/adapters/recurrence/recurrence.service'
import { StripeAdapterModule } from '@/adapters/recurrence/stripe.recurrence.adapter.module'
import { StripeRecurrenceAdapter } from '@/adapters/recurrence/stripe.recurrence.adapter'

@Module({
  imports: [StripeAdapterModule],
  providers: [{ provide: 'Stripe', useClass: StripeRecurrenceAdapter }, RecurrenceService],
  exports: [RecurrenceService],
})
export class RecurrenceModule {}
