import { CreateTestDependenciesOptions, SetupTestDependencies } from '../../domain.dependencies'
import { IWhatsapp } from './Whatsapp.port'

export const WhatsappInMemory = ({ vi }: CreateTestDependenciesOptions): SetupTestDependencies<IWhatsapp> => ({
  send: vi.fn(async () => {
    return
  }),
})
