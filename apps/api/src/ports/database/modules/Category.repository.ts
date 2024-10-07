import { PaginationInput, SortInput, PaginationOutput } from '@starter/schema'

import { Category } from '@/core/category/domain'
import { DatabaseFilterInput } from '../Database.support'
import { IRepositoriesMethodOptions } from '../Database.port'

type CategoryRepository = Category['state']

type CategoryFindInput = DatabaseFilterInput<CategoryRepository> & SortInput & PaginationInput<{}>

export type ICategoryRepository = () => {
  index(input: CategoryFindInput, options?: IRepositoriesMethodOptions): Promise<Category[]>
  find(input: CategoryFindInput, options?: IRepositoriesMethodOptions): Promise<PaginationOutput<Category>>
  findById(id: string, options?: IRepositoriesMethodOptions): Promise<Category>
  findOne(input: CategoryFindInput, options?: IRepositoriesMethodOptions): Promise<Category | undefined>
  create(input: Category, options?: IRepositoriesMethodOptions): Promise<Category>
  updateById(id: string, input: Partial<Category>, options?: IRepositoriesMethodOptions): Promise<Category>
  deleteById(id: string, options?: IRepositoriesMethodOptions): Promise<void>
}
