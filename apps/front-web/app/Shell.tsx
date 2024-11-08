import { PropsWithChildren, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useNavigation } from '@remix-run/react'
import client from '@starter/client'
import { StoreProvider } from '@starter/store'
import { useNavigationProgress, toast } from '@starter/ui'
import { useIsMounted } from '@starter/use-hooks'

export const Shell = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted()
  const navigation = useNavigation()
  const stage = import.meta.env.VITE_STAGE

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

  return <StoreProvider onError={(error) => toast.error({ message: error })}>{children}</StoreProvider>
}
