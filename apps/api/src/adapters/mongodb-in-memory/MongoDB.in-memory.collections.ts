import { vi } from 'vitest'
import { set } from '@starter/shared'

import { SetupTestDependencies } from '@/config/tests'
import { Repositories } from '@/adapters/mongodb/modules'
import { IRepositories } from '@/ports/database'

const createInMemoryRepositories = (Repositories: IRepositories) => {
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

export const RepositoriesInMemory = createInMemoryRepositories(Repositories)
