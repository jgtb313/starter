import { SocialSignInSchema, SocialSignInInput, SocialSignInOutput, UserStatusEnum, SocialSignInEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/core/shared/types'
import { User } from '@/core/user/domain'

const execute: IUseCaseExecute<SocialSignInInput, SocialSignInOutput> =
  ({ Repositories, SocialAuth, Encrypt, JWT }) =>
  async (input) => {
    const { id, name, email } = await SocialAuth.getInfosByToken(input.context, input.token)

    const user = await Repositories.user.findOne({
      $or: [
        {
          social: { [input.context.toLowerCase()]: { id } },
          email,
        },
      ],
    })

    if (!user) {
      const hashPassword = Encrypt.hash(id)

      const user = await Repositories.user.create(
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

      const token = JWT.generate(getTokenPayload(user.state))

      return {
        token,
      }
    }

    const token = JWT.generate(getTokenPayload(user.state))

    return {
      token: token,
    }
  }

export const socialSignIn = createUseCase(execute, SocialSignInSchema)
