import { useEffect } from 'react'
import Cookie from 'js-cookie'
import client from '@starter/client'

export const useClient = () => {
  const stage = import.meta.env.VITE_STAGE

  useEffect(() => {
    client.connect(stage)

    const accessToken = Cookie.get('accessToken')

    if (!accessToken) {
      return
    }

    client.authenticate(accessToken)
  }, [])
}
