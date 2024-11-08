import client from '@starter/client'
import { User } from '@starter/schema'
import { RequestOptions } from '@starter/use-hooks'

export type ProfileProtected = true

export type ProfileProviderProps<WithUser extends boolean = false> = {
  user: WithUser extends true ? User : User | undefined
}

export type ProfileContextProps<WithUser extends boolean = false> = {
  retrieve: RequestOptions<typeof client.profile.retrieve>
  update: RequestOptions<typeof client.profile.update>
  updateEmail: RequestOptions<typeof client.profile.updateEmail>
  updatePhone: RequestOptions<typeof client.profile.updatePhone>
  updatePassword: RequestOptions<typeof client.profile.updatePassword>

  user: WithUser extends true ? User : User | undefined
  loadingRetrieve: boolean
  loadingUpdate: boolean
  loadingUpdateEmail: boolean
  loadingUpdatePhone: boolean
  loadingUpdatePassword: boolean
}
