import { Module } from '@nestjs/common'

import { InMemoryRecurrenceAdapter } from '@/adapters/recurrence/in-memory.recurrence.adapter'
import {
	RecurrenceService,
	RecurrenceServiceSymbol,
} from '@/adapters/recurrence/recurrence.service'

@Module({
	providers: [
		{
			provide: RecurrenceServiceSymbol,
			useClass: InMemoryRecurrenceAdapter,
		},
		RecurrenceService,
	],
	exports: [
		RecurrenceService,
	],
})
export class RecurrenceModule {}
