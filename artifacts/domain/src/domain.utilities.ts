import KSUID from 'ksuid'
import { z, ZodSchema } from '@starter/schema'
import { PickNullable, PickNotNullable } from '@starter/shared'

import { IDependencies } from './domain.dependencies'

export type IUseCaseExecute<T, P> = (dependencies: IDependencies) => (input: T) => Promise<P>

export const createUseCase =
  <T, P>(execute: IUseCaseExecute<T, P>, Schema?: ZodSchema) =>
  (dependencies: IDependencies) =>
  (props: T) => {
    if (!Schema) {
      return execute(dependencies)(props)
    }

    const input = Schema.parse(props) as T

    return execute(dependencies)(input)
  }

export type SetupDomain<T, P extends keyof T = never> = {
  [K in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt' | P>>]?: Exclude<T[K], null> | null
} & {
  [K in keyof PickNotNullable<Omit<T, 'id' | 'createdAt' | 'updatedAt' | P>>]: T[K]
} & {
  [K in P]?: T[K]
} & {
  id?: string
}

export const setupDomain = <T>(value: T, schema: ReturnType<typeof z.object>) => {
  return schema.parse({ id: KSUID.randomSync().string, createdAt: new Date(), updatedAt: new Date(), ...value })
}
