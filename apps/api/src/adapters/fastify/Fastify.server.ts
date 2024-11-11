import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormBody from '@fastify/formbody'

export const server = fastify({
  logger: false,
})

server.register(fastifyFormBody)
server.register(fastifyCors)
