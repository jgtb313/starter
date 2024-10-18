import { RecoverPasswordSchema, RecoverPasswordInput, RecoverPasswordOutput } from '@starter/schema'
import { isFuture } from '@starter/shared'

import { ConflictError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<RecoverPasswordInput, RecoverPasswordOutput> =
  ({ Database, Encrypt }) =>
  async ({ recoverPasswordToken, password }) => {
    const user = await Database.user.findOne({ recoverPassword: { token: recoverPasswordToken } })

    if (!user) {
      throw new ConflictError(`Invalid recoverPasswordToken ${recoverPasswordToken}`)
    }

    const isRecoverPasswordTokenValid = isFuture(user.state.recoverPassword?.expiresIn as Date)

    if (!isRecoverPasswordTokenValid) {
      throw new ConflictError(`recoverPasswordToken ${recoverPasswordToken} expired`)
    }

    const hashPassword = Encrypt.hash(password)

    user.state.password = hashPassword
    user.state.recoverPassword = null

    await Database.user.updateById(user.state.id, user)

    return
  }

export const recoverPassword = createUseCase(execute, RecoverPasswordSchema)
