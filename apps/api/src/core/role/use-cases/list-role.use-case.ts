import { IndexRoleSchema, IndexRoleInput, IndexRoleOutput } from '@starter/schema'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'

const execute: IUseCaseExecute<IndexRoleInput, IndexRoleOutput> =
  ({ Repositories }) =>
  async (query) => {
    const roles = await Repositories.role.index(query)

    return roles.map((role) => role.state)
  }

export const indexRole = createUseCase(execute, IndexRoleSchema)
