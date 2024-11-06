import { create } from 'zustand'
import client from '@ss/client'
import { makeRequest, toast } from '@ss/components'

import { UserState } from './User.types'

export const useUser = create<UserState>()((set) => ({
  users: undefined,
  loadingUsers: false,
  loadingCreateUser: false,
  loadingUpdateUser: false,
  loadingUpdateUserPassword: false,
  loadingDeleteUser: false,

  async fetchUsers(params, options) {
    return makeRequest(client.user.list, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingUsers: true
        }),
      onSuccess: (users) => {
        set({
          users
        })
      },
      onFinally: () =>
        set({
          loadingUsers: false
        })
    })
  },

  async createUser(params, options) {
    return makeRequest(client.user.create, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingCreateUser: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Colaborador criado com sucesso.'
        })

        useUser.getState().fetchUsers({})
      },
      onFinally: () =>
        set({
          loadingCreateUser: false
        })
    })
  },

  async updateUser(params, options) {
    return makeRequest(client.user.update, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingUpdateUser: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Colaborador atualizado com sucesso.'
        })

        useUser.getState().fetchUsers({})
      },
      onFinally: () =>
        set({
          loadingUpdateUser: false
        })
    })
  },

  async updateUserPassword(params, options) {
    return makeRequest(client.user.updatePassword, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingUpdateUserPassword: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Senha atualizada com sucesso.'
        })
      },
      onFinally: () =>
        set({
          loadingUpdateUserPassword: false
        })
    })
  },

  async deleteUser(params, options) {
    return makeRequest(client.user.destroy, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeleteUser: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Colaborador excluído com sucesso.'
        })

        useUser.getState().fetchUsers({})
      },
      onFinally: () =>
        set({
          loadingDeleteUser: false
        })
    })
  }
}))
