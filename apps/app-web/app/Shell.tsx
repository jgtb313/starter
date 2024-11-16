import { PropsWithChildren } from 'react'
import { useNavigation } from '@remix-run/react'
import { StoreProvider } from '@starter/store'
import { useNavigationProgress, toast } from '@starter/ui'
import { useIsMounted } from '@starter/use-hooks'

import { useClient } from '~/support/use-client'

export const Shell = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted()
  const navigation = useNavigation()

  useClient()
  useNavigationProgress(navigation)

  if (!isMounted) {
    return <></>
  }

  return <StoreProvider onError={(error) => toast.error({ message: error })}>{children}</StoreProvider>
}
