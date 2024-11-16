import { AuthenticateSchema, AuthenticateInput, AuthenticateOutput } from '@starter/schema'

import { env } from '@/config'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload, Auth } from '@/support/auth'
import { IUseCaseExecute } from '@/support/types'

const SERVER_AUTHORIZATION_SECRET = env('SERVER_AUTHORIZATION_SECRET')
const SERVER_AUTHENTICATE_SECRET = env('SERVER_AUTHENTICATE_SECRET')

const execute: IUseCaseExecute<AuthenticateInput, AuthenticateOutput> =
  ({ Database, JWT }) =>
  async ({ authorizationToken }) => {
    const { userId } = JWT.decode<Auth>(authorizationToken, SERVER_AUTHORIZATION_SECRET)

    const user = await Database.user.findById(userId)

    const accessToken = JWT.generate(getTokenPayload(user.state), SERVER_AUTHENTICATE_SECRET)

    return {
      accessToken,
    }
  }

export const authenticate = createUseCase(execute, AuthenticateSchema)
