import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { IMail } from './Mail.port'

export const MailInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IMail> => ({
  send: vi.fn(),
})
