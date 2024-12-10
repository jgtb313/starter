import { SignUpSchema, SignUpInput, SignUpOutput, UserStatusEnum } from '@starter/schema'
import { createUseCase, User, ConflictError, IUseCaseExecute } from '@starter/domain'

import { env } from '@/config'
import { getTokenPayload } from '@/support/auth'

const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

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

    const accessToken = JWT.generate(tokenPayload, SERVER_AUTHENTICATE_SECRET, { expiresIn: '7d' })

    return {
      accessToken,
    }
  }

export const signUp = createUseCase(execute, SignUpSchema)
