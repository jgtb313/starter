import { PropsWithChildren, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useNavigation } from '@remix-run/react'
import client from '@starter/client'
import { useNavigationProgress } from '@starter/ui'
import { useIsMounted } from '@starter/use-hooks'

import { getStage } from '~/support/utilities'

export const Shell = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted()
  const navigation = useNavigation()
  const stage = getStage()

  useNavigationProgress(navigation)

  useEffect(() => {
    client.connect(stage)

    const token = Cookie.get('token')

    if (!token) {
      return
    }

    client.authenticate(token)
  }, [])

  if (!isMounted) {
    return <></>
  }

  return <>{children}</>
}
