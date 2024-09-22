import { vi } from 'vitest'

import { IDependencies } from '@/core/shared/types'
import { ISession } from '@/ports/database'

import { JWTInMemory, EncryptInMemory, RepositoriesInMemory, clearRepositoriesMocks } from './in-memory'

export const TestDependencies = (): IDependencies => {
  clearRepositoriesMocks()
  vi.clearAllMocks()

  return {
    JWT: JWTInMemory,

    Encrypt: EncryptInMemory,

    Mail: {
      send: vi.fn()
    },

    SocialAuth: {
      getInfosByToken: vi.fn()
    },

    Storage: {
      getSignedUrl: vi.fn()
    },

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

    Repositories: RepositoriesInMemory
  }
}
