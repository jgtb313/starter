import { Module } from '@nestjs/common'

import { LoggerService } from '@/adapters/logger/logger.service'
import { PinoESAdapter } from '@/adapters/logger/pino-es.adapter'
import { PinoESModule } from '@/adapters/logger/pino-es.adapter.module'

@Module({
	imports: [
		PinoESModule,
	],
	providers: [
		{
			provide: 'Logger',
			useClass: PinoESAdapter,
		},
		LoggerService,
	],
	exports: [
		LoggerService,
	],
})
export class LoggerModule {}
