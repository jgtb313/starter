import client from '@starter/client'
import { useMount } from '@starter/use-hooks'

export const useClient = () => {
  const stage = import.meta.env.VITE_STAGE

  useMount(() => {
    client.connect(stage)
  })
}
