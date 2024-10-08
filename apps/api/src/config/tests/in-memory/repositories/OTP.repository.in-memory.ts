import { vi } from 'vitest'

import { NotFoundError } from '@/support/errors'
import { OTP } from '@/core/otp/domain'
import { IOTPRepository } from '@/ports/database/modules/OTP.repository'

let otps: Record<string, OTP> = {}

export const OTPRepositoryInMemory: ReturnType<IOTPRepository> = {
  findById: vi.fn(async (id) => {
    const otp = otps[id]

    if (!otp) {
      throw new NotFoundError(`OTP ${id} not found`)
    }

    return new OTP(otp.state)
  }),

  dailyCount: vi.fn(async (email, context) => {
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const count = Object.values(otps).filter(
      (otp) => otp.state.email === email && otp.state.context === context && otp.state.createdAt >= startOfDay,
    ).length

    return count
  }),

  mostRecent: vi.fn(async (email, context) => {
    const [otp] = Object.values(otps)
      .filter((otp) => otp.state.email === email && otp.state.context === context)
      .sort((a, b) => b.state.createdAt.getTime() - a.state.createdAt.getTime())

    if (!otp) {
      return
    }

    return new OTP(otp.state)
  }),

  create: vi.fn(async ({ state }) => {
    const otp = new OTP(state)

    otps[otp.state.id] = otp

    return new OTP(otp.state)
  }),

  updateById: vi.fn(async (id, { state }) => {
    const otp = await OTPRepositoryInMemory.findById(id)

    otps[id] = new OTP({
      ...otp.state,
      ...state,
    })

    return OTPRepositoryInMemory.findById(otp.state.id)
  }),
}

export const clearOTPRepositoryInMemory = () => {
  otps = {}
}
