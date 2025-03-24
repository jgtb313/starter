import { Controller as NestController, applyDecorators } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { ControllerOptions } from '@/interfaces'
import { StateManager } from '@/nestjs-server-hoisting.state'

export const Controller = (options: ControllerOptions): ClassDecorator => {
  return (target) => {
    const decorators = []

    decorators.push(ApiTags(options.name))
    decorators.push(ApiBearerAuth())

    Object.entries(options.schemas).forEach(([name, { schema, description }]) => {})

    decorators.push(NestController(options.basePath))

    applyDecorators(...decorators)(target)

    StateManager.addController(options.name, options)
  }
}
