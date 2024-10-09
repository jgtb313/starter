import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { IEncrypt } from '@/ports/encrypt'

export const EncryptInMemory: SetupTestDependencies<IEncrypt> = {
  hash: vi.fn((value) => {
    return Buffer.from(value).toString('base64')
  }),

  compare: vi.fn((value, hash) => {
    return EncryptInMemory.hash(value) === hash
  }),
}
