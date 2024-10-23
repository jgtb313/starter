import { UserPasswordVerificationSchema, UserPasswordVerificationInput, UserPasswordVerificationOutput } from '@starter/schema'

import { BadRequestError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/support/types'

const execute: IUseCaseExecute<UserPasswordVerificationInput, UserPasswordVerificationOutput> =
  ({ Database, Encrypt }) =>
  async ({ id, password }) => {
    const user = await Database.user.findById(id)

    const isValidPassword = Encrypt.compare(password, user.state.password)

    if (!isValidPassword) {
      throw new BadRequestError({
        issues: [
          {
            password: 'Incorrect password',
          },
        ],
      })
    }
  }

export const userPasswordVerification = createUseCase(execute, UserPasswordVerificationSchema)
