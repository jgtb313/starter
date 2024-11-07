import client from '@starter/client'
import { User } from '@starter/schema'
import { RequestOptions } from '@starter/use-hooks'

export type ProfileContextProps = {
  retrieve: RequestOptions<typeof client.profile.retrieve>
  update: RequestOptions<typeof client.profile.update>
  updateEmail: RequestOptions<typeof client.profile.updateEmail>
  updatePhone: RequestOptions<typeof client.profile.updatePhone>
  updatePassword: RequestOptions<typeof client.profile.updatePassword>

  user: User
  loadingRetrieve: boolean
  loadingUpdate: boolean
  loadingUpdateEmail: boolean
  loadingUpdatePhone: boolean
  loadingUpdatePassword: boolean
}

export type ProfileProviderProps = {
  user: User
}
