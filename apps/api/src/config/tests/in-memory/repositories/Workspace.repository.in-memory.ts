import { vi } from 'vitest'
import { PaginationSchemaTransform } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Workspace } from '@/core/workspace/domain'
import { IWorkspaceRepository } from '@/ports/database/modules/Workspace.repository'

const workspaces: Record<string, Workspace> = {}

export const WorkspaceRepositoryInMemory: ReturnType<IWorkspaceRepository> = {
  index: vi.fn(async () => {
    return Object.values(workspaces)
  }),

  find: vi.fn(async (data) => {
    const { offset, limit } = PaginationSchemaTransform.parse(data)

    const items = Object.values(workspaces)

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
    const workspace = workspaces[id]

    if (!workspace) {
      throw new NotFoundError(`Workspace ${id} not found`)
    }

    return workspace
  }),

  create: vi.fn(async ({ state }) => {
    const workspace = new Workspace(state)

    workspaces[workspace.state.id] = workspace

    return workspace
  }),

  updateById: vi.fn(async (id, { state }) => {
    const workspace = await WorkspaceRepositoryInMemory.findById(id)

    workspaces[id] = new Workspace({
      ...workspace.state,
      ...state
    })

    return workspaces[id]
  }),

  deleteById: vi.fn(async (id) => {
    const workspace = await WorkspaceRepositoryInMemory.findById(id)

    delete workspaces[id]

    return workspace
  })
}
