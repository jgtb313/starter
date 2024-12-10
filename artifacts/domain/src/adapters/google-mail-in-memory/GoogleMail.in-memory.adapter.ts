import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { IMail } from '../../ports/mail'

export const MailInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IMail> => ({
  send: vi.fn(),
})
