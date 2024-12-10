import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { IWhatsapp } from '../../ports/whatsapp'

export const TwilioWhatsappInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IWhatsapp> => ({
  send: vi.fn(async () => {
    return
  }),
})
