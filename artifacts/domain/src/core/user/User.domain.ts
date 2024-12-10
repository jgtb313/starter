import { UserSchema, User as IUser } from '@starter/schema'

import { setupDomain, SetupDomain } from '../../domain.utilities'

export type UserDomain = SetupDomain<IUser>

export class User {
  state!: IUser

  constructor(user: UserDomain) {
    Object.assign(this, {
      state: setupDomain(
        {
          ...user,
        },
        UserSchema,
      ),
    })
  }
}
