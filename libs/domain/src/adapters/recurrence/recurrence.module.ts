import { Module } from '@nestjs/common'

import { InMemoryRecurrenceAdapter } from '@/adapters/recurrence/in-memory.recurrence.adapter'
import { RecurrenceService } from '@/adapters/recurrence/recurrence.service'

export const RecurrenceSymbol = Symbol('Recurrence')

@Module({
	providers: [
		{
			provide: RecurrenceSymbol,
			useClass: InMemoryRecurrenceAdapter,
		},
		RecurrenceService,
	],
	exports: [
		RecurrenceService,
	],
})
export class RecurrenceModule {}
