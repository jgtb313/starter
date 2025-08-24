import { Module } from '@nestjs/common'

import { InMemoryRecurrenceAdapter } from '@/adapters/recurrence/in-memory.recurrence.adapter'
import { RecurrenceService } from '@/adapters/recurrence/recurrence.service'

@Module({
	providers: [
		{
			provide: 'Recurrence',
			useClass: InMemoryRecurrenceAdapter,
		},
		RecurrenceService,
	],
	exports: [
		RecurrenceService,
	],
})
export class RecurrenceModule {}
