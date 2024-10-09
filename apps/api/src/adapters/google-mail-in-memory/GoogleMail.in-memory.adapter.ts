import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { IMail } from '@/ports/mail'

export const MailInMemory: SetupTestDependencies<IMail> = {
  send: vi.fn(),
}
