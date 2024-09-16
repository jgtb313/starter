import { User } from '@starter/schema'

export type Auth = {
  userId: string
}

export const createToken = (user: User): Auth => {
  return {
    userId: user.id
  }
}
