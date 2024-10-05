import { User } from '@starter/schema'

export type Auth = {
  userId: string
}

export const getTokenPayload = (user: User): Auth => {
  return {
    userId: user.id
  }
}
