import { vi, Mock } from 'vitest'

import { IDependencies } from '@/core/shared/types'
import { ISession, IRepositories } from '@/ports/database'
import { IJWT } from '@/ports/jwt'
import { IEncrypt } from '@/ports/encrypt'
import { IStorage } from '@/ports/storage'
import { ISocialAuth } from '@/ports/social-auth'

import { JWTInMemory, EncryptInMemory, StorageInMemory, RepositoriesInMemory, SocialAuthInMemory, clearRepositoriesMocks } from './in-memory'

export type SetupTestDependencies<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K] extends object ? SetupTestDependencies<T[K]> : T[K]
}

export type ITestDependencies = SetupTestDependencies<IDependencies>

export const TestDependencies = (): ITestDependencies => {
  clearRepositoriesMocks()
  vi.clearAllMocks()

  vi.stubEnv('PROJECT', 'test')
  vi.stubEnv('STAGE', 'local')

  vi.stubEnv('SERVER_PORT', '4000')
  vi.stubEnv('SERVER_SECRET', 'fakeSecret1234567890abcdef1234567890abcdef')
  vi.stubEnv('SERVER_LOCAL_POSTBACK_TARGET', 'fake-target')
  vi.stubEnv('SERVER_POSTBACK_SECRET', 'fake-postback-secret')
  vi.stubEnv('SERVER_PROCESS_POSTBACK', 'false')
  vi.stubEnv('SERVER_START_SCHEDULE', 'false')
  vi.stubEnv('SERVER_RECOVER_PASSWORD_BASE_URL', 'http://localhost:fake')

  vi.stubEnv('MONGODB_URL', 'mongodb://fake-user:fake-password@localhost:27017/fake-db')
  vi.stubEnv('STATIC_IMAGE_URL', 'static.test.com.br')

  vi.stubEnv('AWS_S3_REGION', 'us-east-1')
  vi.stubEnv('AWS_S3_FILE_BUCKET', 'test-assets')

  vi.stubEnv('GOOGLE_MAIL_USER', 'fake.mail.user@gmail.com')
  vi.stubEnv('GOOGLE_MAIL_PASSWORD', 'fake-password')

  return {
    JWT: JWTInMemory as SetupTestDependencies<IJWT>,

    Encrypt: EncryptInMemory as SetupTestDependencies<IEncrypt>,

    Mail: {
      send: vi.fn()
    },

    SocialAuth: SocialAuthInMemory as SetupTestDependencies<ISocialAuth>,

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
