import { NestFactory } from '@nestjs/core'
import { INestApplicationContext, Type, DynamicModule, ForwardReference } from '@nestjs/common'

import { IServerlessService } from '@/interfaces'
import { parseLambdaEvent, LambdaEvent } from './parse-lambda-event'

export type NestServerlessHoistingOptions = {}

type IEntryNestModule = Type<any> | DynamicModule | ForwardReference | Promise<IEntryNestModule>

const create = <T extends {}, K extends {}>(
  entryModule: IEntryNestModule,
  serviceClass: Type<IServerlessService<T, K>>,
  options?: NestServerlessHoistingOptions,
) => {
  if (!('execute' in serviceClass.prototype)) {
    throw new Error('The provided class must have an "execute" method.')
  }

  return async (event: LambdaEvent) => {
    const app: INestApplicationContext = await NestFactory.createApplicationContext(entryModule)

    const service = app.get(serviceClass)

    const input = parseLambdaEvent<T>(event)

    const result = await service.execute(input)

    await app.close()

    return result
  }
}

export const NestServerlessHoistingFactory = {
  create,
}
