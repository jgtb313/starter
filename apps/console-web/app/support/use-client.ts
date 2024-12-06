import { useEffect } from 'react'
import Cookie from 'js-cookie'
import client from '@starter/client'

export const useClient = () => {
  useEffect(() => {
    client.connect(import.meta.env.VITE_STAGE)

    const token = Cookie.get('token')

    if (!token) {
      return
    }

    client.authenticate(token)
  }, [])
}
