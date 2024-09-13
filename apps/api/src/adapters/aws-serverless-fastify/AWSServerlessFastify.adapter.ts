import '../../module-alias'

import fastifyAWSLambda from '@fastify/aws-lambda'

import { Dependencies } from '@/dependencies'
import { Bootstrap } from '@/bootstrap'
import { server, setupRoutes } from '@/adapters/fastify'
import * as Modules from '@/ports/http/modules'

setupRoutes(server, Modules, Dependencies)

const proxy = fastifyAWSLambda(server, {
  callbackWaitsForEmptyEventLoop: false
})

server.ready()

let bootstrap = false

export const api = async (event: unknown, context: unknown) => {
  if (!bootstrap) {
    bootstrap = await Bootstrap()
  }

  return proxy(event, context)
}
