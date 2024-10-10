import { SocialSignInSchema, SocialSignInInput, SocialSignInOutput, UserStatusEnum, WorkspaceStatusEnum, SocialSignInEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/core/shared/types'
import { Workspace } from '@/core/workspace/domain'
import { User } from '@/core/user/domain'

const execute: IUseCaseExecute<SocialSignInInput, SocialSignInOutput> =
  ({ Database, Repositories, SocialAuth, Encrypt, JWT }) =>
  async (input) => {
    const { id, name, email } = await SocialAuth.getInfosByToken(input.context, input.token)

    const user = await Repositories.user.findOne({ social: { [input.context.toLowerCase()]: { id } } })

    if (!user) {
      const session = Database.createSession()

      try {
        const workspace = await Repositories.workspace.create(
          new Workspace({
            onboarding: true,
            status: WorkspaceStatusEnum.ACTIVE,
          }),
          {
            session: session.value,
          },
        )

        const hashPassword = Encrypt.hash(id)

        const user = await Repositories.user.create(
          new User({
            workspaceId: workspace.state.id,
            name,
            email: email ?? `${id}@${input.context.toLowerCase()}.com`,
            password: hashPassword,
            social: {
              facebook: input.context === SocialSignInEnum.FACEBOOK ? { id } : null,
              google: input.context === SocialSignInEnum.GOOGLE ? { id } : null,
            },
            status: UserStatusEnum.ACTIVE,
          }),
          {
            session: session.value,
          },
        )

        const token = JWT.generate(getTokenPayload(user.state))

        await session.commit()

        return {
          token,
        }
      } catch (error) {
        await session.rollback()

        throw error
      }
    }

    const token = JWT.generate(getTokenPayload(user.state))

    return {
      token: token,
    }
  }

export const socialSignIn = createUseCase(execute, SocialSignInSchema)
