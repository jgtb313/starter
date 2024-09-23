import { vi, Mock } from 'vitest'

import { IDependencies } from '@/core/shared/types'
import { ISession, IRepositories } from '@/ports/database'
import { IJWT } from '@/ports/jwt'
import { IEncrypt } from '@/ports/encrypt'
import { IStorage } from '@/ports/storage'

import { JWTInMemory, EncryptInMemory, StorageInMemory, RepositoriesInMemory, clearRepositoriesMocks } from './in-memory'

export type SetupTestDependencies<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<A, R> : T[K] extends object ? SetupTestDependencies<T[K]> : T[K]
}

export type ITestDependencies = SetupTestDependencies<IDependencies>

export const TestDependencies = (): ITestDependencies => {
  clearRepositoriesMocks()
  vi.clearAllMocks()

  return {
    JWT: JWTInMemory as SetupTestDependencies<IJWT>,

    Encrypt: EncryptInMemory as SetupTestDependencies<IEncrypt>,

    Mail: {
      send: vi.fn()
    },

    SocialAuth: {
      getInfosByToken: vi.fn()
    },

    Storage: StorageInMemory as SetupTestDependencies<IStorage>,

    Database: {
      createSession: vi.fn(() => {
        const session: ISession = {
          value: {},

          commit: vi.fn(),
          rollback: vi.fn()
        }

        return session
      })
    },

    Repositories: RepositoriesInMemory as SetupTestDependencies<IRepositories>
  }
}
