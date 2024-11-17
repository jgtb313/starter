import { SignUpSchema, SignUpInput, SignUpOutput, UserStatusEnum } from '@starter/schema'

import { ConflictError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/support/types'
import { User } from '@/core/user/domain'

const execute: IUseCaseExecute<SignUpInput, SignUpOutput> =
  ({ Database, Encrypt, JWT }) =>
  async ({ name, email, password }) => {
    const emailExists = await Database.user.findOne({
      email,
    })

    if (emailExists) {
      throw new ConflictError(`E-mail ${email} has already been taken`)
    }

    const hashPassword = Encrypt.hash(password)

    const user = await Database.user.create(
      new User({
        name,
        email,
        password: hashPassword,
        social: {
          facebook: null,
          google: null,
        },
        status: UserStatusEnum.ACTIVE,
      }),
    )

    const tokenPayload = getTokenPayload(user.state)

    const accessToken = JWT.generate(tokenPayload, { expiresIn: '1m' })

    return {
      accessToken,
    }
  }

export const signUp = createUseCase(execute, SignUpSchema)
