import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<SignInInput, SignInOutput> = () => () => {
  return {} as unknown as SignInOutput
}

export const getStore = createUseCase(execute, SignInSchema)
