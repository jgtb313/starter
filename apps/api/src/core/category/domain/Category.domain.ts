import { CategorySchema, Category as ICategory, CategoryStatusEnum } from '@starter/schema'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type CategoryDomain = SetupDomain<ICategory>

export class Category {
  state!: ICategory

  constructor(value: CategoryDomain) {
    Object.assign(this, {
      state: setupDomain(
        {
          ...value
        },
        CategorySchema
      )
    })
  }

  markAsActive() {
    this.state.status = CategoryStatusEnum.ACTIVE
  }

  markAsInactive() {
    this.state.status = CategoryStatusEnum.INACTIVE
  }

  markAsDeleted() {
    this.state.status = CategoryStatusEnum.DELETED
    this.state.deletedAt = new Date()
  }
}
