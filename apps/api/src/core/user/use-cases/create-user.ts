import { CreateUserSchema, CreateUserInput, CreateUserOutput, UserStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { createUseCase } from '@/support/utilities'
import { IDependencies, IUseCaseExecute } from '@/core/shared/types'
import { User } from '@/core/user/domain'
import { Store } from '@/core/store/domain'
import { Role } from '@/core/role/domain'
import { ConflictError } from '@/support/errors'

const validateRelationships = (dependencies: IDependencies) => async (relationships: CreateUserInput['relationships']) => {
  const storeIds = [...new Set(relationships.map((relationship) => relationship.storeId))]
  const roleIds = [...new Set(relationships.map((relationship) => relationship.roleId))]

  const [foundStores, foundRoles] = await Promise.all([
    dependencies.Repositories.store.index({ id: { $in: storeIds } }),
    dependencies.Repositories.role.index({ id: { $in: roleIds } })
  ])

  const foundStoreIds = new Set(foundStores.map((store) => store.state.id))
  const foundRoleIds = new Set(foundRoles.map((role) => role.state.id))

  const missingStoreIds = storeIds.filter((storeId) => !foundStoreIds.has(storeId))
  const missingRoleIds = roleIds.filter((roleId) => !foundRoleIds.has(roleId))

  let error = ''

  if (missingStoreIds.length > 0 && missingRoleIds.length > 0) {
    error = `A loja ${missingStoreIds.join(', ')} e cargo ${missingRoleIds.join(', ')} não foram encontrados`
  } else if (missingStoreIds.length > 0) {
    error = `A loja ${missingStoreIds.join(', ')} não foram encontrados`
  } else if (missingRoleIds.length > 0) {
    error = `O cargo ${missingRoleIds.join(', ')} não foram encontrados`
  }

  if (error) {
    throw new ConflictError(error)
  }

  const roles = relationships.map((relationship) => {
    const store = foundStores.find((store) => store.state.id === relationship.storeId) as Store
    const role = foundRoles.find((role) => role.state.id === relationship.roleId) as Role

    return {
      id: uuid(),
      storeId: relationship.storeId,
      store: store.state,
      roleId: relationship.roleId,
      role: role.state
    }
  })

  return roles
}

const execute: IUseCaseExecute<CreateUserInput, CreateUserOutput> =
  (dependencies) =>
  async ({ name, email, relationships }) => {
    const roles = await validateRelationships(dependencies)(relationships)

    const user = new User({
      name,
      email,
      roles,
      social: {
        google: null,
        facebook: null
      },
      password: '123123123123',
      status: UserStatusEnum.ACTIVE
    })

    const { state } = await dependencies.Repositories.user.create(user)

    return state
  }

export const createUser = createUseCase(execute, CreateUserSchema)
