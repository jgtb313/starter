import { FastifyInstance, FastifyRequest } from 'fastify'

import { env } from '@/config'
import { IDependencies, IContext } from '@/core/shared/types'
import { Auth } from '@/core/auth/support/token'
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

server.register(Docs.instance, Docs.config)

const checkAuthorization = (dependencies: IDependencies) => (authorization?: string) => {
  if (authorization) {
    const auth = dependencies.JWT.decode<Auth>(authorization)
    return auth
  }

  return undefined
}

export const setupRoutes = (instance: FastifyInstance, routes: typeof Modules, dependencies: IDependencies) => {
  instance.get('/', (_, reply) => {
    reply.send({ message: 'SmartStock API' })
  })

  instance.get('/health', (_, reply) => {
    reply.send({ message: 'Health' })
  })

  const modules = Object.values(routes).map((module) => module(dependencies).paths)

  for (const module of modules) {
    Object.values(module).forEach(({ path, method, execute }) => {
      instance.route({
        url: path,
        method,
        handler: async (req: FastifyRequest<Request>, reply) => {
          try {
            const userAgent = req.headers['user-agent']

            const input = {
              query: req.query ?? {},
              params: req.params ?? {},
              body: req.body ?? {},
              headers: req.headers ?? {}
            }

            const authorization = input.headers['authorization'] ? `${input.headers['authorization']}` : undefined

            const context: IContext = {
              shouldCheckRecaptcha: !userAgent?.startsWith('Postman')
            }

            try {
              const auth = checkAuthorization(dependencies)(authorization)

              context.auth = auth

              const response = await execute(input as never, context)
              const responseStatus = 200

              reply.code(responseStatus).send(withResponse(response, input.query.fields))
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
        }
      })
    })
  }
}

export const Server: IServer = {
  async start(dependencies) {
    try {
      setupRoutes(server, Modules, dependencies)

      await server.listen({ port: +PORT, host: '0.0.0.0' })

      console.log(`Connected on Fastify Server, running on PORT: ${PORT}`)
    } catch (err) {
      const error = err as Error
      console.log(`[FATAL-ERROR]: ${JSON.stringify(error.stack)}`)
      process.exit(1)
    }
  }
}
