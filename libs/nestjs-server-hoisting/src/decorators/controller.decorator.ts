import { applyDecorators, Controller as NestController } from '@nestjs/common'
import { GUARDS_METADATA } from '@nestjs/common/constants'
import { Reflector } from '@nestjs/core'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import type { ControllerOptions } from '@/interfaces'
import { StateManager } from '@/nestjs-server-hoisting.state'

export const Controller = (options: ControllerOptions): ClassDecorator => {
	return (target) => {
		const decorators = []

		decorators.push(ApiTags(options.name))

		const reflector = new Reflector()
		const guards = reflector.get(GUARDS_METADATA, target) ?? []

		const authenticated = !!guards.length

		if (authenticated) {
			decorators.push(ApiBearerAuth('Bearer'))
		}

		decorators.push(NestController(options.basePath))

		applyDecorators(...decorators)(target)

		StateManager.addController(options.name, {
			...options,
			authenticated,
		})
	}
}
