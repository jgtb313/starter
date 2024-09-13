import { ForgotPasswordSchema, ForgotPasswordInput, ForgotPasswordOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<ForgotPasswordInput, ForgotPasswordOutput> = () => () => {
  return {} as unknown as ForgotPasswordOutput
}

export const forgotPassword = createUseCase(execute, ForgotPasswordSchema)
