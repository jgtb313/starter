import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Workspace } from '@/core/workspace/domain'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type WorkspaceRepository = Workspace['state']

type WorkspaceFindInput = DatabaseFilterInput<WorkspaceRepository> & SortInput & PaginationInput<{}>

export type IWorkspaceRepository = () => {
  index(data: WorkspaceFindInput, options?: IRepositoriesMethodOptions): Promise<Workspace[]>
  find(data: WorkspaceFindInput, options?: IRepositoriesMethodOptions): Promise<PaginationOutput<Workspace>>
  findById(id: string, options?: IRepositoriesMethodOptions): Promise<Workspace>
  create(data: Workspace, options?: IRepositoriesMethodOptions): Promise<Workspace>
  updateById(id: string, data: Partial<Workspace>, options?: IRepositoriesMethodOptions): Promise<Workspace>
  deleteById(id: string, options?: IRepositoriesMethodOptions): Promise<void>
}
