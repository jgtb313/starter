import { AuthenticateSchema, AuthenticateInput, AuthenticateOutput } from '@starter/schema'

import { env } from '@/config'
import { createUseCase } from '@/support/utilities'
import { getTokenPayload } from '@/support/auth'
import { IUseCaseExecute } from '@/support/types'

const SERVER_AUTHORIZATION_SECRET = env('SERVER_SECRET')
const SERVER_AUTHENTICATE_SECRET = env('SERVER_SECRET')

const execute: IUseCaseExecute<AuthenticateInput, AuthenticateOutput> =
  ({ Database, JWT }) =>
  async ({ authorizationToken }) => {
    const { id } = JWT.decode<{ id: string }>(authorizationToken, SERVER_AUTHORIZATION_SECRET)

    const user = await Database.user.findById(id)

    const accessToken = JWT.generate(getTokenPayload(user.state), SERVER_AUTHENTICATE_SECRET)

    return {
      accessToken,
    }
  }

export const authenticate = createUseCase(execute, AuthenticateSchema)
