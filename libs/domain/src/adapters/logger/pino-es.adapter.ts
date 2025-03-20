import { Injectable, Inject } from '@nestjs/common'
import { Logger as Pino } from 'pino'

import { ILoggerAdapter } from '@/ports/logger'

@Injectable()
export class PinoESAdapter implements ILoggerAdapter {
  constructor(@Inject('PINO_ES_CLIENT') private readonly client: Pino | undefined) {}

  info: ILoggerAdapter['info'] = async (message, event) => {
    if (!this.client) {
      return
    }

    await this.client.info({ message, event })
  }

  warn: ILoggerAdapter['warn'] = async (message, event) => {
    if (!this.client) {
      return
    }

    await this.client.warn({ message, event })
  }

  error: ILoggerAdapter['error'] = async (message, event) => {
    if (!this.client) {
      return
    }

    await this.client.error({ message, event })
  }
}
