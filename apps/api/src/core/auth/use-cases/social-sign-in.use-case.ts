import { SocialSignInSchema, SocialSignInInput, SocialSignInOutput, UserStatusEnum, SocialSignInEnum } from '@starter/schema'
import { createUseCase, User, IUseCaseExecute } from '@starter/domain'

import { env } from '@/config'
import { getTokenPayload } from '@/support/auth'

const execute: IUseCaseExecute<SocialSignInInput, SocialSignInOutput> =
  ({ Database, SocialAuth, Encrypt, JWT }) =>
  async (input) => {
    const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

    const { id, name, email } = await SocialAuth.getInfosByToken(input.context, input.providerToken)

    const user = await Database.user.findOne({
      $or: [
        {
          social: { [input.context.toLowerCase()]: { id } },
          email,
        },
      ],
    })

    if (!user) {
      const hashPassword = Encrypt.hash(id)

      const user = await Database.user.create(
        new User({
          name,
          email: email ?? `${id}@${input.context.toLowerCase()}.com`,
          password: hashPassword,
          social: {
            facebook: input.context === SocialSignInEnum.FACEBOOK ? { id } : null,
            google: input.context === SocialSignInEnum.GOOGLE ? { id } : null,
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

    const tokenPayload = getTokenPayload(user.state)

    const accessToken = JWT.generate(tokenPayload, SERVER_AUTHENTICATE_SECRET, { expiresIn: '7d' })

    return {
      accessToken,
    }
  }

export const socialSignIn = createUseCase(execute, SocialSignInSchema)
