import { ZodSchema } from '@starter/schema'

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
