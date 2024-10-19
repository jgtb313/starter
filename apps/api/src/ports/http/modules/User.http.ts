import { UserSchema } from '@starter/schema'

import { IDependencies } from '@/support/types'
import { IRouter } from '@/ports/http'

export const UserRouter = (_dependencies: IDependencies): IRouter => ({
  name: 'User',

  description: 'Handles operations for managing and retrieving users.',

  schemas: {
    User: {
      schema: UserSchema,
    },
  },

  paths: {},
})
