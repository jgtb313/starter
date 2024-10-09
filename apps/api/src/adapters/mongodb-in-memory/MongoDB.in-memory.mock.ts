import { database } from '@/adapters/mongodb/MongoDB.connection'
import { otpMocks } from '@/core/otp/OTP.mock'
import { planMocks } from '@/core/plan/Plan.mock'
import { userMocks } from '@/core/user/User.mock'
import { workspaceMocks } from '@/core/workspace/Workspace.mock'

export const setupMocks = async () => {
  const mocks = [
    {
      name: 'otps',
      data: otpMocks,
    },
    {
      name: 'plans',
      data: planMocks,
    },
    {
      name: 'users',
      data: userMocks,
    },
    {
      name: 'workspaces',
      data: workspaceMocks,
    },
  ]

  for (const { name, data } of mocks) {
    await database.collection(name).deleteMany()
    await database.collection(name).insertMany(data.map((item) => item.state))
  }
}
