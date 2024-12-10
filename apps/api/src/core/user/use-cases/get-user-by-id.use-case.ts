import { GetUserByIdSchema, GetUserByIdInput, GetUserByIdOutput } from '@starter/schema'
import { createUseCase, IUseCaseExecute } from '@starter/domain'

const execute: IUseCaseExecute<GetUserByIdInput, GetUserByIdOutput> =
  ({ Database }) =>
  async ({ id }) => {
    const user = await Database.user.findById(id)

    return user.state
  }

export const getUserById = createUseCase(execute, GetUserByIdSchema)
