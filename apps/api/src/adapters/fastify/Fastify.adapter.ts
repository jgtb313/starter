import { FastifyInstance, FastifyRequest } from 'fastify'
import client from '@starter/config'

import { env } from '@/config'
import { Auth } from '@/support/auth'
import { IDependencies, IContext } from '@/support/types'
import * as Modules from '@/ports/http/modules'
import { withResponse, withError, IServer } from '@/ports/http'
import { server } from './Fastify.server'
import { Docs } from '../scalar'

const PORT = env('SERVER_PORT')

type Request = {
  Querystring: {
    fields: string
  }
}

server.register(Docs.instance, {
  routePrefix: `/${Docs.config.routePrefix}`,
  configuration: Docs.config.configuration,
})

const checkAuthorization = (dependencies: IDependencies) => (authorization?: string) => {
  if (authorization) {
    return dependencies.JWT.decode<Auth>(authorization)
  }

  return undefined
}

export const setupRoutes = (instance: FastifyInstance, routes: typeof Modules, dependencies: IDependencies) => {
  instance.get('/', (_, reply) => {
    reply.send({ message: `${client.name} API` })
  })

  instance.get('/health', (_, reply) => {
    reply.send({ message: 'Health' })
  })

  const modules = Object.values(routes).map((module) => module(dependencies).paths)

  for (const module of modules) {
    Object.values(module).forEach(({ path, version, method, responseStatusCode = 200, execute }) => {
      instance.route({
        url: `/${version}${path}`,
        method,
        handler: async (req: FastifyRequest<Request>, reply) => {
          try {
            const input = {
              query: req.query ?? {},
              params: req.params ?? {},
              body: req.body ?? {},
              headers: req.headers ?? {},
            }

            const authorization =
              input.headers['authorization'] !== 'Bearer' &&
              input.headers['authorization'] &&
              input.headers['authorization'] !== 'undefined' &&
              input.headers['authorization'] !== 'null'
                ? `${input.headers['authorization']}`
                : undefined

            const context: IContext = {}

            try {
              const auth = checkAuthorization(dependencies)(authorization)

              context.auth = auth

              const response = await execute(input as never, context)

              reply.code(responseStatusCode).send(withResponse(response, input.query.fields))
            } catch (err) {
              const error = err as Error

              console.log(`[ERROR]: ${JSON.stringify(error.stack)}`)

              const { error: customError } = withError(error)

              reply.code(customError.code).send(customError.error)
            }
          } catch (err) {
            const error = err as Error
            console.log(`[ERROR]: ${JSON.stringify(error.stack)}`)
            reply.code(500).send(withError(error))
          }
        },
      })
    })
  }
}

export const Server: IServer = {
  async start(dependencies) {
    try {
      setupRoutes(server, Modules, dependencies)

      await server.ready()

      await server.listen({ port: +PORT, host: '0.0.0.0' })

      console.log(`Connected on Fastify Server, running on PORT: ${PORT}`)
    } catch (err) {
      const error = err as Error
      console.log(`[FATAL-ERROR]: ${JSON.stringify(error.stack)}`)
      process.exit(1)
    }
  },
}
