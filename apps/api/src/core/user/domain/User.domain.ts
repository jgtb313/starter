import { UserSchema, User as IUser } from '@starter/schema'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type UserDomain = SetupDomain<IUser>

export class User {
  state!: IUser

  constructor(user: UserDomain) {
    console.log({ user })

    Object.assign(this, {
      state: setupDomain(
        {
          ...user
        },
        UserSchema
      )
    })
  }
}
