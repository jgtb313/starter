import { User } from '@starter/schema'

export type Auth = {
  workspaceId: string
  userId: string
}

export const getTokenPayload = (user: User): Auth => {
  return {
    workspaceId: user.workspaceId,
    userId: user.id,
  }
}
