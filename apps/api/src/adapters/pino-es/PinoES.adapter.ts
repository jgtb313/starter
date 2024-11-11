import pino, { Logger as Pino } from 'pino'
import pinoES from 'pino-elasticsearch'

import { env } from '@/config'
import { InternalServerError } from '@/support/errors'
import { ILogger } from '@/ports/logger'

const LOGGER_URL = env('LOGGER_URL')
const LOGGER_USER = env('LOGGER_USER')
const LOGGER_PASSWORD = env('LOGGER_PASSWORD')
const LOGGER_DISABLED = env('LOGGER_DISABLED') === 'true'

let client: Pino | undefined

const getClient = (): Pino => {
  if (!client) {
    throw new InternalServerError('PinoES: Client not connected')
  }

  return client
}

export const Logger: ILogger = {
  async connect() {
    if (LOGGER_DISABLED) {
      return
    }

    const streamToES = pinoES({
      index: 'logs',
      node: LOGGER_URL,
      auth: {
        username: LOGGER_USER,
        password: LOGGER_PASSWORD,
      },
      esVersion: 7,
      flushBytes: 1000,
    })

    client = pino({}, streamToES)

    console.log(`Connected on Pino ES: ${LOGGER_URL}`)
  },

  async info(input) {
    if (LOGGER_DISABLED) {
      return
    }

    getClient().info(input)
  },

  async warn(input) {
    if (LOGGER_DISABLED) {
      return
    }

    getClient().warn(input)
  },

  async error(input) {
    if (LOGGER_DISABLED) {
      return
    }

    getClient().error(input)
  },
}
