import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.types'
import { ICache } from '../../ports/cache'

const memoryStore: Record<string, any> = {}

export const CacheInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ICache> => ({
  connect: vi.fn(async () => {
    return
  }),

  get: vi.fn(async (key) => {
    return memoryStore[key]
  }),

  set: vi.fn(async (key, value) => {
    memoryStore[key] = value
  }),

  disconnect: vi.fn(async () => {
    return
  }),
})
