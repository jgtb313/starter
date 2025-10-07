import { Inject, Injectable } from '@nestjs/common'
import type { Logger as Pino } from 'pino'

import type { ILoggerAdapter } from '@/adapters/logger/logger.adapter'

import { PinoESSymbol } from './pino-es.adapter.module'

@Injectable()
export class PinoESAdapter implements ILoggerAdapter {
	constructor(
		@Inject(PinoESSymbol) private readonly client: Pino | undefined,
	) {}

	info: ILoggerAdapter['info'] = async (message, event) => {
		if (!this.client) {
			return
		}

		await this.client.info({
			message,
			event,
		})
	}

	warn: ILoggerAdapter['warn'] = async (message, event) => {
		if (!this.client) {
			return
		}

		await this.client.warn({
			message,
			event,
		})
	}

	error: ILoggerAdapter['error'] = async (message, event) => {
		if (!this.client) {
			return
		}

		await this.client.error({
			message,
			event,
		})
	}
}
