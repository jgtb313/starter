import { PropsWithChildren, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useNavigation } from '@remix-run/react'
import { useIsMounted, useNavigationProgress } from '@ss/components'
import client from '@ss/client'

import { getEnv } from '~/support/utilities'

export const Shell = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted()
  const navigation = useNavigation()
  const env = getEnv()

  useNavigationProgress(navigation)

  useEffect(() => {
    client.connect(env)
    client.authenticate(`${Cookie.get('token')}`)
  }, [])

  if (!isMounted) {
    return <></>
  }

  return <>{children}</>
}
