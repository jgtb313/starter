import pino, { Logger as Pino } from 'pino'
import pinoES from 'pino-elasticsearch'

import { CreateDependenciesOptions } from '../../domain.dependencies'
import { InternalServerError } from '../../domain.errors'
import { ILogger } from '../../ports/logger'

let client: Pino | undefined

const getClient = (): Pino => {
  if (!client) {
    throw new InternalServerError('PinoES: Client not connected')
  }

  return client
}

export const Logger = ({ env }: CreateDependenciesOptions): ILogger => ({
  async connect() {
    if (env.LOGGER_DISABLED) {
      return
    }

    const streamToES = pinoES({
      index: 'logs',
      node: env.LOGGER_URL,
      auth: {
        username: env.LOGGER_USER,
        password: env.LOGGER_PASSWORD,
      },
      esVersion: 7,
      flushBytes: 1000,
    })

    client = pino({}, streamToES)

    console.log(`Connected on Pino ES: ${env.LOGGER_URL}`)
  },

  async info(input) {
    if (env.LOGGER_DISABLED) {
      return
    }

    getClient().info(input)
  },

  async warn(input) {
    if (env.LOGGER_DISABLED) {
      return
    }

    getClient().warn(input)
  },

  async error(input) {
    if (env.LOGGER_DISABLED) {
      return
    }

    getClient().error(input)
  },
})
