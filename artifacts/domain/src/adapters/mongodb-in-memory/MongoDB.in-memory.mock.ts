import { database } from '../../adapters/mongodb/MongoDB.connection'

import { UserSearch } from '../../adapters/mongodb/modules/User.mongodb'
// appendSearchImportHere

import { otpMocks } from '../../core/otp/OTP.mock'
import { userMocks } from '../../core/user/User.mock'
// appendMockImportHere

export const setupDatabaseTestMocks = async () => {
  const mocks = [
    {
      name: 'otps',
      data: otpMocks,
    },
    {
      name: 'users',
      data: userMocks,
      search: UserSearch,
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
