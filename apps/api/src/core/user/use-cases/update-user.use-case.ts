import { UpdateUserSchema, UpdateUserInput, UpdateUserOutput } from '@starter/schema'
import { createUseCase, IUseCaseExecute } from '@starter/domain'

const execute: IUseCaseExecute<UpdateUserInput, UpdateUserOutput> =
  ({ Database }) =>
  async ({ id, ...props }) => {
    const user = await Database.user.findById(id)

    user.state = {
      ...user.state,
      ...props,
    }

    const { state } = await Database.user.updateById(user.state.id, user)

    return state
  }

export const updateUser = createUseCase(execute, UpdateUserSchema)
