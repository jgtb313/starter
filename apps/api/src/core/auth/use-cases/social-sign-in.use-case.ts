import { SocialSignOnSchema, SocialSignOnInput, SocialSignOnOutput, UserStatusEnum, SocialAuthEnum } from '@starter/schema'
import { createUseCase, User, IUseCaseExecute } from '@starter/domain'

import { env } from '@/config'
import { getTokenPayload } from '@/support/auth'

const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

const execute: IUseCaseExecute<SocialSignOnInput, SocialSignOnOutput> =
  ({ Database, SocialAuth, Encrypt, JWT }) =>
  async (input) => {
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
            facebook: input.context === SocialAuthEnum.FACEBOOK ? { id } : null,
            google: input.context === SocialAuthEnum.GOOGLE ? { id } : null,
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

export const socialSignOn = createUseCase(execute, SocialSignOnSchema)
