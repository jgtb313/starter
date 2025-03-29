import { Reflector } from '@nestjs/core'
import { Controller as NestController, applyDecorators } from '@nestjs/common'
import { GUARDS_METADATA } from '@nestjs/common/constants'
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger'

import { ControllerOptions } from '@/interfaces'
import { StateManager } from '@/nestjs-server-hoisting.state'

export const Controller = (options: ControllerOptions): ClassDecorator => {
  return (target) => {
    const decorators = []

    decorators.push(ApiTags(options.name))

    const reflector = new Reflector()
    const guards = reflector.get(GUARDS_METADATA, target) ?? []

    const authenticated = !!guards.length

    if (authenticated) {
      decorators.push(ApiBearerAuth())
      decorators.push(
        ApiHeader({
          name: 'authorization',
          description: 'The authorization token for user authentication.',
          example: 'Bearer <your_token_here>',
          required: true,
        }),
      )
    }

    Object.entries(options.schemas).forEach(([name, { schema, description }]) => {})

    decorators.push(NestController(options.basePath))

    applyDecorators(...decorators)(target)

    StateManager.addController(options.name, {
      ...options,
      authenticated,
    })
  }
}
