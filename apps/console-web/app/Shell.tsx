import { PropsWithChildren, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useNavigation } from '@remix-run/react'
import client, { StageEnum } from '@starter/client'
import { useNavigationProgress } from '@starter/ui'
import { useIsMounted } from '@starter/use-hooks'

export const Shell = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted()
  const navigation = useNavigation()
  const stage = import.meta.env.VITE_STAGE as StageEnum

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
