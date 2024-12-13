import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { ISMS } from './SMS.port'

export const SMSInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ISMS> => ({
  send: vi.fn(async () => {
    return
  }),
})
