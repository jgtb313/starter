import { Global, Module } from '@nestjs/common'

import {
	LoggerService,
	LoggerServiceSymbol,
} from '@/adapters/logger/logger.service'
import { PinoESAdapter } from '@/adapters/logger/pino-es.adapter'
import { PinoESModule } from '@/adapters/logger/pino-es.adapter.module'

@Global()
@Module({
	imports: [
		PinoESModule,
	],
	providers: [
		{
			provide: LoggerServiceSymbol,
			useClass: PinoESAdapter,
		},
		LoggerService,
	],
	exports: [
		LoggerService,
	],
})
export class LoggerModule {}
