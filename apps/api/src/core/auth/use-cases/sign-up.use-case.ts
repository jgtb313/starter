import { SignUpSchema, SignUpInput, SignUpOutput, UserStatusEnum, WorkspaceStatusEnum } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { getTokenPayload } from '@/core/auth/support/token'
import { Workspace } from '@/core/workspace/domain'
import { User } from '@/core/user/domain'

const execute: IUseCaseExecute<SignUpInput, SignUpOutput> =
  ({ Repositories, JWT }) =>
  async ({ name, email, password }) => {
    const workspace = await Repositories.workspace.create(
      new Workspace({
        onboarding: true,
        status: WorkspaceStatusEnum.ACTIVE
      })
    )

    const user = await Repositories.user.create(
      new User({
        workspaceId: workspace.state.id,
        workspace: workspace.state,
        name,
        email,
        password,
        social: {
          facebook: null,
          google: null
        },
        status: UserStatusEnum.ACTIVE
      })
    )

    const token = JWT.generate(getTokenPayload(user.state))

    return {
      token
    }
  }

export const signUp = createUseCase(execute, SignUpSchema)
