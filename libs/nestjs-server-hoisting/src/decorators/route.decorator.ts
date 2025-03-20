import { HttpCode, Get, Post, Put, Patch, Delete, Version, applyDecorators } from '@nestjs/common'
import { UseZodGuard } from 'nestjs-zod'

import { RouteOptions } from '@/interfaces'
import { StateManager } from '@/nestjs-server-hoisting.state'

export const Route = (options: RouteOptions): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    const decorators = []

    const version = options.version ?? 'v1'

    if (options.method === 'GET') decorators.push(Get(options.path))
    if (options.method === 'POST') decorators.push(Post(options.path))
    if (options.method === 'PUT') decorators.push(Put(options.path))
    if (options.method === 'PATCH') decorators.push(Patch(options.path))
    if (options.method === 'DELETE') decorators.push(Delete(options.path))

    if (options.parameters.query) decorators.push(UseZodGuard('query', options.parameters.query))
    if (options.parameters.params) decorators.push(UseZodGuard('params', options.parameters.params))
    if (options.parameters.body) decorators.push(UseZodGuard('body', options.parameters.body))

    const statusCode = Object.keys(options.responses).map(String)

    if (statusCode.includes('201')) {
      decorators.push(HttpCode(201))
    } else if (statusCode.includes('204')) {
      decorators.push(HttpCode(204))
    } else {
      decorators.push(HttpCode(200))
    }

    decorators.push(Version(version.replace('v', '')))

    applyDecorators(...decorators)(target, propertyKey, descriptor)

    StateManager.addRoute(target.constructor.name, {
      ...options,
      operationId: propertyKey.toString(),
    })
  }
}
