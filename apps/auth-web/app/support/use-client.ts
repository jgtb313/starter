import { useEffect } from 'react'
import client from '@starter/client'

export const useClient = () => {
  const stage = import.meta.env.VITE_STAGE

  useEffect(() => {
    client.connect(stage)
  }, [])
}
