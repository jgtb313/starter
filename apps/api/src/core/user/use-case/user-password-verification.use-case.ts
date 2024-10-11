import { UserPasswordVerificationSchema, UserPasswordVerificationInput, UserPasswordVerificationOutput } from '@starter/schema'

import { BadRequestError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<UserPasswordVerificationInput, UserPasswordVerificationOutput> =
  ({ Repositories, Encrypt }) =>
  async ({ id, password }) => {
    const user = await Repositories.user.findById(id)

    const isValidPassword = Encrypt.compare(password, user.state.password)

    if (!isValidPassword) {
      throw new BadRequestError('Incorrect password')
    }
  }

export const userPasswordVerification = createUseCase(execute, UserPasswordVerificationSchema)
