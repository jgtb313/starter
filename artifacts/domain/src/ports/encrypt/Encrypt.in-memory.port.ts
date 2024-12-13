import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { IEncrypt } from './Encrypt.port'

export const EncryptInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IEncrypt> => ({
  hash: vi.fn((value) => {
    return Buffer.from(value).toString('base64')
  }),

  compare: vi.fn((value, hash) => {
    return Buffer.from(value).toString('base64') === hash
  }),
})
