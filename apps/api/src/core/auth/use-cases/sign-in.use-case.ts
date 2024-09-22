import { SignInSchema, SignInInput, SignInOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<SignInInput, SignInOutput> = () => async () => {
  return {} as unknown as SignInOutput
}

export const signIn = createUseCase(execute, SignInSchema)
