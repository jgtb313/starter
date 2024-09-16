import { RecoverPasswordSchema, RecoverPasswordInput, RecoverPasswordOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<RecoverPasswordInput, RecoverPasswordOutput> = () => async () => {
  return {} as unknown as RecoverPasswordOutput
}

export const recoverPassword = createUseCase(execute, RecoverPasswordSchema)
