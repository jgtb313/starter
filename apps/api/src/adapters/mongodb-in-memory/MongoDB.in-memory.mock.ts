import { database } from '@/adapters/mongodb/MongoDB.connection'

import { PlanSearch } from '@/adapters/mongodb/modules/Plan.mongodb'
import { UserSearch } from '@/adapters/mongodb/modules/User.mongodb'
import { WorkspaceSearch } from '@/adapters/mongodb/modules/Workspace.mongodb'
// appendSearchImportHere

import { otpMocks } from '@/core/otp/OTP.mock'
import { planMocks } from '@/core/plan/Plan.mock'
import { userMocks } from '@/core/user/User.mock'
import { workspaceMocks } from '@/core/workspace/Workspace.mock'
// appendMockImportHere

export const setupMocks = async () => {
  const mocks = [
    {
      name: 'otps',
      data: otpMocks,
    },
    {
      name: 'plans',
      data: planMocks,
      search: PlanSearch,
    },
    {
      name: 'users',
      data: userMocks,
      search: UserSearch,
    },
    {
      name: 'workspaces',
      data: workspaceMocks,
      search: WorkspaceSearch,
    },
    // appendMockHere
  ]

  for (const { name, data, search } of mocks) {
    const items = data.map((item) => {
      if (search) {
        return {
          ...item.state,
          search: search(item.state as never),
        }
      }

      return item.state
    })

    await database.collection(name).deleteMany()
    await database.collection(name).insertMany(items)
  }
}
