import {
  CategorySchema,
  ListCategoriesSchema,
  ListCategoriesSchemaOutput,
  ListCategoryOptionsSchema,
  ListCategoryOptionsSchemaOutput,
  GetCategorySchema,
  GetCategorySchemaOutput,
  CreateCategorySchema,
  CreateCategorySchemaOutput,
  UpdateCategorySchema,
  UpdateCategorySchemaOutput,
  ActiveCategorySchema,
  ActiveCategorySchemaOutput,
  InactiveCategorySchema,
  InactiveCategorySchemaOutput,
  DeleteCategorySchema
} from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { listCategories } from '@/core/category/use-cases/list-categories.use-case'
import { listCategoryOptions } from '@/core/category/use-cases/list-category-options.use-case'
import { getCategory } from '@/core/category/use-cases/get-category.use-case'
import { createCategory } from '@/core/category/use-cases/create-category.use-case'
import { updateCategory } from '@/core/category/use-cases/update-category.use-case'
import { activeCategory } from '@/core/category/use-cases/active-category.use-case'
import { inactiveCategory } from '@/core/category/use-cases/inactive-category.use-case'
import { deleteCategory } from '@/core/category/use-cases/delete-category.use-case'
import { IRouter } from '@/ports/http'

export const CategoryRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Categories',

  description: 'Handles operations related to managing and retrieving categories.',

  schemas: {
    Category: {
      schema: CategorySchema
    }
  },

  paths: {
    listCategories: {
      summary: 'List Categories',
      description: 'Retrieves a pageable list of categories.',

      method: 'GET',
      path: '/categories',

      parameters: {
        query: ListCategoriesSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ListCategoriesSchemaOutput
        }
      },

      execute({ query }) {
        return listCategories(dependencies)(query)
      }
    },

    listCategoryOptions: {
      summary: 'List Available Categories',
      description: 'Retrieves a list of categories.',

      method: 'GET',

      path: '/categories::options',

      parameters: {
        query: ListCategoryOptionsSchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ListCategoryOptionsSchemaOutput
        }
      },

      execute() {
        return listCategoryOptions(dependencies)({})
      }
    },

    getCategory: {
      summary: 'Get Category',

      description: 'Retrieves details of a specific category by ID.',

      method: 'GET',

      path: '/categories/:id',

      parameters: {
        params: GetCategorySchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: GetCategorySchemaOutput
        }
      },

      execute({ params }) {
        return getCategory(dependencies)(params)
      }
    },

    createCategory: {
      summary: 'Create Category',
      description: 'Creates a new category.',

      method: 'POST',
      path: '/categories',

      parameters: {
        body: CreateCategorySchema
      },

      responses: {
        201: {
          description: 'Created',
          schema: CreateCategorySchemaOutput
        }
      },

      execute({ body }) {
        return createCategory(dependencies)(body)
      }
    },

    updateCategory: {
      summary: 'Update Category',
      description: 'Updates an existing category.',

      method: 'PATCH',
      path: '/categories/:id',

      parameters: {
        params: UpdateCategorySchema.pick({ id: true }),
        body: UpdateCategorySchema.omit({ id: true })
      },

      responses: {
        200: {
          description: 'OK',
          schema: UpdateCategorySchemaOutput
        }
      },

      execute({ params, body }) {
        return updateCategory(dependencies)({ ...params, ...body })
      }
    },

    activateCategory: {
      summary: 'Activate Category',
      description: 'Activates a category by ID.',

      method: 'POST',
      path: '/categories/:id(.*)::activate',

      parameters: {
        params: ActiveCategorySchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: ActiveCategorySchemaOutput
        }
      },

      execute({ params }) {
        return activeCategory(dependencies)(params)
      }
    },

    deactivateCategory: {
      summary: 'Deactivate Category',
      description: 'Deactivates a category by ID.',

      method: 'POST',
      path: '/categories/:id(.*)::deactivate',

      parameters: {
        params: InactiveCategorySchema
      },

      responses: {
        200: {
          description: 'OK',
          schema: InactiveCategorySchemaOutput
        }
      },

      execute({ params }) {
        return inactiveCategory(dependencies)(params)
      }
    },

    deleteCategory: {
      summary: 'Delete Category',
      description: 'Deletes a category by ID.',

      method: 'DELETE',
      path: '/categories/:id',

      parameters: {
        params: DeleteCategorySchema
      },

      responses: {
        204: {
          description: 'OK'
        }
      },

      async execute({ params }) {
        await deleteCategory(dependencies)(params)
      }
    }
  }
})
