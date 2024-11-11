import { vi } from 'vitest'

import { SetupTestDependencies } from '@/config/tests'
import { ILogger } from '@/ports/logger'

export const LoggerInMemory: SetupTestDependencies<ILogger> = {
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
}
