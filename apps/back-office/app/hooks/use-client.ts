import client from '@starter/client'
import { useMount } from '@starter/use-hooks'

export const useClient = () => {
  useMount(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      client.authenticate(accessToken)
    }
  })
}
