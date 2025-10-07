import { ConsoleLogger, Inject, Injectable } from '@nestjs/common'

import type { ILoggerAdapter } from '@/adapters/logger/logger.adapter'
import type { ILogger } from '@/ports/logger'

export const LoggerServiceSymbol = Symbol('LoggerService')

@Injectable()
export class LoggerService implements ILogger {
	private readonly consoleLogger: ConsoleLogger

	constructor(
		@Inject(LoggerServiceSymbol) private readonly logger: ILoggerAdapter,
	) {
		this.consoleLogger = new ConsoleLogger()
	}

	info: ILogger['info'] = (message, event) => {
		this.consoleLogger.log(message, this.getContext())

		return this.logger.info(message, event)
	}

	warn: ILogger['warn'] = (message, event) => {
		this.consoleLogger.warn(message, this.getContext())

		return this.logger.warn(message, event)
	}

	error: ILogger['error'] = (message, event) => {
		this.consoleLogger.error(message, this.getContext())

		return this.logger.error(message, event)
	}

	private getContext() {
		const stack = new Error().stack?.split('\n')

		if (!stack) {
			return 'Unknown'
		}

		const callerLine = stack[3] || 'Unknown'
		const match = callerLine.match(/at (\w+)\./)

		return match ? match[1] : 'Unknown'
	}
}
