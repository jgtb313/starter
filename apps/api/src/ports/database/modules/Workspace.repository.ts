import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Workspace } from '@/core/workspace/domain'
import { DatabaseFilterInput } from '../Database.support'

type WorkspaceRepository = Workspace['state']

type WorkspaceFindInput = DatabaseFilterInput<WorkspaceRepository> & SortInput & PaginationInput<{}>

export type IWorkspaceRepository = () => {
  index(data: WorkspaceFindInput): Promise<Workspace[]>
  find(data: WorkspaceFindInput): Promise<PaginationOutput<Workspace>>
  findById(id: string): Promise<Workspace>
  create(data: Workspace): Promise<Workspace>
  updateById(id: string, data: Partial<Workspace>): Promise<Workspace>
  deleteById(id: string): Promise<Workspace>
}
