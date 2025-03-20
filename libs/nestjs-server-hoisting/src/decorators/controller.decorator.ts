import { Controller as NestController } from '@nestjs/common'

import { ControllerOptions } from '@/interfaces'
import { StateManager } from '@/nestjs-server-hoisting.state'

export const Controller = (options: ControllerOptions): ClassDecorator => {
  return (target) => {
    NestController(options.basePath)(target)

    StateManager.addController(options.name, options)
  }
}
