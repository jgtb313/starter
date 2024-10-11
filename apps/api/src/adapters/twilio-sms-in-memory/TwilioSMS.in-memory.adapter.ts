import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { ISMS } from '@/ports/sms'

export const TwilioSMSInMemory: SetupTestDependencies<ISMS> = {
  send: vi.fn(async () => {
    return
  }),
}
