import client from '@ss/client'
import { RequestReturnType, RequestOptions } from '@ss/components'

export type UserState = {
  users?: RequestReturnType<typeof client.user.list>
  loadingUsers: boolean
  loadingCreateUser: boolean
  loadingUpdateUser: boolean
  loadingUpdateUserPassword: boolean
  loadingDeleteUser: boolean

  fetchUsers: RequestOptions<typeof client.user.list>
  createUser: RequestOptions<typeof client.user.create>
  updateUser: RequestOptions<typeof client.user.update>
  updateUserPassword: RequestOptions<typeof client.user.updatePassword>
  deleteUser: RequestOptions<typeof client.user.destroy>
}
