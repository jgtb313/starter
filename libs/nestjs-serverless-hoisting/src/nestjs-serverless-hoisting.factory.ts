import { NestFactory } from '@nestjs/core'
import { INestApplicationContext, Type, DynamicModule, ForwardReference } from '@nestjs/common'

import { IServerlessService } from '@/interfaces'
import { parseLambdaEvent, LambdaEvent } from './parse-lambda-event'

export type NestServerlessHoistingOptions = {}

export interface IServerlessHoistingApplicationContext<K = unknown> {
  execute(event: LambdaEvent): Promise<K>
}

type IEntryNestModule = Type<any> | DynamicModule | ForwardReference | Promise<IEntryNestModule>

const create = async <T extends {}, K extends {}>(
  entryModule: IEntryNestModule,
  serviceClass: Type<IServerlessService<T, K>>,
  options?: NestServerlessHoistingOptions,
) => {
  if (!('execute' in serviceClass.prototype)) {
    throw new Error('The provided class must have an "execute" method.')
  }

  const app: INestApplicationContext = await NestFactory.createApplicationContext(entryModule)

  const execute = async (event: LambdaEvent) => {
    const service = app.get(serviceClass)

    const input = parseLambdaEvent<T>(event)

    const result = await service.execute(input)

    await app.close()

    return result
  }

  Reflect.defineProperty(app, 'execute', {
    value: execute,
    writable: false,
    enumerable: false,
    configurable: false,
  })

  return app as unknown as IServerlessHoistingApplicationContext<K>
}

export const NestServerlessHoistingFactory = {
  create,
}
