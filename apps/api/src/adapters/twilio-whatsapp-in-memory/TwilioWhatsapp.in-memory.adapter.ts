import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { IWhatsapp } from '@/ports/whatsapp'

export const TwilioWhatsappInMemory: SetupTestDependencies<IWhatsapp> = {
  send: vi.fn(async () => {
    return
  }),
}
