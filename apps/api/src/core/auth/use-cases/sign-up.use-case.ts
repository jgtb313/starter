import { SignUpSchema, SignUpInput, SignUpOutput, UserStatusEnum, WorkspaceStatusEnum } from '@starter/schema'

import { BadRequestError } from '@/support/errors'
import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { getTokenPayload } from '@/core/auth/support/token'
import { Workspace } from '@/core/workspace/domain'
import { User } from '@/core/user/domain'

const execute: IUseCaseExecute<SignUpInput, SignUpOutput> =
  ({ Database, Repositories, Encrypt, JWT }) =>
  async ({ name, email, password }) => {
    const session = Database.createSession()

    try {
      const emailExists = await Repositories.user.findOne({
        email
      })

      if (emailExists) {
        throw new BadRequestError(`E-mail ${email} has already been taken`)
      }

      const workspace = await Repositories.workspace.create(
        new Workspace({
          onboarding: true,
          status: WorkspaceStatusEnum.ACTIVE
        }),
        {
          session: session.value
        }
      )

      const hashPassword = Encrypt.hash(password)

      const user = await Repositories.user.create(
        new User({
          workspaceId: workspace.state.id,
          workspace: workspace.state,
          name,
          email,
          password: hashPassword,
          social: {
            facebook: null,
            google: null
          },
          status: UserStatusEnum.ACTIVE
        }),
        {
          session: session.value
        }
      )

      const token = JWT.generate(getTokenPayload(user.state))

      await session.commit()

      return {
        token
      }
    } catch (error) {
      await session.rollback()

      throw error
    }
  }

export const signUp = createUseCase(execute, SignUpSchema)
