import { useEffect } from 'react'
import Cookie from 'js-cookie'
import client from '@starter/client'

export const useClient = () => {
  const stage = import.meta.env.VITE_STAGE

  useEffect(() => {
    client.connect(stage)

    const token = Cookie.get('token')

    if (!token) {
      return
    }

    client.authenticate(token)
  }, [])
}
