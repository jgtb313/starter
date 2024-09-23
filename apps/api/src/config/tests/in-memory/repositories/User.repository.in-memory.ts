import { vi } from 'vitest'
import { PaginationSchemaTransform } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { User } from '@/core/user/domain'
import { userMocks } from '@/core/user/User.mock'
import { IUserRepository } from '@/ports/database/modules/User.repository'

let users: Record<string, User> = {}

export const UserRepositoryInMemory: ReturnType<IUserRepository> = {
  index: vi.fn(async () => {
    return Object.values(users)
  }),

  find: vi.fn(async (data) => {
    const { offset, limit } = PaginationSchemaTransform.parse(data)

    const items = Object.values(users)

    const total = items.length
    const start = offset
    const end = start + limit
    const values = items.slice(start, end)

    return {
      values,
      total
    }
  }),

  findById: vi.fn(async (id) => {
    const user = users[id]

    if (!user) {
      throw new NotFoundError(`User ${id} not found`)
    }

    return user
  }),

  findOne: vi.fn(async ({ email }) => {
    const user = Object.values(users).find((user) => user.state.email === email)

    if (!user) {
      return
    }

    return user
  }),

  create: vi.fn(async ({ state }) => {
    const user = new User(state)

    users[user.state.id] = user

    return user
  }),

  updateById: vi.fn(async (id, { state }) => {
    const user = await UserRepositoryInMemory.findById(id)

    users[id] = new User({
      ...user.state,
      ...state
    })

    return users[id]
  }),

  deleteById: vi.fn(async (id) => {
    const user = await UserRepositoryInMemory.findById(id)

    delete users[id]

    return user
  })
}

export const clearUserRepositoryInMemory = () => {
  users = Object.fromEntries(userMocks.map((mock) => [mock.state.id, mock]))
}
