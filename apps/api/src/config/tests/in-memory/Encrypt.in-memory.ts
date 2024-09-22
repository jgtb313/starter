import { vi } from 'vitest'
import { IEncrypt } from '@/ports/encrypt'

export const EncryptInMemory: IEncrypt = {
  hash: vi.fn((value) => {
    return Buffer.from(value).toString('base64')
  }),

  compare: vi.fn((value, hash) => {
    return EncryptInMemory.hash(value) === hash
  })
}
