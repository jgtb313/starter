import type { VitestUtils } from 'vitest'
import { set } from '@starter/shared'

import { SetupTestDependencies } from '../../domain.types'
import { IRepositories } from '../../ports/database/modules'

export const RepositoriesInMemory = (vi: VitestUtils, Repositories: IRepositories) => {
  const mockedRepositories = {} as SetupTestDependencies<IRepositories>

  for (const [moduleName, methods] of Object.entries(Repositories)) {
    const moduleMethods: Record<string, (...args: unknown[]) => unknown> = {}

    for (const [methodName, method] of Object.entries(methods)) {
      moduleMethods[methodName] = vi.fn(async function (this: typeof method, ...input: any[]) {
        const output = await method.apply(this, input)
        return output
      })
    }

    set(mockedRepositories, moduleName, moduleMethods)
  }

  return mockedRepositories
}
