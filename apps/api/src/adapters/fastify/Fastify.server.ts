import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormBody from '@fastify/formbody'

import { Docs } from '../scalar'

export const server = fastify({
  logger: true,
})

server.register(fastifyFormBody)
server.register(fastifyCors)
server.register(Docs.instance, {
  routePrefix: `/${Docs.config.routePrefix}`,
  configuration: Docs.config.configuration,
})
