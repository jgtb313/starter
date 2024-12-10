import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.types'
import { ILogger } from '../../ports/logger'

export const LoggerInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ILogger> => ({
  connect: vi.fn(async () => {
    return
  }),

  info: vi.fn(async () => {
    return
  }),

  warn: vi.fn(async () => {
    return
  }),

  error: vi.fn(async () => {
    return
  }),
})
