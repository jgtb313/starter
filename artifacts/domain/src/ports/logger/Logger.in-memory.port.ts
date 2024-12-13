import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { ILogger } from './Logger.port'

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
