import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.types'
import { ISMS } from '../../ports/sms'

export const TwilioSMSInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<ISMS> => ({
  send: vi.fn(async () => {
    return
  }),
})
